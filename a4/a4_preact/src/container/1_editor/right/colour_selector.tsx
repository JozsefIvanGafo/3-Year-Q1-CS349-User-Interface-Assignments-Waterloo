/* 
University of Waterloo 2023-24 / CS 349 / A4
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of selecting what kind of inputs we want (hsl or rgb or hex)
*/
//Imports
import style from "./Right-style.module.css";
import { colour_selected } from "../../../states/AppState";

export default function CoulourSelectedView({
  selected: [hsl, rgb, hex],
}: {
  selected: [boolean, boolean, boolean];
}) {

  //Functions to manage the events on clicking the radio
  const handle_cls = () => {
    colour_selected.value = "cls";
  };
  const handle_rgb = () => {
    colour_selected.value = "rgb";
  };
  const handle_hex = () => {
    colour_selected.value = "hex";
  };

  return (
    <div class={style["type-colour-selector"]}>
      {/** To be more accessible you click the container instead of the radio
       * I was struggling when clicking the radio buttons
       */}
      <div class="text" onClick={handle_cls}>
        <input type="radio" name="group1" value="option1" checked={hsl} />
        HSL
      </div>
      <div class="text" onClick={handle_rgb}>
        <input type="radio" name="group1" value="option2" checked={rgb} />
        RGB
      </div>

      <div class="text" onClick={handle_hex}>
        <input type="radio" name="group1" value="option3" checked={hex} />
        HEX
      </div>
    </div>
  );
}
