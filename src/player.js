class Player extends GameObject {
    constructor (x, y, width, height, maxHitpoints, playerType, game) {
        super(x, y, width, height);
        // Health variables
        this.maxHitpoints = maxHitpoints;
        this.hitpoints = maxHitpoints;
        
        // movement variables
        this.speed = 1;

        // player type logic and variables
        this.playerType = playerType;
        if (playerType != "bushido") {
            console.error("Skin hat oil player type not implemented!");
        }

        // Animation variables
        this.currentAnim = new SpriteAnimation(`${this.playerType}\\run_anim_without_sword`, 75, game);
    }

    update() { // p5.js func
        // Animation logic
        this.currentAnim.update();
        // initialize move deltas
        let deltaX = 0;
        let deltaY = 0;

        // Listen for player input
        if (keyIsDown(KBM_CONTROLS.LEFT)) {
            deltaX -= 1;
        }
        if (keyIsDown(KBM_CONTROLS.RIGHT)) {
            deltaX += 1;
        }
        if (keyIsDown(KBM_CONTROLS.UP)) {
            deltaY -= 1;
        }

        // Move
        this.x += deltaX * deltaTime * this.speed;
        this.y += deltaY * deltaTime;
    }

    draw() {
        this.currentAnim.drawAnimation(this.x, this.y, this.width, this.height);
    }
}