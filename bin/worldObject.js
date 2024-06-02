class WorldObject extends GameObject {
    imagePath;
    image;
    // image properties
    scale;
    // hitbox
    defaultHitbox;
    hitboxCallbacks = [];
    constructor(x, y, scale, imagePath, useDefaultHitbox) {
        super(x, y, null, null, false);
        this.imagePath = imagePath;
        this.scale = scale;
        this.defaultHitbox = useDefaultHitbox;
        this.addTag("world_object");
    }
    addHitbox(callback) {
        this.hitboxCallbacks.push(callback);
    }
    preload() {
        this.image = loadImage(this.imagePath, () => {
            this.width = this.image.width * this.scale;
            this.height = this.image.height * this.scale;
            if (this.defaultHitbox) {
                // add hitboxes
                this.hitboxes.push(new Hitbox(0, 0, this.width, this.height, CollisionType.Colliding, this));
            }
            for (const c of this.hitboxCallbacks) {
                this.hitboxes.push(c(this.width, this.height));
            }
        });
    }
    draw(cameraX, cameraY) {
        image(this.image, cameraX, cameraY, this.width, this.height);
    }
}
