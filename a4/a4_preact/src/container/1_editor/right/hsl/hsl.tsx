/* 
University of Waterloo 2023-24 / CS 349 / A4
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling the HSL view
*/
//Imports
import HSLTemplateView from "./hsl_template";

export default function HSLView(){
    //We iterate 3 times (hue,sat and lum)
    return(
        <>
        {Array.from({ length: 3 }, (_, index) => (
            <HSLTemplateView selected={index} />))}
        </>

)

}