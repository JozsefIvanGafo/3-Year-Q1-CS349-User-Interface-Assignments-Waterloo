/*
University of Waterloo 2023-24 / CS 349 / A1
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module in charge of handling the buttons for the Simon game
*/
//Imports
import { Circle } from "./circle";
import { DrawText } from "../text/draw_text";
import { SimonLogic } from "../../simonlogic";

export class Button extends Circle{
    /**
     * Private methods:
     *      None
     * Public methods:
     *      draw_button
     *      button_selected
     *      Circle public methods
     * Private properties:
     *      id
     *      selected
     * Public properties:
     *      get_id
     */

    //Properties
    private id:DrawText;//We draw the id of the button
    private selected:boolean;//tells us if the button is selected

    //We get the id 
    public get get_id() {
        return this.id.text;
    }

    //constructor
    constructor(radius:number,center:[number,number],colour:string,id:number){
        //We inherit the Circle 
        super(radius,center,colour);
        this.id=new DrawText(id+1,center);
        this.id.change_colour("white")
        this.selected=false;
        
    }

    /**
     * draw_button
     * We draw a circle with a text number that writes its ID
     */
    public draw_button(gc:CanvasRenderingContext2D,simon_logic:SimonLogic) {
        //console.log(this.id)
        gc.save()
        this.draw_circle(gc); //We draw the circle
        //If the button is selected it has a yellow outline
        if(this.selected==true && simon_logic.state==="HUMAN"){
            // Set the outline (stroke) color and width
            gc.strokeStyle = "yellow"; // Outline color
            gc.lineWidth = 10; // Outline width
            gc.stroke(); // Draw the outline
            gc.restore()

        }
        //We draw the id
        this.id.draw_text(gc);
    }

    /**
     * button_selected
     * It means the user is pointing towards this button
     */
    public button_selected(selected:boolean) {
        this.selected= selected;
    }

}
