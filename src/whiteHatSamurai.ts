class WhiteHatSamurai extends Samurai {
    // Animations
    private animations: {};
    private currentAnimName: string = "IDLE";

    constructor(x: number, y: number) {
        super(x, y, 250, 250, 10);

        this.hitboxes.push(
            new Hitbox(-25, 15, 30, 100, CollisionType.Colliding, this, true)
        )
    }

    // Getters and setters
    private get currentAnimation(): SpriteAnimation {
        return this.animations[this.currentAnimName];
    }

    // Methods
    public onGameEngineDefined(): void {
        this.game.requestSprite("samurai_3", (s: {}) => {
            this.animations = s;
        })
    }

    // p5.js functions
    public draw(cameraX: any, cameraY: any): void {
        console.log(this.currentAnimation)
        this.currentAnimation.drawAnimation(cameraX, cameraY, this.width, this.height);
    }

    public update(): void {
        this.currentAnimation.update(this.orientation);

        this.move(0, 0);
    }
}