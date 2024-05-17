class Player extends GameObject {
    constructor (x, y, maxHitpoints) {
        // Call parent constructor
        super(x, y, PLAYER_WIDTH, PLAYER_HEIGHT, false);
        // Health variables
        this.maxHitpoints = maxHitpoints;
        this.hitpoints = maxHitpoints;

        // Hitbox variables
        this.hitboxes.push(
            new Hitbox(-13, 50, 30, 80, OVERLAPPING_TYPE, this)
        );
        this.hitboxes.push(
            new Hitbox(-20, 50, 40, 85, COLLIDING_TYPE, this)
        );
        
        // movement variables
        this.speed = 0.5;
        this.allowNoClipping = false;

        // attacking variables
        this.isAttacking = false;

        // Jumping variables
        this.jumpForce = 15;
        this.isJumping = false;

        // Animation variables
        this.currentAnimName = "IDLE"; 
        // Orientation variables
        this.orientation = RIGHT_ORIENTATION;
    }
    // Animation getters
    get currentAnimation() {
        return this.game.animations["samurai_1"][this.currentAnimName];
    }
    // Animation ends



    overlappingGameObject() {
 
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
        // Attacking logic
        if (keyIsDown(KBM_CONTROLS.SIDE_ATTACK)) {
            this.attack();
        }
        // Animation logic
        this.currentAnimation.update(this.orientation);
        this.determineAnimation();
        
        // Fix no clipping
        this.fixClipping();
        // movement logic
        this.movement();  
        // jumping logic
        if (this.touchingFloor()) {
            this.isJumping = false;
        }
    }

    determineAnimation() {
        if (this.isAttacking) {
            // Dont use any other animations
        } else if (this.isJumping) {
            // dont use any other animations
        } else if (this.deltaX !== 0) { // am moving left or right
            this.currentAnimName = "RUN";
        } else {
            this.currentAnimName = "IDLE";
        }
    }
    

    fixClipping() {
        // Check if inside object
        if (this.overlappingGameObject()) {
            this.allowNoClipping = true;
        }
    }

    jump() {
        this.deltaY = -this.jumpForce;
        this.isJumping = true;
        this.currentAnimName = "JUMP"
    }   

    attack() {
        console.log(this.isAttacking)
        if (this.isAttacking) { // Don't attack twice
            return;
        }

        this.isAttacking = true;
        this.currentAnimName = "ATTACK_1";
        this.currentAnimation.onLastFrame = () => {
            this.isAttacking = false;
        }
    }   

    movement() {
        //console.log(`Touching floor: ${this.touchingFloor()}`)

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
        if (keyDeltaY == -1 && this.touchingFloor()) {
            this.jump();
        }

        // Move
        this.move(horizontalChange, 0);
    }

    draw() {
        this.currentAnimation.drawAnimation(this.x, this.y, this.width, this.height);
    }
}