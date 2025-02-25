/* 
University of Waterloo 2023-24 / CS 349 / A4
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module we contain methods to generate random colors
 */


//Here we generate a random hsl list
export function generate_hsl_list(number_of_swatches: number) {
  let hsl_list = [];
  for (let i = 0; i < number_of_swatches; i++) {
    hsl_list.push(push_random_hsl());
  }
  return hsl_list;
}

//We generate a random hsl
export function push_random_hsl():[number,number,number] {
  const random_hue = Math.floor(Math.random() * 360); //random hue value between 0 and 360
  //we use 101 so we include the 100 (max)
  const random_sat = Math.floor(Math.random() * 100);
  const random_lum = Math.floor(Math.random() * 100);
  //Return the list
  return [random_hue, random_sat, random_lum];
}

