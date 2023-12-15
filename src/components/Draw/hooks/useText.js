import { useState } from "react";
export const useText = () => {
  const [texts, setTexts] = useState([]);
  const [newTextPosition, setNewTextPosition] = useState({ x: 0, y: 0 });
  const [newText, setNewText] = useState("");
  const [isAddingText, setIsAddingText] = useState(false);
  const [textsRedoHistory, setTextsRedoHistory] = useState([]);
  const [inputtext, setInutText] = useState();

  // text functions
  const handleInput = (event) => {
    setNewText(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      addNewText();
    }
  };

  const addNewText = () => {
    if (newText.trim() !== "") {
      const id = Date.now().toString();
      setTexts((prevTextElements) => [
        ...prevTextElements,
        {
          id,
          text: newText,
          x: newTextPosition.x,
          y: newTextPosition.y,
        },
      ]);
    }
    setIsAddingText(false);
    setNewText("");
  };

  return {
    inputtext,
    setInutText,
    texts,
    textsRedoHistory,
    setTextsRedoHistory,
    setTexts,
    newTextPosition,
    setNewTextPosition,
    newText,
    setNewText,
    isAddingText,
    setIsAddingText,
    handleInput,
    handleInputKeyDown,
    addNewText,
  };
};
