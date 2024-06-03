class ParrySword extends GameObject {
    hitboxConfigs = [];
    currentConfigIndex;
    parent;
    offset;
    onSuccesfulParry = () => { };
    constructor(parent, offset) {
        super(parent.position.x + offset.x, parent.position.y + offset.y, 1, 1, false);
    }
    // getters
    get currentHitboxConfig() {
        return this.hitboxConfigs[this.currentConfigIndex];
    }
    update() {
        const hittingWeapons = this.overlappingWith().filter((x) => x instanceof Weapon);
        for (const hw of hittingWeapons) {
            console.log(hw);
            this.onSuccesfulParry(hw);
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
