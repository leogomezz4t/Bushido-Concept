class Entity extends GameObject {
    public maxHitpoints: number;
    public hitpoints: number;
    // damage taking
    public invincible: boolean = false;

    public onDamageCooldown: boolean = false;
    public damageCooldown: number = 500;
    public damageCooldownDelta: number = 0;
    // hurting
    public isHurting: boolean = false;


    // death
    protected isDying: boolean = false;
    // knockback
    private takingKnockback: boolean = false;
    private knockbackCooldown: number = 500;
    private knockbackCooldownDelta: number = 0;
   
    // animation
    public currentAnimName: string = "IDLE";
    public animations: {};
    public sprite: string;


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
        if (this.currentAnimName === anim) {
            return;
        }
        if (force) {
            if (this.currentAnimName !== anim) {
                // call last frame to clean up code that needs to be run
                this.currentAnimation.onLastFrame();
                this.currentAnimation.currentFrameIndex = 0;
                this.currentAnimName = anim;
                this.currentAnimation.currentFrameIndex = 0;
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

        // update cooldown
        if (this.onDamageCooldown) {
            this.damageCooldownDelta += deltaTime;
            
            if (this.damageCooldownDelta >= this.damageCooldown) {
                this.onDamageCooldown = false;
                this.damageCooldownDelta = 0;
            }
        }

        if (this.takingKnockback) {
            this.knockbackCooldownDelta += deltaTime;

            if (this.knockbackCooldownDelta >= this.knockbackCooldown) {
                this.takingKnockback = false;
                this.damageCooldownDelta = 0;
            }
        }
    }

    public takeDamage(dmg: number, weapon?: Weapon): void {
        if (this.onDamageCooldown) {
            return;
        }
        this.onDamageCooldown = true;

        this.hitpoints -= dmg;
        this.hurt();
        this.stun();

        // Check if dead
        if (this.hitpoints <= 0) { // We are dead
            this.die();
        }
    }

    public takeKnockback(knockDelta: Vector2, weapon?: Weapon) {
        if (this.takingKnockback) {
            return;
        }
        if (this.isDying) {
            return;
        }
        this.takingKnockback = true;

        this.move(knockDelta.x, knockDelta.y)
    }

    protected hurt(): void {
        if (this.isDying) {
            return;
        }
        this.changeAnimation("HURT", true);
        this.isHurting = true;
        this.currentAnimation.onLastFrame = () => {
            this.isHurting = false;
        }
    }

    public stun() {
        
    }

    public die(): void {
        if (this.isDying) {
            return;
        }
        this.isDying = true;
        this.changeAnimation("DEATH", true);
        this.currentAnimation.onNewFrame = id => {
            if (id === this.currentAnimation.imagePaths.length-2) {
                // At second last frame
                this.delete();
            }
        }
    }
}