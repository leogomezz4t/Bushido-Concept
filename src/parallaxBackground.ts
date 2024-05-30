class ParallaxBackground extends GameObject {
    private backLayer: Background;
    private midLayer: Background;
    private foreLayer: Background;

    private secondBackLayer: Background;
    private secondMidLayer: Background;
    private secondForeLayer: Background;

    // scale
    private scale: number;

    // pos
    private offset: Vector2;
    public initialPos: Vector2;

    // camera
    public cameraReference: Camera;

    constructor(x: number, y: number, scale: number, cameraRef: Camera, back: string, mid: string, front: string) {
        super(x, y, null, null, false);
        this.scale = scale;
        this.cameraReference = cameraRef;

        this.initialPos = new Vector2(x, y);

        this.offset = Vector2.subtract(this.position, cameraRef.worldPosition)

        this.backLayer = new Background(x, y, back, this);
        this.foreLayer = new Background(x, y, front, this);
        this.midLayer = new Background(x, y, mid, this);

        this.secondBackLayer = new Background(x + 1280, y, back, this);
        this.secondForeLayer = new Background(x + 1280, y, front, this);
        this.secondMidLayer = new Background(x + 1280, y, mid, this);


        this.backLayer.parallaxEffect = 0.1;
        this.midLayer.parallaxEffect = 0.2
        this.foreLayer.parallaxEffect = 0.3;

        this.secondBackLayer.parallaxEffect = 0.1;
        this.secondMidLayer.parallaxEffect = 0.2;
        this.foreLayer.parallaxEffect = 0.3;

        this.backLayer.scale = scale;
        this.midLayer.scale = scale;
        this.foreLayer.scale = scale;

        this.secondBackLayer.scale = scale;
        this.secondMidLayer.scale = scale;
        this.secondForeLayer.scale = scale;
    }

    public onGameEngineDefined(): void {
        this.scene.addGameObject(this.backLayer);
        this.scene.addGameObject(this.midLayer);
        this.scene.addGameObject(this.foreLayer);
        this.scene.addGameObject(this.secondBackLayer);
        this.scene.addGameObject(this.secondMidLayer);
        this.scene.addGameObject(this.secondForeLayer);

    }

    public update() {
        this.position = Vector2.add(this.cameraReference.worldPosition, this.offset);

    }
}