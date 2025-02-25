/*
University of Waterloo 2023-24 / CS 349 / A1
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module in charge of handling the graphics of the simon game
*/

// *Imports
import { UIManager } from "../ui_manager";
import { SimonLogic } from "../simonlogic";

// * We create the Class
export class Draw{
    /**
     * Private properties:
     * entities
     * 
     * Public properties
     * None
     * 
     * Public methods:
     * draw(gc:CanvasRenderingContext2D)->Undefined
     * set_canvas()->canvas
     * 
     * Private methods:
     * None
     * 
     */
    //Properties
    private ui_manager:UIManager;

    //constructor
    constructor(entity:UIManager){
        this.ui_manager=entity;
    }
    /**
     * draw
     * In charge of drawing the graphics of simon game
     */
    public draw(gc:CanvasRenderingContext2D,simon_logic:SimonLogic) {
        //We clear the previous drawings
        gc.reset()
        //We draw all the entities 
        this.ui_manager.draw(gc,simon_logic)

    }
    
    /**
     * set_canvas
     * In this method we initialize the canvas and we return the canvas
     */
    
    public set_canvas(){
        console.log("Drawing")
        const canvas = document.createElement("canvas");
        document.body.appendChild(canvas);

        // set a background style to make it easier to see the canvas
        canvas.style.setProperty("background", "lightblue");
        return canvas
    }
}
