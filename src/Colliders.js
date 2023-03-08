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
        rotation={[0, rotation, 0]}
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
        rotation={[0, rotation, Math.PI * 0.5]}
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
      <CylinderCollider scale={0.5} args={[4.5, 2, 10]} position={[0, 0, 0]} />
      {/* args = l w h ; pos = z x y*/}
      {/* House */}
      <CubeCollider
        id="house"
        args={[0.4, 0.9, 0.2]}
        position={[0, -1.03, 1.1]}
      />
      {/* Lights */}
      <CubeCollider position={[0, -0.4, 1.05]} />
      <CubeCollider position={[0, 0.4, 1.05]} />
      <CubeCollider position={[0, -0.4, -1.05]} />
      <CubeCollider position={[0, 0.4, -1.05]} />
      <CubeCollider position={[1.05, -0.4, 0]} />
      <CubeCollider position={[1.05, 0.4, 0]} />
      <CubeCollider position={[-1.05, -0.4, 0]} />
      <CubeCollider position={[-1.05, 0.4, 0]} />
      {/* Trees */}
      <CubeCollider
        args={[0.1, 0.1, 0.1]}
        position={[0.75, -1.34, 0.75]}
        rotation={Math.PI * 0.25}
      />
      <CubeCollider
        args={[0.1, 0.1, 0.1]}
        position={[-0.75, 1.15, 0.75]}
        rotation={Math.PI * 0.25}
      />
      <CubeCollider
        args={[0.1, 0.1, 0.1]}
        position={[0.75, 1.15, -0.75]}
        rotation={Math.PI * 0.25}
      />
      <CubeCollider
        args={[0.1, 0.1, 0.1]}
        position={[-0.75, -1.025, -0.75]}
        rotation={Math.PI * 0.25}
      />
      {/* Stumps */}
      <CylCollider
        id="stumps"
        args={[0.45, 1.1, 0.9]}
        position={[0.45, 1.12, 0.9]}
        rotation={Math.PI * -0.35}
      />
      {/* args = h w h ; pos = z x y*/}
      <CylCollider
        args={[0.2, 0.4]}
        position={[0.98, -1, 0.3]}
        rotation={Math.PI * -0.1}
      />
      <CylCollider
        args={[0.2, 0.5]}
        position={[-0.99, 0.88, 0.29]}
        rotation={Math.PI * -0.9}
      />
      <CylCollider
        args={[0.2, 0.5]}
        position={[0.2, -0.75, -1]}
        rotation={Math.PI * 0.5}
      />
    </>
  );
}
