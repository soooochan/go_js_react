import React, { useState } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import "./App.css"; // contains .diagram-component CSS
import Palette from "./component/Palette";

const useGoJS = (onModified) => {
  const [diagram, setDiagram] = useState(null);

  const initDiagram = () => {
    const $ = go.GraphObject.make;
    const diagram = $(go.Diagram, {
      "undoManager.isEnabled": true,
      "resizingTool.isGridSnapEnabled": true,
      //layout: new go.TreeLayout({ angle: 90, layerSpacing: 35 }),
      "clickCreatingTool.archetypeNodeData": {
        key: 0,
        text: "CAT",
        color: "lightblue",
        source: "img/cat.png",
      },
      model: new go.GraphLinksModel({
        linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      }),
    });

    diagram.addLayerBefore(
      $(go.Layer, { name: "BottomLayer" }),
      diagram.findLayer("Background")
    );

    // define a simple Node template
    diagram.nodeTemplate = $(
      go.Node,
      "Auto",
      { resizable: true, resizeObjectName: "Picture" },
      { background: "#A0BCC2" },
      new go.Binding("layerName", "key", function (key) {
        return key === -7 ? "BottomLayer" : "";
      }),
      $(
        go.Picture,
        {
          name: "Picture",
          margin: new go.Margin(10, 10),
          width: 50,
          height: 50,
          background: "white",
          portId: "",
          cursor: "pointer",
          fromLinkable: true,
          toLinkable: true,

          fromLinkableSelfNode: true,
          fromLinkableDuplicates: true,

          toLinkableSelfNode: true,
          toLinkableDuplicates: true,
        },
        new go.Binding("source").makeTwoWay(),
        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
          go.Size.stringify
        ),
        new go.Binding("fromLinkable", "key", function (k) {
          return k !== -7;
        }),
        new go.Binding("toLinkable", "key", function (k) {
          return k !== -7;
        })
      )
      // $(
      //   go.TextBlock,
      //   "Default Text",
      //   { stroke: "white", font: "bold 12px sans-serif" },
      //   new go.Binding("text").makeTwoWay()
      // )
    );

    diagram.linkTemplate = $(
      go.Link,
      {
        routing: go.Link.Orthogonal,
        corner: 5,
        relinkableFrom: true,
        relinkableTo: true,
      },
      $(go.Shape, { strokeWidth: 3, stroke: "#555" }),
      $(go.Shape, { toArrow: "Standard", stroke: null })
    );

    diagram.addDiagramListener("ObjectSingleClicked", function (e) {
      const node = e.subject.part;
      if (node instanceof go.Node) {
        console.log(node.data);
      }
    });

    // diagram.addDiagramListener("Modified", function (e) {
    //   console.log(
    //     JSON.stringify(diagram.model.nodeDataArray),
    //     JSON.stringify(diagram.model.linkDataArray)
    //   );
    // });

    setDiagram(diagram);

    return diagram;
  };

  return { initDiagram, diagram };
};

function App() {
  const { initDiagram, diagram } = useGoJS();
  // const [newmodel, setNewmodel] = useState({
  //   nodeDataArray: [diagram.model.nodeDataArray],
  //   linkDataArray: [diagram.model.linkDataArray],
  // });
  const nodeDataArrayPalette = [
    {
      key: -1,
      text: "1",
      figure: "Rectangle",
      color: "lightblue",
      source: "img/cat.png",
    },
    {
      key: -2,
      text: "2",
      figure: "Rectangle",
      background: "lightblue",
      source: "img/icon1.png",
    },
    {
      key: -3,
      text: "3",
      figure: "Rectangle",
      color: "lightblue",
      source: "img/icon2.png",
    },
    {
      key: -4,
      text: "4",
      figure: "Rectangle",
      color: "lightblue",
      source: "img/cat2.png.jpg",
    },
    {
      key: -5,
      text: "5",
      figure: "Rectangle",
      color: "lightblue",
      source: "img/cat3.png.jpg",
    },
    {
      key: -6,
      text: "6",
      figure: "Rectangle",
      color: "lightblue",
      source: "img/rainbow.png.jpg",
    },
    {
      key: -7,
      text: "7",
      figure: "Rectangle",
      color: "lightblue",
      fill: null,
    },
  ];
  return (
    <div className="App">
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="diagram-component"
        // nodeDataArray={model.nodeDataArray}
        // linkDataArray={model.linkDataArray}
        // nodeDataArray={[
        //   {
        //     key: 0,
        //     loc: "0 0",
        //     text: "1",
        //     source: "img/cat.png",
        //   },
        //   {
        //     key: 1,
        //     loc: "0 100",
        //     text: "2",
        //     source: "img/icon2.png",
        //   },
        //   {
        //     key: 2,
        //     loc: "150 0",
        //     text: "3",
        //     source: "img/icon1.png",
        //   },
        // ]}
        // linkDataArray={[
        //   { key: -1, from: 0, to: 1 },
        //   { key: -2, from: 0, to: 2 },
        //   { key: -3, from: 2, to: 2 },
        // ]}
        //onModelChange={handleModelChange}
      />
      <Palette
        nodeDataArray={nodeDataArrayPalette}
        divClassName="palette-component"
      />
      <input
        type="button"
        value="Save"
        onClick={() => {
          console.log(
            JSON.stringify(diagram.model.nodeDataArray),
            JSON.stringify(diagram.model.linkDataArray)
          );
          // JSON.stringify(newmodel);
        }}
      />
    </div>
  );
}

export default App;
