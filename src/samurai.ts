class Samurai extends Entity {
    // enemy ai
    public alerted: boolean = false;
    // movement
    public walkSpeed: number = 0.17;
    // posture
    public broken: boolean = false;
    private brokenTimeLimit: number = 3000;
    private brokenTimeDelta: number;
    // Health bar
    public healthBar: EnemyHealthBar;
    public healthOffset: Vector2 = new Vector2(-20, -10);
    public healthShowingDelta: number = 0;
    public healthShowingLimit: number = 5000;
    // weapon
    public usingSword: Weapon;
    // attacking
    public isAttacking: boolean = false;

    constructor(x: number, y: number, width: number, height: number, maxHitpoints: number, sprite: string) {
        super(x, y, width, height, maxHitpoints, sprite);
    }

    public onGameEngineDefined(): void {
        super.onGameEngineDefined();
        // health bar
        this.healthBar = new EnemyHealthBar(this, this.healthOffset, 50, 10, this.maxHitpoints);
        this.healthBar.isActive = false;
        this.scene.addGameObject(this.healthBar)
    }

    public update(): void {
        super.update();

        // posture
        if (this.broken) {
            this.brokenTimeDelta += deltaTime;
            // Check if past limit
            if (this.brokenTimeDelta >= this.brokenTimeLimit) {
                this.broken = false;
            }
        }
        // Orientation logic
        if (this.deltaX > 0) {
            this.orientation = Orientation.Right;
        }
        if (this.deltaX < 0) {
            this.orientation = Orientation.Left;
        }

        // health bar timer
        if (this.healthBar.isActive) {
            // Check if limit is passed
            if (this.healthShowingDelta >= this.healthShowingLimit) {
                this.healthBar.isActive = false;
            }
            // increment timer
            this.healthShowingDelta += deltaTime;

        }
        // animation
        this.currentAnimation.update(this.orientation);
        //
        this.move(0, 0);
        this.applyGravity();
    }

    // p5.js functions
    public draw(cameraX: number, cameraY: number): void {
        this.currentAnimation.drawAnimation(cameraX, cameraY, this.width, this.height);
    }

    protected hurt(): void {
        super.hurt();
        // show healthbar
        this.healthBar.isActive = true;
        this.healthShowingDelta = 0;
    }

    public die(): void {
        super.die();
        // health bar cleanup
        this.healthBar.delete();
    }

    // Posture methods
    public breakPosture(): void {
        if (this.broken) {
            return;
        }
        this.broken = true;

        this.brokenTimeDelta = 0;
    }
    // end posture methods
}