class WhiteHatSamurai extends Samurai {
    // enemy ai
    private alertDistance: number = 500;
    private stopDistance: number = 85;
    // attacking
    private attackTypes: string[] = ["BASIC_ATTACK", "STRONG_ATTACK"];
    private attackProbs = {
        0.80: "BASIC_ATTACK",
        0.20: "STRONG_ATTACK"
    }
    private isAttacking: boolean = false;
    private attackDelay: number = 0.5;
    private currentAttackDelta: number = 0;
    // weapon
    private basicSword: Weapon;
    private strongSword: Weapon;
    private usingSword: Weapon;
    // hurting
    private isHurting: boolean = false;



    constructor(x: number, y: number) {
        super(x, y, 250, 250, 10, "samurai_3");

        this.hitboxes.push(
            new Hitbox(-25, 15, 30, 100, CollisionType.Colliding, this, true)
        )
    }

    // Methods
    public onGameEngineDefined(): void {
        super.onGameEngineDefined();

        // Weapon
        this.basicSword = new Weapon(this, 1);
        this.scene.addGameObject(this.basicSword);

        this.basicSword.hitboxConfigs = [
            [],
            [],
            [
                new Hitbox(25, 10, 45, 100, CollisionType.Overlapping, this.basicSword, true),
                new Hitbox(15, -20, 30, 30, CollisionType.Overlapping, this.basicSword, true),
                new Hitbox(-30, -40, 60, 25, CollisionType.Overlapping, this.basicSword, true)
            ],
            [
                new Hitbox(25, 0, 40, 100, CollisionType.Overlapping, this.basicSword, true),
            ],
            [
                new Hitbox(20, 80, 40, 10, CollisionType.Overlapping, this.basicSword, true),
            ],
            []
        ]

        this.strongSword = new Weapon(this, 3);
        this.scene.addGameObject(this.strongSword);

        this.strongSword.hitboxConfigs = [
            [],
            [],
            [],
            [],
            [
                new Hitbox(70, -100, 20, 215, CollisionType.Overlapping, this.strongSword, true),
                new Hitbox(20, 60, 50, 60, CollisionType.Overlapping, this.strongSword, true),
            ],
            [
                new Hitbox(25, 85, 60, 30, CollisionType.Overlapping, this.strongSword, true),
                new Hitbox(80, 45, 20, 70, CollisionType.Overlapping, this.strongSword, true),
            ],
            [],
            [],
            []
        ]
    }

    // p5.js functions
    public draw(cameraX: number, cameraY: number): void {
        this.currentAnimation.drawAnimation(cameraX, cameraY, this.width, this.height);
    }

    public update(): void {
        // super
        super.update();
        // AI
        const player = this.scene.manager.playerReference;
        const distToPlayer = Vector2.dist(player.position, this.position);

        if (distToPlayer <= this.stopDistance) {
            // attack logic
            // randomize attack types
        
            this.currentAttackDelta += deltaTime;
            if (this.currentAttackDelta >= this.attackDelay) {
                const attackProb = random(0, 1);
                let nextAttack: string;
                if (attackProb > 0.6) {
                    nextAttack = "STRONG_ATTACK"
                } else {
                    nextAttack = "BASIC_ATTACK"
                }
                this.attack(nextAttack);

                this.attackDelay = random(1000, 3000);
                this.currentAttackDelta = 0;
            }
            
        } else if (distToPlayer < this.alertDistance) {
            // x component
            if (this.position.x < player.position.x) {
                this.move(3, 0);
            }
            if (this.position.x > player.position.x) {
                this.move(-3, 0);
            }
        }

        // Orientation logic
        if (this.deltaX > 0) {
            this.orientation = Orientation.Right;
        }
        if (this.deltaX < 0) {
            this.orientation = Orientation.Left;
        }

        // Animations
        this.determineAnimation();
        this.currentAnimation.update(this.orientation);
        this.move(0, 0);
        this.applyGravity();
    }

    // Methods
    private determineAnimation() {
        if (this.isHurting) {

        } else if (this.isAttacking) {

        } else if (this.deltaX !== 0) {
            this.currentAnimName = "RUN";
        } else {
            this.currentAnimName = "IDLE";
        }
    }

    private attack(attackType: string) {
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
        }

        this.currentAnimation.onNewFrame = id => {
            this.usingSword.setHitboxConfig(id);
        }
    }

    protected hurt(): void {
        this.changeAnimation("HURT", true);
        this.isHurting = true;
        this.currentAnimation.onLastFrame = () => {
            this.isHurting = false;
        }
    }
}