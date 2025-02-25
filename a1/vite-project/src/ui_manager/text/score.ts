/*
University of Waterloo 2023-24 / CS 349 / A1
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module in charge of holding the Score text
*/
import {DrawText} from "./draw_text"

export class Score extends DrawText{
    //Properties
    private text_content: string;
    private score:number;

    //Constructor
    constructor(){
        // * Parameters for drawing the text
        super("default text",[0,0])

        //We add the new part of the class
        this.text_content="Score:"//content of the text
        this.score=0;//default score
        let text= this.text_content+this.score
        this.change_text(text)
        //invoke the DrawText class, by default we say those values, but they change each time we draw the score

    }
    /**
     * resize
     */
    public resize() {
        const width=window.innerWidth/2
        const height=window.innerHeight*0.075
        //We update the coordinates
        this.change_coordinates([width , height])
    }

   /**
    * update_score
    * Increases the score by one point
    */
   public update_score(score:number):void {
        this.score=score
        let text =this.text_content+this.score;
        this.change_text(text)
   }
   /**
    * reset_score
    * Reset the score to 0
    */  
   public reset_score():void {
        this.score=0;
        let text =this.text_content+this.score;
        this.change_text(text)
   }

}