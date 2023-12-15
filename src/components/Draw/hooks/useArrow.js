import { useState } from "react";
export const useArrow =()=>{
    const [arrows, setArrows] = useState([]);
    const [arrowsRedoHistory, setArrowsRedoHistory] = useState([]);
    const [arrowColor, setArrowColor] = useState("#000000");
    const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);

    return {arrows,setArrows,startX,setStartX,startY,setStartY,endX,setEndX,endY,setEndY,arrowsRedoHistory,setArrowsRedoHistory,arrowColor,setArrowColor}

}