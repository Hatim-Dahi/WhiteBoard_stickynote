import React from 'react';
import { Popover } from 'react-bootstrap';
import { DrawingColors } from "../../utils/DrawingColor";

const CustomStickyPopover = ({ myselectedColor, setMySelectedColor, handleAddNote }) => {
  const handleColorClick = (color) => {
    setMySelectedColor(color);
    handleAddNote(200, 200, 'square', color); // Pass the selected color to handleAddNote
  };

  return (
    <Popover id="popover-basic" style={{ height: '70vh' }}>
      <Popover.Body style={{ width: '160px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {DrawingColors.map((color) => (
            <div
              key={color.color}
              onClick={() => handleColorClick(color.color)}
              style={{
                backgroundColor: color.color,
                width: '40px',
                height: '40px',
                margin: '10px',
                cursor: 'pointer',
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
                transition: 'box-shadow 0.4s ease-in-out, transform 0.3s ease-in-out',
                border: color.color === myselectedColor ? '2px solid red' : '1px solid black',
                borderRadius: '5px',
              }}
              title={color.title}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.2)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            ></div>
          ))}
        </div>
      </Popover.Body>
    </Popover>
  );
};

export default CustomStickyPopover;
