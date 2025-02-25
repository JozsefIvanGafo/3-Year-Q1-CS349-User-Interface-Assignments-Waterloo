/* 
University of Waterloo 2023-24 / CS 349 / A4
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module in charge of handling  the sat lum input box
*/
//Imports
import style from "./Left-style.module.css"
import { useRef,useLayoutEffect, useState } from "preact/hooks"
import { current_swatch_hsl } from "../../../states/AppState";

//We define the type (similar to the class demos)
type CanvasProps = {
    point: { x: number; y: number };
    width?: number;
    height?: number;
    callback?: (x: number, y: number) => void;
  };

//We define the sat lum input box
export default function SatLumInputBox({
    point,
    width=200,
    height=200,
    callback,
  }: CanvasProps){
    //We obtain the canvas reference
    const CanvasRef=useRef<HTMLCanvasElement>(null);

    //Define state to know if we are dragging or not
    const [isDragging,setIsDragging]=useState(false);

  /**
   * Method in charge of handling the click event and converting the 
   * input of 200x200 px into 100 for the sat and lum
   * @param event Mouse event
   */
  const clickHandler =(event:MouseEvent)=>{
    //We obtain reference about size and pos of the DOM
    const rect = CanvasRef.current?.getBoundingClientRect();
  
    if (rect) {
        // Normalize the coordinates based on the canvas size
        const normalizedX = (event.clientX - rect.left) / rect.width;
        const normalizedY = (event.clientY - rect.top) / rect.height;

        // Scale the normalized coordinates to the range of sat and lum values (0-100)
        const scaledX = normalizedX * 100;
        const scaledY = normalizedY * 100;

        //We execute the callback function
        if (callback) callback(scaledX, scaledY);

      }
  }

  /**
   * If is dragging then we are clicking
   * @param event :MouseEvent
   */
  const dragHandler= (event:MouseEvent)=>{
    if (isDragging){
      clickHandler(event);
    }

  }

  /**
   * We draw the canvas when we detect  a 
   * change in current_swatch_hsl or point
   */
  useLayoutEffect(()=>{
      const gc=CanvasRef.current?.getContext("2d");
      if(gc)draw(gc);
  },[current_swatch_hsl.value,point])


  function draw(gc:CanvasRenderingContext2D){
    //We clear the canvas
    gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);

    //We obtain the hue
    const hue=current_swatch_hsl.value[0];

    //We wil draw the sat and lum by using the linear gradient by rows of pixels
    for (let y = 0; y < gc.canvas.height; y++) {
      //Create the gradient
      const gradient = gc.createLinearGradient(0, y, gc.canvas.width, y);
      //first x0 pos (on the same row)
      gradient.addColorStop(0, `hsl(${hue}, 0%, ${y / gc.canvas.height * 100}%)`); // saturation 0% at the left
      //last x1 pos (on the same row)
      gradient.addColorStop(1, `hsl(${hue}, 100%, ${y / gc.canvas.height * 100}%)`); // saturation 100% at the right
    
      // Fill the row with the gradient
      gc.fillStyle = gradient;
      gc.fillRect(0, y, gc.canvas.width, 1);

      }
    
    //We obtain the x point for the 200 px
    const x=point.x*2;
    const y=point.y*2;


    // Draw the circle with a black stroke
    gc.strokeStyle = "black";
    gc.lineWidth = 0.5;
    gc.beginPath();
    gc.arc(x, y, 5, 0, 2 * Math.PI);
    gc.stroke();

    // Draw the circle with a white stroke
    gc.strokeStyle = "white";
    gc.lineWidth = 0.5;
    gc.beginPath();
    gc.arc(x, y, 5+1, 0, 2 * Math.PI);
    gc.stroke();
    }

    //We return the hue input box html
    return(

        <canvas class={style.sat_lum_input_box}
        ref={CanvasRef}
        width={width}
        height={height}
        onClick={clickHandler}
        onMouseDown={()=>setIsDragging(true)}
        onMouseUp={()=>setIsDragging(false)}
        onMouseMove={dragHandler}
    />
    )
}