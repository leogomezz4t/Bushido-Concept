class Weapon extends GameObject {
    hitboxConfigs = [];
    currentConfigIndex;
    // Parent ref
    parent;
    // Weapon properties
    damage;
    leftKnockback = new Vector2(-100, 0);
    rightKnockback = new Vector2(100, 0);
    constructor(parent, damage) {
        super(parent.position.x, parent.position.y, 1, 1, false);
        this.parent = parent;
        this.damage = damage;
        this.addTag("weapon");
        this.isActive = false;
    }
    // getters
    get currentHitboxConfig() {
        return this.hitboxConfigs[this.currentConfigIndex];
    }
    // game loop
    update() {
        this.position.setTo(this.parent.position);
        this.orientation = this.parent.orientation;
        const touchingObjects = this.overlappingWith();
        for (const go of touchingObjects) {
            // Check for weapons
            if (go instanceof Entity && this.parent !== go) {
                go.takeDamage(this.damage);
                // calculate knockback
                if (this.parent.position.x >= go.position.x) {
                    go.takeKnockback(this.leftKnockback);
                }
                else {
                    go.takeKnockback(this.rightKnockback);
                }
                console.log(go);
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
