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

    constructor(x: number, y: number, imagePath: string, parent: ParallaxBackground) {
        super(x, y, null, null, false);
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
        this.image = loadImage(this.imagePath, () => {
            console.log(this.image)
        });
    }    

    public update(): void {
        const dist = this.parent.cameraReference.worldPosition.x * this.parallaxEffect;
        const movement = this.parent.cameraReference.worldPosition.x * (1 - this.parallaxEffect);
        this.position.x = this.initialPos.x + dist;

        if (movement > this.initialPos.x + (this.imageWidth*2)) {
            this.initialPos.x += this.imageWidth;
        } else if (movement < this.initialPos.x - this.imageWidth) {
            this.initialPos.x -= this.imageWidth;
        }
    }

    public draw(cameraX: number, cameraY: number): void {
        image(this.image, cameraX, cameraY, this.imageWidth, this.imageHeight);
    }
}