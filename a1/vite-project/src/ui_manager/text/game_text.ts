/*
University of Waterloo 2023-24 / CS 349 / A1
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module in charge of holding the game text 
(Press space to play,Watch what I do ,now it's your turn, you won!press space to continue,you lost! press space to continue)
*/
//imports
import { DrawText } from "./draw_text";
import { SimonLogic } from "../../simonlogic";
export class GameText extends DrawText{
     //Properties
     private text_array: [string,string,string,string,string];

   
    //constructor
    constructor(){
        //We inherit the Draw text class
        super("default text",[0,0])//Default values

        //We assign the new values to the array
        this.text_array=["Press space to play!",
                        "watch what I do",
                        "now is your turn",
                        "You won! Press space to continue",
                        "You lost! Press space to continue"];

        //we want the text to always be centered
        const width=window.innerWidth/2;
        const height=window.innerHeight*0.8;
        //Change values
        this.change_coordinates([width,height]);
        this.change_text(this.text_array[0]);
    }


    /**
     * resize
     * update the coordinates
     */
    public resize() {
        const width=window.innerWidth/2;
        const height=window.innerHeight*0.8;
        this.change_coordinates([width,height])
        
    }

    /**
     * computer_turn
     * This is when the animation is playing of the last button size increasing 
     */
    public computer_turn() {
        this.change_text(this.text_array[1])
    }

    /**
     * update_text_shown
     * This method is in charge of changing the text depending in which state we are
     */
    public update_text_shown(simon_logic:SimonLogic,cheating:boolean) {
        this.change_visibility(true)
        switch(simon_logic.state){
            //For each state we have a different message
            case "START":

                this.change_text(this.text_array[0]);//Press space to play!
                break
            case "COMPUTER":
                this.change_text(this.text_array[1])//watch what I do
                break
            case "HUMAN":
                //we only show the text your turn when we are not cheating
                if(cheating===true)this.change_visibility(false);


                this.change_text(this.text_array[2])//now is your turn
                break
            case "WIN":

                this.change_text(this.text_array[3])//You won! Press space to continue
                
                break
            case "LOSE":

                this.change_text(this.text_array[4])//You lost! Press space to continue
                break
        } 
    }   

}

