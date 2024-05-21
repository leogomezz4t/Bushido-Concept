class Entity extends GameObject {
    public maxHitpoints: number;
    public hitpoints: number;

    constructor(x: number, y: number, width: number, height: number, maxHitpoints: number, useDefaultHitbox: boolean = false) {
        super(x, y, width, height, useDefaultHitbox);
        
        // hp
        this.maxHitpoints = maxHitpoints;
        this.hitpoints = maxHitpoints;
    }

    takeDamage(dmg: number): void {
        this.hitpoints -= dmg;

        // Check if dead
        if (this.hitpoints <= 0) { // We are dead
            this.die();
        }
    }

    die(): void {
        
    }
}