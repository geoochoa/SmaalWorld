import { interactionGroups, CuboidCollider } from "@react-three/rapier";
import React from "react";

/**
 * Interaction Groups
 *  Group 1: House, Trees, etc & Sensors
 *  Group 2: Player (collides with Group 1)
 *  Group 5: World (Isolated, used as walking floor)
 */

function Sensors({ target, setTarget, setSection, setMsg, setAuto, getAuto }) {
  /**
   * Welcome Message
   */

  const CubeSensor = (transform) => {
    const { id, position, rotation, sensorTitl, sensorDesc, sensorLink } =
      transform;

    function handleIntersection() {
      setMsg(sensorTitl, sensorDesc, sensorLink);
      setSection(id);
      // if (!idle) {
      // if (currMsg[0] != sensorTitl) {
      // setMsgg(sensorTitl, sensorDesc, sensorLink);
      // }

      if ((target == "" || target == id) && getAuto() != false) {
        setTimeout(function () {
          setAuto(false);
        }, 100); //ms
        if (target != "") {
          setTarget("");
        }
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
      <CubeSensor
        id="Home"
        position={[0.7, 0.8, 0]}
        rotation={-0.2}
        sensorTitl="I'm Geo, a full stack software engineer"
        sensorDesc="This is but a small introduction into who I am!"
      />
      <CubeSensor
        id="Work"
        position={[-0.7, 0.8, 0]}
        rotation={0.2}
        sensorTitl="These are some projects I've worked on"
        sensorDesc="Check out my github for more information!"
      />
      <CubeSensor
        id="Skills"
        position={[-0.7, -0.8, 0]}
        rotation={-0.2}
        sensorTitl="This is what I'm typically developing with"
        sensorDesc="I'm always trying to learn new technologies!"
      />
      <CubeSensor
        id="Contact"
        position={[0.7, -0.8, 0]}
        rotation={0.2}
        sensorTitl="You can find more of me here"
        sensorDesc="Feel free to reach out, I enjoy conversations!"
      />
    </>
  );
}

const MemoizedSensors = React.memo(Sensors);

export default MemoizedSensors;
