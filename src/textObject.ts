
class TextObject extends GameObject {
    public text: string;
    public font: string;
    public fontSize: number;
    public strokeColor: any;
    public strokeThickness: number = 1;
    public horizontalAlignType: any = "center";
    public verticalAlignType: any = "center";

    /*
    * Text is center aligned
    */
    constructor(x: number, y: number, text: string, font: Fonts, size: number, color: any, strokeColor: any) {
        super(x, y, 1, 1, false);
        this.color = color;
        this.text = text;
        this.font = font;
        this.fontSize = size
        this.strokeColor = strokeColor;
    }

    public draw(cameraX: number, cameraY: number): void {
        textAlign(this.horizontalAlignType, this.verticalAlignType);
        fill(this.color);
        strokeWeight(this.strokeThickness)
        stroke(this.strokeColor);
        textSize(this.fontSize);
        textFont(this.game.fonts[this.font]);
        text(this.text, cameraX, cameraY);
    }
}
