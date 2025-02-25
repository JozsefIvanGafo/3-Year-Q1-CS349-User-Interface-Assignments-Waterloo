/* 
University of Waterloo 2023-24 / CS 349 / A2
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling the model of the mvc
*/

//imports
import { Subject } from "./observer";


export class Model extends Subject {

  //properties
  id=0;
  private _count = 10;
  public swatch_list:[number,number,number][]=[];

  //get functions
  get count() {
    return this._count;
  }
  get hue(){
    return this.swatch_list[this.id][0]
  }
  get saturation(){
    return this.swatch_list[this.id][1]
  }
  get lum(){
    return this.swatch_list[this.id][2]
  }

  //Constructor
  constructor(){
    super();
    //Generate the swatch list with random colours
    this.generate_hsl_list()


  }


  // We increase the number of swatches
  increment() {
    console.log("increase");

    //The mas number of swatches at a given moment is 16
    if (this._count<16){
      //increment the counter and update id
      this._count++;
      this.id=this.count-1;

      //generate new hsl
      this.getRandomHSL()

      // we notify the observer
      this.notifyObservers();
    }
    else console.log("max count reached");
  }

  //We delete the current selected swatch
  decrease(){
    console.log("decrease");

    //The minimum number of swatches at a given moment is 1
    if (this._count>1){
      //update counters and id
      this._count=this._count-1;

      //We delete the selected swatch
      this.swatch_list.splice(this.id,1);
      
      //We change the id if the selected swatch 
      //is the last one and we delete it
      if (this.id==this.count){
      this.id=this.count-1;
      }
      //We notify the observer
      this.notifyObservers();

    }else console.log("min count reached")
    //this.reset_id();
  }

  //We select another swatch
  public select_swatch(id:number){
    //We update the id because now we selected a new swatch
    this.id=id;

    //We notify the observer
    this.notifyObservers();
  }
  
  //We change the hue when we modify the hue text field
  change_hue(hue:number){
    this.swatch_list[this.id][0]=hue;
    this.notifyObservers();
  }
  //We change the sat when we modify the sat text field
  change_sat(sat:number){
    this.swatch_list[this.id][1]=sat;
    this.notifyObservers();
  }
  //We change the lum when we change the lum text field
  change_lum(lum:number){
    this.swatch_list[this.id][2]=lum;
    this.notifyObservers();
  }

  //Methods to generate swatches

  //Generate the default hsl_values
  private generate_hsl_list(){
    //Generate as many swatches we have
    for (let i=0; i<this.count;i++){

      this.getRandomHSL();
    }
  }
  
  //methods to generate random hue,sat and lum for the swatches
  private getRandomHSL() {
    const randomHue = Math.floor(Math.random() * 360); // Random hue value between 0 and 360 degrees
    //We use 101 so we include the 100
    const randomSaturation = Math.floor(Math.random() * 101); // Random saturation value between 0% and 100%
    const randomLuminosity = Math.floor(Math.random() * 101); // Random luminosity value between 0% and 100%
  
    const randomHSL = [randomHue,randomSaturation,randomLuminosity];
    this.swatch_list.push([randomHSL[0],randomHSL[1],randomHSL[2]])
    
    return randomHSL;
  }
}
