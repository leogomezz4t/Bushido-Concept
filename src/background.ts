class Background extends GameObject{
    // image layers
    private imagePath: string;
    private image;

    public scale: number;
    // Parralax properties
    public parallaxEffect: number;
    public initialPos: Vector2;

    constructor(x: number, y: number, imagePath: string) {
        super(x, y, null, null, false);
        this.imagePath = imagePath;
        this.initialPos = new Vector2(x, y);
    }

    public preload(): void {
        this.image = loadImage(this.imagePath, () => {
            console.log(this.image)
        });
    }    

    public draw(cameraX: number, cameraY: number): void {
        image(this.image, cameraX, cameraY, this.image.width * this.scale, this.image.height * this.scale);
    }
}