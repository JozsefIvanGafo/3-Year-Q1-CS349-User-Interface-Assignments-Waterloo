/*
University of Waterloo 2023-24 / CS 349 / A1
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling the events
*/
//imports
import { UIManager } from "../ui_manager";
import { SimonLogic } from "../simonlogic";
import {FundamentalEvent,} from "../simplekit/create-loop";
export class Event{
  //properties
  private ui_manager:UIManager;
  private simonlogic:SimonLogic;
  

  //constructor
  constructor(UIManager:UIManager,simon:SimonLogic){
    this.ui_manager=UIManager;
    this.simonlogic=simon;
    
  }
  /**
   * event
   * this method is in charge of detecting the events and doing the appropriate 
   * changes to the simon game and the UIManager
   */
  public event(eventQueue:FundamentalEvent[],gc:CanvasRenderingContext2D,time:number):SimonLogic{
    //while there is an event on the queue
    while (eventQueue.length > 0) {
      const event = eventQueue.shift();
      //no event is happening
      if (!event) continue;
      

      // * All time events
      //Events that can happened anytime it doesn't matter the state
      if(this.check_all_time_events(event,gc)===true)continue;

      //If the bigger animation is going on we cannot do the specific actions
      //If there is no animation lock we can do the different actions
      if (this.ui_manager.simulation_lock[0]==false){
      // * Events that depends on the state of the simon game machine
      switch(this.simonlogic.state){
        //If we press start we should start a new round
        case "START":
          // * Check possible events on start
          //Check if we start a new round
          if(this.check_if_new_round(event)===true)continue;
          //We check if we have to increase or decrease the buttons
          if(this.check_increase_or_decrease_of_buttons(event)===true)continue;
          break
        case "COMPUTER":
          
          break
        case "HUMAN":
          //Human turn
          // * Check possible win events
          //Hittest
          this.check_hittest_or_press(event,time)
        
          break
        case "WIN":
          //console.log("hii")
          this.ui_manager.simulation_lock[0]=false;
          //Human wins a round

          // * Check possible win events
          //If space is pressed then we go to the next round
          if(this.check_if_new_round(event)===true)continue;

          //We check if we have to increase or decrease the buttons
          if(this.check_increase_or_decrease_of_buttons(event)===true)continue;
          break
        case "LOSE":
          //The human lost the round
            // *Check possible lose events
            //If space is pressed then we start a new round
            if(this.check_if_new_round(event)===true)continue;

            //We check if we have to increase or decrease the buttons
            if(this.check_increase_or_decrease_of_buttons(event)===true)continue;
      }
      }
    }
  //We return simonlogic instance in case we reset the game
  return this.simonlogic;
  }

  /**
   * check_all_time_events
   * This method checks if all time event happened. An all event is an 
   * event that can occurs in every state of the simon game machine 
   * that are resize, restart and cheat mode
   */
  private check_all_time_events(event:FundamentalEvent,gc:CanvasRenderingContext2D):boolean{
    //If resize then we also resize the window
    if (event.type =="resize"){
      //Update the canvas to the resize size
      gc.canvas.width = window.innerWidth;
      gc.canvas.height = window.innerHeight;
      //We update the UIManager positions when we resize
      this.ui_manager.resize();
      return true;
    }
    
    //restart the game when we press q
    if(event.key==="q" && event.type==="keydown"){
      console.log("reset");
      this.simonlogic=new SimonLogic(this.ui_manager.reset());
      this.ui_manager.reset();
      return true;
    }
    
    //We toggle the cheats on xor of
    if (event.key==="?" && event.type==="keydown"){
      this.ui_manager.activate_deactivate_cheats();
      return true;
    }
    return false;
  }

  /**
   * check_if_new_round
   * This method will tell us if the key space was pressed
   * and if yes we begin a new round
   */
  private check_if_new_round(event:FundamentalEvent):boolean{
    if (event.key===" " && event.type=="keydown"){
      this.ui_manager.simulation_lock[0]=false;
      //We generate a new round
      this.simonlogic.newRound();
      //We update the values of cheat_list to empty list and we update the score
      this.ui_manager.new_round(this.simonlogic.score)
      //this.ui_manager.update_score(this.simonlogic.score)
      //console.log(this.simonlogic.index);
      return true;
  }
  return false;
  }

  /**
   * check_increase_or_decrease_of_buttons
   * It checks whether we increase the buttons or decrease 
   * when the program is waiting the user press space
   * It returns a boolean to tell the program to go to the next event on the queue
   */
  private check_increase_or_decrease_of_buttons(event:FundamentalEvent):boolean{
    //We return a boolean so we can finish the current event loop
    //We decrease the num of buttons and restart the game
    if(event.key==="-" && event.type==="keydown"){
      console.log("decrease")
      this.ui_manager.simulation_lock[0]=false;
      //We restart the simon game
      this.simonlogic=new SimonLogic(this.ui_manager.decrease_num_of_buttons())
      this.ui_manager.reset()

      return true;
    }
    //We increase the num of buttons and restart the game
    if(event.key==="+" && event.type==="keydown"){
      console.log("increase");
      this.ui_manager.simulation_lock[0]=false;
      this.simonlogic=new SimonLogic(this.ui_manager.increase_num_buttons());
      this.ui_manager.reset()
      return true;

    }
    return false;
  }

  /**
   * check_hittest_or_press
   * This method checks whether the mouse is inside the button or we clicked the button
   */
  private check_hittest_or_press(event:FundamentalEvent,time:number){
    //We check if the event is type mousemove or mousedown
    if (event.type=="mousemove"||"mousedown"){

      // ! we check if the event.x or event.y is defined (to avoid errors)
      if (typeof(event.x) !=="undefined" && typeof(event.y)!=="undefined"){
        //We record the button (in this method we already outline the button)
        const button_num=this.ui_manager.hit_test_button(event.x,event.y);

        //If we made a click
        if (event.type=="mousedown"){
          //Conditional to make sure that we can only hit a button
          if (button_num !== -1){
            //we verify if is the correct button
            if(this.simonlogic.verifyButton(button_num)===true){
              console.log("click")
              //If it is the correct button we remove the first button of the sequence and we play the animation
              this.ui_manager.shift_cheat_text()
            }
            this.ui_manager.simulation_lock=[true,time,button_num];

          }
        }
      }
    }
  }
}
