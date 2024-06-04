class Samurai extends Entity {
    // enemy ai
    alerted = false;
    // movement
    walkSpeed = 0.17;
    // posture
    broken = false;
    brokenTimeLimit = 3000;
    brokenTimeDelta;
    // Health bar
    healthBar;
    healthOffset = new Vector2(-20, -10);
    healthShowingDelta = 0;
    healthShowingLimit = 5000;
    // weapon
    usingSword;
    // attacking
    isAttacking = false;
    constructor(x, y, width, height, maxHitpoints, sprite) {
        super(x, y, width, height, maxHitpoints, sprite);
    }
    onGameEngineDefined() {
        super.onGameEngineDefined();
        // health bar
        this.healthBar = new EnemyHealthBar(this, this.healthOffset, 50, 10, this.maxHitpoints);
        this.healthBar.isActive = false;
        this.scene.addGameObject(this.healthBar);
    }
    update() {
        super.update();
        // posture
        if (this.broken) {
            this.brokenTimeDelta += deltaTime;
            // Check if past limit
            if (this.brokenTimeDelta >= this.brokenTimeLimit) {
                this.broken = false;
            }
        }
        // Orientation logic
        if (this.deltaX > 0) {
            this.orientation = Orientation.Right;
        }
        if (this.deltaX < 0) {
            this.orientation = Orientation.Left;
        }
        // health bar timer
        if (this.healthBar.isActive) {
            // Check if limit is passed
            if (this.healthShowingDelta >= this.healthShowingLimit) {
                this.healthBar.isActive = false;
            }
            // increment timer
            this.healthShowingDelta += deltaTime;
        }
        // animation
        this.currentAnimation.update(this.orientation);
        //
        this.move(0, 0);
        this.applyGravity();
    }
    // p5.js functions
    draw(cameraX, cameraY) {
        this.currentAnimation.drawAnimation(cameraX, cameraY, this.width, this.height);
    }
    hurt() {
        super.hurt();
        // show healthbar
        this.healthBar.isActive = true;
        this.healthShowingDelta = 0;
    }
    die() {
        super.die();
        // health bar cleanup
        this.healthBar.delete();
    }
    // Posture methods
    breakPosture() {
        if (this.broken) {
            return;
        }
        this.broken = true;
        this.brokenTimeDelta = 0;
    }
}
