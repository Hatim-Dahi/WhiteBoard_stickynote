import React, { useState } from "react";
import { Popover } from "react-bootstrap";
import { HiOutlinePencil } from "react-icons/hi";
import { GoPencil } from "react-icons/go";
import { ImPencil } from "react-icons/im";
import { Colors } from "../../utils/Colors";
import { DrawingColors } from "../../utils/DrawingColor";

const CustomPopover = ({ handleColorChange, setSelectedTool }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const colorNames = Object.keys(Colors);

  const rows = [];
  const maxColorsPerRow = 3;

  for (let i = 0; i < colorNames.length; i += maxColorsPerRow) {
    const rowColorNames = colorNames.slice(i, i + maxColorsPerRow);
    const row = (
      <div
        key={i}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        {rowColorNames.map((colorName, index) => (
          <div
            key={index}
            onClick={() => handleColorChange(Colors[colorName])}
            style={{
              backgroundColor: Colors[colorName],
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              cursor: "pointer",
            }}
            title={colorName} // Display color name on hover
          ></div>
        ))}
      </div>
    );
    rows.push(row);
  }

  return (
    <Popover id="popover-basic">
      <Popover.Body> 
        <div style={{ display: "flex", flexWrap: "wrap", width: "120px" }}>
          {DrawingColors.map((color, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedColor(color.color); 
                handleColorChange(color.color)
              }}
              style={{
                backgroundColor: color.color,
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                margin: "6px",
                cursor: "pointer",
              }}
              title={color.title} // Display color name on hover
            ></div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            onClick={() => { 
              setSelectedTool("line");
            }}
            style={{
              color: selectedColor ? selectedColor : "black",
              fontWeight: "bold",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <HiOutlinePencil
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          </div>
          <div
            onClick={() => setSelectedTool("line2")}
            style={{
              color: selectedColor ? selectedColor : "black",
              fontWeight: "bold",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <GoPencil
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          </div>

          <div
            onClick={() => setSelectedTool("line3")}
            style={{
              color: selectedColor ? selectedColor : "black",
              fontWeight: "bold",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <ImPencil
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );
};

export default CustomPopover;
