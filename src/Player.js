import * as THREE from "three";
import {
  RigidBody,
  interactionGroups,
  usePrismaticJoint,
} from "@react-three/rapier";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect, Children } from "react";
import { useKeyboardControls, OrbitControls } from "@react-three/drei";

export default function Player({ idle, setIdle }) {
  const player = useRef();
  // const anchor = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const [smoothedCameraPosition] = useState(() => new THREE.Vector3());
  const [smoothedTargetPosition] = useState(() => new THREE.Vector3());

  // usePrismaticJoint(anchor, player, [
  //   [0, 0, 0], // Position of the joint in bodyA's local space
  //   [0, 0, 0.3], // Position of the joint in bodyB's local space
  //   [1, 0, 0], // Axis of the joint, expressed in the local-space of the rigid-bodies it is attached to. Cannot be [0,0,0].
  // ]);

  useFrame((state, delta) => {
    /*
     * Controls
     */
    const { forward, backward, leftward, rightward, jump } = getKeys();
    const playerPosi = player.current.translation();
    const impulse = { x: 0, y: 0, z: 0 };

    const impulseStrength = 10 * delta;

    const quadr = playerPosi.z * playerPosi.y;
    const xBounds = 1.5;
    const yBounds = 0.7;
    const zBounds = 0.7;

    // Makes a copy of the players position but negated to apply inward force towards planet
    const tmp = new THREE.Vector3(-playerPosi.x, -playerPosi.y, -playerPosi.z);
    tmp.normalize(); // Brings in Range [0, 1]

    // Corrects Gravity Vector when X-Movement combined with Y/Z-Movement
    var xFactor = 1 + Math.abs(playerPosi.x * 0.21) + 0.03; //
    if (Math.round(xFactor) == 0) xFactor = 1; // Divide by Zero Prevention

    impulse.y += impulseStrength * -playerPosi.y;
    impulse.z += impulseStrength * -playerPosi.z;

    //Continous Gravity Vectors
    if (jump) {
      console.log("jump");
      impulse.y += 10 * impulseStrength * playerPosi.y;
      impulse.z += 10 * impulseStrength * playerPosi.z;
    }

    // anchor.current.applyImpulse(impulse);

    // if (forward) {
    //   // First two cases account for cases where we are at either of the 4 poles ([0,x], [0, -x], [0,y], [0,-y])
    //   // For movement on a sphere, forward movement from impulse depends where we are
    //   if (playerPosi.z > -zBounds && playerPosi.z < zBounds) {
    //     impulse.z += impulseStrength * tmp.y;
    //   } else if (playerPosi.y > -yBounds && playerPosi.y < yBounds) {
    //     impulse.y += impulseStrength * -tmp.z;
    //   } else if (quadr <= 0) {
    //     //Q1, Q3
    //     impulse.z +=
    //       (-impulseStrength * (playerPosi.y <= 0 ? -1 : 1)) / xFactor; //ternary oprs flip movement if lower y space
    //   } else if (quadr > 0) {
    //     //Q2, Q4
    //     impulse.y += (impulseStrength * (playerPosi.y < 0 ? -1 : 1)) / xFactor;
    //   }
    // }

    // if (playerPosi.x < xBounds && rightward) {
    //   impulse.x += impulseStrength;
    // }
    // if (playerPosi.x > -xBounds && leftward) {
    //   impulse.x -= impulseStrength;
    // }

    // if (backward) {
    //   if (playerPosi.z > -zBounds && playerPosi.z < zBounds) {
    //     impulse.z -= impulseStrength * tmp.y; //tmp.y negative
    //   } else if (playerPosi.y > -yBounds && playerPosi.y < yBounds) {
    //     impulse.y -= impulseStrength * -tmp.z;
    //   } else if (quadr <= 0) {
    //     //Q1, Q3
    //     impulse.y -=
    //       (-impulseStrength * (playerPosi.y <= 0 ? -1 : 1)) / xFactor; //ternary oprs flip movement if lower y space
    //   } else if (quadr > 0) {
    //     //Q2, Q4
    //     impulse.z += (impulseStrength * (playerPosi.y < 0 ? -1 : 1)) / xFactor;
    //   }
    // }

    //player.current.applyImpulse(impulse);

    /**
     * Camera
     */
    if (forward || backward || leftward || rightward || jump) {
      setIdle(false);
    }

    const cameraPosi = new THREE.Vector3();
    cameraPosi.copy(playerPosi);

    cameraPosi.x = 0;
    cameraPosi.y = 0;
    cameraPosi.z = 3.5;

    const cameraTarg = new THREE.Vector3();
    cameraTarg.copy(playerPosi);
    cameraTarg.y = 0.95;

    if (idle) {
      cameraPosi.z -= 1.3;
      cameraPosi.y += 0.5;
      cameraTarg.y -= 0.15;
    }

    state.camera.position.copy(cameraPosi);
    state.camera.lookAt(cameraTarg);
  });

  // Helper functions to help point camera at 'ideal' positions
  function calculateIdealOffset(playerRotation, playerPosition) {
    const idealOffset = new THREE.Vector3(0, 0, 5);
    idealOffset.applyQuaternion(playerRotation);
    idealOffset.add(playerPosition);
    return idealOffset;
  }
  function calculateIdealTarget(playerRotation, playerPosition) {
    const idealTarget = new THREE.Vector3(0, 0, 0);
    idealTarget.applyQuaternion(playerRotation);
    idealTarget.add(playerPosition);
    return idealTarget;
  }

  return (
    <>
      <OrbitControls />
      {/* <RigidBody
        collisionGroups={interactionGroups(2, 1)}
        type="dynamic"
        colliders="cuboid"
        ref={anchor}
      >
        <mesh>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody> */}
      <RigidBody
        collisionGroups={interactionGroups(2, 1)}
        mass={1}
        ref={player}
        type="fixed"
        colliders="hull"
        position={[0, 0.8, 0.7]} //0, 0.8, 0.7
        rotation={[Math.PI * -0.3, 0, 0]}
        enabledRotations={[false, false, false, false]}
      >
        <mesh castShadow scale={0.4}>
          <boxGeometry args={[0.2, 0.2, 0.3]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </RigidBody>
    </>
  );
}
