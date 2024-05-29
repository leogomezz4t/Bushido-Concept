class ParallaxBackground extends GameObject {
    private backLayer: Background;
    private midLayer: Background;
    private foreLayer: Background;

    private backClone: Background;
    private midClone: Background;
    private foreClone: Background;

    // scale
    private scale: number;

    // pos
    private offset: Vector2;
    public initialPos: Vector2;

    // camera
    public cameraReference: Camera;

    constructor(x: number, y: number, scale: number, cameraRef: Camera, back: Background, mid: Background, front: Background) {
        super(x, y, null, null, false);
        this.scale = scale;
        this.cameraReference = cameraRef;

        this.initialPos = new Vector2(x, y);

        this.offset = Vector2.subtract(this.position, cameraRef.worldPosition)

        this.backLayer = back;
        this.midLayer = mid;
        this.foreLayer = front;

        this.backLayer.scale = scale;
        this.midLayer.scale = scale;
        this.foreLayer.scale = scale;
    }

    public update() {
        this.position = Vector2.add(this.cameraReference.worldPosition, this.offset);
        const dist = this.initialPos.x - this.position.x;

        this.backLayer.position.x = (this.backLayer.initialPos.x + dist) * this.backLayer.parallaxEffect;
        this.midLayer.position.x = (this.midLayer.initialPos.x + dist) * this.midLayer.parallaxEffect;
        this.foreLayer.position.x = (this.foreLayer.initialPos.x + dist) * this.foreLayer.parallaxEffect;
    }
}