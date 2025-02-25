/* 
University of Waterloo 2023-24 / CS 349 / A3
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling the right div inside of editor div
*/

//imports
import { Observer,Model } from "../../mvc";

export class Right implements Observer{
    //properties

    private _colour_containers:[HTMLElement,HTMLElement,HTMLElement];

    update(): void {
        //We update the values of all input inside the right div
        this._update_values();
        
    }

    constructor(private model:Model){
        console.log("initialization of the right container")

        //We load all the containers inside the right div (hue,sat,lum)
        //Reason it allow us to easily position on the screen


        //We load the hue,sat, lum
        const [hue, sat, lum] = Array.from(document.querySelectorAll(".change-colour")) as [HTMLElement, HTMLElement, HTMLElement];

        //We didn't find the id= hue or sat or lum div
        if (!hue || !sat || !lum) {
            throw new Error("[ERROR] One or more colour containers were not found");
        }


        //In here we have all the containers inside a list so
        //later we can iterate this list to change the input values
        this._colour_containers=[hue,sat,lum]

        //We update the input values to the selected swatch
        this._update_values();

        //We create the event listener of all the inputs inside the right div
        this._create_add_event_listener();

        //add observer
        this.model.addObserver(this);

    }


    private _update_values() {

        //We obtain the current hue,sat and lum values
        const selected_swatch=this.model.current_swatch;

        //We iterate hue,sat and lum divs
        this._colour_containers.forEach((container,i)=>{

            //We obtain a list of inputs 
            const container_inputs=container.querySelectorAll("input");
            if (!container_inputs)throw new Error("[ERROR] Input not found");

            //We obtain the value of the currently selected swatch
            // hue pos 0, sat pos 1 and lum pos 2
            const new_value=selected_swatch[i];

            //We iterate all the inputs of the current container (hue,sat or lum)
            container_inputs.forEach(single_input=>{

                //We assign the new value (value of the selected swatch)
                single_input.value=new_value.toString();
            })

        })
        
    }


    private _create_add_event_listener() {
        //This method is similar to _update_values but we add event_listener

        //we iterate hue,sat and lum div
        this._colour_containers.forEach((container,i)=>{

            //We obtain the container inputs
            const container_inputs=container.querySelectorAll("input");
            if(!container_inputs) throw new Error("[ERROR] Input not found");
            
            //We iterate each input
            container_inputs.forEach(single_input=>{
                //Variables
                //If is hue (upper bound of 360)
                //else is sat, lum (upper bound is 100)
                //hue pos 0, sat pos 1 and lum pos 2
                let upper_bound=100;
                if (i==0){
                    upper_bound=360;
                }

                //Current input selected on the ith container of right div
                single_input.addEventListener("input",()=>{

                    //Variables
                    let new_selected_swatch=this.model.current_swatch;//current hsl selected
                    let new_value;
         
                    //new selected input value
                    new_value=parseInt(single_input.value);

                    //check Boundary values
                    //The case is within the limit
                    if (new_value>=0 && new_value<=upper_bound){
                        new_selected_swatch[i]=new_value;
                    }
                    //case is under 0 or case of empty string (in case we delete it)
                    else if (new_value<0 ||single_input.value==""){
                        new_selected_swatch[i]=0;
                        single_input.value="0";
                    }
                    //In case we are upper the upper_bound
                    else{
                        new_selected_swatch[i]=upper_bound;
                        single_input.value=upper_bound.toString();
                    }
                    //now we change the model and signal the observer
                    this.model.change_hsl(new_selected_swatch)
                })
            })
        })
    }
}
