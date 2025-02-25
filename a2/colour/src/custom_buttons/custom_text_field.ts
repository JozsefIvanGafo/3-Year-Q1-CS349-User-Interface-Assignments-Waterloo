/* 
University of Waterloo 2023-24 / CS 349 / A2
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is charge of handling our custom text field
*/

//import
import { SKTextfield } from "../simplekit/widget";

export class CustomTextField extends SKTextfield{
    //We add type (if is hue then the limit is 360)
    type:string="normal";
    constructor(text?:string,x?:number,y?:number,width?:number|undefined,height?:number){
        super(text,x,y,width,height)
    }

    //Is the same Edit as SKTextfield but we add conditionals
    protected applyEdit(text: string, key: string): string {
        //Case we delete
        if (key == "Backspace") {
            //If the text is "" we change it to a 0
            if (text.length==1){
                //this.text="0";
                return "0";
            }
          return text.slice(0, -1);

        }
        //Case we presed a key 
        else if (key.length == 1) {

            //Check if is a number or a letter that we insert
            const num =Number(key)
            //If is a number continue, else we ignore it
            if (!isNaN(num)){
                //Check if the new text isn't bigger than the limit
                let new_text=text+key
                //If is sat or lum
                if (this.type=="normal"){
                    if (parseInt(new_text)>100 ){
                        return "100";
                    }
                }
                //If is hue
                else{
                    if (parseInt(new_text)>360){
                        return "360";
                    }
                }
                return new_text;
            }
        }
        return text;
      }
}
