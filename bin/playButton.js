class PlayButton extends Button {
    constructor(x, y) {
        super(x, y, 200, 50);
    }
    onClick() {
        this.game.switchScene("test");
    }
    draw(cameraX, cameraY) {
        super.draw(cameraX, cameraY);
        textAlign(CENTER);
        fill("black");
        textSize(32);
        textFont(fonts["bushido"]);
        strokeWeight(1);
        stroke("black");
        text("Start", cameraX + (this.width / 2), cameraY + 10 + (this.height / 2));
    }
}
