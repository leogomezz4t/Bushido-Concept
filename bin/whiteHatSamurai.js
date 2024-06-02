class WhiteHatSamurai extends Samurai {
    // movement
    walkSpeed = 0.17;
    // enemy ai 
    alerted = false;
    alertDistance = 500;
    stopDistance = 85;
    isPacingBack = false;
    pacingDistance = 450;
    isSprintAttacking = false;
    sprintAttackSpeed = 0.3;
    sprintAttackDistance = 200;
    chanceOfSprintAttack = 5;
    isFlurryAttacking = false;
    chanceOfFlurryAttack = 50;
    numberOfFlurries = 5;
    flurryCounter = 0;
    flurrySpeed = 0.15;
    // attacking
    attackTypes = ["BASIC_ATTACK", "STRONG_ATTACK"];
    attackProbs = {
        0.80: "BASIC_ATTACK",
        0.20: "STRONG_ATTACK"
    };
    isAttacking = false;
    attackDelay = 0.5;
    currentAttackDelta = 0;
    // weapon
    basicSword;
    strongSword;
    usingSword;
    // hurting
    isHurting = false;
    constructor(x, y) {
        super(x, y, 250, 250, 10, "samurai_3");
        this.hitboxes.push(new Hitbox(-25, 15, 30, 100, CollisionType.Colliding, this, true));
    }
    // Methods
    onGameEngineDefined() {
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
        ];
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
        ];
    }
    // p5.js functions
    draw(cameraX, cameraY) {
        this.currentAnimation.drawAnimation(cameraX, cameraY, this.width, this.height);
    }
    update() {
        // super
        super.update();
        console.log(deltaTime);
        // AI
        const player = this.scene.manager.playerReference;
        const distToPlayer = Vector2.dist(player.position, this.position);
        // setting its alert
        this.alerted = distToPlayer < this.alertDistance;
        if (this.isFlurryAttacking) {
            // Check if flurry is over
            if (this.flurryCounter >= this.numberOfFlurries) {
                this.isFlurryAttacking = false;
                this.isAttacking = false;
                this.usingSword.isActive = false;
            }
            this.changeAnimation("BASIC_ATTACK", true);
            this.currentAnimation.onLastFrame = () => {
                this.flurryCounter++;
            };
            // Move slightly forward
            this.move(this.flurrySpeed * deltaTime * this.orientation, 0);
        }
        else if (this.isSprintAttacking) {
            // distance to start attacking
            if (distToPlayer <= this.sprintAttackDistance) {
                this.attack("STRONG_ATTACK");
                this.isSprintAttacking = false;
            }
            if (this.position.x < player.position.x) {
                this.move(this.sprintAttackSpeed * deltaTime, 0);
            }
            else {
                this.move(-this.sprintAttackSpeed * deltaTime, 0);
            }
        }
        else if (this.isPacingBack) {
            // Stop after a distance
            if (distToPlayer >= this.pacingDistance) {
                this.isPacingBack = false;
                this.isSprintAttacking = true;
            }
            if (this.position.x <= player.position.x) {
                // Move to the left
                this.move(-this.walkSpeed * deltaTime, 0);
            }
            else {
                this.move(this.walkSpeed * deltaTime, 0);
            }
        }
        else if (distToPlayer <= this.stopDistance) { // Basic attack
            // attack logic
            // randomize attack types
            this.currentAttackDelta += deltaTime;
            if (this.currentAttackDelta >= this.attackDelay) {
                // Flurry attack logic
                const r = random(0, 100);
                if (r < this.chanceOfFlurryAttack) {
                    this.isFlurryAttacking = true;
                    this.flurryCounter = 0;
                }
                this.attack("BASIC_ATTACK");
                this.attackDelay = random(500, 1500);
                this.currentAttackDelta = 0;
            }
        }
        else if (this.alerted && distToPlayer > this.sprintAttackDistance) {
            this.isSprintAttacking = true;
        }
        else if (this.alerted) {
            // x component
            if (this.position.x < player.position.x) {
                this.move(this.walkSpeed * deltaTime, 0);
            }
            if (this.position.x > player.position.x) {
                this.move(-this.walkSpeed * deltaTime, 0);
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
    determineAnimation() {
        if (this.isFlurryAttacking) {
        }
        else if (this.isHurting) {
        }
        else if (this.isAttacking) {
        }
        else if (this.deltaX !== 0) {
            this.currentAnimName = "RUN";
        }
        else {
            this.currentAnimName = "IDLE";
        }
    }
    attack(attackType, dontPace = false) {
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
            }
        };
        this.currentAnimation.onNewFrame = id => {
            this.usingSword.setHitboxConfig(id);
        };
    }
    hurt() {
        this.changeAnimation("HURT", true);
        this.isHurting = true;
        this.currentAnimation.onLastFrame = () => {
            this.isHurting = false;
        };
    }
}
