/*
University of Waterloo 2023-24 / CS 349 / A1
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module we will manage all the objects of the user interface
*/

//import
import { GameText, CheatModeText,Score } from "./text";
import { SetOfButtons } from "./button";
import { SimonLogic } from "../simonlogic";

export class UIManager{
    //properties
    private game_text_instance: GameText;
    private cheat_text_instance: CheatModeText;
    private score_text_instance: Score;
    public set_of_buttons_instance: SetOfButtons;
    private default_num_buttons:number;
    private default_radius:number;
    //pos[0] if we lock to animation bigger button
    //pos[1] is the time
    //pos[2] is the button selected
    //We used this "global variable" because we used it on both main_animation and main_events
    public simulation_lock:[boolean,number,number];
    //This tells us if we had reset the idle animation, if false it means we have to reset to avoid teleports
    //when doing the animation
    public reset_idle_animation:boolean;

    //Constructor
    constructor(num_of_buttons:number){
        //Text instance
        this.game_text_instance = new GameText();
        this.score_text_instance = new Score();
        this.cheat_text_instance= new CheatModeText();
        //Button instance
        this.default_num_buttons=num_of_buttons;
        this.default_radius=60;
        this.set_of_buttons_instance = new SetOfButtons(this.default_num_buttons,this.default_radius);
        //variable
       //This locks on main_events and main_animation when the animation bigger button is playing
       //pos[0] if the lock is active
       //pos[1] is the start time
       //pos[2] is the button we are playing the animation
        this.simulation_lock=[false,-1,-1];
        //This variable tells us if we reset or not so the idle_animation "teleports" to the initial coordinates
        this.reset_idle_animation=false;
    }
    
    /**
     * draw
     * Draw all the ui_manager
     */
    public draw(gc:CanvasRenderingContext2D,simon_logic:SimonLogic) {
         //set of buttons
        //We put it first so it doesn't overlap with the text
         this.set_of_buttons_instance.draw_buttons(gc,simon_logic)


        // Cheat text
        this.cheat_text_instance.cheat_text.draw_text(gc);
        //If is start we reset the cheat text instance to reset the values of the cheat list
        if (simon_logic.state=="START"){
            this.cheat_text_instance.reset()
        }
        //We draw the cheats when is cheat codes when we are not on those simon states
        if (simon_logic.state !== "COMPUTER" && simon_logic.state !== "HUMAN") {
            this.cheat_text_instance.cheat_codes.draw_text(gc);
        //Or if in human and no simulations are running
        } else if (simon_logic.state==="HUMAN"&&this.simulation_lock[0]==false ){
            this.cheat_text_instance.cheat_codes.draw_text(gc);
        }
        
        
       

        // Game text
        //First update the game text
        //This is to avoid when the animation of the last button getting bigger is running
        if (simon_logic.state=="HUMAN"&& this.simulation_lock[0]==true){
            this.game_text_instance.computer_turn()
        }else{
            //Else we update
            this.game_text_instance.update_text_shown(simon_logic,this.cheat_text_instance.cheating)
        }
        //Then we draw it
        this.game_text_instance.draw_text(gc)
    
        //Score
        this.score_text_instance.draw_text(gc)
    }

    /**
     * resize
     */
    public resize() {
        this.cheat_text_instance.resize()
        this.game_text_instance.resize()
        this.score_text_instance.resize()
        this.set_of_buttons_instance.update_buttons()
    }

    /**
     * hit_test_button
     * x_coordinate:number,y_coordinate     
     */
    public hit_test_button(x_coordinate:number,y_coordinate:number):number {
        return this.set_of_buttons_instance.hit_test(x_coordinate,y_coordinate);
    }

    /**
     * activate_deactivate_cheats
     * We activate or deactivate the cheats
     */
    public activate_deactivate_cheats() {
        this.cheat_text_instance.change_visibility();
    }

    /**
     * reset
     */
    public reset() {
        //We reset all instances to default values
        console.log("reset")
        this.reset_idle_animation=true;
        this.simulation_lock=[false,-1,-1];
        this.set_of_buttons_instance.reset_y_pos()
        this.score_text_instance.reset_score();
        this.set_of_buttons_instance.unselect_all_buttons();
        return this.set_of_buttons_instance.num_of_buttons;
    }
    /**
     * increase_num_buttons
     */
    public increase_num_buttons() {
        //we increase the number of buttons
        this.set_of_buttons_instance.update_num_buttons(1);
        this.set_of_buttons_instance.unselect_all_buttons();//to avoid overlapping
        return this.set_of_buttons_instance.num_of_buttons;
    }
    /**
     * decrease_num_of_buttons
     */
    public decrease_num_of_buttons() {
        //we decrease the number of buttons

        this.set_of_buttons_instance.update_num_buttons(-1);
        this.set_of_buttons_instance.unselect_all_buttons();//to avoid overlapping
        return this.set_of_buttons_instance.num_of_buttons;
    }
    /**
     * update_score
     */
    public update_score(score:number) {
        this.score_text_instance.update_score(score);
    }
    /**
     * update_cheats
     * We update the text of the cheat
     */
    public update_cheats(cheat_text:number) {
        this.cheat_text_instance.push_new_elem_in_cheat_text(cheat_text)
    }
    
    /**
     * shift_cheat_text
     * We remove the first element 
     * because player has guessed it
     */
    public shift_cheat_text() {
        this.cheat_text_instance.shift()
    }

    /**
     * clear_cheat_list
     * We reset all the values of the cheat list
     */
    public new_round(new_score:number) {
        this.cheat_text_instance.reset()
        this.set_of_buttons_instance.reset_y_pos()
        this.score_text_instance.update_score(new_score)
    }

    // * animations
    /**
     * idle_animation
     */
    public idle_animation(time:number) {
        this.set_of_buttons_instance.idle_animation(time)
        
    }
    /**
     * lost_animation
     */
    public lost_animation(start:number,end:number,time:number) {
        const time_diff= time-start;
        //We only do this animation for ens-start seconds
        //Reason to avoid to calculate the coordinates of the buttons out of bounds
        //save calculation speed
        if (end-start<time_diff){
        this.set_of_buttons_instance.loss_animation(time_diff)
        }
    }
    
    /**
     * bigger_animation
     */
    public bigger_animation(button_number:number,time:number) {
        this.set_of_buttons_instance.bigger_animation(button_number,time)

    }

    /**
     * reset_radius
     */
    public reset_radius() {
        this.set_of_buttons_instance.reset_radius()
    }

}
