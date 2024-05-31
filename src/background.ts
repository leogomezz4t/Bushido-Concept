class Background extends GameObject{
    // image layers
    private imagePath: string;
    private image;

    public scale: number;
    // Parralax properties
    public parallaxEffect: number;
    public initialPos: Vector2;

    // Parent
    public parent: ParallaxBackground;

    constructor(x: number, y: number, parallax: number, scale: number, imagePath: string, parent: ParallaxBackground) {
        super(x, y, null, null, false);
        this.parallaxEffect = parallax;
        this.scale = scale;
        this.imagePath = imagePath;
        this.initialPos = new Vector2(x, y);
        this.parent = parent;
    }

    get imageWidth() {
        return this.image.width * this.scale;
    }

    get imageHeight() {
        return this.image.height * this.scale;
    }

    public preload(): void {
        this.image = loadImage(this.imagePath);
    }    

    public update(): void {
        const dist = (this.parent.cameraReference.worldPosition.x - this.position.x) * this.parallaxEffect;
        this.position.x = this.initialPos.x + dist;
    }

    public draw(cameraX: number, cameraY: number): void {
        image(this.image, cameraX, cameraY, this.imageWidth, this.imageHeight);
    }
}