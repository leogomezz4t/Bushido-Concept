class WhiteHatSamurai extends Samurai {

    // enemy ai 
    private alertDistance: number = 500;
    private stopDistance: number = 85;

    private isPacingBack: boolean = false;
    private pacingDistance: number = 500;

    private isSprintAttacking: boolean = false;
    private sprintAttackSpeed: number = 0.3;
    private sprintAttackDistance: number = 200;
    private startSprintDistance: number = 450;
    private chanceOfSprintAttack: number = 5;

    private isFlurryAttacking: boolean = false;
    private chanceOfFlurryAttack: number = 40;
    private numberOfFlurries: number = 3;
    private flurryCounter: number = 0;
    private flurrySpeed: number = 0.15;
    // attacking
    private attackDelay: number = 0.5;
    private currentAttackDelta: number = 0;
    // weapon
    private basicSword: Weapon;
    private strongSword: Weapon;


    constructor(x: number, y: number) {
        super(x, y, 250, 250, 10, "samurai_3");

        this.hitboxes.push(
            new Hitbox(-25, 15, 30, 100, CollisionType.Colliding, this)
        )
    }

    // Methods
    public onGameEngineDefined(): void {
        super.onGameEngineDefined();
        // Weapon
        this.basicSword = new Weapon(this, 1, new Vector2(40, 0));
        this.scene.addGameObject(this.basicSword);

        this.basicSword.hitboxConfigs = [
            [],
            [],
            [
                new Hitbox(25, 10, 45, 100, CollisionType.Overlapping, this.basicSword),
                new Hitbox(15, -20, 30, 30, CollisionType.Overlapping, this.basicSword),
                new Hitbox(-30, -40, 60, 25, CollisionType.Overlapping, this.basicSword)
            ],
            [
                new Hitbox(25, 0, 40, 100, CollisionType.Overlapping, this.basicSword),
            ],
            [
                new Hitbox(20, 80, 40, 10, CollisionType.Overlapping, this.basicSword),
            ],
            []
        ]

        this.strongSword = new Weapon(this, 3, new Vector2(150, 0));
        this.scene.addGameObject(this.strongSword);

        this.strongSword.hitboxConfigs = [
            [],
            [],
            [],
            [],
            [
                new Hitbox(70, -100, 20, 215, CollisionType.Overlapping, this.strongSword),
                new Hitbox(20, 60, 50, 60, CollisionType.Overlapping, this.strongSword),
            ],
            [
                new Hitbox(25, 85, 60, 30, CollisionType.Overlapping, this.strongSword),
                new Hitbox(80, 45, 20, 70, CollisionType.Overlapping, this.strongSword),
            ],
            [],
            [],
            []
        ]
    }

    public update(): void {
        // super
        super.update();
        // AI
        const player = this.scene.manager.playerReference;
        const distToPlayer = Vector2.dist(player.position, this.position);
        // setting its alert
        this.alerted = distToPlayer < this.alertDistance;
        if (this.broken) {
            this.resetModifiers();
        } else if (this.isDying) {
            // dont do anything
        } else if (this.isFlurryAttacking) {
            // Check if flurry is over
            if (this.flurryCounter >= this.numberOfFlurries) {
                this.isFlurryAttacking = false;
                this.isAttacking = false;
                this.usingSword.isActive = false;
            }
            this.changeAnimation("BASIC_ATTACK", true);
            this.currentAnimation.onLastFrame = () => {
                this.flurryCounter++;              
            }
            // Move slightly forward
            this.move(this.flurrySpeed * deltaTime * this.orientation, 0);
        } else if (this.isSprintAttacking) {
            // distance to start attacking
            if (distToPlayer <= this.sprintAttackDistance) {
                this.attack("STRONG_ATTACK");
                this.isSprintAttacking = false;
            }
            if (this.position.x < player.position.x) {
                this.move(this.sprintAttackSpeed * deltaTime, 0);
            } else {
                this.move(-this.sprintAttackSpeed * deltaTime, 0);
            }
        } else if (this.isPacingBack) {
            // Stop after a distance
            if (distToPlayer >= this.pacingDistance) {
                this.isPacingBack = false;
                this.isSprintAttacking = true;
            }
            
            if (this.position.x <= player.position.x) {
                // Move to the left
                this.move(-this.walkSpeed * deltaTime, 0);
            } else {
                this.move(this.walkSpeed * deltaTime, 0);
            }
        } else if (distToPlayer <= this.stopDistance) { // Basic attack
            // attack logic
            // randomize attack types
        
            this.currentAttackDelta += deltaTime;
            if (this.currentAttackDelta >= this.attackDelay) {
                // Flurry attack logic
                const r = random (0, 100);
                if (r < this.chanceOfFlurryAttack) {
                    this.isFlurryAttacking = true;
                    this.flurryCounter = 0;
                }
                this.attack("BASIC_ATTACK");

                this.attackDelay = random(500, 1500);
                this.currentAttackDelta = 0;
            }
            
        } else if (this.alerted && distToPlayer > this.startSprintDistance) {
            this.isSprintAttacking = true;
        } else if (this.alerted) {
            // x component
            if (this.position.x < player.position.x) {
                this.move(this.walkSpeed * deltaTime, 0);
            }
            if (this.position.x > player.position.x) {
                this.move(-this.walkSpeed * deltaTime, 0);
            }
        }


        // Animations
        this.determineAnimation();
    }

    // Methods
    private determineAnimation() {
        if (this.isDying) {

        } else if (this.isFlurryAttacking) {

        } else if (this.isHurting) {

        } else if (this.isAttacking) {

        } else if (this.deltaX !== 0) {
            this.changeAnimation("RUN", true);
        } else {
            this.changeAnimation("IDLE", true);
        }
    }

    private attack(attackType: string, dontPace: boolean = false) {
        if (this.isAttacking) { // Don't attack twice
            return;
        }
        switch (attackType) {
            case "BASIC_ATTACK": {
                this.usingSword = this.basicSword;
                break;
            }

            case "STRONG_ATTACK": {
                this.usingSword = this.strongSword;
                break;
            }
        }

        this.isAttacking = true;
        this.usingSword.isActive = true;

        this.changeAnimation(attackType, true);

        this.currentAnimation.onLastFrame = () => {
            this.isAttacking = false;
            this.usingSword.isActive = false;

            if (dontPace) {
                return;
            }
            // Pacing back logic
            const r = random(0, 100);
            if (r < this.chanceOfSprintAttack) {
                this.isPacingBack = true;
                setTimeout(() => {
                    this.isPacingBack = false;
                    this.isSprintAttacking = true;
                }, 1500);
            }
        }

        this.currentAnimation.onNewFrame = id => {
            this.usingSword.setHitboxConfig(id);
        }
    }

    public die(): void {
        super.die();
        // weapon cleanup
        this.basicSword.delete();
        this.strongSword.delete();
    }

    public resetModifiers() {
        this.usingSword.isActive = false;
        this.isAttacking = false;
        this.isSprintAttacking = false;
        this.isPacingBack = false;
        this.isFlurryAttacking = false;
        this.flurryCounter = 0;
    }
}