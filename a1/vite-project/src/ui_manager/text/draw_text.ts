/*
University of Waterloo 2023-24 / CS 349 / A1
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module in charge of holding the text parent class
*/



export class DrawText{
    //Properties
    public text:string;
    private coordinates:[number,number];
    private alignment:CanvasTextAlign;
    private baseline:CanvasTextBaseline;
    private colour:string;
    public visibility:boolean;


    //Constructor
    constructor(text:string|number,coordinates:[number,number]){
        //console.log("Initializing the Draw instance")
        // * Parameters for drawing the text
        this.text=text.toString();//content of the text
        this.coordinates=coordinates;//coordinates where we want to be shown the text
        this.alignment="center";//In which part of the text is located (left,middle,right)
        this.baseline="middle";//In which height the text is located
        this.colour="black";//colour of the text
        this.visibility=true;//if the text can be shown or not
    }
    //methods
    /**
     * draw_text
     * Method in charge of drawing the text on the canvas
     */
    public draw_text(gc:CanvasRenderingContext2D) {
        //We check if the text can be drawn
        if (this.visibility===true){
            // string uses same style as CSS font property
            gc.font = "32pt sans-serif";
            // Set properties of the text
            gc.fillStyle = this.colour;
            gc.textAlign = this.alignment;
            gc.textBaseline = this.baseline;
            //write the text
            gc.fillText(this.text, this.coordinates[0], this.coordinates[1]);
        }

    }

    /**
     * change_text
     * Method to change the text
     *  */
    public change_text(new_text: string): void {
        this.text = new_text;
    }

    /**
     * change_visibility
     * Turn on or off the text on the screen
     */
    public change_visibility(visibility:boolean|undefined=undefined) {
        if (visibility==undefined){
        this.visibility=!this.visibility;
        }else this.visibility=visibility;
    }
    
    /**
     * change_coordinates
     */
    public change_coordinates(coordinates:[number,number]) {
        this.coordinates=coordinates;
        
    }
    /**
     * change_colour
     */
    public change_colour(colour:string) {
        this.colour=colour;
        
    }
}
