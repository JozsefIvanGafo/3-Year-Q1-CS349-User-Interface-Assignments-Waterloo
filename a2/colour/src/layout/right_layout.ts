/* 
University of Waterloo 2023-24 / CS 349 / A2
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of defining the layout for the 
text at the bottom and it has to be always on the right
*/

//Imports
import { SKElement } from "../simplekit/widget";
import { LayoutMethod,Size } from "../simplekit/layout";

//Same as layouts from simplekit
export function makeRightAlignedLayout(): LayoutMethod {
    return (
      boundsWidth: number,
      boundsHeight: number,
      elements: SKElement[]
    ) => {
      return rightAlignedLayout(boundsWidth, boundsHeight, elements);
    };
  }
  
  function rightAlignedLayout(
    boundsWidth: number,
    boundsHeight: number,
    elements: SKElement[]
  ): Size {
    const newBounds: Size = { width: 0, height: 0 };
  
    // Initialize the maximum height of the row
    let rowHeight = 0;
  
    // Calculate the total width needed for all elements
    let totalWidth = 0;
    elements.forEach((el) => {
      totalWidth += el.box.fullWidth;
  
      // If the current element's height is taller than the previous ones, update the rowHeight
      if (el.box.fullHeight > rowHeight) {
        rowHeight = el.box.fullHeight;
      }
    });
  
    // Calculate the starting x-coordinate for the right-aligned element
    let x = boundsWidth - totalWidth;
  
    elements.forEach((el) => {
      // Set the element's position to the right
      el.x = x;
  
      // Update the x-coordinate for the next element
      x += el.box.fullWidth;
    });
  
    // Calculate the bounds used for layout
    newBounds.width = totalWidth; // The width is the sum of the element widths
    newBounds.height = rowHeight; // The height is determined by the tallest element
  
    return newBounds;
  }
  