class Button extends GameObject {
    BASIC_COLOR = "#dadada";
    HOVER_COLOR = "#c0c0c0";
    CLICK_COLOR = "#a7a7a7";
    constructor(x, y, width, height) {
        super(x, y, width, height, true);
    }
    update() {
        if (this.isPressed()) {
            this.onClick();
        }
    }
    onClick() { }
    ;
    draw(cameraX, cameraY) {
        if (this.isPressed()) {
            fill(this.CLICK_COLOR);
        }
        else if (this.isHovered()) {
            fill(this.HOVER_COLOR);
        }
        else {
            fill(this.BASIC_COLOR);
        }
        stroke("black");
        rect(cameraX, cameraY, this.width, this.height);
    }
}
