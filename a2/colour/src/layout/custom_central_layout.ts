/* 
University of Waterloo 2023-24 / CS 349 / A2
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of defining the layout for the labels 
and text fields where we want that a label 
and a text field are in the same row and in each row e can only have 2 elements
*/

//Imports
import { SKElement } from "../simplekit/widget";
import { LayoutMethod,Size } from "../simplekit/layout";

//Same concept as the other layouts of simplekit
export function makeCentralizedLayout(
    params: { gap: number, itemsPerRow: number } = { gap: 10, itemsPerRow: 2 }
  ): LayoutMethod {
    return (
      boundsWidth: number,
      boundsHeight: number,
      elements: SKElement[]
    ) => {
      return centralizedLayout(boundsWidth, boundsHeight, elements, params);
    };
  }
  
  function centralizedLayout(
    boundsWidth: number,
    boundsHeight: number,
    elements: SKElement[],
    params: { gap: number, itemsPerRow: number }
  ): Size {
    const newBounds: Size = { width: 0, height: 0 };
    //Variables for the gap between 2 elements and # elements per row
    const gap = params.gap;
    const itemsPerRow = params.itemsPerRow;
  
    //Declare variables that change when we iterate
    let x = 0;
    let y = 0;
    let rowHeight = 0;
    //!
    //!For this part I used some help from chat gpt because I didn't know how to do it
    //!
    elements.forEach((el, index) => {

      // Calculate x and y positions based on the item's index
      const rowIndex = Math.floor(index / itemsPerRow);
      const colIndex = index % itemsPerRow;
  
      // Calculate the total width taken up by items and gaps in the row
      const totalWidth = elements
        .slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow)
        .reduce((acc, item, i) => acc + item.box.fullWidth + (i > 0 ? gap : 0), 0);
  
      // Calculate the starting x position to center the items in the available space
      x = (boundsWidth - totalWidth) / 2;
  
      for (let i = 0; i < colIndex; i++) {
        // Adjust x for items before the current item in the same row
        x += elements[index - i - 1].box.fullWidth + gap;
      }
  
      y = (rowIndex * (rowHeight + gap));
  
      // Update the row height if the current item is taller than the previous ones in the same row
      if (el.box.fullHeight > rowHeight) {
        rowHeight = el.box.fullHeight;
      }
  
      el.x = x;
      el.y = y;
    });
  
    // Calculate bounds used for layout
    newBounds.width = boundsWidth;
    newBounds.height = (Math.ceil(elements.length / itemsPerRow) * (rowHeight + gap)) - gap;
  
    return newBounds;
  }
  