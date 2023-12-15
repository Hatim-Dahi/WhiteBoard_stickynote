import React, { useRef } from 'react';
import { Line, Layer, Rect } from 'react-konva';

const Pen = ({ lines }) => {
  const isDrawing = useRef(false);
  const lastLine = useRef(null);

  const handleMouseDown = (e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    isDrawing.current = true;
    const newLine = {
      points: [point.x, point.y],
      color: 'black',
      strokeWidth: 2
    };
    lastLine.current = newLine;
    lines.push(newLine);
  };

  const handleMouseMove = (e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    if (isDrawing.current) {
      const newPoints = [...lastLine.current.points, point.x, point.y];
      const newLine = { ...lastLine.current, points: newPoints };
      lines[lines.length - 1] = newLine;
      lastLine.current = newLine;
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    lastLine.current = null;
  };

  return (
    <>
      {lines.map((line, i) => (
        <Pen
          key={i}
          line={line.line}
          line2={line.line2}
          line3={line.line3}
          ref={
            line.line
              
          }
          points={line.points}
          color={line.color}
          strokeWidth={line.line ? 2 : line.line2 ? 10 : line.line3 ? 20 : 80}
        />
      ))}
      <Layer>
        <Rect
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </Layer>
    </>
  );
};

export default Pen;
