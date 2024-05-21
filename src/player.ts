class Player extends Entity {
    // movement
    public speed: number = 0.5;
    public allowNoClipping: boolean = false;
    // dashing
    public isDashing: boolean = false;
    public isDashAnimating: boolean = false;
    public dashSpeed: number = 1;
    private canDash: boolean = true;
    private dashOrientation: Orientation;
    // attacking
    public isAttacking: boolean = false;
    public isDefending: boolean = false;
    // jumping
    public jumpForce: number = 10;
    public isJumping: boolean = false;
    // animation
    public currentAnimName: string = "IDLE";
    public animations: {};
    
    constructor (x, y, maxHitpoints) {
        // Call parent constructor
        super(x, y, PLAYER_WIDTH, PLAYER_HEIGHT, maxHitpoints, false);

        // Hitbox variables
        this.hitboxes.push(
            new Hitbox(-13, 50, 30, 80, CollisionType.Overlapping, this)
        );
        this.hitboxes.push(
            new Hitbox(-20, 50, 40, 85, CollisionType.Colliding, this)
        );
    }
    // Animation getters
    get currentAnimation(): SpriteAnimation {
        return this.animations[this.currentAnimName];
    }
    // Animation ends


    public onGameEngineDefined() {
        // request animations
        this.game.requestSprite("samurai_1", (s: {}) => {
            this.animations = s;
        })
    }
    
    public update() { // p5.js func
        // Default clipping
        this.allowNoClipping = false;
        // Colliding

        // flipping orientation logic
        if (keyIsDown(KBM_CONTROLS.LEFT)) {
            this.orientation = Orientation.Left;
        } 
        if (keyIsDown(KBM_CONTROLS.RIGHT)) {
            this.orientation = Orientation.Right;
        }   
        // Animation logic
        const animationOrientation: Orientation = (this.isDashAnimating) ? this.dashOrientation : this.orientation;
        this.currentAnimation.update(animationOrientation);
        this.determineAnimation();
        // Attacking logic
        this.attackingLogic();
        // Fix no clipping
        this.fixClipping();
        // movement logic
        this.movement();  
    }

    determineAnimation() {
        if (this.isDashAnimating) {
            // place holder
        } else if (this.isDefending) {
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

        if (keyIsDown(KBM_CONTROLS.SIDE_ATTACK)) {
            this.attack("ATTACK_1");
        } else if (keyIsDown(KBM_CONTROLS.DOWN_ATTACK)) {
            this.attack("ATTACK_2");
        } else if (keyIsDown(KBM_CONTROLS.UP_ATTACK)) {
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
        if (keyIsDown(KBM_CONTROLS.DASH)) { // dashing logic
            this.dash();
        }

        return [keyDeltaX, keyDeltaY];
    }

    movement() {
        //console.log(`Touching floor: ${this.touchingFloor()}`)
        const [keyDeltaX, keyDeltaY] = this.movementListening();
        let horizontalChange = keyDeltaX * deltaTime * this.speed;

        // Dashing
        if (this.isDashing) {
            // calculate speed
            const dashAmount: number = this.dashSpeed * deltaTime * this.dashOrientation;
            // apply dash
            this.move(dashAmount, 0);
            return;
        }

        // Move
        if ((this.isAttacking || this.isDefending) || (this.isDashing)) { // dont be able to move while attacking
            return;
        }
       
        this.move(horizontalChange, 0);

    }

    jump() {
        this.deltaY = -this.jumpForce;
        this.isJumping = true;
        this.currentAnimName = "JUMP";
    }   

    dash() {
        // Check if already dashing
        if (!this.canDash) {
            return;
        }
        // Define the original orientation
        this.dashOrientation = this.orientation;
        // Finsihing logic
        this.currentAnimName = "DASH";
        this.isDashAnimating = true;
        this.canDash = false;
        this.currentAnimation.onLastFrame = () => {
            this.isDashAnimating = false;
            this.canDash = true;
        }
        this.currentAnimation.onNewFrame = frameIndex => {
            if (frameIndex === 1) {
                this.isDashing = true;
            }
            if (frameIndex === 4) {
                this.isDashing = false;
            }
        }
    }
    
    // end movement logic
    draw(cameraX, cameraY) {
        this.currentAnimation.drawAnimation(cameraX, cameraY, this.width, this.height);
    }
}