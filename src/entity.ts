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
        for (const go of touchingObjects) {
            // Check for weapons
            if (go instanceof Weapon && go.parent !== this) {
                if (!this.onDamageCooldown) {
                    this.takeDamage(go.damage);
                    this.onDamageCooldown = true;
                }
            }
        }
    }

    public takeDamage(dmg: number): void {
        this.hitpoints -= dmg;
        this.hurt();

        // Check if dead
        if (this.hitpoints <= 0) { // We are dead
            this.die();
        }
    }

    protected hurt() {

    }

    public die(): void {
        
    }
}