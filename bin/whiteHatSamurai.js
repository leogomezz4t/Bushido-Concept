class WhiteHatSamurai extends Samurai {
    // Animations
    animations;
    currentAnimName = "IDLE";
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
    constructor(x, y) {
        super(x, y, 250, 250, 10);
        this.hitboxes.push(new Hitbox(-25, 15, 30, 100, CollisionType.Colliding, this, true));
    }
    // Getters and setters
    get currentAnimation() {
        return this.animations[this.currentAnimName];
    }
    // Methods
    onGameEngineDefined() {
        this.game.requestSprite("samurai_3", (s) => {
            this.animations = s;
        });
    }
    // p5.js functions
    draw(cameraX, cameraY) {
        this.currentAnimation.drawAnimation(cameraX, cameraY, this.width, this.height);
    }
    update() {
        // AI
        const player = this.scene.manager.playerReference;
        const distToPlayer = Vector2.dist(player.position, this.position);
        if (distToPlayer <= this.stopDistance) {
            // attack logic
            // randomize attack types
            this.currentAttackDelta += deltaTime;
            if (this.currentAttackDelta >= this.attackDelay) {
                const attackProb = random(0, 1);
                console.log(attackProb);
                let nextAttack;
                if (attackProb > 0.6) {
                    nextAttack = "STRONG_ATTACK";
                }
                else {
                    nextAttack = "BASIC_ATTACK";
                }
                this.attack(nextAttack);
                this.attackDelay = random(1000, 3000);
                this.currentAttackDelta = 0;
            }
        }
        else if (distToPlayer < this.alertDistance) {
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
        this.isAttacking = true;
        this.currentAnimName = attackType;
        this.currentAnimation.onLastFrame = () => {
            this.isAttacking = false;
        };
    }
}
