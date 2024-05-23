class WhiteHatSamurai extends Samurai {
    // Animations
    animations;
    currentAnimName = "IDLE";
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
        // follow logic
        if (distToPlayer > 200) {
            // x component
            if (this.position.x < player.position.x) {
                this.move(1, 0);
            }
            if (this.position.x > player.position.x) {
                this.move(-1, 0);
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
        this.applyGravity();
    }
    // Methods
    determineAnimation() {
        if (this.deltaX !== 0) {
            this.currentAnimName = "RUN";
        }
        else {
            this.currentAnimName = "IDLE";
        }
    }
}
