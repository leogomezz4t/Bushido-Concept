class Samurai extends Entity {
    // posture
    broken = false;
    brokenTimeLimit = 3000;
    brokenTimeDelta;
    constructor(x, y, width, height, maxHitpoints, sprite) {
        super(x, y, width, height, maxHitpoints, sprite);
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
