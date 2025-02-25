/* 
University of Waterloo 2023-24 / CS 349 / A3
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling the model
*/

//import
import {Subject } from "./observer";

export class Model extends Subject{

    //properties
    private _id=0;//current id selected
    private _count=10;//how many swatched by default we have 10
    private _swatch_list:[number,number,number][]=[];//nested list for swatches pos 0 hue, 1 sat and 2 lum
    private _max=16;//max #swatches allowed
    private _min=1;// min #swatches allowed

    //get function
    get id():number{
        return this._id;
    }
    get count():number{
        return this._count;
    }
    get swatch_list():[number, number, number][]{
        return this._swatch_list;
    }
    get current_swatch():[number, number, number]{
        return this._swatch_list[this._id];
    }
    get max_reached():boolean{
        return this._count==this._max;
    }
    get min_reached():boolean{
        return this._count==this._min;
    }

    //constructor
    constructor(){
        super();
        //we generate the first _count swatch with random hsl
        this.__generate_hsl_list()
    }

    /**
     * increment
     */
    public increment() {
        //We first check that we didn't reached the max # of swacthes
        if(this._count<this._max){
            console.log("increase")
            //Update counters
            this._count++;
            this._id=this._count-1;//the new selected is the new swatch 

            //create new swatch
            this.__push_random_hsl()

            this.notifyObservers()
        }else console.log("[ERROR] Max number of swatches reached")
    }
    /**
     * decrease
     */
    public decrease() {
        //We first check that we didn't reached the min # of swacthes
        if(this._count>this._min){
            console.log("decrease")
            this._count--;
            
            //We delete the selected swatch
            this._swatch_list.splice(this._id,1)
            
            //if the selected swatch is the last one then 
            //then we assign the last id avaible
            if (this._id==this._count){
                this._id=this._count-1;
            }
            this.notifyObservers()

        }else console.log("[ERROR] Min number of swatches reached")
    }

    /**
     * select_swatch
     */
    public select_swatch(id:number) {
        //We first check that the swatch selected is within the allowed range
        if((id>=0)&&(id<this._max)){
            this._id=id;
            this.notifyObservers()
        }else console.log("[ERROR] Invalid swatch selected")
    }

    /**
     * change_hsl
    */
    public change_hsl(new_colour:[number,number,number]) {
        //We update the selected hsl with the new values
        this._swatch_list[this._id]=new_colour;
        this.notifyObservers();
    }



    //private methods
    private __generate_hsl_list():void{
        //We generate the first this._count swatches (used on  the constructor)
        for (let i=0;i<this._count;i++){
            this.__push_random_hsl()
        }
    }
    
    private __push_random_hsl():void{
        //We create a random hue,sat and lum for the new swatch
        const random_hue=Math.floor(Math.random()*360);//random hue value between 0 and 360
        //we use 101 so we include the 100 (max)
        const random_sat=Math.floor(Math.random()*100);
        const random_lum=Math.floor(Math.random()*100);
        this._swatch_list.push([random_hue,random_sat,random_lum])
    }

}
