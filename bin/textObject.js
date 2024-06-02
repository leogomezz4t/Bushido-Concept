class TextObject extends GameObject {
    text;
    font;
    fontSize;
    strokeColor;
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
        textAlign(CENTER, CENTER);
        fill(this.color);
        stroke(this.strokeColor);
        textSize(this.fontSize);
        textFont(this.game.fonts[this.font]);
        text(this.text, cameraX, cameraY);
    }
}
