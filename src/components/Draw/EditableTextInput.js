import React, { useState, useEffect, useRef } from "react";
import { Html } from "react-konva-utils";

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;
const BACKSPACE_KEY = 8;

export function EditableTextInput({
  x,
  y,
  width,
  height,
  value,
  onChange,
  onKeyDown,
  isEditing,
  fontSize,
  italic,
  textAlign,
  fontWeight,
  fontFamily,
  textDecoration,
}) {
  const [inputValue, setInputValue] = useState(value);
  const [disable, setDisable] = useState(false);
  const [myWidth, setMyWidth] = useState(null);
  const [myHeight, setMyHeight] = useState(null);
  const [currentFont, setCurrentFont] = useState(50);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);
  const textareaRef = useRef(null);

  const getStyle = (currentFont) => {
    const isFirefox =
      navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    const baseStyle = {
      width: `${width}px`,
      height: `${height}px`,
      border: "none",
      padding: "10px 20px",
      margin: "5px",
      background: "none",
      outline: "none",
      textDecoration: textDecoration ? "underline" : "none",
      color: "black",
      fontSize: `${currentFont}px`,
      fontFamily: fontFamily,
      textAlign: textAlign,
      fontStyle: italic ? "italic" : "normal",
      fontWeight: fontWeight ? "bold" : "normal",
      overflow: "hidden", 
      resize: "none", 
    };
    if (isFirefox) {
      return baseStyle;
    }
    return {
      ...baseStyle,
      marginTop: "-4px",
    };
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const handleEscapeKeys = (e) => {
    if (e.keyCode === ESCAPE_KEY) {
      e.preventDefault();
      setDisable(true);
    }
  };

  const handleBackspace = (e) => {
    const textarea = textareaRef.current;
    if (e.keyCode === BACKSPACE_KEY) {
      if (textarea.scrollHeight < prevScrollHeight) {
        // ScrollHeight decreased, set font size back to its previous state
        setCurrentFont((prevFont) => Math.min(prevFont + 5, 40)); // Increase font size up to the initial state
      }
      setPrevScrollHeight(textarea.scrollHeight);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      if (textarea.scrollHeight > textarea.clientHeight) {
        setCurrentFont((prevFont) => prevFont - 3);
      }
      setPrevScrollHeight(textarea.scrollHeight);
    }

    setMyWidth(width);
    setMyHeight(height);
    console.log("x coordinate in editabl:", x);
    console.log("y coordinate in editable:", y);
  }, [width, height, inputValue,currentFont, x, y]);

  return (
    <Html groupProps={{ x, y }} divProps={{ backgroundColor: "red" }}>
      <textarea
        ref={textareaRef}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={(e) => {
          handleEscapeKeys(e);
          handleBackspace(e);
          onKeyDown && onKeyDown(e);
        }}
        style={{
          ...getStyle(currentFont),
          width: `${myWidth - 30}px`,
          height: `${myHeight - 40}px`,
          resize: "none", // Disable resizing
        }}
        disabled={disable}
      />
    </Html>
  );
}
