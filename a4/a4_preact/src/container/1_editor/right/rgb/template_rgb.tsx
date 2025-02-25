
/* 
University of Waterloo 2023-24 / CS 349 / A4
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling the hsl template view (that can be for hue or sat or lum)
*/
import style from "./../Right-style.module.css";
import { useState,useEffect } from "preact/hooks";

import { update_rgb,current_swatch_rgb } from "../../../../states/AppState";
import { JSX } from "preact";



//It will be used for R (selected=0), G (selected=1) and B (selected=2)
export default function TemplateRGBView({selected}:{selected:number}){

  const text = ["R", "G", "B"];
  const rgb=current_swatch_rgb.value;

  //define the state
  const [newRGB, setNewRGB] = useState<number>(rgb[selected]);

  //We update the state when we change current swatch rgb value
  useEffect(()=>{
    const rgb=current_swatch_rgb.value;
    setNewRGB(rgb[selected])
  },[current_swatch_rgb.value])

  /**
   * Method in charge of handling the event
   * @param event 
   */
  const handle_event = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    //We obtain the input
    const inputValue = event.currentTarget.value.trim();
    let new_rgb: number;

    //In case we remove everything the we set it to 0 else we take the value that we input
    if (inputValue === "") {
      // Handle empty input
      new_rgb = 0;
    } else {
      new_rgb = parseInt(inputValue, 10);

      // Ensure the value stays within the [0, 255] range
      new_rgb = Math.max(0, Math.min(new_rgb, 255));
    }
    //Update the AppState
    let rgb = current_swatch_rgb.value;
    rgb[selected] = new_rgb;
    update_rgb(rgb);
    setNewRGB(newRGB);
    
  };

  return (
    <div class={style["change-colour"]} id={text[selected] + "_container"}>
      <div class={style.text}>{text[selected]}</div>
      {/* Box field */}
      <input
        type="number"
        min="0"
        max="255"
        id={text[selected] + "_input"}
        class={style.text_field}
        onInput={handle_event}
        value={Math.ceil(newRGB)}
      />
      <input
        type="range"
        class={style.slider}
        id={text[selected] + "_slider"}
        min="0"
        max="255"
        value={Math.ceil(newRGB)} // Set the value dynamically
        onInput={handle_event}
      />
    </div>
  );
}