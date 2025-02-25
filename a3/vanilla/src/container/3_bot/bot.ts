/* 
University of Waterloo 2023-24 / CS 349 / A3
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling the bot div of the html file
*/

//imports
import { Observer,Model } from "../../mvc";

export class Bot implements Observer{
    //Attributes
    private _bot_container:HTMLElement;
    private _text_container:HTMLElement;

    update(): void {
        //We update the text at the bottom
        this._update_text();
    }
    constructor (private model:Model){
        console.log("Initialization of bot container")

        //obtain bot container
        this._bot_container=document.querySelector(".bot") as HTMLElement;
        if(!this._bot_container)throw new Error("[ERROR] The bot container has not been found")

        //Obtain the text container
        this._text_container=this._bot_container.querySelector(".text_container") as HTMLElement;
        if(!this._text_container)throw new Error("[ERROR] The bot text container has not been found")

        //We update the text shown in bot
        this._update_text();

        //Add observer
        this.model.addObserver(this);

    }

    private _update_text() {
        //Create label and then update its value on the html text
        const label_text = `${this.model.count} swatches (selected #${this.model.id+1})`;
        this._text_container.innerHTML=label_text;

    }
}
