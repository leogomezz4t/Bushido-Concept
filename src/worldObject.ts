class WorldObject extends GameObject {
    private imagePath: string;
    private image;
    // image properties
    private scale: number;
    // hitbox
    private defaultHitbox: Hitbox;
    private hitboxCallbacks: Array<(w: number, h: number) => Hitbox> = [];

    constructor(x: number, y: number, scale: number, imagePath: string, useDefaultHitbox) {
        super(x, y, null, null, false);
        this.imagePath = imagePath
        this.scale = scale;
        this.defaultHitbox = useDefaultHitbox;
        this.addTag("world_object");
    }

    public addHitbox(callback: (w: number, h: number) => Hitbox) {
        this.hitboxCallbacks.push(callback);
    }

    public preload() {
        this.image = loadImage(this.imagePath, () => {
            this.width = this.image.width * this.scale;
            this.height = this.image.height * this.scale;

            if (this.defaultHitbox) {
                // add hitboxes
                this.hitboxes.push(
                    new Hitbox(0, 0, this.width, this.height, CollisionType.Colliding, this)
                );
            }

            for (const c of this.hitboxCallbacks) {
                this.hitboxes.push(
                    c(this.width, this.height)
                );
            }
        });
    }

    public draw(cameraX: number, cameraY: number): void {
        image(this.image, cameraX, cameraY, this.width, this.height)
    }
}