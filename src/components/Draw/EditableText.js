import React, { useMemo } from "react";
import { ResizableText } from "./ResizableText";
import { EditableTextInput } from "./EditableTextInput";

export function EditableText({
  x,
  y,
  isEditing,
  isTransforming,
  onToggleEdit,
  onToggleTransform,
  onChange,
  onResize,
  text,
  width,
  height,
  onKeyDown,
  fontSize,
  italic,
  textAlign,
  fontWeight,
  fontFamily,
  onTextDecoration
}) {
  // Create a memoized key based on width and height
  const memoizedKey = useMemo(() => `${width}-${height}`, [width, height]);

  if (isEditing) {
    return (
      <EditableTextInput
        key={memoizedKey} // Set key to trigger re-render when width or height changes
        x={x + 10}
        y={y + 20}
        width={width}
        height={height}
        value={text}
        onChange={onChange}
        fontSize={fontSize}
        italic={italic}
        textAlign={textAlign}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        textDecoration={onTextDecoration}
        // onKeyDown={onKeyDown}
      />
    );
  }

  return (
    <ResizableText
      x={x}
      y={y}
      isSelected={isTransforming}
      onClick={onToggleTransform}
      onDoubleClick={onToggleEdit}
      onResize={onResize}
      text={text}
      width={width}
    />
  );
}
