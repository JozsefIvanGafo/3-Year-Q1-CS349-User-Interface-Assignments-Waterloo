/*
University of Waterloo 2023-24 / CS 349 / A1
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module in charge of handling all the buttons of the SImon game
*/
//Import
import { SimonLogic } from "../../simonlogic";
import { Button } from "./button";

export class SetOfButtons{
    /**
     * private methods:
     *      None
     * public methods:
     *      draw_buttons
     *      update_num_buttons
     *      update_buttons
     *      hit_test
     *      unselect_all_buttons
     *      get_button_id
     *      reset_y_pos
     *      reset_radius
     *      idle_animation
     *      loss_animation
     * private properties:
     *      default_radius
     *      list_of_buttons
     *      number_of_buttons
     * public properties:
     *      num_of_buttons
     *      
     */

    //properties
    private default_radius:number;
    private list_of_buttons:Button[]=[];
    private number_of_buttons:number;
    
    
    public get num_of_buttons() : number {
        return this.number_of_buttons;
    }
    
    
    //constructor
    constructor(num_of_buttons:number,radius:number){
        this.default_radius=radius;
        this.number_of_buttons=num_of_buttons;
        //We create the buttons
        for (let i=0;i<num_of_buttons;i++){
            this.list_of_buttons.push(new Button(radius,[0,window.innerHeight/2],"white",i));
        }
        //We update the buttons in proportion with the num of buttons we have
        this.update_buttons();
    }
    /**
     * draw_buttons
     * We draw all the buttons
     */
    public draw_buttons(gc:CanvasRenderingContext2D,simon_logic:SimonLogic) {
        //We draw all the buttons
        //this.update_buttons()
        //console.log(this.list_of_buttons)
        for (const button of this.list_of_buttons){
            button.draw_button(gc,simon_logic)
        }
    }

    /**
     * update_num_buttons
     * We change the number of buttons
     */
    public update_num_buttons(num:number) {
        //We check that we have between 1 and 10 buttons
        if (this.number_of_buttons+num<=10 && this.number_of_buttons+num>=1){
            //we update the num of buttons
            this.number_of_buttons+=num;
            //we add a new button
            if (num>0){
                //We add a new button with default characteristic
                this.list_of_buttons.push(new Button(this.default_radius,[0,window.innerHeight/2],"white",this.number_of_buttons-1));
                //We update the colours and positions of all the buttons
                this.update_buttons();

            }
            //we remove a button
            else{
                this.list_of_buttons.pop();
                this.update_buttons();
            }
        }
        else{
            console.log('Wrong number of buttons, buttons provided: '+this.number_of_buttons);
        }
    }

    
    /**
     * update_buttons
     * we update the buttons in case of increasing the num of buttons or resize
     */
    public update_buttons():void {
        //Declare variables for the loop
        let x_coordinate=0;//starting pos
        let hue=0;//For the colours

        //what we sum to x coordinate to have a proportion of the circles, 
        //is +1 so it doesn't go on the borders of the window
        const x_change=window.innerWidth/(this.number_of_buttons+1);
        const hue_change=360/this.number_of_buttons+1//to have different colours
        
        //We create num_of_buttons
        for (const button of this.list_of_buttons){
            hue+=hue_change;
            x_coordinate+=x_change;
            let text =`hsl(${hue}, 100%, 50%)`;
            button.change_colour(text);
            button.change_x(x_coordinate)        
        }
    }

    /**
     * hit_test
     * This method tells you the number of the button where the point is inside of it
     * if it returns -1 it means that none of the buttons where selected
     */
    public hit_test(x_coordinate:number,y_coordinate:number):number {
        //variable to save the button selected
        let button_num=-1;//if it returns -1, then it means that we didn't found the button
        //We iterate to find the point with the closest distance
        for (const button of this.list_of_buttons){
            //conditionals to check if the point is inside a button
            if (button.hittest(x_coordinate,y_coordinate)==true){
                button.button_selected(true);
                button_num=parseInt(button.get_id)-1;
            }
            else{
                //It means we are not selecting the button
                button.button_selected(false);
            }
        }
        return button_num;//it means the id of  the buttons are selected
    }

    /**
     * unselect_all_buttons
     * This method is in charge of unselecting all buttons
     */
    public unselect_all_buttons() {
        for (const button of this.list_of_buttons){
            button.button_selected(false)
        }
    }


    /**
     * get_button
     * it returns an specific button
     */
    public get_button_id(n:number) {
        //verify that is within the limit of the list
        if (n<this.number_of_buttons && n>=0){
            return this.list_of_buttons[n];
        }
        return;
    }


    /**
     * reset:y_pos
     * we reset the y_pos of all the buttons
     */
    public reset_y_pos() {
        const default_y=window.innerHeight/2
        console.log("reset y pos")
        for (const button of this.list_of_buttons){
            button.change_height(default_y)
        }
    }
    /**
     * reset_radius
     */
    public reset_radius() {
        for (const button of this.list_of_buttons){
            button.change_radius(this.default_radius)
        }
    }
    // * animations
    /**
     * idle_animation
     */
    public idle_animation(time:number) {
        //We only play this animation when we are idle

        //variables
        const amplitude=0.2*window.innerHeight;
        const y_offset=0.5*window.innerHeight;
        let i=1;
        for (const button of this.list_of_buttons){
            //We set the buttons with different speeds
            const min_frequency = 0.001; // Adjust the minimum frequency
            const max_frequency = 0.003; // Adjust the maximum frequency
            const frequency = max_frequency - min_frequency;
            let speed;
            //If we have only one button we choose a default frequency
            if (this.num_of_buttons==1) {
                speed=min_frequency;
            }
            else{
                //We choose a different speed depending on the button
                speed = min_frequency + (i / (this.num_of_buttons - 1)) * frequency;
            }
            // Offset the phase to stagger the button heights
            const phase_offset = i * 0.005; 
            //We calculate the new y position of the button
            const y=y_offset+amplitude*Math.sin(speed*time+phase_offset);
            //We change the y of the button
            button.change_height(y);
            i++;
        }
    }
        
    /**
     * loss_animation
     */
    public loss_animation(time_diff:number) {
        //Variables
        const y_offset=0.5*window.innerHeight;
        let i=1;
        for (const button of this.list_of_buttons){
            //We set the buttons with different speeds
            const acceleration=(0.0001*((i)%3)+0.001);
            // y= y0+1/2*acceleration*time**2 (formula)
            const y=y_offset+1/2*acceleration*time_diff**2;
            button.change_height(y);
            i++;
        }
    }

    /**
     * bigger_animation
     */
    public bigger_animation(button_number:number,time_diff:number) {
        const button = this.list_of_buttons[button_number];
        const acceleration=0.5*(10**-3)
        const new_radius=this.default_radius+(1/2)*acceleration*(time_diff**2)
        //console.log(new_radius)
        button.change_radius(new_radius)
    }
    
}
