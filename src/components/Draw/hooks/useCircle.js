import { useState } from "react";
export const useCircle =()=>{
    const [circles, setCircles] = useState([]);
    const [circlesRedoHistory, setCirclesRedoHistory] = useState([]);
    const [circleColor, setCircleColor] = useState("#000000");
    return {circles,setCircles,circlesRedoHistory,setCirclesRedoHistory,circleColor,setCircleColor}

}