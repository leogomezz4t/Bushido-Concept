class ParrySword extends GameObject {
    public hitboxConfigs: Array<Hitbox[]> = [];
    public currentConfigIndex: number;
    public parent: Player;
    public offset: Vector2;
    public onSuccesfulParry: (w: Weapon) => void = () => {};

    constructor(parent: Player, offset: Vector2) {
        super(parent.position.x + offset.x, parent.position.y + offset.y, 1, 1, false);
    }

    // getters
    private get currentHitboxConfig(): Hitbox[] {
        return this.hitboxConfigs[this.currentConfigIndex];
    }

    public update(): void {
        const hittingWeapons: Weapon[] = this.overlappingWith().filter((x: GameObject) => x instanceof Weapon) as Weapon[];

        for (const hw of hittingWeapons) {
            console.log(hw);
            this.onSuccesfulParry(hw);
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