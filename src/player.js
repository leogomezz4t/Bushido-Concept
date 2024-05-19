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
        this.isDefending = false;

        // Jumping variables
        this.jumpForce = 10;
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
        this.currentAnimation.update(this.orientation);
        this.determineAnimation();
        // Attacking logic
        this.attackingLogic();
        // Fix no clipping
        this.fixClipping();
        // movement logic
        this.movement();  
    }

    determineAnimation() {
        if (this.isDefending) {
            // Place holder
        } else if (this.isAttacking) {
            // Dont use any other animations
        } else if (this.isJumping) {
            // place holder
        } else if (this.deltaX !== 0) { // am moving left or right
            this.currentAnimName = "RUN";
        } else {
            this.currentAnimName = "IDLE";
        }
    }
    

    fixClipping() {
        // Check if inside object
        if (false) {
            this.allowNoClipping = true;
        }
    }

    jump() {
        this.deltaY = -this.jumpForce;
        this.isJumping = true;
        this.currentAnimName = "JUMP";
    }   
    // start attacking methods
    attack(attackType) {
        if (this.isAttacking) { // Don't attack twice
            return;
        }

        this.isAttacking = true;
        this.currentAnimName = attackType;
        this.currentAnimation.onLastFrame = () => {
            this.isAttacking = false;
        }
    }

    defend() {
        if (this.isDefending) { // Don't do it twice
            return;
        }

        this.isDefending = true;
        this.currentAnimName = "DEFEND";
        this.currentAnimation.onLastFrame = () => {
            this.isDefending = false;
        }
    }  

    attackingLogic() {
        // dont initiate anything if already in the middle
        if (this.isAttacking || this.isDefending) {
            return;
        }

        if (keyIsDown(KBM_CONTROLS.A_ATTACK)) {
            this.attack("ATTACK_1");
        } else if (keyIsDown(KBM_CONTROLS.S_ATTACK)) {
            this.attack("ATTACK_2");
        } else if (keyIsDown(KBM_CONTROLS.D_ATTACK)) {
            this.attack("ATTACK_3");
        } else if (keyIsDown(KBM_CONTROLS.DEFEND)) {
            this.defend();
        }
    }
    // End attacking methods
    // Start movment logic
    movementListening() {
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

        return [keyDeltaX, keyDeltaY];
    }

    movement() {
        //console.log(`Touching floor: ${this.touchingFloor()}`)
        const [keyDeltaX, keyDeltaY] = this.movementListening();
        let horizontalChange = keyDeltaX * deltaTime * this.speed;

        // Move
        if (!this.isAttacking && !this.isDefending) { // dont be able to move while attacking
            this.move(horizontalChange, 0);
        }
    }
    // end movement logic
    draw() {
        this.currentAnimation.drawAnimation(this.x, this.y, this.width, this.height);
    }
}