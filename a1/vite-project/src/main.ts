/* 
University of Waterloo 2023-24 / CS 349 / A1
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of running the simon game
*/
// * Imports
import { FundamentalEvent,createRunLoop } from "./simplekit/create-loop";
import { SimonLogic } from "./simonlogic";
import { UIManager } from "./ui_manager";
import { Draw,Animation,Event } from "./main_functionalities";

// * Instances
const default_number_of_buttons=5;
const ui_manager= new  UIManager(default_number_of_buttons)
let simon_logic_instance=new SimonLogic(default_number_of_buttons);//it can changed when we restart the game

// * classes for drawing, events and animations
const draw_instance=new Draw(ui_manager)
const event_instance=new Event(ui_manager,simon_logic_instance)
const animate_instance=new Animation(simon_logic_instance,ui_manager)

// * We define the loop
// this is the main loop for the UI toolkit
function loop(
  gc: CanvasRenderingContext2D,
  eventQueue: FundamentalEvent[],
  time: number
) {
  // log any fundamental events
  simon_logic_instance=event_instance.event(eventQueue,gc,time)//We update simon_logic_instance if we restarted the game
  //We animate
  animate_instance.animate(time,simon_logic_instance)
  //We draw the all the 
  draw_instance.draw(gc,simon_logic_instance)
}


//* We start the code
console.log("This was programmed by József Iván Gafo (WatId:21111635) for the University of Waterloo 2023-24, CS 349 , A1")
console.log("starting Simon game")
//We set up the canvas
const canvas =draw_instance.set_canvas()
// use canvas in event loop
createRunLoop(canvas, loop);
