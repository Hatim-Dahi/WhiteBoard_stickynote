import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { BsBell } from "react-icons/bs";

const DashboardHeader = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedInfo = localStorage.getItem("User");
    if (storedInfo) {
      const parsedInfo = JSON.parse(storedInfo);
      setName(parsedInfo.username);
      setEmail(parsedInfo.email);
    }
  }, []);

  return (
    <div >


    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "0.75rem",
        
      }}
    >
      <h1>WhiteBoard</h1>
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          alignItems: "center",
          padding: "12px",
        }}
      >
        <p style={{ padding: "0.25rem 0" }}>
          <BsBell size={40} />
        </p>

        <Dropdown drop="start">
          <Dropdown.Toggle
            style={{ marginTop: "-1px", backgroundColor: "#28a745" }}
          >
            {name ? name[0] : null}
          </Dropdown.Toggle>

          <Dropdown.Menu show={isOpen} style={{ padding: "10px" }}>
            <Dropdown.Item href="#/action-11">{name}</Dropdown.Item>
            <Dropdown.Item href="#/action-2">{email}</Dropdown.Item>
            <Dropdown.Item href="/">logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
    </div>
    
  );
};

export default DashboardHeader;
