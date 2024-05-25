class Weapon extends GameObject {
    hitboxConfigs = [];
    currentConfigIndex;
    // Parent ref
    parent;
    // Weapon properties
    damage;
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
