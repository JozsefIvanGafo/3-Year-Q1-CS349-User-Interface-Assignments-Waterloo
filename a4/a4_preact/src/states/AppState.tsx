/* 
University of Waterloo 2023-24 / CS 349 / A4
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module we contain the signals and methods handling the signals
 */
//imports
import { signal } from "@preact/signals";
import { generate_hsl_list, push_random_hsl } from "./state_functions";
import * as translating_funct from "./translate_functions";

//We define the signals
export const id = signal(0);
export const count = signal(10);
//Signal that contains the hsl list
export const swatch_list = signal(generate_hsl_list(count.value)as[number,number,number][]);
//These signals tells us if we reached the max or not
export const max_reached = signal(false);
export const min_reached = signal(false);
//It can be cls rgb or hex (this is for selecting what ckinfd of input we want)
export const colour_selected = signal("cls");


//Function to get the current hsl
const current_swatch = () => {
  return swatch_list.value[id.value] as [number, number, number];
};

//signal containg the hsl, rgb and hex value
export const current_swatch_hsl = signal(
  current_swatch(),
);
export const current_swatch_hex = signal(
  translating_funct.hslToHex(...current_swatch())
);
export const current_swatch_rgb=signal(
    translating_funct.hslToRgb(...current_swatch_hsl.value)

)

//internal variables
const max_number_swatches = 16; //Max # swatches allowed
const min_number_swatches = 1; //Min # swatches allowed
const debug = false; //Debugging tool

//Mutations
/**
 * Method in charge of increasing the # of swatches
 */
export function increment() {
  //check if we reached the maximum
  if (count.value < max_number_swatches) {

    //We are not in the minimum value
    min_reached.value = false;

    if (debug) console.log("Increase");

    //We increase the value of the number of swatches
    count.value++;
    id.value = count.value - 1;

    //We add the new swatch
    swatch_list.value=[...swatch_list.value,push_random_hsl()]
    select_swatch(id.value)
    //If we reached the max # of swatches then signal it
    if (count.value >= max_number_swatches) {
      max_reached.value=true}


  } else {
    //Case where we reached the maximum # of swatches allowed
    if (debug) console.log("Maximum reached");
    max_reached.value = true;
  }
}
/**
 * Method to decrease the # of swatches
 */
export function decrease() {
  //Check if we reached the minimum
  if (count.value > min_number_swatches) {

    //We are not in the maximum value
    max_reached.value = false;
    if (debug) console.log("Decrease");

    //We decrease the counter
    count.value--;

    //We remove the selected swatch
    swatch_list.value.splice(id.value, 1);
    signalSwatchList()//To signal that we modified the list
    

    //If the id is the last swatch then we update the position of the id
    if (id.value == count.value) {
      id.value--;
    }
    //We update the swatch colors
    select_swatch(id.value)

    //If we reached the min case we signal it
    if (count.value <= min_number_swatches) {
      min_reached.value=true;}

  } else {

    if (debug) console.log("We reached the minimum");
    min_reached.value = true;
  }
}
/**
 * Method in charge of updating the new hsl
 * @param new_hsl : It contains the new hsl we want to change
 */
export function update_hsl(new_hsl: [number, number, number]) {
  //We add it to the list
  swatch_list.value[id.value] = new_hsl;
  //We update the colors and select it
  select_swatch(id.value)

  //We trigger that we change the swatch list
  signalSwatchList();
}
/**
 * Method in charge of sending a signal that the swatch list has changed
 */
export function signalSwatchList() {
  // No need to pass a callback, just trigger the update
  swatch_list.value = [...swatch_list.value];
}

/**
 * Method in charge of updating to the new hex value color
 * @param new_hex : Containg the new hex value we want to change
 */
export function update_hex(new_hex: string) {
  update_hsl(translating_funct.hexToHsl(new_hex) as [number, number, number]);
  //We do this to avoid changing the text
  //Because typescript rounds the number so when type it would change the text 
  //with this we avoid that problem
  //current_swatch_hex.value=new_hex;
}

/**
 * Method in charge of updating the current swatch to the new color
 * @param new_rgb : it containing the new rgb color we want to change
 */
export function update_rgb(new_rgb:[number,number,number]){
    update_hsl(translating_funct.rgbToHsl(...new_rgb))
}


/**
 * Method in charge of updating the swatch to the current swatch 
 * and signaling its current change of color
 * @param swatch_id The current id we want to select
 */
export function select_swatch(swatch_id: number) {
  //Update the id signal
  id.value = swatch_id;
  //Updating the swatches ! types of colors
  current_swatch_hsl.value = swatch_list.value[swatch_id]
  current_swatch_hex.value = translating_funct.hslToHex(
    ...current_swatch_hsl.value)
    current_swatch_rgb.value=translating_funct.hslToRgb(...current_swatch_hsl.value)
}
