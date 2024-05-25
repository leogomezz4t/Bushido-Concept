class Weapon extends GameObject {
    hitboxConfigs = [];
    currentConfigIndex;
    // Parent ref
    parent;
    // Weapon properties
    damage;
    knockback = new Vector2(2, 5);
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
        // collision
        const touchingObjects = this.overlappingWith();
        for (const go of touchingObjects) {
            // Check for weapons
            if (go instanceof Entity && go !== this.parent) {
                go.takeDamage(this.damage);
                go.takeKnockback(this.knockback);
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
