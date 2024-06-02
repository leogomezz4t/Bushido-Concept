class EnemyHealthBar extends GameObject {
    private offset: Vector2;
    private maxHealth: number;
    private currentHealth: number;
    private tracker: Entity;
    private borderThickness: number = 3;

    constructor(tracker: Entity, offset: Vector2, width: number, height: number, maxHealth: number) {
        super(tracker.position.x, tracker.position.y, width, height);
        this.offset = offset;
        this.tracker = tracker;
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
    }

    public update(): void {
        if (typeof this.tracker !== 'undefined') {
            this.currentHealth = this.tracker.hitpoints;
            this.maxHealth = this.tracker.maxHitpoints;
            this.position = Vector2.add(this.tracker.position, this.offset);
        }

        // Dont go into the negative health
        if (this.currentHealth < 0) {
            this.currentHealth = 0;
        }
    }

    public draw(cameraX: number, cameraY: number): void {
        // fill
        noStroke();
        fill("red");
        const length = this.width * (this.currentHealth / this.maxHealth);
        rect(cameraX, cameraY, length, this.height);
        // border
        noFill();
        strokeWeight(this.borderThickness);
        stroke("black");
        rect(cameraX, cameraY, this.width, this.height);

    }
}