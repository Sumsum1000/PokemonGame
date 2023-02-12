import style from "./LifeBar.module.scss";
import { Canvas } from "@react-three/fiber";

export const LifeBar = () => {
  return (
    <Canvas
      style={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        position: "absolute",
        width: "200px",
        height: "40px",
      }}
    >
      <mesh position={[0, 0, 10]}>
        <sphereBufferGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color={"blue"} />
        <pointLight intensity={1} />
      </mesh>
      <mesh>
        <boxGeometry args={[22, 3, 3]} />
        <meshStandardMaterial color={"green"} />
      </mesh>
    </Canvas>
  );
};
