class Background extends GameObject {
    // image layers
    imagePath;
    image;
    scale;
    // Parralax properties
    parallaxEffect;
    initialPos;
    constructor(x, y, imagePath) {
        super(x, y, null, null, false);
        this.imagePath = imagePath;
        this.initialPos = new Vector2(x, y);
    }
    preload() {
        this.image = loadImage(this.imagePath, () => {
            console.log(this.image);
        });
    }
    draw(cameraX, cameraY) {
        image(this.image, cameraX, cameraY, this.image.width * this.scale, this.image.height * this.scale);
    }
}
