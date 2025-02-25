/* 
University of Waterloo 2023-24 / CS 349 / A4
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling the hex view
*/
//Inputs
import { useState, useEffect } from "preact/hooks";
import {
  current_swatch_hex,
  update_hex,
  swatch_list,
} from "../../../../states/AppState";
import style from "./../Right-style.module.css";


export default function HexView() {

  //Define the hex state
  const [tempHexValue, setTempHexValue] = useState(current_swatch_hex.value);

  //Use Use effect when we detect a change in current swatch hex and the swatch list
  useEffect(() => {
    //Update the state hex
    setTempHexValue(current_swatch_hex.value);
  }, [current_swatch_hex.value, swatch_list.value]);

  //Function to detect if  a hex is valid or not (regex)
  const isValid = (text: string) => {
    return /^#([0-9A-Fa-f]{6})$/.test(text);
  };

  /**
   * Method in charge of handling the input
   * @param event Mouse event
   */
  const handleInput = (event: Event) => {

    //We obtain the value of the key pressed
    const newValue = (event.target as HTMLInputElement).value;

    //Update the Hex state
    setTempHexValue(newValue);

    //We check if is valid
    if (isValid(newValue)) {
      console.log("Updating hex:", newValue);
      update_hex(newValue);
    }
  };

  //Method in charge of handling when we are not focusing on the input box
  const handleBlur = () => {

    // Check if the current input value is a valid hex color
    if (isValid(tempHexValue)) {
      //update the state with the correct hex value
      update_hex(tempHexValue);
    } else {
      // We set the hex state to the current hex value
      setTempHexValue(current_swatch_hex.value);
    }
  };


  return (
    <div>
      <input
        value={tempHexValue}
        type="text"
        onInput={handleInput}
        onBlur={handleBlur}
      />

      {!isValid(tempHexValue) && (
        <p class={style.wrong_text}>Invalid: must be a valid hex color</p>
      )}
    </div>
  );
}
