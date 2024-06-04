class Weapon extends GameObject {
    hitboxConfigs = [];
    currentConfigIndex;
    // Parent ref
    parent;
    // Weapon properties
    damage;
    baseKnockback;
    constructor(parent, damage, knockback) {
        super(parent.position.x, parent.position.y, 1, 1, false);
        this.parent = parent;
        this.damage = damage;
        this.baseKnockback = knockback;
        this.addTag("weapon");
        this.isActive = false;
    }
    // getters
    get currentHitboxConfig() {
        return this.hitboxConfigs[this.currentConfigIndex];
    }
    get leftKnockback() {
        return Vector2.multiply(this.baseKnockback, new Vector2(-1, 1));
    }
    get rightKnockback() {
        return this.baseKnockback;
    }
    // game loop
    update() {
        this.position.setTo(this.parent.position);
        this.orientation = this.parent.orientation;
        const touchingObjects = this.overlappingWith();
        for (const go of touchingObjects) {
            // Check for weapons
            if (go instanceof Entity && this.parent !== go) {
                go.takeDamage(this.damage, this);
                // calculate knockback
                if (this.parent.position.x >= go.position.x) {
                    go.takeKnockback(this.leftKnockback, this);
                }
                else {
                    go.takeKnockback(this.rightKnockback, this);
                }
            }
        }
    }
    // hitbox configs
    setHitboxConfig(id) {
        if (id >= this.hitboxConfigs.length || id < 0) {
            throw new Error("Hitbox config Id given was outside of the bounds of the Array");
        }
        this.currentConfigIndex = id;
        // Reset our hitboxes
        this.hitboxes = this.currentHitboxConfig;
    }
}
