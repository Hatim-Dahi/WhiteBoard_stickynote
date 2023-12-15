import React, { useState, useRef } from 'react';
import { Html } from 'react-konva-utils';

const stickyStyleContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  border: '2px solid black',
  borderRadius: '10px',
  gap: '10px',
  backgroundColor: 'gray',
  padding: '10px',
};

const StickyStyle = ({ x, y, onTextAlignChange,fontFamily,onFontWeight,onItalicChange,onTextDecoration }) => {
  const [clickedIcon, setClickedIcon] = useState(null);
  const [selectedFont, setSelectedFont] = useState('');

  const handleIconClick = (iconName) => {
    setClickedIcon(iconName === clickedIcon ? null : iconName);
  };

  const getIconStyle = (iconName) => {
    return {
      fontSize: '20px',
      color: clickedIcon === iconName ? 'white' : 'black',
      cursor: 'pointer',
    };
  };

  const groupRef = useRef(null);

  const handleFontChange = (event) => {
    const fontName = event.target.value;
    setSelectedFont(fontName);
    fontFamily(fontName)
    // Call your font change function or update state with the selected font name
    // Example: onFontChange(fontName);
  };

  return (
    <Html groupRef={groupRef} groupProps={{ x, y }} divProps={stickyStyleContainer}>
      <div style={stickyStyleContainer}>
      <button  onClick={onFontWeight}>B</button>
      <button onClick={onItalicChange} >I</button>
      <button onClick={onTextDecoration} >U</button>
        <span>
          <i
            className="fa fa-align-left"
            style={getIconStyle('align-left')}
            onClick={() => onTextAlignChange('left')}
          ></i>
        </span>
        <span>
          <i
            className="fa fa-align-right"
            style={getIconStyle('align-right')}
            onClick={() => onTextAlignChange('right')}
          ></i>
        </span>
        <span>
          <i
            className="fa fa-align-center"
            style={getIconStyle('align-center')}
            onClick={() => onTextAlignChange('center')}
          ></i>
        </span>
        <select value={selectedFont} onChange={handleFontChange}>
          <option value="">Select Font</option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        
        </select>
      </div>
    </Html>
  );
};

export default StickyStyle;
