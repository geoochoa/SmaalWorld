import { interactionGroups, CuboidCollider } from "@react-three/rapier";
import { useState } from "react";

export default function Sensors({ setMsg, setDesc }) {
  const CubeSensor = (transform) => {
    const { position, rotation, sensorMsg, sensorDesc } = transform;
    return (
      <CuboidCollider
        sensor
        args={[0.3, 0.01, 2.3]}
        collisionGroups={interactionGroups(1, 2)}
        position={position}
        rotation={[0, 0, Math.PI * rotation]}
        onIntersectionEnter={() => {
          setMsg(`${sensorMsg}`);
          setDesc(`${sensorDesc}`);
        }}
        onIntersectionExit={() => {
          setMsg("");
          setDesc("");
        }}
      />
    );
  };

  return (
    <>
      <CubeSensor
        position={[0.7, 0.8, 0]}
        rotation={-0.2}
        sensorMsg="I'm Geo and this is my little world!"
        sensorDesc="Use the keyboard to explore"
      />
    </>
  );
}
