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
    // knockback
    takingKnockback = false;
    knockbackCooldown = 500;
    knockbackCooldownDelta = 0;
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
                // reset animation frame
                this.currentAnimation.currentFrameIndex = 0;
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
        // knockback cooldown
        if (this.takingKnockback) {
            this.knockbackCooldownDelta += deltaTime;
            if (this.knockbackCooldownDelta >= this.damageCooldown) {
                this.takingKnockback = false;
                this.knockbackCooldownDelta = 0;
            }
        }
    }
    takeDamage(dmg) {
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
    takeKnockback(knockbackDelta) {
        if (this.takingKnockback) { // dont continue to take backshots
            return;
        }
        this.takingKnockback = true;
        this.move(knockbackDelta.x, knockbackDelta.y);
    }
    hurt() {
    }
    stun() {
    }
    die() {
    }
}
