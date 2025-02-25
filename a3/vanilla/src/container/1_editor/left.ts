/* 
University of Waterloo 2023-24 / CS 349 / A3
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling the left div inside of editor div
*/

//imports
import { Observer,Model } from "../../mvc";

export class Left implements Observer{
    //properties
    private _left:HTMLElement;

    update(): void {
        //We update the background to the selected swatch
        this._update_background();

    }
    constructor(private model:Model){
        console.log("initialization of the left container")

        //We obtain the left container
        this._left=document.querySelector(".left") as HTMLElement;
        if (!this._left)throw new Error("[ERROR] Left container not found");

        //set initial background
        this._update_background();

        //Add observer
        this.model.addObserver(this);
    }

    private _update_background():void{

        //Obtain the selected values of the hsl from the model
        const [hue,sat,lum]=this.model.current_swatch

        //We update background
        this._left.style.background=`hsl(${hue}, ${sat}%, ${lum}%)`;
    }
}
