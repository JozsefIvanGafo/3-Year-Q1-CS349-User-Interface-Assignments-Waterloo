/* 
University of Waterloo 2023-24 / CS 349 / A2
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is charge of handling the mid top container called Editor
*/

// Import
import { Model } from "../../mvc/model";
import { Observer } from "../../mvc/observer";
import { SKContainer } from "../../simplekit/widget";
import * as Layout from "../../simplekit/layout"
import { Right } from "./right";

//Main class
export class Editor extends SKContainer implements Observer{
    //Define left and right
    left:SKContainer=new SKContainer();
    right:Right;
    
    //We update when an observer event is created
    update(): void {
        //We change the hue and saturation and lum of the left part
        this.setHSV(this.model.hue,this.model.saturation,this.model.lum)
        //The right part has an other update so that is why is not included here
      }

    constructor(private model:Model,debug:boolean=false){
        super();
        //debug
        this.debug=debug;
        //Set parameters of the container
        this.id="editor";
        this.fill="whitesmoke";
        //Parameters
        this.y=50//After the top
        this.box.padding=10;
        this.fillWidth=1;
        this.fillHeight=1;
        //layout
        this.layoutMethod=Layout.makeFillRowLayout({gap:10});

        //left
        this.initialize_left();
        this.addChild(this.left);
        //Right
        this.right=new Right(model,this.debug);
        this.addChild(this.right);

        //register observers
        this.model.addObserver(this);
    }

    private initialize_left() {
        //We initialize the left SKContainer

        //Parameters for the left SKcontainer
        this.left.id="left";
        this.left.debug=this.debug;
        this.left.border="black"
        this.left.fillWidth=2;
        this.left.fillHeight=1;

        //Set hue,sat and lum values of the left container
        this.setHSV(this.model.hue,this.model.saturation,this.model.lum)
        
    }
    //Change the hue, sat and lum of the left skcontainer
    private setHSV(hue: number, saturation: number, lum: number) {
        const backgroundColor = `hsl(${hue},${saturation}%,${lum}%)`;
        this.left.fill=backgroundColor;
        
    }
}
