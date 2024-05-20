class Player extends GameObject {
    public maxHitpoints: number;
    public hitpoints: number;
    // movement
    public speed: number = 0.5;
    public allowNoClipping: boolean = false;
    // attacking
    public isAttacking: boolean = false;
    public isDefending: boolean = false;
    // jumping
    public jumpForce: number = 10;
    public isJumping: boolean = false;
    // animation
    public currentAnimName: string = "IDLE";
    
    constructor (x, y, maxHitpoints) {
        // Call parent constructor
        super(x, y, PLAYER_WIDTH, PLAYER_HEIGHT, false);
        // Health variables
        this.maxHitpoints = maxHitpoints;
        this.hitpoints = maxHitpoints;

        // Hitbox variables
        this.hitboxes.push(
            new Hitbox(-13, 50, 30, 80, CollisionType.Overlapping, this)
        );
        this.hitboxes.push(
            new Hitbox(-20, 50, 40, 85, CollisionType.Colliding, this)
        );
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
        fill
        // flipping orientation logic
        if (keyIsDown(KBM_CONTROLS.LEFT)) {
            this.orientation = Orientation.Left;
        } 
        if (keyIsDown(KBM_CONTROLS.RIGHT)) {
            this.orientation = Orientation.Right;
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
        // Camera logic
        const [cameraX, cameraY] = this.scene.currentCamera.toCameraCoordinates(this.x, this.y);
        console.log(`cameraX: ${cameraX} cameraY: ${cameraY}\nfactor: ${this.scene.currentCamera.scale}`)
        if (cameraX < 200) {
            this.scene.currentCamera.worldX -= Math.abs(this.deltaX);
        }
        if (cameraX > 400) {
            this.scene.currentCamera.worldX += Math.abs(this.deltaX);
        }
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
    draw(cameraX, cameraY) {
        this.currentAnimation.drawAnimation(cameraX, cameraY, this.width, this.height);
    }
}