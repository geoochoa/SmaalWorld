import { useEffect, useState, useRef } from "react";
import { Text } from "@react-three/drei";
import React from "react";

function Messages({ titl, desc, link, setAuto }) {
  const AnimText = (props) => {
    const [message, setMessage] = useState(props.content);
    const [displayed, updateDisplay] = useState("");
    let animID;

    useEffect(() => {
      setTimeout(function () {
        updateDisplay(message.charAt(0)); // initial call, avoids empty el flash
        animID = setInterval(typeLetter, props.delay);
      }, props.wait * 50);
      return () => {
        updateDisplay("");
        clearInterval(animID);
      };
    }, [message]); // ensures re-renders every content change

    const typeLetter = () => {
      updateDisplay((prevText) => {
        if (message.length <= prevText.length) clearInterval(animID);
        return prevText.concat(message.charAt(prevText.length));
      });
    };

    function handleClick() {
      setAuto(true);
    }
    function handleHoverEnter() {
      document.body.style.cursor = "pointer";
    }
    function handleHoverExit() {
      document.body.style.cursor = "auto";
    }

    return (
      <>
        {/* {console.log("message render...")} */}
        <Text
          scale={0.8}
          font="./fonts/Poppins-Regular.ttf"
          color="white"
          textAlign={"left"}
          anchorX="left"
          anchorY="middle"
          outlineColor="white"
          position={props.position}
          fontSize={props.fontSize}
          outlineWidth={props.outlineWidth}
          textIndent={props.indent}
          onClick={handleClick}
          onPointerEnter={handleHoverEnter}
          onPointerOut={handleHoverExit}
        >
          {displayed}
        </Text>
        {/* {props.id == "link" && (
          <Html>
            <i className="fa-solid fa-circle-right"></i>
          </Html>
        )} */}
      </>
    );
  };

  AnimText.defaultProps = {
    content: "",
    delay: 35,
    wait: 0,
    position: [-0.78, 0.4, 1.5], //{[-0.78, 0.34, 1.5]}
    fontSize: 0.05,
    outlineWidth: 0,
    indent: 0,
  };

  return (
    <>
      <AnimText id="title" content={titl} outlineWidth={0.0009} />
      <AnimText
        id="desc"
        content={desc}
        position={[-0.78, 0.35, 1.5]}
        fontSize={0.04}
        wait={titl.length}
      />
      {link != "" && (
        <AnimText
          id="link"
          content={link}
          position={[-0.78, 0.35, 1.5]}
          fontSize={0.04}
          delay={0}
          wait={titl.length + desc.length}
          indent={0.0195 * desc.length}
        />
      )}
    </>
  );
}

const MemoizedMessages = React.memo(Messages);

export default MemoizedMessages;
