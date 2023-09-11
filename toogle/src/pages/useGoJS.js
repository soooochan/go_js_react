import React, { useEffect, useState } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import "../css/App.css"; // contains .diagram-component CSS
import Palette from "../component/Palette";

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

    setDiagram(diagram);

    return diagram;
  };

  return { initDiagram, diagram };
};

export default useGoJS;