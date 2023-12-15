import { useState } from "react"
export const useCommon =()=>{
    const [draw, setDraw] = useState([]);
    const [selectedTool, setSelectedTool] = useState("");
    return {draw,selectedTool,setDraw,setSelectedTool,}

}