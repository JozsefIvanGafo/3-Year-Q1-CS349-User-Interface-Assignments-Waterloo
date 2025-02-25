/* 
University of Waterloo 2023-24 / CS 349 / A2
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling the bot container (Status)
*/

//Imports
import { Model } from "../mvc/model";
import { Observer } from "../mvc/observer";
import { SKLabel,SKContainer } from "../simplekit/widget";
import { makeRightAlignedLayout } from "../layout/right_layout";


//Create the bot container class
export class Bot extends SKContainer implements Observer{

    //We update when an observer event is created
    text:SKLabel=new SKLabel("");
    update():void{
        this.update_text()
    }

    constructor(private model:Model,root_height:number,debug:boolean=false){
        super();
        //debug
        this.debug=debug;
        //parameters
        this.id="bot";
        this.text.debug=debug;
        this.fill="lightgrey";
        //the canvas height - 50(that is the height of this container)
        this.y=root_height-50;
        this.box.padding=10;
        this.fillWidth=1;
        this.height=50;
        this.text.align="right";
        


        //Add the label to the container
        this.addChild(this.text);
        //layout
        this.layoutMethod=makeRightAlignedLayout();
        this.model.addObserver(this);
        
    }
    //We update to the current #swatches and teh currently selected swatch
    update_text(){
        const label_text = `${this.model.count} swatches (selected #${this.model.id+1})`;
        this.text.text=label_text;
    }
}
