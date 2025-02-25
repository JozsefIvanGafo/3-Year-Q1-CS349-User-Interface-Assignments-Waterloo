/* 
University of Waterloo 2023-24 / CS 349 / A4
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of running the main code of Preact
*/
//Imports
import {  render } from "preact";
import {TopView,BotView,EditorView,SwatchView} from "./container";
import "./style.css";

//We define the app div
function App() {

  return (
    <div class="app">
      <TopView></TopView>
      <EditorView ></EditorView>
      <SwatchView></SwatchView>
      <BotView></BotView>

    </div>
  );
}

render(<App />, document.body);
