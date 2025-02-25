//imports
import style from "./Left-style.module.css"
import SatLumInputBox from "./sat_lum_input_box";
import HueInputBox from "./hue_input_box";
import { useState,useEffect } from "preact/hooks";
import { current_swatch_hsl,swatch_list,update_hsl } from "../../../states/AppState";


export default function LeftView() {
    
    const [hue,sat,lum]=current_swatch_hsl.value;
    const [point, setPoint] = useState({ x:sat, y:lum });
    const [yPoint,setYPoint]=useState({y_point:hue})

    useEffect(()=>{
        const [hue,sat,lum]=current_swatch_hsl.value;
        setPoint({x:sat,y:lum})
        setYPoint({y_point:hue})
    },[current_swatch_hsl.value,swatch_list.value])




    const canvasHandler = (x: number, y: number) => {
        const hue =current_swatch_hsl.value[0]
        update_hsl([hue,x,y]);
        setPoint({ x: x, y: y });
      };


    const hueCanvasHandler=(y:number)=>{
        const [,sat,lum]=current_swatch_hsl.value
        update_hsl([y,sat,lum]);
        setYPoint({y_point:y})





    }
    return (
        <div class={style.left}>

        <SatLumInputBox
        point={point}
        callback={canvasHandler}
        ></SatLumInputBox>
        <HueInputBox y_point={yPoint} callback={hueCanvasHandler}></HueInputBox>
        </div>
    );
}
