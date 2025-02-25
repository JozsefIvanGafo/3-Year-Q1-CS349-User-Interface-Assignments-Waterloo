/* 
University of Waterloo 2023-24 / CS 349 / A4
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling the HSL view
*/
//Imports
import TemplateRGBView from "./template_rgb"

export default function RGBView(){

    //We iterate 3 times (R,G and B)
    return (
        <>
            {Array.from({ length: 3 }, (_, index) => (
            <TemplateRGBView selected={index} />))
            }
        </>


    )
}



