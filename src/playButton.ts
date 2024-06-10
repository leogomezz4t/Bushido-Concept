class PlayButton extends Button {
    constructor(x: number, y: number) {
        super(x, y, 200, 50)
    }

    public onClick(): void {
        this.game.switchScene("test")
    }

    public draw(cameraX: number, cameraY: number): void {
        super.draw(cameraX, cameraY);
        textAlign(CENTER);
        fill("black");
        textSize(32)
        textFont(fonts["bushido"]);
        strokeWeight(1);
        stroke("black");
        text("Start", cameraX + (this.width/2), cameraY + 10 + (this.height/2))
    }
}