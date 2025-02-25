/*
University of Waterloo 2023-24 / CS 349 / A1
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module in charge of handling the animations
*/

import { UIManager } from "../ui_manager";
import { SimonLogic } from "../simonlogic";

export class Animation{
    //properties
    private simon_instance:SimonLogic;
    private ui_manager_instance:UIManager;
    //private finished_big_animation:boolean;
    private idle:[boolean,number];//[0] is to tell us that the machine is idle or not and [1] is the starting time
    private lose:[boolean,number];//[0] tells us what that we lost or not, [1] is the starting time
    //[0] tells us if we are running the bigger animation, [1]  tells us 
    //the button we do the bigger button animation
    //private bigger:[boolean,number];
    private wait_time:[boolean,number];
    //constructor
    constructor(simon:SimonLogic,ui_manager:UIManager){
        //Instances
        this.simon_instance=simon;
        this.ui_manager_instance=ui_manager;
        //Animation variables
        //The first position tells us if the animation is active
        //The second position tells us the start time
        this.idle=[false,-1];
        this.lose=[false,-1];
        this.wait_time=[false,-1];
    }

    /**
     * animate
     * main function to animate all the objects
     */
    public animate(time:number,simonlogic:SimonLogic) {
        //We update the simon_instance in case we had to restart the game
        this.simon_instance=simonlogic;
        switch(this.simon_instance.state){
        //Animation that happens in START (idle)
        case "START":
            //We do this to avoid teleportations when we reset to idle animation
            if (this.ui_manager_instance.reset_idle_animation===false){
                this.ui_manager_instance.reset()
                this.ui_manager_instance.reset_idle_animation=true;
                this.idle[0]=false;
            }
            this.idle_animation(time)
            break
        //Animation on computer (bigger animation)
        case "COMPUTER":
            //We close all other animations
            this.idle[0]=false;
            this.lose[0]=false;
            //We unselect all buttons so that there is no outline
            this.ui_manager_instance.set_of_buttons_instance.unselect_all_buttons()

            //We start by taking the next button of the simon game
            if (this.ui_manager_instance.simulation_lock[0]==false){
                //We activate the lock so we don't go to the next button
                //We calculate the next button
                const next_button=this.simon_instance.nextButton()
                //We update the score
                this.ui_manager_instance.update_cheats(next_button+1)
                //We update the end time and the button number we update
                this.ui_manager_instance.simulation_lock=[true,time,next_button];
            }
            //animation
            this.check_big_animation(time)   
            break
        //Animation on human getting bigger when we click the button
        case "HUMAN":
            this.check_big_animation(time)            
            break
        
        case "WIN":
            //This is to see the button we clicked animation even if we won
            //if is false idle animation
            if (this.check_big_animation(time)===false){
                this.ui_manager_instance.simulation_lock[0]=false;
                this.idle_animation(time)}
            break
        case "LOSE":
            //This is to see the button we clicked animation even if we lost
            //if is false lost animation
            if (this.check_big_animation(time)==false){
                this.ui_manager_instance.simulation_lock[0]=false;
                this.lost_animation(time)}
            break
        }

    }

    /**
     * idle_animation
     * Is the idle animation that the buttons do when they are 
     * waiting the user to press space
     */
    private idle_animation(time:number) {
        //If is the first time we record the start time
        if(this.idle[0]==false){
            //This is to avoid teleportation when we restart the idle_animation
            this.idle=[true,time];
        }

        const time_diff=time-this.idle[1];
        this.ui_manager_instance.idle_animation(time_diff)
    }
    /**
     * lost_animation
     * It handles the lost animation
     */
    public lost_animation(time:number) {
        if (this.lose[0]==false){
            this.lose=[true,time];
        }
        //To avoid teleportation when we lost 2 rounds
        this.ui_manager_instance.lost_animation(this.lose[1],this.lose[1]+5,time);
    }

    /**
     * check_big_animation
     * We check if we have to do the bigger button animation
     */
    private check_big_animation(time:number):boolean{
        //If there is a lock then we animate the bigger button animation
        if(this.ui_manager_instance.simulation_lock[0]===true){
            const bigger_anim_finished= this.bigger_animation(time);
            this.ui_manager_instance.set_of_buttons_instance.unselect_all_buttons()
            //If the animation is finished we wait 500mS
            if (bigger_anim_finished==true){
                //If we finished waiting we close the animation lock
                if(this.wait_500ms(time)==true){
                    this.ui_manager_instance.reset_radius()
                    this.ui_manager_instance.simulation_lock[0]=false;
                }
            }
            return true;//we are still animating
        }
        return false;//We are not animating anymore
    }


    /**
     * bigger_animation
     * It handles the bigger animation
     * 
     */
    private bigger_animation(time:number) {
        
        //If end time >time we didn't finish the animation
        if (this.ui_manager_instance.simulation_lock[1]+250>time){
            const diff_time = time -this.ui_manager_instance.simulation_lock[1]
            //const diff_time= this.bigger[1]+500*time
            this.ui_manager_instance.bigger_animation(this.ui_manager_instance.simulation_lock[2],diff_time)
            return false//We didn't finished the animation
        }
        //we finished the animation
        return true;
        
    }
    /**
     * wait_500ms
     */
    private wait_500ms(time:number) {
        //If we is the first time entering we record the end time
        if (this.wait_time[0]==false){
            this.wait_time=[true,time+250]
        }
        //If is finished the waiting then we remove the simulation lock
        if (time>this.wait_time[1]){
            //we can go to the next 
            this.wait_time[0]=false
            this.ui_manager_instance.simulation_lock[0]=false;
            return true;
        }
        return false;
    }

    

}
