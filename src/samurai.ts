class Samurai extends Entity {
    // posture
    public broken: boolean = false;
    private brokenTimeLimit: number = 3000;
    private brokenTimeDelta: number;

    constructor(x: number, y: number, width: number, height: number, maxHitpoints: number, sprite: string) {
        super(x, y, width, height, maxHitpoints, sprite);
    }

    public update(): void {
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
    public breakPosture(): void {
        if (this.broken) {
            return;
        }
        this.broken = true;

        this.brokenTimeDelta = 0;
    }
    // end posture methods
}