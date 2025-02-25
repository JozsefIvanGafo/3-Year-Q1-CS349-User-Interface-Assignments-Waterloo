/* 
University of Waterloo 2023-24 / CS 349 / A3
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of creating the left and right container classes
*/

//imports
import { Left } from "./left";
import { Right } from "./right";
import { Model } from "../../mvc";

//Is to keep the code organized and compact
export function MainEditor(model:Model){
        new Left(model);
        new Right(model);
}