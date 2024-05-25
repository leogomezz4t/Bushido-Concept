class WhiteHatSamurai extends Samurai {
    // enemy ai
    private alertDistance: number = 500;
    private stopDistance: number = 100;
    // attacking
    private attackTypes: string[] = ["BASIC_ATTACK", "STRONG_ATTACK"];
    private attackProbs = {
        0.80: "BASIC_ATTACK",
        0.20: "STRONG_ATTACK"
    }
    private isAttacking: boolean = false;
    private attackDelay: number = 150;
    private currentAttackDelta: number = 0;
    private stunPenalty: number = 500;
    // Hurt variables
    private isHurting: boolean = false;



    constructor(x: number, y: number) {
        super(x, y, 250, 250, 10, "samurai_3");

        this.hitboxes.push(
            new Hitbox(-25, 15, 30, 100, CollisionType.Colliding, this, true)
        )
    }

    // Methods
    public onGameEngineDefined(): void {
        super.onGameEngineDefined();
    }

    // p5.js functions
    public draw(cameraX: number, cameraY: number): void {
        this.currentAnimation.drawAnimation(cameraX, cameraY, this.width, this.height);
    }

    public update(): void {
        // super
        super.update();
        // AI
        const player = this.scene.manager.playerReference;
        const distToPlayer = Vector2.dist(player.position, this.position);

        if (distToPlayer <= this.stopDistance) {
            // attack logic
            // randomize attack types
            this.currentAttackDelta += deltaTime;
            if (this.currentAttackDelta >= this.attackDelay) {
                const attackProb = random(0, 1);
                
                let nextAttack: string;
                if (attackProb > 0.6) {
                    nextAttack = "STRONG_ATTACK"
                } else {
                    nextAttack = "BASIC_ATTACK"
                }
                this.attack(nextAttack);

                this.attackDelay = random(1000, 3000);
                this.currentAttackDelta = 0;
            }
        } else if (distToPlayer < this.alertDistance) {
            // x component
            if (this.position.x < player.position.x) {
                this.move(3, 0);
            }
            if (this.position.x > player.position.x) {
                this.move(-3, 0);
            }
        }

        // Orientation logic
        if (this.deltaX > 0) {
            this.orientation = Orientation.Right;
        }
        if (this.deltaX < 0) {
            this.orientation = Orientation.Left;
        }

        // Animations
        this.determineAnimation();
        this.currentAnimation.update(this.orientation);
        this.move(0, 0);
        this.applyGravity();
    }

    // Methods
    private determineAnimation() {
        if (this.isHurting) {

        } else if (this.isAttacking) {

        } else if (this.deltaX !== 0) {
            this.currentAnimName = "RUN";
        } else {
            this.currentAnimName = "IDLE";
        }
    }

    private attack(attackType: string) {
        if (this.isAttacking) { // Don't attack twice
            return;
        }

        this.isAttacking = true;
        this.changeAnimation(attackType, true);
        this.currentAnimation.onLastFrame = () => {
            this.isAttacking = false;
        }
    }

    protected hurt() {
        this.isHurting = true;
        this.changeAnimation("HURT", true);
        this.currentAnimation.onLastFrame = () => {
            this.isHurting = false;
        }
    }

    protected stun() {
        this.currentAttackDelta -= this.stunPenalty;
        console.log("stun")
    }

}