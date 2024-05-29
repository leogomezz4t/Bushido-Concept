class Floor extends GameObject {
    imagePath;
    image;
    // image properties
    scale;
    constructor(x, y, scale, imagePath) {
        super(x, y, null, null, true);
        this.imagePath = imagePath;
        this.scale = scale;
    }
    preload() {
        this.image = loadImage(this.imagePath, () => {
            this.width = this.image.width * this.scale;
            this.height = this.image.height * this.scale;
            // add hitboxes
            this.hitboxes.push(new Hitbox(0, 0, this.width, this.height, CollisionType.Colliding, this));
        });
    }
    draw(cameraX, cameraY) {
        image(this.image, cameraX, cameraY, this.width, this.height);
    }
}
