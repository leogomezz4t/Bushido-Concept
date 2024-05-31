class WorldObject extends GameObject {
    private imagePath: string;
    private image;
    // image properties
    private scale: number;


    constructor(x: number, y: number, scale: number, imagePath: string) {
        super(x, y, null, null, true);
        this.imagePath = imagePath
        this.scale = scale;
        this.addTag("world_object");
    }

    public preload() {
        this.image = loadImage(this.imagePath, () => {
            this.width = this.image.width * this.scale;
            this.height = this.image.height * this.scale;

            // add hitboxes
            this.hitboxes.push(
                new Hitbox(0, 0, this.width, this.height, CollisionType.Colliding, this)
            );
        });
    }

    public draw(cameraX: number, cameraY: number): void {
        image(this.image, cameraX, cameraY, this.width, this.height)
    }
}