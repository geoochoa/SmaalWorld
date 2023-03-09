import * as THREE from "three";
import {
  interactionGroups,
  CuboidCollider,
  CylinderCollider,
} from "@react-three/rapier";

export default function Colliders() {
  const CubeCollider = (transform) => {
    const { id, scale, args, position, rotation } = transform;
    return (
      <CuboidCollider
        mass={0}
        collisionGroups={interactionGroups(1, 2)}
        scale={scale}
        args={args}
        position={position}
        rotation={[0, 0, Math.PI * rotation]}
        onContactForce={() => console.log("Collision:", id)}
      />
    );
  };
  CubeCollider.defaultProps = {
    id: "null",
    args: [0.05, 0.05, 0.05],
    scale: 0.5,
    rotation: 0,
  };

  const CylCollider = (transform) => {
    const { id, scale, args, position, rotation } = transform;
    return (
      <CylinderCollider
        mass={0}
        collisionGroups={interactionGroups(1, 2)}
        scale={scale}
        args={args}
        position={position}
        rotation={[0, 0, Math.PI * rotation]}
        // onContactForce={() => console.log("Collision:", id)}
      />
    );
  };
  CylCollider.defaultProps = {
    id: "null",
    args: [0.05, 0.05, 0.05],
    scale: 0.2,
    rotation: 0,
  };

  return (
    <>
      {/* World */}
      <CylinderCollider
        id="world"
        scale={0.5}
        args={[4.5, 2, 10]}
        position={[0, 0, 0]}
        rotation={[Math.PI * -0.5, 0, 0]}
      />
      {/* House */}
      <CubeCollider
        id="house"
        args={[0.3, 0.2, 0.9]}
        position={[0, 1.1, 1.03]}
      />
      {/* Lights, Condense Later */}
      <CubeCollider position={[0, 1.06, 0.4]} />
      <CubeCollider position={[0, 1.06, -0.4]} />
      <CubeCollider position={[0, -1.06, 0.4]} />
      <CubeCollider position={[0, -1.06, -0.4]} />
      <CubeCollider position={[1.06, 0, 0.4]} />
      <CubeCollider position={[1.06, 0, -0.4]} />
      <CubeCollider position={[-1.06, 0, 0.4]} />
      <CubeCollider position={[-1.06, 0, -0.4]} />
      {/* Trees */}
      <CubeCollider
        args={[0.1, 0.1, 0.1]}
        position={[0.75, 0.74, 1.34]}
        rotation={0.25}
      />
      <CubeCollider
        args={[0.1, 0.1, 0.1]}
        position={[-0.75, 0.74, -1.15]}
        rotation={0.25}
      />
      <CubeCollider
        args={[0.1, 0.1, 0.1]}
        position={[-0.75, -0.73, 1.022]}
        rotation={0.25}
      />
      <CubeCollider
        args={[0.1, 0.1, 0.1]}
        position={[0.75, -0.74, -1.15]}
        rotation={0.25}
      />
      {/* Stumps */}
      <CylCollider
        id="stumps"
        args={[0.1, 1.2, 0.9]}
        position={[0.45, 0.9, -1.13]}
        rotation={-0.15}
      />
      {/* Rocks */}
      <CylCollider
        args={[0.1, 0.4]}
        position={[1, 0.3, 0.99]}
        rotation={-0.4}
      />
      <CylCollider
        args={[0.1, 0.3]}
        position={[-1, 0.3, -0.89]}
        rotation={0.4}
      />
      <CylCollider
        args={[0.1, 0.5]}
        position={[0.2, -1.0, 0.76]}
        rotation={0.1}
      />
    </>
  );
}
