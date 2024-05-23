class Entity extends GameObject {
    maxHitpoints;
    hitpoints;
    constructor(x, y, width, height, maxHitpoints, useDefaultHitbox = false) {
        super(x, y, width, height, useDefaultHitbox);
        // hp
        this.maxHitpoints = maxHitpoints;
        this.hitpoints = maxHitpoints;
    }
    takeDamage(dmg) {
        this.hitpoints -= dmg;
        // Check if dead
        if (this.hitpoints <= 0) { // We are dead
            this.die();
        }
    }
    die() {
    }
}
