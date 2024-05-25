class Entity extends GameObject {
    public maxHitpoints: number;
    public hitpoints: number;
    // damage taking
    public invincible: boolean = false;

    public onDamageCooldown: boolean = false;
    public damageCooldown: number = 500;
    public damageCooldownDelta: number = 0;
   
    // animation
    public currentAnimName: string = "IDLE";
    public animations: {};
    public sprite: string;

    // knockback
    private takingKnockback: boolean = false;
    private knockbackCooldown: number = 500;
    private knockbackCooldownDelta: number = 0;

    constructor(x: number, y: number, width: number, height: number, maxHitpoints: number, sprite: string) {
        super(x, y, width, height, false);

        // sprites
        this.sprite = sprite;
        
        // hp
        this.maxHitpoints = maxHitpoints;
        this.hitpoints = maxHitpoints;
    }

    // Animation getters
    get currentAnimation(): SpriteAnimation {
        return this.animations[this.currentAnimName];
    }
    // Animation ends


    public changeAnimation(anim: string, force: boolean): void {
        if (force) {
            if (this.currentAnimName !== anim) {
                // call last frame to clean up code that needs to be run
                this.currentAnimation.onLastFrame();
                // reset animation frame
                this.currentAnimation.currentFrameIndex = 0;

                this.currentAnimName = anim;
            }
        } else {
            
        }
    }



    public onGameEngineDefined(): void {
        // request animations
        this.game.requestSprite(this.sprite, (s: {}) => {
            this.animations = s;
        })


    }

    public update() {
        const touchingObjects: GameObject[] = this.overlappingWith();

        // update cooldown
        if (this.onDamageCooldown) {
            this.damageCooldownDelta += deltaTime;
            
            if (this.damageCooldownDelta >= this.damageCooldown) {
                this.onDamageCooldown = false;
                this.damageCooldownDelta = 0;
            }
        }
        // knockback cooldown
        if (this.takingKnockback) {
            this.knockbackCooldownDelta += deltaTime;
            
            if (this.knockbackCooldownDelta >= this.damageCooldown) {
                this.takingKnockback = false;
                this.knockbackCooldownDelta = 0;
            }
        }
    }

    public takeDamage(dmg: number): void {
        if (this.onDamageCooldown) {
            return;
        }
        // turn on damage cooldown
        this.onDamageCooldown = true;

        this.hitpoints -= dmg;
        this.hurt();
        this.stun();

        // Check if dead
        if (this.hitpoints <= 0) { // We are dead
            this.die();
        }
    }

    public takeKnockback(knockbackDelta: Vector2) {
        if (this.takingKnockback) { // dont continue to take backshots
            return;
        }
        this.takingKnockback = true;

        this.move(knockbackDelta.x, knockbackDelta.y);
    }


    protected hurt() {

    }

    protected stun() {

    }

    public die(): void {
        
    }
}