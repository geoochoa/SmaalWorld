import "./style.css";
import { useState, useRef } from "react";
import { Text, ScreenSpace } from "@react-three/drei";

export default function NavBar({ section, setTarget, setAuto }) {
  const NavText = (props) => {
    function handleClick(targetSection) {
      if (targetSection != section) {
        setTarget(targetSection);
        setAuto(true);
      }
    }
    function handleHoverEnter() {
      document.body.style.cursor = "pointer";
    }
    function handleHoverExit() {
      document.body.style.cursor = "auto";
    }

    return (
      <>
        <Text
          font="./fonts/Poppins-Regular.ttf"
          color={section == props.content ? "rgb(241, 154, 62)" : "white"}
          outlineColor={
            section == props.content ? "rgb(241, 154, 62)" : "white"
          }
          textAlign="left"
          anchorX="center"
          anchorY="middle"
          position={props.position}
          fontSize={section == props.content ? 0.021 : props.fontSize}
          outlineWidth={section == props.content ? 0.0008 : props.outlineWidth}
          textIndent={props.indent}
          onClick={() => {
            handleClick(props.content);
          }}
          onPointerEnter={handleHoverEnter}
          onPointerOut={handleHoverExit}
        >
          {props.content}
        </Text>
      </>
    );
  };

  NavText.defaultProps = {
    content: "",
    position: [0.02, 0.21, 0], //{[-0.78, 0.34, 1.5]}
    fontSize: 0.02,
    outlineWidth: 0.0005,
    indent: 0,
    color: "white",
  };

  return (
    <>
      <ScreenSpace
        depth={1} // Distance from camera
      >
        <NavText content="Home" />
        <NavText content="Work" position={[0.12, 0.21, 0]} />
        <NavText content="Skills" position={[0.22, 0.21, 0]} />
        <NavText content="Contact" position={[0.34, 0.21, 0]} />
      </ScreenSpace>
    </>
  );
}
