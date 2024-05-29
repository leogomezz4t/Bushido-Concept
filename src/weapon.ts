class Weapon extends GameObject {
    public hitboxConfigs: Array<Hitbox[]> = [];
    public currentConfigIndex: number;
    // Parent ref
    public parent: GameObject;
    // Weapon properties
    public damage: number;
    public leftKnockback: Vector2 = new Vector2(-100, 0);
    public rightKnockback: Vector2 = new Vector2(100, 0);

    constructor(parent: GameObject, damage: number) {
        super(parent.position.x, parent.position.y, 1, 1, false);
        this.parent = parent;
        this.damage = damage;
        
        this.addTag("weapon");
        this.isActive = false;
    }

    // getters
    private get currentHitboxConfig(): Hitbox[] {
        return this.hitboxConfigs[this.currentConfigIndex];
    }

    // game loop
    public update() {
        this.position.setTo(this.parent.position);
        this.orientation = this.parent.orientation;

        const touchingObjects: GameObject[] = this.overlappingWith();
        for (const go of touchingObjects) {
            // Check for weapons
            if (go instanceof Entity && this.parent !== go) {
                go.takeDamage(this.damage)
                // calculate knockback
                if (this.parent.position.x >= go.position.x) {
                    go.takeKnockback(this.leftKnockback);
                } else {
                    go.takeKnockback(this.rightKnockback);
                }
            }
        }

    }
    
    // hitbox configs
    public setHitboxConfig(id: number) {
        if (id >= this.hitboxConfigs.length || id < 0) {
            throw new Error("Hitbox config Id given was outside of the bounds of the Array");
        }
        this.currentConfigIndex = id;

        // Reset our hitboxes
        this.hitboxes = this.currentHitboxConfig;
    }
}