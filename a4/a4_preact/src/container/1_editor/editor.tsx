/* 
University of Waterloo 2023-24 / CS 349 / A4
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling the Editor view
*/
//Imports
import style from "./Editor-style.module.css"
import LeftView from "./left/left"
import RightView from "./right/right"



export default function EditorView(){
    return (
        <div class={style.editor}>
            <LeftView></LeftView>
            <RightView></RightView>
        </div>
    )
}