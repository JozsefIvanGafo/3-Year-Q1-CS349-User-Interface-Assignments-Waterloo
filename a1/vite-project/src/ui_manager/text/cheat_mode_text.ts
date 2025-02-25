/*
University of Waterloo 2023-24 / CS 349 / A1
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module in charge of handling the cheat mode logic
*/
//imports
import { SimonLogic } from "../../simonlogic";
import { DrawText } from "./draw_text";

export class CheatModeText {
    //properties
    public cheat_codes: DrawText;//Here we see the combinations
    public cheat_text: DrawText;//It holds the word cheating
    private cheat_list:number[];
    public get cheating(): boolean {
        return this.cheat_text.visibility;
    }

    //constructor
    constructor(){
        const x=window.innerWidth
        const y=window.innerHeight
        this.cheat_codes= new DrawText("",[x/2,y*0.9]);
        this.cheat_text=new DrawText("Cheating",[x*0.8,y*0.9]);
        this.cheat_codes.change_visibility(false)
        this.cheat_text.change_visibility(false)
        this.cheat_text.change_colour("grey")
        this.cheat_list=[]
    }
    /**
     * draw_cheat
     * We draw the text on the canvas
     */
    //public draw_cheat(gc:CanvasRenderingContext2D,simon:SimonLogic) {
    //    if (this.visibility===true){
    //        //console.log("draw cheat")
    //        //if (simon.state==="COMPUTER"||"START")this.cheat_codes.change_visibility();
    //        //else {
    //           // this.cheat_codes.change_visibility(true);
    //            //
    //            //}
    //        this.cheat_codes.draw_text(gc);
    //        this.cheat_text.draw_text(gc);
    //    }
    //    
    //}
    /**
     * resize
     */
    public resize() {
        const x=window.innerWidth;
        const y=window.innerHeight;
        this.cheat_codes.change_coordinates([x/2,y*0.9]);
        this.cheat_text.change_coordinates([x*0.8,y*0.9])
    }

    /**
     * change_code_list
     * We change the code to the new code
     */
    public push_new_elem_in_cheat_text(code_text:number) {
        //We add it to the list
        this.cheat_list.push(code_text)
        //we create a string that contains all the sequence
        const text= this.cheat_list.join(", ")
        //We change the text
        this.cheat_codes.change_text(text);
    }

    /**
     * shift
     * We found the next button so we change the cheat code text
     */
    public shift() {
        //We remove the first element
        if (this.cheat_list.length>0){
            this.cheat_list.shift()
            //If the length is 0 the cheat code text is an empty string
            if (this.cheat_list.length===0){
                this.reset()
            }else{
                const text= this.cheat_list.join(", ")
                this.cheat_codes.change_text(text)
            }
        }
    }


    /**
     * reset
     * reset the cheat codes values
     */
    public reset() {
        this.cheat_list=[]
        this.cheat_codes.change_text("")
    }

    /**
     * change_visibility
     * We do the opposite of the current visibility,
     * meaning the user is no longueur or is in cheating mode
     */
    public change_visibility() {
        console.log("Cheats")
        this.cheat_codes.change_visibility()
        this.cheat_text.change_visibility()
        
    }







}