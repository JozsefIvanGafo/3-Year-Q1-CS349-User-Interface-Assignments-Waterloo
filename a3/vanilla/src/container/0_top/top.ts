/* 
University of Waterloo 2023-24 / CS 349 / A3
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling the top div
*/

//imports
import { Observer,Model } from "../../mvc";


export class Top implements Observer{
    //properties
    add_button:HTMLButtonElement;
    remove_button:HTMLButtonElement;

    update(): void {
        //Disable or enable buttons as we reach min or max
        
        //Max case
        if (this.model.max_reached){
            this.add_button.disabled=true;
        }
        //Min case
        else if(this.model.min_reached){
            this.remove_button.disabled=true;
        }
        //We are not in min or max cases
        else{
            this.add_button.disabled=false;
            this.remove_button.disabled=false;
        }
        
    }


    constructor(private model:Model){
        console.log("Initializing the top container")
        
        //create view of the container
        //We don't use template because the structure is already defined in html
        const top_view=document.querySelector(".top") as HTMLElement;
        if (!top) throw new Error("[ERROR] Top container not found");

        //Obtain the buttons of add and remove
        const add=top_view.querySelector("button#add")as HTMLButtonElement;
        const remove=top_view.querySelector("button#delete")as HTMLButtonElement;
        if (!add || !remove)throw new Error("[ERROR] button view not found");

        //We load the button into a variable
        this.add_button=add;
        this.remove_button=remove;

        //We create event listener for both buttons
        this.add_button.addEventListener("click",()=>{
            model.increment()
        })
        this.remove_button.addEventListener("click",()=>{
            model.decrease()
        })
        //We register with this model
        this.model.addObserver(this);

    }
}

