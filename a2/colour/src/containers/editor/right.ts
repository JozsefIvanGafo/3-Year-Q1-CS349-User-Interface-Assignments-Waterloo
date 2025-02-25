/* 
University of Waterloo 2023-24 / CS 349 / A2
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling the mid top right container (change values of hue,sat and lum)
*/

//Imports
import { Model } from "../../mvc/model";
import { Observer } from "../../mvc/observer";
import { SKContainer} from "../../simplekit/widget";
import { SKLabel} from "../../simplekit/widget";
import { makeCentralizedLayout } from "../../layout/custom_central_layout";
import { CustomTextField } from "../../custom_buttons/custom_text_field";

//Right class
export class Right extends SKContainer implements Observer{
    //Define the list where we will change the text field values
    private text_field_list:CustomTextField[]=[];

    //We update whena n observer event is created
    update(): void {

        //We update the text to the swatch that is currently selected
        this.reset_text();
        
    }

    constructor(private model:Model,debug:boolean=false){
        super();

        //Parameters of the container
        this.id="right";
        this.box.padding=10;
        this.border="black";
        this.fillWidth=1;
        this.fillHeight=1;
        this.fill="whitesmoke";
        this.debug=debug;

        //Create labels and textfields
        //Hue
        this.create_label_text_field("hue",this.model.hue.toString());
        this.text_field_list[0].type="hue";
        
        //Saturation
        this.create_label_text_field("sat",this.model.saturation.toString());
       
        //Luminosity
        this.create_label_text_field("lum",this.model.lum.toString());
        
        
        //Create  event listeners for hue, sat and lum text fields
        this.text_field_list[0].addEventListener("textchanged",()=>{
            this.model.change_hue(parseInt(this.text_field_list[0].text))
        });
        this.text_field_list[1].addEventListener("textchanged",()=>{
            this.model.change_sat(parseInt(this.text_field_list[1].text))
        });
        this.text_field_list[2].addEventListener("textchanged",()=>{
            this.model.change_lum(parseInt(this.text_field_list[2].text))
        });

        //We reset the values of hue,sat and lum to the swatch selected (starting values)
        this.reset_text();
        
        //Layout (we use a custom layout that makes that the label and 
        //textfield are ordered by rows and in the center)
        this.layoutMethod=makeCentralizedLayout({gap:10,itemsPerRow:2})
        this.model.addObserver(this);

    }
    private create_label_text_field(label:string,text:string){
        //We create the label
        //We don't need to save it on a variable since it will not change
        const label_e=new SKLabel(label);
        label_e.id=label;
        label_e.debug=this.debug;
        label_e.align="centre";

        //we create the custom text field
        const text_e=new CustomTextField(text,0,0,100);
        text_e.id=label;
        text_e.debug=this.debug;
        
        //We save the text field values because 
        //we will change values during program execution
        this.text_field_list.push(text_e);

        //We add the label and text field to this container
        this.addChild(label_e);
        this.addChild(text_e);
    }
    private reset_text() {
        //We set the hue,sat and lum text fields of the selected 
        this.text_field_list[0].text=this.model.hue.toString();
        this.text_field_list[1].text=this.model.saturation.toString();
        this.text_field_list[2].text=this.model.lum.toString();
    }
}
