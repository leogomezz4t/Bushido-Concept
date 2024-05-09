class Player extends GameObject {
    constructor (x, y, width, height, maxHitpoints, playerType, hitbox) {
        super(x, y, width, height);
        // Health variables
        this.maxHitpoints = maxHitpoints;
        this.hitpoints = maxHitpoints;

        // Hitbox variables
        this.hitbox = new Hitbox(85, 50, 20, 80, this);
        
        // movement variables
        this.speed = 1;

        // player type logic and variables
        this.playerType = playerType;
        if (playerType != "bushido") {
            console.error("Skin hat oil player type not implemented!");
        }

        // Animation variables
        this.currentAnim = new SpriteAnimation(`${this.playerType}\\run_anim_without_sword`, 75, game);
        // Orientation variables
        this._orientation = LEFT_ORIENTATION;
    }
    get orientation() {
        return this._orientation;
    }

    set orientation(x) {
        this._orientation = x;
        this.currentAnim.orientation = x;
    }

    touchingGameObject() {
        for (const go of this.scene.gameObjects) {
            if (go === this) {
                continue;
            }
            if (this.hitbox.colliding(go.hitbox)) {
                return true;
            }
        }

        return false;
    }
    update() { // p5.js func
        // Colliding
         
        // flipping orientation logic
        if (keyIsDown(KBM_CONTROLS.LEFT)) {
            this.orientation = LEFT_ORIENTATION;
        } 
        if (keyIsDown(KBM_CONTROLS.RIGHT)) {
            this.orientation = RIGHT_ORIENTATION;
        }   
        // Animation logic
        this.currentAnim.update();
        // movement logic
        this.movement();
        
    }

    flip() {
        this.orientation *= -1;
    }
    movement() {
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
        if (keyIsDown(KBM_CONTROLS.DOWN)) {
            deltaY += 1;
        }

        // Move  
        this.x += deltaX * deltaTime * this.speed;
        this.y += deltaY * deltaTime;
        if (this.touchingGameObject()) {
            this.x -= deltaX * deltaTime * this.speed;
            this.y -= deltaY * deltaTime;
        }
    }
    draw() {
        this.currentAnim.drawAnimation(this.x, this.y, this.width, this.height);
    }
}