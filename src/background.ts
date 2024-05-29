class Background extends GameObject{
    // image layers
    private imagePath: string;
    private image;

    private scale: number;

    constructor(x: number, y: number, scale: number, imagePath: string) {
        super(x, y, null, null, false);
        this.imagePath = imagePath;
        this.scale = scale;

    }

    public preload(): void {
        this.image = loadImage(this.imagePath);
    }    

    public draw(cameraX: number, cameraY: number): void {
        image(this.image, cameraX, cameraY, this.image.width * this.scale, this.image.height * this.scale);
    }
}