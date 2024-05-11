class Player extends GameObject {
    constructor (x, y, width, height, maxHitpoints, playerType, hitbox) {
        super(x, y, width, height);
        // Health variables
        this.maxHitpoints = maxHitpoints;
        this.hitpoints = maxHitpoints;

        // Hitbox variables
        this.hitbox = new Hitbox(-15, -50, 20, 80, this);
        
        // movement variables
        this.deltaX = 0;
        this.deltaY = 0;
        this.speed = 0.5;
        this.allowNoClipping = false;

        // Jumping variables
        this.jumpForce = 15;

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

    touchingFloor() {
        if (this.deltaY === 0) {
            return this.boxCast(0, GRAVITY_DELTA);
        } else {
            return this.boxCast(0, this.deltaY);
        }
    }

    overlappingGameObject() {
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
        // Default clipping
        this.allowNoClipping = false;
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
        // Fix no clipping
        this.fixClipping();
        // movement logic
        this.movement();
        
    }

    flip() {
        this.orientation *= -1;
    }

    fixClipping() {
        // Check if inside object
        if (this.overlappingGameObject()) {
            this.allowNoClipping = true;
        }
    }

    jump() {
        this.deltaY = -this.jumpForce;
    }   

    movement() {
        console.log(`Touching floor: ${this.touchingFloor()}`)
        // Reset delta
        this.deltaX = 0;
        if (this.touchingFloor()) {
            this.deltaY = 0;
        }

        // initialize move deltas
        let keyDeltaX = 0;
        let keyDeltaY = 0;

        // Listen for player input
        if (keyIsDown(KBM_CONTROLS.LEFT)) {
            keyDeltaX -= 1;
        }
        if (keyIsDown(KBM_CONTROLS.RIGHT)) {
            keyDeltaX += 1;
        }
        if (keyIsDown(KBM_CONTROLS.UP)) { // Jump
            keyDeltaY -= 1; 
        }
        if (keyIsDown(KBM_CONTROLS.DOWN)) {
            keyDeltaY += 1;
        }

        let horizontalChange = keyDeltaX * deltaTime * this.speed;
        
        // gravity
        if (!this.touchingFloor()) {
            this.deltaY += GRAVITY_DELTA;
        } else { // Jump
            if (keyDeltaY == -1) {
                this.jump();
            }
        }
        // Move  
        if (!this.overlappingGameObject()) {
            this.deltaX += horizontalChange;
        }

        // Apply
        if (!this.boxCast(this.deltaX, 0)) {
            this.x += this.deltaX;
        }
        if (!this.boxCast(0, this.deltaY)) {
            this.y += this.deltaY;
        }
    }
    draw() {
        this.currentAnim.drawAnimation(this.x, this.y, this.width, this.height);
    }
}