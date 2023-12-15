import React, { useState, useRef } from 'react';
import { Html } from 'react-konva-utils';
import StickyStyle from './StickyStyle';

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  border: '2px solid black',
  borderRadius: '10px',
  gap: '10px',
  backgroundColor: 'gray',
  padding: '10px',
};

function StickyPopup({
  x,
  y,
  onClose,
  onColorChange,
  handleText,
  onIncreaseFontSize,
  onDecreaseFontSize,
  onBorderChange,
  onItalicChange,
  onTextAlignChange,
  onFontWeight,
  fontFamily,
  onTextDecoration
}) {
  const colorOptions = ['red', 'green', 'blue'];
  const [stylePopup, setStylePopup] = useState(false);
  const groupRef = useRef(null);

  const handleColorClick = (color) => {
    if (typeof onColorChange === 'function') {
      onColorChange(color);
    }
  };

  return (
    <>
      <Html groupRef={groupRef} groupProps={{ x, y }} divProps={containerStyle}>
        <div style={containerStyle}>
          <span>
            <i className="fa fa-pencil" onClick={handleText}></i>
          </span>
          <span>
            <i className="fa fa-trash" onClick={onBorderChange}></i>
          </span>
          <span>
          <i class="fa-sharp fa-regular fa-rectangle"></i>
          </span>
          <span>
            <i className="fa fa-plus" onClick={onIncreaseFontSize}></i>
          </span>
          <span>
            <i className="fa fa-minus" onClick={onDecreaseFontSize}></i>
          </span>
          <button onClick={() => setStylePopup(!stylePopup)}>S</button>
          {colorOptions.map((color, index) => (
            <span key={index}>
              <i
                className="fa fa-circle"
                style={{ color: color }}
                onClick={() => handleColorClick(color)}
              ></i>
            </span>
          ))}
         
        </div>
       
      </Html>
      {stylePopup && (
            <StickyStyle x={x + 105} y={y - 40} groupRef={groupRef} 

              onTextAlignChange={onTextAlignChange}
              fontFamily={fontFamily}
              onFontWeight={onFontWeight}
              onItalicChange={onItalicChange}
              onTextDecoration={onTextDecoration}
            />
          )}
    </>
  );
}

export default StickyPopup;
