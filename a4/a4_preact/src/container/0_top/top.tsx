/* 
University of Waterloo 2023-24 / CS 349 / A4
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling the top module
 */
//Imports
import style from "./Top-style.module.css";
import { max_reached,increment, min_reached,decrease } from "../../states/AppState";


//Define the Top view
export default function TopView(){

    return(
        <div class={style.top}>

            {/* Add button */}
            <button 
            class={style.add}
            onClick={()=>increment()}
            disabled={max_reached}
            >
                Add
            </button>

            {/* Remove button */}
            <button 
            class={style.delete}
            onClick={()=>decrease()}
            disabled={min_reached}
            >
                Delete
            </button>
        </div>
    )

}