/* 
University of Waterloo 2023-24 / CS 349 / A2
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module of managing the top container
*/

//Imports
import { Model } from "../mvc/model";
import { Observer } from "../mvc/observer";
import {  SKContainer } from "../simplekit/widget";
import * as Layout from "../simplekit/layout";
import { CustomButton } from "../custom_buttons/custom_button";


export class Top extends SKContainer implements Observer{
    //create buttons (they are custom buttons)
    add:CustomButton=new CustomButton("add")
    delete:CustomButton=new CustomButton("delete")
    //When an observer event is generated
    update(): void {
        if (this.model.count==16){
            this.add.limit_reached()
        }
        else if (this.model.count==1) {
            this.delete.limit_reached()
        }else{
            this.add.limit_not_reached();
            this.delete.limit_not_reached();
        }
      }

    constructor(private model:Model,height:number,debug:boolean=false){
        super();
        //debug
        this.debug=debug;
        //Set parameters of the container
        this.id="top";
        this.fill="lightgrey";
        this.height=height;
        this.fillWidth=1;
        this.box.padding=10;
        this.layoutMethod=Layout.makeFillRowLayout({gap: 10});

        //add buttons
        this.add.id="add";
        this.delete.id="delete";
        this.add.debug=debug;
        this.delete.debug=debug;
        this.add.width=100;
        this.delete.width=100;
        this.addChild(this.add);
        this.addChild(this.delete);

        //we create event listeners for the buttons
        this.add.addEventListener("action",()=>{
            model.increment();
        })

        this.delete.addEventListener("action",()=>{
            model.decrease();
        })
        //register observers
        this.model.addObserver(this);
    }
}
