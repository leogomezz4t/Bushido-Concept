class FemaleSamurai extends Samurai {
    constructor(x: number, y: number) {
        super(x, y, 350, 250, 10, "samurai_4");

        this.hitboxes.push(
            new Hitbox(-25, 15, 30, 100, CollisionType.Colliding, this)
        );
    }

    // methods
    public update(): void {
        super.update();
        this.determineAnimation();
    }

    private determineAnimation() {
        if (this.deltaX !== 0) {
            this.changeAnimation("RUN", true);
        } else {
            this.changeAnimation("IDLE", true);
        }
    }
}