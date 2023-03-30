import { interactionGroups, CuboidCollider } from "@react-three/rapier";
import { useState } from "react";
import React from "react";

/**
 * Interaction Groups
 *  Group 1: House, Trees, etc & Sensors
 *  Group 2: Player (collides with Group 1)
 *  Group 5: World (Isolated, used as walking floor)
 */

function Sensors({ setMsg, getAuto, setAuto }) {
  /**
   * Welcome Message
   */

  const CubeSensor = (transform) => {
    const { id, position, rotation, sensorTitl, sensorDesc, sensorLink } =
      transform;

    function handleIntersection() {
      setMsg(sensorTitl, sensorDesc, sensorLink);
      // if (!idle) {
      // if (currMsg[0] != sensorTitl) {
      // setMsgg(sensorTitl, sensorDesc, sensorLink);
      // }
      if (getAuto() != false) {
        setTimeout(function () {
          setAuto(false);
        }, 100); //ms
      }
    }

    return (
      <CuboidCollider
        mass={0}
        sensor
        args={[0.005, 0.01, 0.5]} //0.3, 0.01, 2.3
        collisionGroups={interactionGroups(1)}
        position={position}
        rotation={[0, 0, Math.PI * rotation]}
        onIntersectionEnter={handleIntersection}
      />
    );
  };
  CubeSensor.defaultProps = {
    sensorLink: "Continue",
  };

  return (
    <>
      {/* {This rerenders every content change. This is bad as I shouldn't be rerendering sensors} */}
      {/* {console.log("sensors render...")} */}
      <CubeSensor
        id="intro"
        position={[0.7, 0.8, 0]}
        rotation={-0.2}
        sensorTitl="I'm Geo, a full stack software developer"
        sensorDesc="This is but a small introduction into who I am!"
      />
      <CubeSensor
        id="projects"
        position={[-0.7, 0.8, 0]}
        rotation={0.2}
        sensorTitl="This is where projects will live"
        sensorDesc="Click to see info!"
      />
      <CubeSensor
        id="skills"
        position={[-0.7, -0.8, 0]}
        rotation={-0.2}
        sensorTitl="This is where skills will live"
        sensorDesc="Click to see info!"
      />
      <CubeSensor
        id="contact"
        position={[0.7, -0.8, 0]}
        rotation={0.2}
        sensorTitl="This is where contact will live"
        sensorDesc="Click to see info!"
      />
    </>
  );
}

const MemoizedSensors = React.memo(Sensors);

export default MemoizedSensors;
