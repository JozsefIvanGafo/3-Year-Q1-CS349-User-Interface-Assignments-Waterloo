/* 
University of Waterloo 2023-24 / CS 349 / A2
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling a custom button
*/

//Imports
import { SKButton } from "../simplekit/widget";
import * as Style from "../simplekit/widget/style"


export class CustomButton extends SKButton{

    //properties
    private colour:string="black"

    constructor(
        text: string, 
        x?: number, 
        y?: number, 
        width?: number | undefined, 
        height?: number | undefined){
        super(text,x,y,width,height);
    }
    
    //If we reached a limit we cannot select the button
    hittest(mx: number, my: number): boolean {
        //IF we reached the limit we cannot click the button
        if (this.colour=="grey"){
            return false;
        }
        return super.hittest(mx,my);
    }



    /**
     * limit_reached
     */
    public limit_reached() {
        this.colour="grey";
    
    }
    /**
     * limit_not_reached
     */
    public limit_not_reached() {
        this.colour="black";
    }
    
    //Is the same draw as SKButton but instead of default colour black is this.colour that changes if we reached a limit
    draw(gc: CanvasRenderingContext2D): void {

        //Same as SKbutton but we change the gc.fill.style and gc.Stroke.style equal to this colour 
        //and we only highlight when we don't reach the limit
        const box = this.box;

        gc.save();

        const w = box.paddingBox.width;
        const h = box.paddingBox.height;

        gc.translate(this.box.margin, this.box.margin);

        // thick highlight rect
        if (this.colour=="black"){
        if (this.state == "hover" || this.state == "down") {
        gc.beginPath();
        gc.roundRect(this.x, this.y, w, h, 4);
        gc.strokeStyle = Style.highlightColour;
        gc.lineWidth = 8;
        gc.stroke();
        }}

        // normal background
        gc.beginPath();
        gc.roundRect(this.x, this.y, w, h, 4);
        gc.fillStyle =
        this.state == "down" ? Style.highlightColour : "lightgrey";
        gc.strokeStyle = this.colour;//"black";


        // change fill to show down state
        gc.lineWidth = this.state == "down" ? 4 : 2;
        gc.fill();
        gc.stroke();
        gc.clip(); // clip text if it's wider than text area

        // button label
        gc.font = Style.font;
        gc.fillStyle = this.colour;//"black";
        gc.textAlign = "center";
        gc.textBaseline = "middle";
        gc.fillText(this.text, this.x + w / 2, this.y + h / 2);

        gc.restore();

        //We paste the same draw as skelement since we cannot super().draw because we will draw skbutton
        if (Style.debug || this.debug) {
            gc.save();
            gc.translate(this.x, this.y);
            // draw the box model visualization
            this.box.draw(gc);
      
            // display element id
            gc.strokeStyle = "white";
            gc.lineWidth = 2;
            gc.textBaseline = "top";
            gc.textAlign = "left";
            gc.font = "7pt sans-serif";
            gc.strokeText(this.id, 2, 2);
            gc.fillStyle = "black";
            gc.fillText(this.id, 2, 2);
            gc.restore();
          }
    }




}