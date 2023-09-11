import React, { useState } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import "../css/App.css"; // contains .diagram-component CSS
import Palette from "../component/Palette";
import useGoJS from "./useGoJS";
import { useMediaQuery } from "react-responsive";
import {nodeDataArrayPalette} from "../db/data";







function App() {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 700px)" });
  const paletteClassName = isDesktopOrLaptop ? "palette-component" : "palette-component-small"; 
  const diagramClassName = isDesktopOrLaptop ? "diagram-component" : "diagram-component-small"; 

  
  const { initDiagram, diagram } = useGoJS();
 
 

  const handleReset = () => {
    if(diagram){
      
      diagram.model.nodeDataArray = [];
      diagram.model.linkDataArray = [];
      diagram.model.commitTransaction('Cleared diagram');
    }
  }

  return (
    <div className="App">
      <div className="container">
        <ReactDiagram
          initDiagram={initDiagram}
          divClassName={diagramClassName}
        />

  <Palette
          nodeDataArray={nodeDataArrayPalette}
          divClassName={paletteClassName}
        />
        
      </div>

      <div>
        <button class="button" onClick={handleReset}>Clear</button>
          <input
            class ="button"
            type="button"
            value="Save"
            onClick={() => {
              console.log(
                JSON.stringify(diagram.model.nodeDataArray),
                JSON.stringify(diagram.model.linkDataArray)
              );
              
            }}
        />
                
      </div>
        </div>
    
  );
}

export default App;
