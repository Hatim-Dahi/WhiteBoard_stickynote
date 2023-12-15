import React, { useRef, useState, useEffect, useMemo } from "react";
import { Rect, Text, Group, Transformer, Circle } from "react-konva";
import { EditableText } from "./EditableText";
import StickyPopup from "./StickyPopup";

const Sticky = ({
  x,
  y,
  width,
  height,
  text,
  draggable,
  handleDragEnd,
  onChange,
  onDelete,
  color,
  isSelected,
  isText,
  handleSelect,
  shape,
  onSelectText,
  onBorderChange,
  fontFamily
}) => {
  const shapeRef = useRef(null);
  const textRef = useRef(null);
  const deleteButtonRef = useRef(null);
  const transformStickyRef = useRef(null);
  const inputRef = useRef(null);
  const [fontSize, setFontSize] = useState(16);
  const [editingText, setEditingText] = useState(true);
  const [stickyColor, setStickyColor] = useState(color);
  const [textWriting, setTextWriting] = useState(false);
  const [textAlign, setTextAlign] = useState("left");
  const [fontfamily, setFontfamily] = useState("Arial");
  const [textUnderline, setTextUnderline] = useState(false);
  const [italic, setItalic] = useState(false);
  const [fontWeight, setFontWeight] = useState(false);
  const [stickyStyle, setStickyStyle] = useState({
    fontWeight: "normal",
    border: false,
    fontStyle: "normal",
  });

  const [size, setSize] = useState({ width, height });
  const [myWidth, setMyWidth] = useState(width);
  const [myHeight, setMyHeight] = useState(height);

  const shapeWidth = useMemo(() => shapeRef.current ? shapeRef.current.width() : 0, [shapeRef.current]);

  const transformChanged = useMemo(() => false, []); // No dependencies because we only need the initial value

  useEffect(() => {
    console.log("width is " + width);
    console.log("height is" + height);

    if (isSelected) {
      transformStickyRef.current.nodes([
        shapeRef.current,
        textRef.current,
        deleteButtonRef.current,
      ]);
      transformStickyRef.current.getLayer().batchDraw();
      if (textRef.current) {
        textRef.current.width(width - 20);
        textRef.current.height(height - 20);
      }
      const timer = setTimeout(() => {
        transformStickyRef.current.nodes([]);
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [isSelected, myWidth, myHeight]);

  const handleTextAlignChange = (align) => {
    console.log(align);
    setTextAlign(align);
  };

  const handleFontFamily = (family) => {
    setFontfamily(family);
  };

  const handleBorderChange = () => {
    setStickyStyle((prevStyle) => ({
      ...prevStyle,
      border: !prevStyle.border,
      fontStyle: "bold",
    }));
  };

  const handleItalicChange = () => {
    setItalic(!italic);
  };

  const handleIncreaseFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize + 2);
  };

  const handleDecreaseFontSize = () => {
    setFontSize((prevFontSize) => Math.max(prevFontSize - 2, 10));
  };

  const handleFontWightChange = () => {
    setFontWeight(!fontWeight);
  };

  const [newX, setNewX] = useState(x);
  const [newY, setNewY] = useState(y);

  const handleTransform = () => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const newWidth = Math.max(node.width() * scaleX, 50);
    const newHeight = Math.max(node.height() * scaleY, 50);
    // Get the new coordinates after transformation

    const newCenterX = node.x() + node.width() / 2;
    const newCenterY = node.y() + node.height() / 2;

    const newX = newCenterX - newWidth / 2;
    const newY = newCenterY - newHeight / 2;

    
    console.log("width after resizing: " + newWidth);
    console.log("height after resizing: " + newHeight);
    console.log("new x coordinate: " + newX);
    console.log("new y coordinate: " + newY); setSize({ width: newWidth, height: newHeight });
    setMyWidth(newWidth);
    setMyHeight(newHeight);
    setNewX(newX);
    setNewY(newY);
  };

  function colorChange(c) {
    setStickyColor(c);
  }

  function handleText() {
    setTextWriting(!textWriting);
  }


  const handleDragEndSticky = (e) => {
    // Get the new coordinates after dragging
    const newX = e.target.x();
    const newY = e.target.y();

    // Update the state
    setNewX(newX);
    setNewY(newY);

    // Call the original handleDragEnd function if provided
    if (handleDragEnd) {
      handleDragEnd(e);
    }
  };

  return (
    <>
      <Group>
        {shape === "Rectangle" && (
          <Rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={stickyColor}
            {...(stickyStyle.border && { stroke: "black", strokeWidth: 2 })}
            cornerRadius={10}
            draggable={draggable}
            onDragEnd={handleDragEnd}
            onClick={handleSelect}
            ref={shapeRef}
          />
        )}
        {shape === "circle" && (
          <Circle
            x={x + width / 2}
            y={y + height / 2}
            radius={width / 2}
            fill={stickyColor}
            stroke="#999966"
            strokeWidth={4}
            draggable={draggable}
            onDragEnd={handleDragEnd}
            onClick={handleSelect}
            ref={shapeRef}
          />
        )}

        {shape === "square" && (
          <Rect
            x={x}
            y={y}
            width={width}
            height={width}
            fill={stickyColor}
            stroke="#999966"
            strokeWidth={0.1}
            cornerRadius={10}
            draggable={draggable}
            onDragEnd={handleDragEndSticky} // Use the custom handler for dragging
            // onDragEnd={handleDragEnd}
            onClick={handleSelect}
            ref={shapeRef}
            style={{
              transition: "width 0.3s ease, height 0.3s ease, transform 0.3s ease",
              // Add other styles as needed
              boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;', // Dark color for the shadow
              filter: 'drop-shadow(1.95px 1.95px 2.6px rgba(0, 0, 0, 0.15))', // Similar shadow effect for compatibility
            }}
          />

        )}
        <Text
          x={x + 10}
          y={y + 10}
          width={width - 20}
          height={height - 20}
          onClick={onSelectText}
          fontFamily="Calibri"
          fontSize={fontSize}
          fill="#333333"
          verticalAlign="middle"
          align={textAlign}
          draggable={draggable}
          onDragEnd={handleDragEndSticky} // Use the custom handler for dragging
          // onDragEnd={handleDragEnd}
          {...stickyStyle}
          ref={textRef}
          style={{
            transition: "width 0.3s ease, height 0.3s ease, transform 0.3s ease",
            // Add other styles as needed
          }}
        />

        {isText && (
          <StickyPopup
            x={x}
            y={y - 80}
            onColorChange={colorChange}
            handleText={handleText}
            onDecreaseFontSize={handleDecreaseFontSize}
            onIncreaseFontSize={handleIncreaseFontSize}
            onBorderChange={handleBorderChange}
            onItalicChange={handleItalicChange}
            onTextAlignChange={handleTextAlignChange}
            onFontWeight={handleFontWightChange}
            fontFamily={handleFontFamily}
            onTextDecoration={() => setTextUnderline(!textUnderline)}
          />
        )}
        {textWriting && (
          <EditableText
            ref={inputRef}
            x={newX}
            y={newY}
            text={text}
            width={myWidth}
            height={myHeight}
            isEditing={textWriting}
            onChange={onChange}
            fontSize={fontSize}
            italic={italic}
            textAlign={textAlign}
            fontWeight={fontWeight}
            fontFamily={fontfamily}
            onTextDecoration={textUnderline}
          />
        )}

        <Group x={x + width - 35} y={y} width={30} height={30} ref={deleteButtonRef} />
      </Group>
      {isSelected && (
        <Transformer
          ref={transformStickyRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 50 || newBox.height < 50) {
              return oldBox;
            }
            return newBox;
          }}
          onTransform={handleTransform}
        />
      )}
    </>
  );
};

export default Sticky;
