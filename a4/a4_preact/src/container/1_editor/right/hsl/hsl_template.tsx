/* 
University of Waterloo 2023-24 / CS 349 / A4
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling the hsl template view (that can be for hue or sat or lum)
*/
//imports
import {
  update_hsl,
  current_swatch_hsl,
  swatch_list,
} from "../../../../states/AppState";
import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import style from "./../Right-style.module.css";


export default function HSLTemplateView({ selected }: { selected: number }) {
  //We obtain the text label by using the selected variable
  const text_list = ["Hue", "Sat", "Lum"];
  const text = text_list[selected];

  //We obtain the upper bound if hue is 360 else is 100 (sta and lum)
  let upper_bound = 100;
  if (selected === 0) {
    upper_bound = 360;
  }

  //We define the state
  const hsl = current_swatch_hsl.value;
  const [newPartHSL, setNewPartHSL] = useState(hsl[selected]);

  //We update the state when detecting the signal swatch list or the current swatch hsl value
  useEffect(() => {
    const hsl = current_swatch_hsl.value;
    setNewPartHSL(hsl[selected]);
  }, [swatch_list.value, current_swatch_hsl.value]);

  /**
   * Method in charge of handling an event
   * @param event 
   */
  const handle_event = (event: JSX.TargetedEvent<HTMLInputElement>) => {

    //We obtain the input and we remove the empty spaces
    const inputValue = event.currentTarget.value.trim();
    let new_input: number;

    //In case we remove everything the we set it to 0 else we take the value that we input
    if (inputValue === "" || inputValue === " ") {
      // Handle empty input
      new_input = 0;
    } else {
      new_input = parseInt(inputValue, 10);

      //To Ensure that the value stays within the [0, upper_bound] range
      new_input = Math.max(0, Math.min(new_input, upper_bound));
    }

    //Update the AppState
    let new_hsl = current_swatch_hsl.value;
    new_hsl[selected] = new_input;
    update_hsl(new_hsl);
    setNewPartHSL(new_input);
  };

  return (
    <div class={style["change-colour"]}>
      <div class={style.text}>{text}</div>
      {/** Box field */}
      <input
        type="number"
        min="0"
        max={upper_bound}
        class={style.text_field}
        onInput={handle_event}
        value={Math.ceil(newPartHSL)}
      />
      <input
        type="range"
        class={style.slider}
        min="0"
        max={upper_bound}
        value={Math.ceil(newPartHSL)} 
        onInput={handle_event}
      />
    </div>
  );
}
