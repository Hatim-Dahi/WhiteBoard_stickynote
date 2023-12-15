import { useState, useRef } from "react";
export const usePen = () => {
  const [lineColor, setLineColor] = useState("#000000");
  const [line1Color, setLine1Color] = useState("#000000");
  const [line2Color, setLine2Color] = useState("#000000");
  const [lines, setLines] = useState([]);
  const [linesRedoHistory, setLinesRedoHistory] = useState([]);
  const [selectedColor, setSelectedColor] = useState("#0055ff");
  const [brushColor, setBrushColor] = useState("#000000");

  //   Ref
  const lineRef = useRef();
  const lineRef2 = useRef();
  const lineRef3 = useRef(); // Ref to keep track of current lines
  const brushRef = useRef();
  const eraserRef = useRef();

  return {
    lineColor,
    line1Color,
    line2Color,
    setLineColor,
    setLine1Color,
    setLine2Color,
    lineRef,
    lineRef2,
    lineRef3,
    lines,
    setLines,
    linesRedoHistory,
    setLinesRedoHistory,
    brushRef,
    eraserRef,
    selectedColor,
    setSelectedColor,
    brushColor,
    setBrushColor,
  };
};
