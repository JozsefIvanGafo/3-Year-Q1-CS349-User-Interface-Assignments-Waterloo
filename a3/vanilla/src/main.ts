/* 
University of Waterloo 2023-24 / CS 349 / A3
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of running the main code of vanilla
*/

//Imports
import { Top, SwatchContainer, MainEditor, Bot } from "./container";
import { Model } from "./mvc";

console.log("initialization")
//We create the model of mvc
const model=new Model();


//We create the different containers logic
new Top(model);
MainEditor(model);
new SwatchContainer(model);
new Bot(model);

//The program is ready to run
console.log("Program ready")
