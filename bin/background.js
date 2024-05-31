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
    constructor(x, y, parallax, scale, imagePath, parent) {
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
    preload() {
        this.image = loadImage(this.imagePath);
    }
    update() {
        const dist = (this.parent.cameraReference.worldPosition.x - this.position.x) * this.parallaxEffect;
        this.position.x = this.initialPos.x + dist;
    }
    draw(cameraX, cameraY) {
        image(this.image, cameraX, cameraY, this.imageWidth, this.imageHeight);
    }
}
