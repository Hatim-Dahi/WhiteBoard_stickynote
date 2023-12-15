import { useState } from "react"

export const useRectangle =()=>{
    const [rectanglesRedoHistory, setRectanglesRedoHistory] = useState([]);
    const [rectangles, setRectangles] = useState([]);
    const [rectangleColor, setRectangleColor] = useState("#000000");

    return {rectangleColor,setRectangleColor,rectangles,setRectangles,rectanglesRedoHistory,setRectanglesRedoHistory}

}