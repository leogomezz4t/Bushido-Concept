class Weapon extends GameObject {
    public hitboxConfigs: Array<Hitbox[]> = [];
    public currentConfigIndex: number;
    // Parent ref
    public parent: GameObject;
    // Weapon properties
    public damage: number;
    public baseKnockback: Vector2;

    constructor(parent: GameObject, damage: number, knockback: Vector2) {
        super(parent.position.x, parent.position.y, 1, 1, false);
        this.parent = parent;
        this.damage = damage;
        this.baseKnockback = knockback;
        
        this.addTag("weapon");
        this.isActive = false;

    }

    // getters
    private get currentHitboxConfig(): Hitbox[] {
        return this.hitboxConfigs[this.currentConfigIndex];
    }

    public get leftKnockback(): Vector2 {
        return Vector2.multiply(this.baseKnockback, new Vector2(-1, 1));
    }

    public get rightKnockback(): Vector2 {
        return this.baseKnockback;
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