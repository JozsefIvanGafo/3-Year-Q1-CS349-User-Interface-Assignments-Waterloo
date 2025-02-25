/* 
University of Waterloo 2023-24 / CS 349 / A2
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of defining the root layout
*/

//imports
import { SKElement } from "../simplekit/widget";
import { LayoutMethod,Size } from "../simplekit/layout";

//Same structure as the layouts of simplekit
export function MakeRootLayout(
    params: { gap: number } = { gap: 0 }
  ): LayoutMethod {
    return (
      boundsWidth: number,
      boundsHeight: number,
      elements: SKElement[]
    ) => {
      return rootLayout(boundsWidth, boundsHeight, elements, params);
    };
  }
  
  function rootLayout(
    boundsWidth: number,
    boundsHeight: number,
    elements: SKElement[],
    params: { gap: number }
  ): Size {
    //declare the newBound that we need to return at the end
    const newBounds: Size = { width: 0, height: 0 };
    const gap = params.gap;
  
    let y = 0; // Initialize the y position (that will change as we iterate)
  
    // Calculate total flexible height for editor and swatch
    const flexibleHeight = boundsHeight - 100; // 50px for the top and 50px for the bottom

    // Calculate the total flexible width for editor and swatch
    const flexibleWidth = boundsWidth;
    
    // Calculate the heights for the editor and swatch based on their fillHeight values
    //we divide by 2 since we only care for the swatch container and editor container
    const fillHeight = flexibleHeight/2;
    // Calculate the widths for the editor and swatch based on their fillWidth values
    const fillWidth = (flexibleWidth * elements[1].fillWidth) ;

  
    elements.forEach((element) => {
        
        //Top container fixed height of 50
        if (element.id=="top" ||element.id=="bot") {
            element.x = 0;
            element.y = y;
            element.box.fullHeight = 50;
            element.box.fullWidth=fillWidth
            y += 50 + gap;
        }

        else {
            // Second element (editor) comes below the top element with flexible height and width
            element.x = 0;
            element.y = y;
            element.box.fullHeight = fillHeight;
            element.box.fullWidth = fillWidth;
            y += fillHeight + gap;
        }
      });
  
    // Calculate bounds used for layout
    newBounds.width = boundsWidth;
    newBounds.height = boundsHeight;
  
    return newBounds;
  }
  