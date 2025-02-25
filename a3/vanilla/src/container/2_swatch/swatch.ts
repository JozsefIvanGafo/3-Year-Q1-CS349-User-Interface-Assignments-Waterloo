/* 
University of Waterloo 2023-24 / CS 349 / A3
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling the bot div of the html file
*/

//Imports
import { Observer,Model } from "../../mvc";


export class SwatchContainer implements Observer{
    //properties
    private _swatch_container:HTMLElement;


    update(): void {
        //We remove all the swatches and create again all the swatches
        this._create_swatch()
    }

    constructor(private model:Model){
        console.log("Initializing the swatch container")

        //create container
        this._swatch_container=document.querySelector(".swatch_container") as HTMLElement;
        if (!this._swatch_container)throw new Error("[ERROR] Swatch container not found");

        //We create all swatches
        this._create_swatch();

        //we register the events of this class
        this.model.addObserver(this);
    }
    
    private _create_swatch() {
        const swatch_color_list=this.model.swatch_list;

        // Empty the swatch container
        this._swatch_container.innerHTML="";

        //We create all the children
        for (let i=0; i<this.model.count;i++){
            //extract colours of the swatch
            const [hue,sat,lum]=swatch_color_list[i];

            //Create swatch
            const swatch=document.createElement("button");
            swatch.className="swatch";
            swatch.id=`${i}`
            swatch.style.background= `hsl(${hue}, ${sat}%, ${lum}%)`;

            //If the i swatch is selected then the border is black
            if(this.model.id==i){
                swatch.style.border="2px solid black"
            }

            //Add event listener
            swatch.addEventListener("click",()=>{
                this.model.select_swatch(i);
            })

            //append child to container
            this._swatch_container.appendChild(swatch)
        }
    }


}   
