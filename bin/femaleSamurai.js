class FemaleSamurai extends Samurai {
    constructor(x, y) {
        super(x, y, 350, 250, 10, "samurai_4");
        this.hitboxes.push(new Hitbox(-25, 15, 30, 100, CollisionType.Colliding, this));
    }
    // methods
    update() {
        super.update();
        this.determineAnimation();
    }
    determineAnimation() {
        if (this.deltaX !== 0) {
            this.changeAnimation("RUN", true);
        }
        else {
            this.changeAnimation("IDLE", true);
        }
    }
}
