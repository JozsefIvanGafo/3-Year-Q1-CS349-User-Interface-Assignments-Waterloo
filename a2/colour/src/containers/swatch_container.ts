/* 
University of Waterloo 2023-24 / CS 349 / A2
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling all the swatches
*/

// Imports
import { SKContainer } from "../simplekit/widget";
import { Observer } from "../mvc/observer";
import { Model } from "../mvc/model";
import * as Layout from "../simplekit/layout"
import { Swatch } from "../custom_buttons/swatch";



//Container of swatches
export class SwatchContainer extends SKContainer implements Observer{

    // We update when an observer event is created
    update(): void {
        //We clear the childs and then create all the swatches 
        //(not the most efficient method but it works and is easy to implement)
        this.clearChildren();
        this.create_swatchs();
      }

    constructor(private model:Model,height:number,debug:boolean=false){
        super();
        //debug
        this.debug=debug;
        //Parameters of the container
        // set y pos after editor
        this.y=50+height;
        this.box.padding=10;
        this.fillHeight=1;
        this.fillWidth=1;
        
        //Create the default 10 swatches
        this.create_swatchs();
        
        //layout of the container
        this.layoutMethod=Layout.makeWrapRowLayout({gap:20})

        //register observers
        this.model.addObserver(this);
    }

    private create_swatchs() {
        /**
         * We loop as many times the model swatch list has
         * The reason the swatch list is on model is that we need a kind of 
         * global variable to change the colours of the swatch.
         */
        for (const [i,hsl] of this.model.swatch_list.entries()){
            //We create the swatch
            const swatch = new Swatch(i.toString(),this.model,0, 0, 50, 50);
            swatch.id=i.toString();
           
            //Set colour from the model.swatch_list
            swatch.setHSV(hsl[0], hsl[1], hsl[2]);

            //We create an event listener to update the selected swatch
            swatch.addEventListener("action", () => {
                const id=parseInt(swatch.id);
                this.model.select_swatch(id);
                
            });
            //We add child to the container
            this.addChild(swatch);
        }
    }
}
