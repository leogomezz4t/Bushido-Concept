class HealthBar extends HUDObject {
    maxHealth;
    currentHealth;
    borderThickness = 3;
    tracker;
    cherryImg;
    scale = 0.1;
    constructor(x, y, width, height, maxHealth) {
        super(x, y, width, height);
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
    }
    preload() {
        this.cherryImg = loadImage("../artwork/misc/cherry.png");
    }
    update() {
        if (typeof this.tracker !== 'undefined') {
            this.currentHealth = this.tracker.hitpoints;
            this.maxHealth = this.tracker.maxHitpoints;
        }
        // Dont go into the negative health
        if (this.currentHealth < 0) {
            this.currentHealth = 0;
        }
    }
    draw() {
        // fill
        noStroke();
        fill("red");
        const length = this.width * (this.currentHealth / this.maxHealth);
        rect(this.position.x, this.position.y, length, this.height);
        // border
        noFill();
        strokeWeight(this.borderThickness);
        stroke("black");
        rect(this.position.x, this.position.y, this.width, this.height);
        // cherry blossom
        const imgWidth = this.cherryImg.width * this.scale;
        const imgHeight = this.cherryImg.height * this.scale;
        const imgX = this.position.x + (this.width - 70);
        const imgY = this.position.y - 20;
        image(this.cherryImg, imgX, imgY, imgWidth, imgHeight);
    }
}
