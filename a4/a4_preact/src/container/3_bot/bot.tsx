/* 
University of Waterloo 2023-24 / CS 349 / A4
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module in charge of handling the bot view 
 */
//Imports
import style from "./Bot-style.module.css"
import { count,id } from "../../states/AppState";


//Define the Top view
export default function BotView(){

    //We define the text 
    const text=`${count.value} swatches (selected #${id.value+1})`;

    return(
        <div class={style.bot}>
            
        <p class="text">
            {text}
        </p>
            
        </div>
    )

}
