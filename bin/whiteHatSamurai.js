class WhiteHatSamurai extends Samurai {
    // enemy ai
    alertDistance = 500;
    stopDistance = 100;
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
        // AI
        const player = this.scene.manager.playerReference;
        const distToPlayer = Vector2.dist(player.position, this.position);
        if (distToPlayer <= this.stopDistance) {
            // attack logic
            // randomize attack types
            /*
            this.currentAttackDelta += deltaTime;
            if (this.currentAttackDelta >= this.attackDelay) {
                const attackProb = random(0, 1);
                console.log(attackProb)
                let nextAttack;
                if (attackProb > 0.6) {
                    nextAttack = "STRONG_ATTACK"
                } else {
                    nextAttack = "BASIC_ATTACK"
                }
                this.attack(nextAttack);

                this.attackDelay = random(1000, 3000);
                this.currentAttackDelta = 0;
            }
            */
            this.attack("STRONG_ATTACK");
        }
        else if (distToPlayer < this.alertDistance) {
            // x component
            if (this.position.x < player.position.x) {
                //this.move(3, 0);
            }
            if (this.position.x > player.position.x) {
                //this.move(-3, 0);
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
        if (this.isAttacking) {
        }
        else if (this.deltaX !== 0) {
            this.currentAnimName = "RUN";
        }
        else {
            this.currentAnimName = "IDLE";
        }
    }
    attack(attackType) {
        if (this.isAttacking) { // Don't attack twice
            return;
        }
        switch (attackType) {
            case "BASIC_ATTACK": {
                this.usingSword = this.basicSword;
                return;
            }
            case "STRONG_ATTACK": {
                this.usingSword = this.strongSword;
                return;
            }
        }
        this.isAttacking = true;
        this.changeAnimation(attackType, true);
        this.currentAnimation.onLastFrame = () => {
            this.isAttacking = false;
        };
    }
}
