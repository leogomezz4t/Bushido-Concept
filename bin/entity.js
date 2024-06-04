class Entity extends GameObject {
    maxHitpoints;
    hitpoints;
    // damage taking
    invincible = false;
    onDamageCooldown = false;
    damageCooldown = 500;
    damageCooldownDelta = 0;
    // hurting
    isHurting = false;
    // death
    isDying = false;
    // knockback
    takingKnockback = false;
    knockbackCooldown = 500;
    knockbackCooldownDelta = 0;
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
    takeDamage(dmg, weapon) {
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
    takeKnockback(knockDelta, weapon) {
        if (this.takingKnockback) {
            return;
        }
        if (this.isDying) {
            return;
        }
        this.takingKnockback = true;
        this.move(knockDelta.x, knockDelta.y);
    }
    hurt() {
        if (this.isDying) {
            return;
        }
        this.changeAnimation("HURT", true);
        this.isHurting = true;
        this.currentAnimation.onLastFrame = () => {
            this.isHurting = false;
        };
    }
    stun() {
    }
    die() {
        if (this.isDying) {
            return;
        }
        this.isDying = true;
        this.changeAnimation("DEATH", true);
        this.currentAnimation.onNewFrame = id => {
            if (id === this.currentAnimation.imagePaths.length - 2) {
                // At second last frame
                this.delete();
            }
        };
    }
}
