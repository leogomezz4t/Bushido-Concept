class Player extends Entity {
    // movement
    public debug: boolean = false;
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
    // Weapons
    public sideSword: Weapon;
    public upSword: Weapon;
    public downSword: Weapon;
    public usingSword: Weapon;
    // parry
    public deflectingSword: ParrySword;
    public recentlyParried: boolean = false;
    public swordParried: Weapon;
    // Death
    public deathDelay: number = 5000;
    
    constructor (x: number, y: number, maxHitpoints: number) {
        // Call parent constructor
        super(x, y, PLAYER_WIDTH, PLAYER_HEIGHT, maxHitpoints, "samurai_1");


        // Hitbox variables
        this.hitboxes.push(
            new Hitbox(-13, 50, 30, 80, CollisionType.Overlapping, this)
        );
        this.hitboxes.push(
            new Hitbox(-20, 50, 40, 85, CollisionType.Colliding, this)
        );

    }

    public onGameEngineDefined() {
        super.onGameEngineDefined();
        // Weapon properties
        this.sideSword = new Weapon(this, 2, new Vector2(100, 0));
        this.scene.addGameObject(this.sideSword);

        this.upSword = new Weapon(this, 2, new Vector2(40, -5));
        this.scene.addGameObject(this.upSword);

        this.downSword = new Weapon(this, 2, new Vector2(80, 0));
        this.scene.addGameObject(this.downSword);

        this.sideSword.hitboxConfigs = [
            [],
            [
                new Hitbox(60, 90, 70, 10, CollisionType.Overlapping, this.sideSword),
                new Hitbox(20, 100, 70, 10, CollisionType.Overlapping, this.sideSword)
            ],
            [
                new Hitbox(-25, 45, 80, 25, CollisionType.Overlapping, this.sideSword),
                new Hitbox(50, 55, 50, 20, CollisionType.Overlapping, this.sideSword),
                new Hitbox(100, 65, 20, 20, CollisionType.Overlapping, this.sideSword),
                new Hitbox(120, 80, 20, 20, CollisionType.Overlapping, this.sideSword),
                new Hitbox(140, 100, 10, 25, CollisionType.Overlapping, this.sideSword)
            ],
            [
                new Hitbox(-30, 50, 80, 25, CollisionType.Overlapping, this.sideSword)

            ],
            [
                new Hitbox(-35, 20, 25, 50, CollisionType.Overlapping, this.sideSword)
            ],
        ]

        this.upSword.hitboxConfigs = [
            [
                new Hitbox(-50, 110, 85, 35, CollisionType.Overlapping, this.upSword)
            ],
            [

                new Hitbox(20, 15, 60, 50, CollisionType.Overlapping, this.upSword),
                new Hitbox(80, 35, 40, 50, CollisionType.Overlapping, this.upSword),
                new Hitbox(110, 60, 35, 70, CollisionType.Overlapping, this.upSword)
            ],
            [
                new Hitbox(-40, 30, 60, 40, CollisionType.Overlapping, this.upSword),
                new Hitbox(20, 50, 40, 20, CollisionType.Overlapping, this.upSword),
                new Hitbox(60, 65, 30, 20, CollisionType.Overlapping, this.upSword)
            ],
            [
                new Hitbox(-40, 30, 30, 50, CollisionType.Overlapping, this.upSword)
            ],
            []
        ]

        this.downSword.hitboxConfigs = [
            [
                new Hitbox(-60, 60, 30, 15, CollisionType.Overlapping, this.downSword),
                new Hitbox(-30, 45, 40, 20, CollisionType.Overlapping, this.downSword),
                new Hitbox(10, 25, 100, 40, CollisionType.Overlapping, this.downSword)
            ],
            [
                new Hitbox(20, 60, 60, 70, CollisionType.Overlapping, this.downSword),
                new Hitbox(-40, 50, 60, 70, CollisionType.Overlapping, this.downSword)
            ],
            [
                new Hitbox(-40, 50, 50, 70, CollisionType.Overlapping, this.downSword)
            ],
            [],
            []
        ]

        // Deflecting properties
        this.deflectingSword = new ParrySword(this, new Vector2(20, 0));
        this.deflectingSword.isActive = false;
        this.scene.addGameObject(this.deflectingSword);

        this.deflectingSword.hitboxConfigs = [
            [
                new Hitbox(15, 50, 20, 50, CollisionType.Overlapping, this)
            ],
            [

                new Hitbox(15, 50, 20, 50, CollisionType.Overlapping, this)
            ],
            [
                new Hitbox(15, 50, 20, 50, CollisionType.Overlapping, this)
            ],
            [
                new Hitbox(15, 50, 20, 50, CollisionType.Overlapping, this)
            ],
            [
                new Hitbox(15, 50, 20, 50, CollisionType.Overlapping, this)
            ],
            [
                new Hitbox(15, 50, 20, 50, CollisionType.Overlapping, this)
            ]
        ]
    }
    
    public update() { // p5.js func
        super.update();
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
        if (!this.isDying) {
            this.attackingLogic();
        }
        // Fix no clipping
        this.fixClipping();
        // movement logic
        if (!this.isDying) {
            this.movement();  
        }
        if (!this.debug) {
            this.applyGravity();
        }
    }

    determineAnimation() {
        if (this.isDying) {
            this.changeAnimation("DEATH", true);
        } else if (this.isHurting) {

        } else if (this.isDashAnimating) {
            // place holder
        } else if (this.isDefending) {
            // Place holder
        } else if (this.isAttacking) {
            // Dont use any other animations
        } else if (this.isJumping) {
            // place holder
        } else if (this.deltaX !== 0) { // am moving left or right
            this.changeAnimation("RUN", true);
        } else {
            this.changeAnimation("IDLE", true);
        }
    }
    

    fixClipping() {
        // Check if inside object
        if (false) {
            this.allowNoClipping = true;
        }
    }

    // start attacking methods
    attack(attackType: "ATTACK_1" | "ATTACK_2" | "ATTACK_3") {
        if (this.isAttacking) { // Don't attack twice
            return;
        }

        // Choose which sword
        switch (attackType) {
            case "ATTACK_1": {
                this.usingSword = this.sideSword;
                break;
            }
            case "ATTACK_2": {
                this.usingSword = this.downSword;
                break;
            }
            case "ATTACK_3": {
                this.usingSword = this.upSword;
            }
        }

        // attacking variables
        this.isAttacking = true;
        
        // weapon variables
        this.usingSword.isActive = true;

        // animation
        this.changeAnimation(attackType, true);
        
        this.currentAnimation.onLastFrame = () => {
            this.isAttacking = false;
            this.usingSword.isActive = false;
        }

        this.currentAnimation.onNewFrame = id => {
            this.usingSword.setHitboxConfig(id)
        }
    }

    defend() {
        if (this.isDefending) { // Don't do it twice
            return;
        }

        this.isDefending = true;
        
        // animation
        this.changeAnimation("DEFEND", true);
        this.deflectingSword.isActive = true;

        // on parry
        this.deflectingSword.onSuccesfulParry = weapon => {
            if (weapon.parent instanceof Samurai) {
                weapon.parent.breakPosture();
                // record weapon
                this.swordParried = weapon;
                this.recentlyParried = true;
                // Use set timeout because it isn't that important that it be in the loop
                setTimeout(() => {
                    this.recentlyParried = false;
                }, 500);
            }
        }

        this.currentAnimation.onNewFrame = id => {
            this.deflectingSword.setHitboxConfig(id);
        }
        this.currentAnimation.onLastFrame = () => {
            this.isDefending = false;
            this.deflectingSword.isActive = false;
        }
    }  

    attackingLogic() {
        // dont initiate anything if already in the middle
        if ((this.isAttacking || this.isDefending) || this.isDashAnimating) {
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
        if (keyIsDown(38)) {
            keyDeltaY -= 1;
        }
        if (keyIsDown(40)) {
            keyDeltaY += 1;
        }
        if (keyIsDown(KBM_CONTROLS.DASH)) { // dashing logic
            this.dash();
        }

        return [keyDeltaX, keyDeltaY];
    }

    movement() {
        if (this.isDying) {
            return;
        }
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
        if ((this.isAttacking || this.isDefending) || (this.isDashAnimating)) { // dont be able to move while attacking
            return;
        }
       
        if (this.debug) {
            console.log(keyDeltaY * deltaTime * this.speed)
            this.move(horizontalChange, 0);
            this.position.y += keyDeltaY * deltaTime * this.speed;
        } else {
            this.move(horizontalChange, 0);
        }

    }

    jump() {
        this.deltaY = -this.jumpForce;
        this.isJumping = true;
        this.currentAnimName = "JUMP";
    }   

    dash() {
        // Check if already dashing
        if (!this.canDash || (this.isDefending || this.isAttacking)) {
            return;
        }
        // Define the original orientation
        this.dashOrientation = this.orientation;
        // Finsihing logic
        this.changeAnimation("DASH", true);
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

    public die(): void {
        super.die();
        // Go to death screen after a while
        setTimeout(() => {
            this.game.switchScene("death")
        }, this.deathDelay)
    }
    
    public takeDamage(dmg: number, weapon?: Weapon): void {
        if (this.recentlyParried && this.swordParried === weapon) {
            console.log("SAVED");
            return;
        }

        super.takeDamage(dmg, weapon);
    }

    public takeKnockback(knockDelta: Vector2, weapon?: Weapon): void {
        if (this.recentlyParried && this.swordParried === weapon) {
            return;
        }

        super.takeKnockback(knockDelta, weapon);
    }

    // end movement logic
    draw(cameraX: number, cameraY: number) {
        this.currentAnimation.drawAnimation(cameraX, cameraY, this.width, this.height);
    }
}