/* 
University of Waterloo 2023-24 / CS 349 / A4
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module in charge of handling the swatch view and the swatch
 */
//imports
import style from "./Swatch-style.module.css"
import { count,id,swatch_list,select_swatch } from "../../states/AppState"



export default function SwatchView(){

    //We generate count.value swatches
    return (
        <div class={style.swatch_container}>
            
            
            {[...Array(count.value)].map((_, i) => (
        <Swatch swatch_id={i} colour={swatch_list.value[i] as [number,number,number]} key={Math.random()}/>
      ))}

    </div>


        
    )
}

function Swatch({ swatch_id, colour }: { swatch_id: number; colour: [number, number, number] }) {

    //We say the border in case if is selected or not
    let border="1px solid lightgrey";
    if (swatch_id===id.value){
        border="2px solid black";
    }
    //We define its background
    const [hue,sat,lum]=colour;
    const background = `hsl(${hue}, ${sat}%, ${lum}%)`;

    return (
        <button 
        class={style.swatch}
        style={{background:background, border:border}} 
        id={swatch_id.toString()}
        onClick={()=>select_swatch(swatch_id)}
        >
        </button>



    )
}

