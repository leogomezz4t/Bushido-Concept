class ParallaxBackground extends GameObject {
    backLayer;
    midLayer;
    foreLayer;
    backClone;
    midClone;
    foreClone;
    // scale
    scale;
    // pos
    offset;
    initialPos;
    // camera
    cameraReference;
    constructor(x, y, scale, cameraRef, back, mid, front) {
        super(x, y, null, null, false);
        this.scale = scale;
        this.cameraReference = cameraRef;
        this.initialPos = new Vector2(x, y);
        this.offset = Vector2.subtract(this.position, cameraRef.worldPosition);
        this.backLayer = back;
        this.midLayer = mid;
        this.foreLayer = front;
        this.backLayer.scale = scale;
        this.midLayer.scale = scale;
        this.foreLayer.scale = scale;
    }
    update() {
        this.position = Vector2.add(this.cameraReference.worldPosition, this.offset);
        const dist = this.initialPos.x - this.position.x;
        this.backLayer.position.x = (this.backLayer.initialPos.x + dist) * this.backLayer.parallaxEffect;
        this.midLayer.position.x = (this.midLayer.initialPos.x + dist) * this.midLayer.parallaxEffect;
        this.foreLayer.position.x = (this.foreLayer.initialPos.x + dist) * this.foreLayer.parallaxEffect;
    }
}
