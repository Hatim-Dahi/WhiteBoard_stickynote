import React, {  useRef } from "react";
import { Image as KonvaImage, Transformer } from "react-konva";

function ImageUpload({ image, isSelected, onSelect, onChange, onResize }) {
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  const handleDragEnd = (e) => {
    onChange(e.target.x(), e.target.y());
  };

  const handleTransform = (e) => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // Update the size of the image
    const width = node.width() * scaleX;
    const height = node.height() * scaleY;

    // Update the position of the image
    const x = node.x();
    const y = node.y();

    // Update the size and position in the parent component
    onResize(width, height);
    onChange(x, y);

    // Reset the scale of the image
    node.scaleX(1);
    node.scaleY(1);
  };

  return (
    <>
      <KonvaImage
        image={image.src}
        x={image.x}
        y={image.y}
        width={image.width}
        height={image.height}
        draggable
        onClick={onSelect}
        onDragEnd={handleDragEnd}
        ref={shapeRef}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          enabledAnchors={["middle-left", "middle-right"]}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit the minimum size of the image
            newBox.width = Math.max(30, newBox.width);
            newBox.height = Math.max(30, newBox.height);
            return newBox;
          }}
          rotateEnabled={false}
          keepRatio={false}
          onTransform={handleTransform}
        />
      )}
    </>
  );
}
export default ImageUpload;
