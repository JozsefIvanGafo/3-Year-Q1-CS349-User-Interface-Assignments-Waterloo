/* 
University of Waterloo 2023-24 / CS 349 / A4
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling the Right view
*/
//Imports
import style from "./Right-style.module.css"
import CoulourSelectedView from "./colour_selector";
import { colour_selected } from "../../../states/AppState";
import HSLView from "./hsl/hsl";
import HexView from "./hex/hex";
import RGBView from "./rgb/rgb";




export default function RightView() {

    switch(colour_selected.value.toLowerCase()){

      //The case cls is selected
      case "cls":
        return (
          <div class={style.right}>
            <CoulourSelectedView selected={[true,false,false]}></CoulourSelectedView>
            <HSLView></HSLView>
          </div>
        );


      case"rgb":
      //The case rgb is selected
      return (
        <div class={style.right}>
          <CoulourSelectedView selected={[false,true,false]}></CoulourSelectedView>
          <RGBView></RGBView>
        </div>
      );


      case "hex":
        //The case hex is selected
        return (
          <div class={style.right}>
            <CoulourSelectedView selected={[false,false,true]}></CoulourSelectedView>
            <HexView></HexView>
            
          </div>
        );

      
    }
    //To avoid a warning on right.tsx
    return(<></>)
  }