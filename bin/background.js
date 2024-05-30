class Background extends GameObject {
    // image layers
    imagePath;
    image;
    scale;
    // Parralax properties
    parallaxEffect;
    initialPos;
    // Parent
    parent;
    constructor(x, y, imagePath, parent) {
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
    preload() {
        this.image = loadImage(this.imagePath, () => {
            console.log(this.image);
        });
    }
    update() {
        const dist = this.parent.cameraReference.worldPosition.x * this.parallaxEffect;
        const movement = this.parent.cameraReference.worldPosition.x * (1 - this.parallaxEffect);
        this.position.x = this.initialPos.x + dist;
        if (movement > this.initialPos.x + (this.imageWidth * 2)) {
            this.initialPos.x += this.imageWidth;
        }
        else if (movement < this.initialPos.x - this.imageWidth) {
            this.initialPos.x -= this.imageWidth;
        }
    }
    draw(cameraX, cameraY) {
        image(this.image, cameraX, cameraY, this.imageWidth, this.imageHeight);
    }
}
