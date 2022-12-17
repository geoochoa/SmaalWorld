import { RigidBody } from "@react-three/rapier";

export default function Player() {
  return (
    <>
      <mesh position={[0, 1, 2]} castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
}
