import { interactionGroups, CuboidCollider } from "@react-three/rapier";
import { useState } from "react";

/**
 * Interaction Groups
 *  Group 1: House, Trees, etc & Sensors
 *  Group 2: Player (collides with Group 1)
 *  Group 5: World (Isolated, used as walking floor)
 */

export default function Sensors({
  setMsg,
  setDesc,
  setLink,
  setAutoFwd,
  idle,
}) {
  /**
   * Welcome Message
   */
  if (idle) {
    setMsg("Welcome, feel free to explore!");
    setDesc("Use the arrow/wasd keys or");
    setLink("try presentation mode");
  }

  const CubeSensor = (transform) => {
    const { id, position, rotation, sensorMsg, sensorDesc, sensorLink } =
      transform;

    return (
      <CuboidCollider
        mass={0}
        sensor
        args={[0.005, 0.01, 0.5]} //0.3, 0.01, 2.3
        collisionGroups={interactionGroups(1)}
        position={position}
        rotation={[0, 0, Math.PI * rotation]}
        onIntersectionEnter={() => {
          if (!idle) {
            setMsg(`${sensorMsg}`);
            setDesc(`${sensorDesc}`);
            setLink(`${sensorLink}`);
          }

          setTimeout(function () {
            setAutoFwd();
          }, 100); //ms
        }}
      />
    );
  };
  CubeSensor.defaultProps = {
    sensorLink: "Continue",
  };

  return (
    <>
      <CubeSensor
        id="intro"
        position={[0.7, 0.8, 0]}
        rotation={-0.2}
        sensorMsg="I'm Geo, a full stack software developer"
        sensorDesc="This is but a small introduction into who I am!"
      />
      <CubeSensor
        id="projects"
        position={[-0.7, 0.8, 0]}
        rotation={0.2}
        sensorMsg="This is where projects will live"
        sensorDesc="Click to see info!"
      />
      <CubeSensor
        id="skills"
        position={[-0.7, -0.8, 0]}
        rotation={-0.2}
        sensorMsg="This is where skills will live"
        sensorDesc="Click to see info!"
      />
      <CubeSensor
        id="contact"
        position={[0.7, -0.8, 0]}
        rotation={0.2}
        sensorMsg="This is where contact will live"
        sensorDesc="Click to see info!"
      />
    </>
  );
}
