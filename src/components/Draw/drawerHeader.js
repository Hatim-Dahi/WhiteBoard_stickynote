import { React, useState } from "react";
import {
  BsCameraVideo,
  BsThreeDots,
  BsEmojiSunglasses,
  BsBell,
} from "react-icons/bs";
import { VscCommentDiscussion } from "react-icons/vsc";
import { GiAlarmClock } from "react-icons/gi";
import { BiColorFill } from "react-icons/bi";
import { BsMoonFill } from "react-icons/bs";
import { BsSunFill } from "react-icons/bs";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import colorPopover from "./colorPopover";
import "./drawingArea.css";

const DrawerHeader = () => {
  const shareUrl = window.location.href;
  const [highlighted, setHighlighted] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [isDayMode, setIsDayMode] = useState(true);

  const handleToggleMode = () => {
    setIsDayMode(!isDayMode);
  };

  const sharePage = async () => {
    try {
      await navigator.share({
        title: "Draw",
        text: "Check out this page!",
        url: shareUrl,
      });
    } catch (error) {}
  };

  const handleClick = (iconName) => {
    setHighlighted(iconName);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "0.5rem",
        justifyContent: "space-between",
        margin: "0.5rem 0",
      }}
    >
      <p
        style={{
          backgroundColor: "white",
          padding: "10px",
          height: "40px",
          width: "fit-content",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>Whiteboard</span>
        <span>|</span>
        <span>User Board</span>
      </p>

      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          height: "40px",
          width: "fit-content",
          borderRadius: "10px",
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
          cursor: "pointer",
          outline: "solid gray 1px",
        }}
      >
        <GiAlarmClock
          size={23}
          title="Alarm"
          class={`pen-selection ${
            highlighted === "icon1" ? "highlighted" : ""
          }`}
          onClick={() => handleClick("icon1")}
        />
        <VscCommentDiscussion
          size={23}
          title="Comments"
          class={`pen-selection ${
            highlighted === "icon2" ? "highlighted" : ""
          }`}
          onClick={() => handleClick("icon2")}
        />
        <BsCameraVideo
          size={23}
          title="Camera"
          class={`pen-selection ${
            highlighted === "icon3" ? "highlighted" : ""
          }`}
          onClick={() => handleClick("icon3")}
        />
        <BsThreeDots
          size={23}
          title="More"
          class={`pen-selection ${
            highlighted === "icon4" ? "highlighted" : ""
          }`}
          onClick={() => handleClick("icon4")}
        />
        <BsEmojiSunglasses
          size={23}
          title="Private Mode"
          class={`pen-selection ${
            highlighted === "icon5" ? "highlighted" : ""
          }`}
          onClick={() => handleClick("icon5")}
        />
        <BsBell
          size={23}
          title="Notifications"
          class={`pen-selection ${
            highlighted === "icon6" ? "highlighted" : ""
          }`}
          onClick={() => handleClick("icon6")}
        />
          <div
            // onClick={() => handleAddNote(200, 300,shape)}
            onClick={handleToggleMode}
          >
            {isDayMode ? (
          <BsSunFill
            size={23}
            title="Day Mode"
            className={`pen-selection ${
              highlighted === "icon7" ? "highlighted" : ""
            }`}
          />
        ) : (
          <BsMoonFill
            size={23}
            title="Night Mode"
            className={`pen-selection ${
              highlighted === "icon7" ? "highlighted" : ""
            }`}
          />
        )}
          </div>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "20px",
            backgroundColor: "gray",
          }}
        ></div>
        <p
          style={{
            backgroundColor: "gray",
            borderRadius: "5px",
            padding: "10px",
            height: "fit-content",
            margin: "0",
            color: "white",
            height: "40px",
          }}
        >
          Present
        </p>
        <p
          onClick={sharePage}
          style={{
            backgroundColor: "gray",
            borderRadius: "5px",
            padding: "10px",
            height: "fit-content",
            margin: "0",
            color: "white",
            height: "40px",
          }}
        >
          Share
        </p>
      </div>
    </div>
  );
};

export default DrawerHeader;
