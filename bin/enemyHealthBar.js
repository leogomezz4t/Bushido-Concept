class EnemyHealthBar extends GameObject {
    offset;
    maxHealth;
    currentHealth;
    tracker;
    borderThickness = 3;
    constructor(tracker, offset, width, height, maxHealth) {
        super(tracker.position.x, tracker.position.y, width, height);
        this.offset = offset;
        this.tracker = tracker;
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
    }
    update() {
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
    draw(cameraX, cameraY) {
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
