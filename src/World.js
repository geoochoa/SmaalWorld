import * as THREE from "three";
import { RigidBody, interactionGroups } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useGLTF, useKeyboardControls, useTexture } from "@react-three/drei";
import Colliders from "./Colliders.js";
import Sensors from "./Sensors.js";
import { useState, useCallback } from "react";
import Messages from "./Messages.js";
import NavBar from "./NavBar.js";
import Images from "./Images.js";

export default function World() {
  /**
   * Msg State
   */
  {
    /* "Welcome, feel free to explore!",
      //  "Use the arrow/wasd keys or",
      //   "try presentation mode" */
  }
  const [titl, setTitl] = useState("Welcome, feel free to explore!");
  const [desc, setDesc] = useState("Use the arrow keys or try ");
  const [link, setLink] = useState("presentation mode");

  const [nav, setNav] = useState(true);

  const setMsg = useCallback((titl, desc, link) => {
    setTitl(titl);
    setDesc(desc);
    setLink(link);
  }, []);

  /**
   *  Auto
   */
  const [section, setSection] = useState("");
  const [target, setTarget] = useState("");
  const [autoFwd, setAutoFwd] = useState(false);
  const setAuto = useCallback((val) => {
    setAutoFwd(val);
  }, []);

  const getAuto = useCallback(() => {
    return autoFwd;
  }, [autoFwd]);

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
    const xPos = worldPosition.x.toFixed(2);

    if (!nav && xPos > -0.34 && xPos < 0.34) {
      setNav(true);
    }
    if (nav && (xPos > 0.34 || xPos < -0.34)) {
      setNav(false);
    }

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 35 * delta;
    const torqueStrength = 20 * delta;

    if (autoFwd && (forward || backward || leftward || rightward)) {
      setAuto(false);
    }

    if (autoFwd || forward) {
      torque.x += torqueStrength;
    }

    if (backward) {
      torque.x -= torqueStrength;
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
      {nav && (
        <NavBar section={section} setTarget={setTarget} setAuto={setAuto} />
      )}
      <Messages titl={titl} desc={desc} link={link} setAuto={setAuto} />
      <RigidBody
        ref={body}
        type="dynamic"
        colliders={false}
        angularDamping={5}
        linearDamping={5}
        enabledRotations={[true, false, false, false]}
        enabledTranslations={[true, false, false, false]}
        rotation={[-0.2, -Math.PI * 0.5, 0]} //-0.2
      >
        <Images />
        <Colliders />
        <Sensors
          target={target}
          setTarget={setTarget}
          setSection={setSection}
          setMsg={setMsg}
          setAuto={setAuto}
          getAuto={getAuto}
        />

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
