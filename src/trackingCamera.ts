class TrackingCamera extends Camera {
    public trackingSubject: GameObject;
    
    public dampingStrength: number = 0.1;

    public offset: Vector2;

    constructor(scale: number, trackingReference: GameObject) {
        super(0, 0, scale);

        this.trackingSubject = trackingReference;
        this.offset = new Vector2(0, -40);
    }

    get offsetPosition(): Vector2 {
        return this.offset.add(this.worldPosition);
    }

    update() {
        const trackingPosition: Vector2 = this.trackingSubject.position;

        const xDist: number = Math.abs(this.offsetPosition.x - trackingPosition.x);
        const yDist: number = Math.abs(this.offsetPosition.y - trackingPosition.y);

        if (this.offsetPosition.x < trackingPosition.x) {
            this.worldPosition.x += this.dampingStrength*xDist;
        }
        if (this.offsetPosition.x > trackingPosition.x) {
            this.worldPosition.x -= this.dampingStrength*xDist;
        }

        // Y
        if (this.offsetPosition.y < trackingPosition.y) {
            this.worldPosition.y += this.dampingStrength*yDist;
        }
        if (this.offsetPosition.y > trackingPosition.y) {
            this.worldPosition.y -= this.dampingStrength*yDist;
        }
    }
}