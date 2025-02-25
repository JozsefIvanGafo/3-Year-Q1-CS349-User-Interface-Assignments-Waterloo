/* 
University of Waterloo 2023-24 / CS 349 / A2
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of creating the swatch button (extension of  SKButton)
*/

//imports
import { SKButton } from "../simplekit/widget";
import { Model } from "../mvc/model";


export class Swatch extends SKButton {

  //values of the swatch
    hue: number = 0; // Default hue
    saturation: number = 100; // Default saturation
    lum: number = 100; // Default value
    model:Model;
    
    constructor(id:string,
      model:Model, 
      x?: number, 
      y?: number, 
      width?: number | undefined, 
      height?: number | undefined
    ){
      super("",x, y, width, height);
      this.id=id;
      this.model=model;

    }
    //Here is what is different from SKButton
    draw(gc: CanvasRenderingContext2D): void {
      gc.fillStyle=this.fill;
      gc.fillRect(this.x,this.y,50,50);
      if (this.model.id.toString()===this.id){
        gc.strokeStyle="black";
        gc.lineWidth=2;
        gc.rect(this.x,this.y,50,50)
        //gc.strokeStyle="black";
        gc.stroke()
      }
    
    }

  // Set the HSV values for the Swatch
  setHSV(hue: number, saturation: number, value: number) {
    this.hue = hue;
    this.saturation = saturation;
    this.lum = value;
    this.updateBackground();
  }

  // Update the background color based on the current HSV values
  private updateBackground() {
    const backgroundColor = `hsl(${this.hue},${this.saturation}%,${this.lum}%)`;
    //console.log(backgroundColor)
    this.fill = backgroundColor;
  }


}
