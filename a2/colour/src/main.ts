/* 
University of Waterloo 2023-24 / CS 349 / A2
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of running the main code for colours
*/

//Imports
import { setSKRoot, startSimpleKit } from "./simplekit";
import { SKContainer} from "./simplekit/widget";
import { MakeRootLayout } from "./layout/root_layout";
import { Model } from "./mvc/model";
import { Top } from "./containers/top";
import { Editor } from "./containers/editor/editor";
import { SwatchContainer } from "./containers/swatch_container";
import { Bot } from "./containers/bot";


//Main code
//Debug (all components with exception of swatch (not implemented))
const debug=false;

//Create the model
const model =new Model();

// Create the root
const root= new SKContainer();
root.id="root";
root.fill="white";
root.debug=debug;
root.width = window.innerWidth;
root.height = window.innerHeight;
root.layoutMethod = MakeRootLayout();




// Create top container
const top =new Top(model,50,debug);

// Create editor container
const editor=new Editor(model,debug);

//create swatch container
const height=(root.height-100)/2;
const swatch=new SwatchContainer(model,height,debug);

//Bot container
const bot=new Bot(model,root.height,debug);

// Append the containers to the root
root.addChild(top);
root.addChild(editor);
root.addChild(swatch);
root.addChild(bot)
//Set the root container
setSKRoot(root);

//Start simplekit
startSimpleKit();
