class Background extends GameObject {
    // image layers
    imagePath;
    image;
    scale;
    constructor(x, y, scale, imagePath) {
        super(x, y, null, null, false);
        this.imagePath = imagePath;
        this.scale = scale;
    }
    preload() {
        this.image = loadImage(this.imagePath);
    }
    draw(cameraX, cameraY) {
        image(this.image, cameraX, cameraY, this.image.width * this.scale, this.image.height * this.scale);
    }
}
