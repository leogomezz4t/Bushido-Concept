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
        console.log(this.currentAnimation);
        this.currentAnimation.drawAnimation(cameraX, cameraY, this.width, this.height);
    }
    update() {
        this.currentAnimation.update(this.orientation);
        this.move(0, 0);
    }
}
