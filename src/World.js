import * as THREE from "three";
import { RigidBody, interactionGroups } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useGLTF, useKeyboardControls, useTexture } from "@react-three/drei";
import Colliders from "./Colliders.js";
import Sensors from "./Sensors.js";
import { useState } from "react";

export default function World({ setMsg, setDesc }) {
  /*
   * Models, Textures
   */
  const { nodes } = useGLTF("./models/world2.glb");
  const bakedTexture = useTexture("./models/baked2.jpg");
  bakedTexture.flipY = false;

  var lights = [];
  for (const node in nodes) {
    if (node == "baked" || node == "Scene") continue;
    lights.push(nodes[node].name);
  }

  /**
   * Controls
   */

  const body = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    const worldPosition = body.current.translation();
    const { forward, backward, leftward, rightward } = getKeys();
    const xBounds = 2;

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 35 * delta;
    const torqueStrength = 20 * delta;

    if (backward) {
      torque.x -= torqueStrength;
    }

    if (forward) {
      torque.x += torqueStrength;
    }
    if (worldPosition.x > -xBounds && rightward) {
      impulse.x -= impulseStrength;
    }

    if (worldPosition.x < xBounds && leftward) {
      impulse.x += impulseStrength;
    }

    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);
  });

  return (
    <>
      <RigidBody
        collisionGroups={interactionGroups(0, 1)}
        ref={body}
        type="dynamic"
        colliders={false}
        angularDamping={5}
        linearDamping={5}
        enabledRotations={[true, false, false, false]}
        enabledTranslations={[true, false, false, false]}
        rotation={[0, -Math.PI * 0.5, 0]}
      >
        <Colliders />
        <Sensors setMsg={setMsg} setDesc={setDesc} />
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        {lights.map((light) => {
          return (
            <mesh
              key={light}
              geometry={nodes[light].geometry}
              position={nodes[light].position}
              rotation={nodes[light].rotation}
              scale={nodes[light].scale}
            >
              <meshBasicMaterial color="#ffffe5" />
            </mesh>
          );
        })}
      </RigidBody>
    </>
  );
}
