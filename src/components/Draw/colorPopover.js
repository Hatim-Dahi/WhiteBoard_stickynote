import React from "react";
import { Popover } from "react-bootstrap";
import { DrawingColors } from "../../utils/DrawingColor";

const colorPopover = ({ setSelectedColor }) => {

  return (
    <Popover id="popover-basic">
      <Popover.Body>
        <div style={{ display: "flex" }}>
          {DrawingColors.map((color) => (
            <div
              key={color.color}
              onClick={() => setSelectedColor(color.color)}
              style={{
                backgroundColor: color.color,
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                margin: "6px",
                cursor: "pointer",
              }}
              title={color.title}
            ></div>
          ))}
        </div>
      </Popover.Body>
    </Popover>
  );
};

export default colorPopover;
