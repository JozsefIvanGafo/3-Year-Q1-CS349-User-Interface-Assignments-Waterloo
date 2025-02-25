/* 
University of Waterloo 2023-24 / CS 349 / A4
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module in charge of handling  the hue input box
*/
//Imports
import { useLayoutEffect,useRef,useState } from "preact/hooks";
import style from "./Left-style.module.css"
import { current_swatch_hsl } from "../../../states/AppState";

//We define the type (similar to the class demos)
type CanvasProps = {
    y_point:{y_point:number};
    width?: number;
    height?: number;
    callback?: (y: number) => void;
  };

//We define the hue input box
export default function HueInputBox({
    y_point,
    width=20,
    height=200,
    callback,
}:CanvasProps){

  //We obtain the canvas reference
  const CanvasRef=useRef<HTMLCanvasElement>(null);

  //Define state if we are dragging or not
  const [isHueDragging,setHueIsDragging]=useState(false);

  /**
   * Method in charge of handling the click event and converting the 
   * input of 200 px into 360 for the hue
   * @param event Mouse event
   */
  const clickHandler =(event:MouseEvent)=>{

    //We obtain the references about the size and position of the DOM
    const rect = CanvasRef.current?.getBoundingClientRect();

    if (rect) {

        // Normalize the coordinates based on the canvas size
        const normalizedY = (event.clientY - rect.top) / rect.height;

        // Scale the normalized coordinates to the range of hue values (0-100)
        const scaledY = normalizedY * 360;

        //We execute the callback function
        if (callback) callback(scaledY);
    }
  }
  /**
   * If is dragging then we are clicking
   * @param event :MouseEvent
   */
  const dragHandler= (event:MouseEvent)=>{
    if (isHueDragging){
      clickHandler(event);
    }
  
  }
  /**
   * We draw the canvas when we detect  a 
   * change in current_swatch_hsl or y_point
   */
  useLayoutEffect(()=>{
    //Obtain the reference
      const gc=CanvasRef.current?.getContext("2d");
      if (gc)draw(gc);
  },[current_swatch_hsl.value,y_point])


  function draw(gc:CanvasRenderingContext2D){

    //We clear the canvas
    gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);

    //We wil draw the hue by using the linear gradient by rows of pixels
    for (let y = 0; y < gc.canvas.height; y++) {
      //Create the gradient
        const gradient = gc.createLinearGradient(0, y, gc.canvas.width, y);
        //first x0 pos
        gradient.addColorStop(
          0,
          `hsl(${(y / gc.canvas.height) * 360}, 100%, 50%)`); // saturation 0% at the left
        //ends at x1 pos
        gradient.addColorStop(
          1,
          `hsl(${(y / gc.canvas.height) * 360}, 100%, 50%)`); // saturation 100% at the right


        // Fill the row with the gradient
        gc.fillStyle = gradient;
        gc.fillRect(0, y, gc.canvas.width, 1);
    }


    //We define dimensions for the rectangle
    const rectWidth = 40;
    const rectHeight = 5;
    const rectY = (y_point.y_point/360)*gc.canvas.height; // This is to obtain the y_point in canvas and not the hue value
    const rectX = gc.canvas.width / 2 - rectWidth / 2; // To make it centered

    //We draw the black rectangle
    gc.strokeStyle = "black";
    gc.lineWidth = 1;
    gc.beginPath();
    gc.rect(rectX, rectY - rectHeight / 2, rectWidth, rectHeight);
    gc.stroke();
    gc.closePath();

    // We draw the white rectangle
    gc.strokeStyle = "white";
    gc.lineWidth = 1;
    gc.beginPath();
    gc.rect(rectX - 1, rectY - rectHeight / 2 - 1, rectWidth + 2, rectHeight + 2);
    gc.stroke();
    gc.closePath();
  }


  //We return the hue input box html
  return(
      <canvas class={style.hue_input_box}
      ref={CanvasRef}
      width={width}
      height={height}
      onClick={clickHandler}
      onMouseDown={()=>setHueIsDragging(true)}
      onMouseUp={()=>setHueIsDragging(false)}
      onMouseMove={dragHandler}
  />
  )
}