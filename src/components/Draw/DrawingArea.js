import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Circle, Text, Rect, Arrow } from "react-konva";
import { BiText, BiRectangle, BiBrush } from "react-icons/bi";
import ImageUpload from "./imageUpload";

import {
  BsPencil,
  BsStickyFill,
  BsFileArrowUp,
  BsEraser,
  BsTrashFill,
  BsDownload,
  BsZoomIn,
  BsZoomOut,
  BsFillStickyFill,
} from "react-icons/bs";
import { FaRedo, FaUndoAlt } from "react-icons/fa";
import { HiOutlinePhotograph } from "react-icons/hi";
import { VscCircle } from "react-icons/vsc";
import { usePen } from "./hooks/usePen";

import { HuePicker } from "react-color";
import Sticky from "./Sticky";
import DrawerHeader from "./drawerHeader";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import CustomPopover from "./popover";
import CustomStickyPopover from "./customStickyPopover";
import Pen from "./pen";
import { useText } from "./hooks/useText";
import { useSticky } from "./hooks/useSticky";
import { useCircle } from "./hooks/useCircle";
import { useRectangle } from "./hooks/useRectangle";
import { useImage } from "./hooks/useImage";
import { useArrow } from "./hooks/useArrow";
// import { handleClear } from "./Function/handleClear";
// import { handleColorChange } from "./Function/handleColorChange";
const DrawingArea = () => {
  const stageRef = useRef(null);
  // hooks for stroing different tools in the array
  const [draw, setDraw] = useState([]);
  const [shape, setShape] = useState("Rectangle");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);
  const [newNoteToAdd, setNewNoteToAdd] = useState(null);


  // Redo hooks

  // These hooks for arrow points

  const [selectedTool, setSelectedTool] = useState("");
  // hooks for different tool  color

  // const [lineColor, setLineColor] = useState("#000000");
  const {
    lineColor,
    line1Color,
    line2Color,
    setLineColor,
    setLine1Color,
    setLine2Color,
    lineRef,
    lineRef2,
    lineRef3,
    lines,
    setLines,
    linesRedoHistory,
    setLinesRedoHistory,
    brushRef,
    eraserRef,
    selectedColor,
    setSelectedColor,
    brushColor,
    setBrushColor,
  } = usePen();
  const { notes, setNotes, stickyShow, setStickyShow } = useSticky();
  const {
    inputtext,
    setInutText,
    texts,
    textsRedoHistory,
    setTextsRedoHistory,
    setTexts,
    newTextPosition,
    setNewTextPosition,
    newText,
    setNewText,
    isAddingText,
    setIsAddingText,
    handleInput,
    handleInputKeyDown,
    addNewText,
  } = useText();
  const {
    circles,
    setCircles,
    circlesRedoHistory,
    setCirclesRedoHistory,
    circleColor,
    setCircleColor,
  } = useCircle();
  const {
    rectangleColor,
    setRectangleColor,
    rectangles,
    setRectangles,
    rectanglesRedoHistory,
    setRectanglesRedoHistory,
  } = useRectangle();
  const {
    images,
    setImages,
    imagesRedoHistory,
    setImagesRedoHistory,
    handleDragEnd,
    handleImageUpload,
    handleResize,
  } = useImage();
  const {
    arrows,
    setArrows,
    startX,
    setStartX,
    startY,
    setStartY,
    endX,
    setEndX,
    endY,
    setEndY,
    arrowsRedoHistory,
    setArrowsRedoHistory,
    arrowColor,
    setArrowColor,
  } = useArrow();

  const [scale, setScale] = useState(1);
  const [cardTransform, setCardTransform] = useState(false);
  const handleCardTransform = () => {
    setCardTransform(!cardTransform);
  };

  const isDrawing = useRef(false);

  // iamges

  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  // popover elements

  // fucntion for export the canvas part only
  const handleExport = () => {
    const stage = stageRef.current;
    const canvas = stage.toCanvas();

    // Convert the canvas to a data URL
    const dataURL = canvas.toDataURL("image/jpeg");

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "stage.jpg";

    // Programmatically click the link to trigger the download
    link.click();
  };
  // zoom in zoom out
  const handleZoomIn = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  const handleZoomOut = () => {
    setScale((prevScale) => (prevScale > 0.1 ? prevScale - 0.1 : prevScale));
  };

  // Functions calling when the mouse click on the board start draawing
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();

    if (selectedTool === "line") {
      const newLine = {
        points: [pos.x, pos.y],
        line: true,
        ref: React.createRef(),
        color: lineColor, // set the line color to lineColor1
      };
      setLines([...lines, newLine]);
      lineRef.current = newLine.ref; // Update line ref
      setDraw([...draw, { points: [pos.x, pos.y] }]);
    } else if (selectedTool === "circle") {
      setCircles([
        ...circles,
        { x: pos.x, y: pos.y, radius: 0, color: circleColor },
      ]);
      setDraw([...draw, { x: pos.x, y: pos.y, radius: 0, color: circleColor }]);
    } else if (selectedTool === "rectangle") {
      setRectangles([
        ...rectangles,
        { x: pos.x, y: pos.y, width: 0, height: 0, color: rectangleColor },
      ]);
      setDraw([
        ...draw,
        { x: pos.x, y: pos.y, width: 0, height: 0, color: rectangleColor },
      ]);
    } else if (selectedTool === "brush") {
      const newBrushLine = {
        points: [pos.x, pos.y],
        brush: true,
        ref: React.createRef(),
        color: brushColor,
      };
      setLines([...lines, newBrushLine]);
      brushRef.current = newBrushLine.ref; // Update brush ref
    } else if (selectedTool === "line2") {
      const newLine2 = {
        points: [pos.x, pos.y],
        line2: true,
        ref: React.createRef(),
        color: line1Color, // set the line color to lineColor11
      };
      setLines([...lines, newLine2]);
      lineRef2.current = newLine2.ref; // Update line2 ref
    } else if (selectedTool === "line3") {
      const newLine3 = {
        points: [pos.x, pos.y],
        line3: true,
        ref: React.createRef(),
        color: line2Color, // set the line color to lineColor1
      };
      setLines([...lines, newLine3]);
      lineRef3.current = newLine3.ref; // Update line3 ref
    } else if (selectedTool === "eraser") {
      const newEraser = {
        points: [pos.x, pos.y],
        eraser: true,
        ref: React.createRef(),
        color: "white", // set the line color to lineColor1
      };
      setLines([...lines, newEraser]);
      eraserRef.current = newEraser.ref; // Update line3 ref
    } else if (selectedTool === "arrow") {
      setStartX(pos.x);
      setStartY(pos.y);
    } else if (selectedTool === "text") {
      if (!isAddingText) {
        setIsAddingText(true);
        const stage = e.target.getStage();
        const position = stage.getPointerPosition();
        setNewTextPosition(position);
      }
    }
  };
  // Functions calling when the mouse move on the board for start draawing
  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    if (selectedTool === "line") {
      const newLine = {
        ...lines[lines.length - 1],
        points: lines[lines.length - 1].points.concat([point.x, point.y]),
      };
      lines.splice(lines.length - 1, 1, newLine);
      setLines([...lines]);
    } else if (selectedTool === "circle") {
      let lastCircle = circles[circles.length - 1];
      if (lastCircle) {
        const radius =
          Math.sqrt(
            Math.pow(point.x - lastCircle.x, 2) +
            Math.pow(point.y - lastCircle.y, 2)
          ) / 2;
        lastCircle.radius = radius;
        setCircles([...circles]);
      }
    } else if (selectedTool === "rectangle") {
      let lastRectangle = rectangles[rectangles.length - 1];
      if (lastRectangle) {
        const width = point.x - lastRectangle.x;
        const height = point.y - lastRectangle.y;
        lastRectangle.width = width;
        lastRectangle.height = height;
        setRectangles([...rectangles]);
      }
    } else if (selectedTool === "brush") {
      const newBrushLine = {
        ...lines[lines.length - 1],
        points: lines[lines.length - 1].points.concat([point.x, point.y]),
      };
      lines.splice(lines.length - 1, 1, newBrushLine);
      setLines([...lines]);
    } else if (selectedTool === "line2") {
      const newLine2 = {
        ...lines[lines.length - 1],
        points: lines[lines.length - 1].points.concat([point.x, point.y]),
      };
      lines.splice(lines.length - 1, 1, newLine2);
      setLines([...lines]);
    } else if (selectedTool === "line3") {
      const newLine3 = {
        ...lines[lines.length - 1],
        points: lines[lines.length - 1].points.concat([point.x, point.y]),
      };
      lines.splice(lines.length - 1, 1, newLine3);
      setLines([...lines]);
    } else if (selectedTool === "eraser") {
      const newEraser = {
        ...lines[lines.length - 1],
        points: lines[lines.length - 1].points.concat([point.x, point.y]),
      };
      lines.splice(lines.length - 1, 1, newEraser);
      setLines([...lines]);
    } else if (selectedTool === "arrow") {
      setEndX(point.x);
      setEndY(point.y);
    }
  };
  //  // Functions calling when the mouse not click and start stop drawing
  const handleMouseUp = (e) => {
    isDrawing.current = false;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    if (selectedTool === "arrow") {
      const newArrow = {
        id: arrows.length + 1,
        startX,
        startY,
        endX,
        endY,
        color: arrowColor,
        strokeWidth: 2,
      };

      setArrows([...arrows, newArrow]);
    } else if (selectedTool === "rectangle") {
      let last = rectangles[rectangles.length - 1];
      if (last) {
        const width = point.x - last.x;
        const height = point.y - last.y;
        if (width >= 1 && height >= 1) {
          const newRectangle = {
            x: last.x,
            y: last.y,
            width,
            height,
            color: rectangleColor,
            strokeWidth: 2,
          };
          setRectangles([...rectangles, newRectangle]);
        } else {
          setRectangles(rectangles.slice(0, rectangles.length - 1));
        }
      }
    }
  };

  // Functions for text drag move
  const handleTextDragMove = (e, i) => {
    const updatedTexts = [...texts];
    const newX = e.target.x();
    const newY = e.target.y();
    updatedTexts[i].x = newX;
    updatedTexts[i].y = newY;
    setTexts([...updatedTexts]);
  };
  // all types of lines in the array for checking the condition for undo
  const lineTools = ["line", "line2", "line3", "brush"];

  const handleUndo = () => {
    if (lineTools.includes(selectedTool) && lines.length > 0) {
      setLines((prevLines) => {
        const lastLine = prevLines[prevLines.length - 1];
        setLinesRedoHistory((prevRedoHistory) => [
          ...prevRedoHistory,
          lastLine,
        ]);
        return prevLines.slice(0, -1);
      });
    } else if (selectedTool === "circle" && circles.length > 0) {
      setCircles((prevCircles) => {
        const lastCircle = prevCircles[prevCircles.length - 1];
        setCirclesRedoHistory((prevRedoHistory) => [
          ...prevRedoHistory,
          lastCircle,
        ]);
        return prevCircles.slice(0, -1);
      });
    } else if (selectedTool === "text" && texts.length > 0) {
      setTexts((prevTexts) => {
        const lastText = prevTexts[prevTexts.length - 1];
        setTextsRedoHistory((prevRedoHistory) => [
          ...prevRedoHistory,
          lastText,
        ]);
        return prevTexts.slice(0, -1);
      });
    } else if (selectedTool === "rectangle" && rectangles.length > 0) {
      setRectangles((prevRectangles) => {
        const lastRectangle = prevRectangles[prevRectangles.length - 1];
        setRectanglesRedoHistory((prevRedoHistory) => [
          ...prevRedoHistory,
          lastRectangle,
        ]);
        return prevRectangles.slice(0, -1);
      });
    } else if (selectedTool === "arrow" && arrows.length > 0) {
      setArrows((prevArrows) => {
        const lastArrow = prevArrows[prevArrows.length - 1];
        setArrowsRedoHistory((prevRedoHistory) => [
          ...prevRedoHistory,
          lastArrow,
        ]);
        return prevArrows.slice(0, -1);
      });
    } else if (selectedTool === "photos" && images.length > 0) {
      setImages((prevImages) => {
        const lastImage = prevImages[prevImages.length - 1];
        setImagesRedoHistory((prevRedoHistory) => [
          ...prevRedoHistory,
          lastImage,
        ]);
        return prevImages.slice(0, -1);
      });
    }
  };

  const handleRedo = () => {
    if (lineTools.includes(selectedTool) && linesRedoHistory.length > 0) {
      setLines((prevLines) => {
        const redoLine = linesRedoHistory[linesRedoHistory.length - 1];
        setLinesRedoHistory((prevRedoHistory) => prevRedoHistory.slice(0, -1));
        return [...prevLines, redoLine];
      });
    } else if (selectedTool === "circle" && circlesRedoHistory.length > 0) {
      setCircles((prevCircles) => {
        const redoCircle = circlesRedoHistory[circlesRedoHistory.length - 1];
        setCirclesRedoHistory((prevRedoHistory) =>
          prevRedoHistory.slice(0, -1)
        );
        return [...prevCircles, redoCircle];
      });
    } else if (
      selectedTool === "rectangle" &&
      rectanglesRedoHistory.length > 0
    ) {
      setRectangles((prevRectangles) => {
        const redoRectangle =
          rectanglesRedoHistory[rectanglesRedoHistory.length - 1];
        setRectanglesRedoHistory((prevRedoHistory) =>
          prevRedoHistory.slice(0, -1)
        );
        return [...prevRectangles, redoRectangle];
      });
    } else if (selectedTool === "arrow" && arrowsRedoHistory.length > 0) {
      setArrows((prevArrows) => {
        const redoArrow = arrowsRedoHistory[arrowsRedoHistory.length - 1];
        setArrowsRedoHistory((prevRedoHistory) => prevRedoHistory.slice(0, -1));
        return [...prevArrows, redoArrow];
      });
    } else if (selectedTool === "text" && textsRedoHistory.length > 0) {
      setTexts((prevtexts) => {
        const redoText = textsRedoHistory[textsRedoHistory.length - 1];
        setTextsRedoHistory((prevRedoHistory) => prevRedoHistory.slice(0, -1));
        return [...prevtexts, redoText];
      });
    } else if (selectedTool === "photos" && imagesRedoHistory.length > 0) {
      setImages((previmages) => {
        const redoImage = imagesRedoHistory[imagesRedoHistory.length - 1];
        setImagesRedoHistory((prevRedoHistory) => prevRedoHistory.slice(0, -1));
        return [...previmages, redoImage];
      });
    }
  };

  // Functions for clearing the board
  const handleClear = () => {
    setLines([]);
    setCircles([]);
    setTexts([]);
    setRectangles([]);
    setNotes([]);
    setArrows([]);
    setImages([]);
  };
  // savechanges function for inpput text

  // color for different tools with diffeent color options
  const handleColorChange = (color) => {
    // Update the selected color state
    console.log("Selected Color: ", color.hex);
    setSelectedColor(color.hex);
    // alert(color)
    // Update the appropriate tool color state based on selected tool
    switch (selectedTool) {
      case "brush":
        setBrushColor(color.hex);
        break;
      case "line":
        setLineColor(color);
        break;
      case "line2":
        setLine1Color(color.hex || color);
        break;
      case "line3":
        setLine2Color(color.hex || color);
        break;
      case "rectangle":
        setRectangleColor(color.hex);
        break;
      case "circle":
        setCircleColor(color.hex);
        break;
      case "arrow":
        setArrowColor(color.hex);
        break;
      default:
        break;
    }
  };
  // handleColorChange(selectedTool)
  // Function for circle move
  const handleCircleDragMove = (e, i) => {
    const updatedCircles = [...circles];
    const newRadius =
      Math.abs(e.target.x() - circles[i].x) +
      Math.abs(e.target.y() - circles[i].y);
    updatedCircles[i].radius = newRadius;
    setCircles([...updatedCircles]);
  };
  // Function for Rectangle move
  const handleRectangleDragMove = (e, i) => {
    const updatedRectangles = [...rectangles];
    const rect = updatedRectangles[i];

    // Calculate the new position and size of the rectangle based on the drag event
    const x = e.target.x();
    const y = e.target.y();

    // Calculate the new width and height of the rectangle based on the drag position
    // const pointerPos = e.target.getStage().getPointerPosition();
    const pointerPos = e.target.getStage().getPointerPosition();
    const newWidth = pointerPos.x;
    const newHeight = pointerPos.y;

    // const node = rectRef.current;
    // const scaleX = node.scaleX();
    // const scaleY = node.scaleY();

    // Update the rectangle in the state with the new width and height
    updatedRectangles[i] = {
      x: newWidth,
      y: newHeight,
      width: newWidth,
      height: newHeight,
      color: rectangleColor,
    };

    setRectangles([...updatedRectangles]);
  };

  // sticky notes
  const [inputText, setInputText] = useState("");
  const handleNoteSelect = (index) => {
    setSelectedIndex(index);
  };
  const handleNoteSelectText = (index) => {
    setSelectedTextIndex(index);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const [mySelectedColor, setMySelectedColor]= useState(selectedColor);

  const handleAddNote = (w, h, shape, color) => {
    // Store the information about the new note in the state
    console.log('comes in handleAddNote');
    console.log("the selected color is "+color);
    setNewNoteToAdd({
      width: w,
      height: h,
      shape: shape,
      text: inputText,
      draggable: true,
      color:color,
    });
    setInputText(""); // Reset inputText
    document.body.style.cursor = 'crosshair';

  };


  const handleWhiteboardClick = (e) => {
    console.log('whiteboard clicked');
    const stage = stageRef.current;
    const point = stage.getPointerPosition();

    // Check if there is a new note to add
    if (newNoteToAdd) {
      console.log('yes there is a new node to create');
      console.log('the stage is' + stage);
      console.log('the x point is ' + point.x + "ans the y point is" + point.y);
      // Add the new note to the notes list at the clicked position
      setNotes([
        ...notes,
        {
          ...newNoteToAdd,
          x: point.x,
          y: point.y,
        },
      ]);
      console.log('new node is added');
      // Reset the newNoteToAdd state variable
      setNewNoteToAdd(null);

      // Optionally, reset the cursor style
      // document.body.style.cursor = 'default';
      document.body.style.cursor = 'default';
    }

    else {
      // If there is a selected sticky note, deselect it
      if (selectedIndex !== null) {
        setSelectedIndex(null);
      }
      if (selectedTextIndex !== null) {
        setSelectedTextIndex(null);
      }
    }
  };



  // edit the sticy notes function
  const handleNoteChange = (index, newText) => {
    const updatedNotes = [...notes];
    updatedNotes[index].text = newText;
    setNotes(updatedNotes);
  };
  // For delete the sticky notes
  const handleNoteDelete = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    // const del=notes[index]
    // const res=notes.filter((item)=>item!==del)
    // setNotes(res)
  };

  return (
    <>
      <div
        style={{
          padding: "1px",
          borderColor: "red",
          backgroundColor: "#f5f5f5",
          overflow: "hidden",
        }}
      >
        {/* header of the board */}
        <DrawerHeader />
        <div style={{ margin: "20px" }}>
          {/* options of the color */}
          {/* <HuePicker color={selectedColor} onChange={handleColorChange} /> */}
          {stickyShow ? (
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: "row",
                flexWrap: "wrap",
                paddingTop: "20px",
              }}
            >
              {" "}
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex" }}>
          {/* options for draw in the board from icons select */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "0.2rem",
                gap: "0.2rem",
                margin: "0.2rem",
                backgroundColor: "white",
              }}
            >
              <OverlayTrigger
                trigger="click"
                placement="right"
                overlay={CustomPopover({ handleColorChange, setSelectedTool })}
                rootClose={true}
              >
                <div
                  onClick={() => setSelectedTool("line")}
                  style={{ padding: "12px" }}
                >
                  <BsPencil size={20} color="red" />
                </div>
              </OverlayTrigger>
              {/* stickynotes */}
              <OverlayTrigger
                trigger="click"
                placement="right"
                overlay={CustomStickyPopover({
                  mySelectedColor,
                  setMySelectedColor,
                  handleAddNote,
                })}
                
                rootClose={true}
              >
                <div
                  // onClick={() => handleAddNote(200, 300,shape)}
                  style={{ padding: "12px" }}
                >
                  <BsStickyFill />
                </div>
              </OverlayTrigger>

              <div
                onClick={() => setSelectedTool("eraser")}
                style={{ color: "blue", fontWeight: "bold", padding: "12px" }}
              >
                <BsEraser size={20} color="blue" />
              </div>


              <div
                variant="light"
                onClick={() => setSelectedTool("brush")}
                style={{ padding: "12px" }}
              >
                <BiBrush size={20} />
              </div>
              <div
                style={{ padding: "12px" }}
                onClick={() => setStickyShow(!stickyShow)}
              >
                <BsStickyFill />
              </div>

              <div
                onClick={() => setSelectedTool("rectangle")}
                style={{ padding: "12px" }}
              >
                {" "}
                <BiRectangle size={20} />
              </div>
              <div
                onClick={() => setSelectedTool("arrow")}
                style={{ padding: "12px" }}
              >
                {" "}
                <BsFileArrowUp size={20} />
              </div>

              <div
                onClick={() => setSelectedTool("text")}
                style={{ padding: "12px" }}
              >
                <BiText color="black" size={20} />
              </div>

              <div onClick={handleUndo} style={{ padding: "12px" }}>
                {" "}
                <FaUndoAlt color="black" size={20} />
              </div>
              <div onClick={handleRedo} style={{ padding: "12px" }}>
                {" "}
                <FaRedo color="black" size={20} />
              </div>
              <div onClick={handleClear} style={{ padding: "12px" }}>
                {" "}
                <BsTrashFill size={20} />
              </div>
              <div onClick={handleExport} style={{ padding: "12px" }}>
                {" "}
                <BsDownload size={20} />
              </div>
              <div onClick={handleZoomIn} style={{ padding: "12px" }}>
                {" "}
                <BsZoomIn size={20} />
              </div>
              <div onClick={handleZoomOut} style={{ padding: "12px" }}>
                {" "}
                <BsZoomOut size={20} />
              </div>
              <div
                onClick={() => {
                  document.getElementById("imageUpload").click();
                  setSelectedTool("photos");
                }}
                style={{ padding: "12px" }}
              >
                <input
                  type="file"
                  id="imageUpload"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />{" "}
                <HiOutlinePhotograph size={20} />
              </div>
            </div>
          </div>




          {/* code for drawing boards */}
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            onClick={handleWhiteboardClick}
            className="canvas-stage"
            ref={stageRef}
            scaleX={scale}
            scaleY={scale}
            style={{ background: "white" }}
          >
            <Layer>
              {arrows.map((arrow) => (
                <Arrow
                  key={arrow.id}
                  points={[arrow.startX, arrow.startY, arrow.endX, arrow.endY]}
                  stroke={arrow.color}
                  strokeWidth={arrow.strokeWidth}
                  draggable
                />
              ))}
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={line.color}
                  strokeWidth={
                    line.line ? 1 : line.line2 ? 2 : line.line3 ? 4 : 6
                  }
                  ref={
                    line.line
                      ? line.ref
                      : line.line2
                        ? lineRef2.current
                        : line.line3
                          ? lineRef3.current
                          : selectedTool === "brush"
                            ? brushRef.current
                            : null
                  }
                />
              ))}

              {circles.map((circle, i) => (
                <Circle
                  key={i}
                  x={circle.x}
                  y={circle.y}
                  radius={circle.radius}
                  stroke={circle.color}
                  strokeWidth={2}
                  draggable={true}
                  onDragMove={(e) => handleCircleDragMove(e, i)}
                  globalCompositeOperation={"source-over"}
                />
              ))}
              {rectangles.map((rectangle, i) => (
                <Rect
                  key={i}
                  x={rectangle.x}
                  y={rectangle.y}
                  width={rectangle.width}
                  height={rectangle.height}
                  stroke={rectangle.color}
                  strokeWidth={2}
                  draggable
                  // onTransform={(e) => handleRectTransform(e)}
                  onDragMove={(e) => handleRectangleDragMove(e, i)}
                />
              ))}

              {texts.map((text, i) => (
                <Text
                  key={i}
                  x={text.x}
                  y={text.y}
                  text={text.text}
                  fontSize={text.fontSize}
                  draggable={true}
                  onDragMove={(e) => handleTextDragMove(e, i)}
                  globalCompositeOperation={"source-over"}
                />
              ))}

              {notes.map((note, index) => (
                <Sticky
                  key={index}
                  {...note}
                  handleDragEnd={(event) => {
                    const updatedNotes = [...notes];
                    updatedNotes[index].x = event.target.x();
                    updatedNotes[index].y = event.target.y();
                    setNotes(updatedNotes);
                  }}
                  shape={note.shape} // Pass the shape as a prop
                  // isSelected={true}
                  isSelected={index === selectedIndex}
                  isText={index === selectedTextIndex} // Set isSelected to true for the specific index
                  handleSelect={() => handleNoteSelect(index)}
                  onSelectText={() => handleNoteSelectText(index)}
                  onChange={(newText) => handleNoteChange(index, newText)}
                  onDelete={() => handleNoteDelete(index)}
                />
              ))}

              {images.length > 0 &&
                images.map((image) => (
                  <ImageUpload
                    key={image.id}
                    image={image}
                    isSelected={selectedId === image.id}
                    onSelect={() => handleSelect(image.id)}
                    onChange={(x, y) => handleDragEnd(image.id, x, y)}
                    onResize={(width, height) =>
                      handleResize(image.id, width, height)
                    }
                  />
                ))}
            </Layer>
          </Stage>
        </div>
      </div>

      {isAddingText && (
        <input
          type="text"
          value={newText}
          onChange={handleInput}
          onKeyDown={handleInputKeyDown}
          style={{
            position: "fixed",
            top: newTextPosition.y,
            left: newTextPosition.x,
          }}
        />
      )}
    </>
  );
};

export default DrawingArea;
