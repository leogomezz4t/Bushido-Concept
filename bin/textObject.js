class TextObject extends GameObject {
    text;
    font;
    fontSize;
    strokeColor;
    strokeThickness = 1;
    horizontalAlignType = "center";
    verticalAlignType = "center";
    /*
    * Text is center aligned
    */
    constructor(x, y, text, font, size, color, strokeColor) {
        super(x, y, 1, 1, false);
        this.color = color;
        this.text = text;
        this.font = font;
        this.fontSize = size;
        this.strokeColor = strokeColor;
    }
    draw(cameraX, cameraY) {
        textAlign(this.horizontalAlignType, this.verticalAlignType);
        fill(this.color);
        strokeWeight(this.strokeThickness);
        stroke(this.strokeColor);
        textSize(this.fontSize);
        textFont(this.game.fonts[this.font]);
        text(this.text, cameraX, cameraY);
    }
}
