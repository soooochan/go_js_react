import React, { memo, useEffect, useRef, useState } from "react";
import * as go from "gojs";
import "../css/App.css";
import Select from 'react-select';
import { nodeDataArrayPalette } from "../db/data";


const Palette = memo(({divClassName }) => {
 
  
  const [nodeDataArray, setNodeDataArray] = useState([]);
  const paletteDiv = useRef(null);

  const selectOptions = nodeDataArrayPalette.map((node) => ({
    value: node.source,
    label: node.key,
    figure: node.figure,
    color: node.color,
    text: node.text,
    
  }));
  
  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      setNodeDataArray([...nodeDataArray, { source: selectedOption.value }]);
    }
    console.log("select", selectedOption);
  };


  console.log("nodeData",nodeDataArray);
  


  useEffect(() => {
    const $ = go.GraphObject.make;

    let myPalette = $(go.Palette, {
      "undoManager.isEnabled": true,
      model: new go.GraphLinksModel(nodeDataArray),
    });

    myPalette.nodeTemplate = $(
      go.Node,
      "Auto",
      { background: "#A0BCC2" },
      
      $(
        go.Picture,
        { margin: 10, width: 50, height: 50, background: "white" },
        new go.Binding("source")
      )
    );

    if (paletteDiv.current) {
      myPalette.div = paletteDiv.current;
    }

    return () => {
      myPalette.div = null;
    };
  }, [nodeDataArray]);

  console.log("paletteDIv",paletteDiv)

  return (
    <div className={divClassName}  >
    <div style={{zIndex: 2,padding:'3px'}}>
        <Select options={selectOptions} onChange={handleSelectChange} />
    </div>
    <div ref={paletteDiv} style={{ zIndex:0, height: '200px' }} />
</div>
  );
});

export default Palette;