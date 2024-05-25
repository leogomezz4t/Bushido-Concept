class Entity extends GameObject {
    maxHitpoints;
    hitpoints;
    // damage taking
    invincible = false;
    onDamageCooldown = false;
    damageCooldown = 500;
    damageCooldownDelta = 0;
    // animation
    currentAnimName = "IDLE";
    animations;
    sprite;
    constructor(x, y, width, height, maxHitpoints, sprite) {
        super(x, y, width, height, false);
        // sprites
        this.sprite = sprite;
        // hp
        this.maxHitpoints = maxHitpoints;
        this.hitpoints = maxHitpoints;
    }
    // Animation getters
    get currentAnimation() {
        return this.animations[this.currentAnimName];
    }
    // Animation ends
    changeAnimation(anim, force) {
        if (force) {
            if (this.currentAnimName !== anim) {
                // call last frame to clean up code that needs to be run
                this.currentAnimation.onLastFrame();
                this.currentAnimName = anim;
            }
        }
        else {
        }
    }
    onGameEngineDefined() {
        // request animations
        this.game.requestSprite(this.sprite, (s) => {
            this.animations = s;
        });
    }
    update() {
        const touchingObjects = this.overlappingWith();
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
    takeDamage(dmg) {
        this.hitpoints -= dmg;
        this.hurt();
        // Check if dead
        if (this.hitpoints <= 0) { // We are dead
            this.die();
        }
    }
    hurt() {
    }
    die() {
    }
}
