class TrackingCamera extends Camera {
    trackingSubject;
    dampingStrength = 0.1;
    offset;
    constructor(scale, trackingReference) {
        super(0, 0, scale);
        this.trackingSubject = trackingReference;
        this.offset = new Vector2(0, -40);
    }
    get offsetPosition() {
        return this.offset.add(this.worldPosition);
    }
    update() {
        const trackingPosition = this.trackingSubject.position;
        const xDist = Math.abs(this.offsetPosition.x - trackingPosition.x);
        const yDist = Math.abs(this.offsetPosition.y - trackingPosition.y);
        if (this.offsetPosition.x < trackingPosition.x) {
            this.worldPosition.x += this.dampingStrength * xDist;
        }
        if (this.offsetPosition.x > trackingPosition.x) {
            this.worldPosition.x -= this.dampingStrength * xDist;
        }
        // Y
        if (this.offsetPosition.y < trackingPosition.y) {
            this.worldPosition.y += this.dampingStrength * yDist;
        }
        if (this.offsetPosition.y > trackingPosition.y) {
            this.worldPosition.y -= this.dampingStrength * yDist;
        }
    }
}
