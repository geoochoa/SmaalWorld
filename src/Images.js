import React from "react";
import { Image, Float, Text } from "@react-three/drei";
import { useState } from "react";

function Images() {
  const [activeCard, setActiveCard] = useState([false, false, false, false]);

  const ImageText = (transform) => {
    const { position, content, rotation, width } = transform;
    return (
      <Text
        font="./fonts/Poppins-Regular.ttf"
        color={"white"}
        outlineColor={"white"}
        // textAlign="left"
        // anchorX="center"
        // anchorY="middle"
        position={position}
        rotation={rotation}
        fontSize={0.04}
        outlineWidth={0.0015}
        maxWidth={width}
      >
        {content}
      </Text>
    );
  };

  const ImageFrame = (transform) => {
    const { id, title, stack, transp, scale, position, rotation, url } =
      transform;

    function handleEnter() {
      document.body.style.cursor = "pointer";
    }
    function handleClick() {
      console.log("");
    }
    function handleExit() {
      document.body.style.cursor = "auto";
    }

    return (
      <Float speed={8} rotationIntensity={0.001} floatingRange={[-0.01, 0.01]}>
        <Image
          url={url}
          transparent={transp}
          opacity={0.5}
          scale={scale}
          position={position}
          rotation={rotation}
          onPointerEnter={() => handleEnter(id)}
          onPointerLeave={handleExit}
          onClick={handleEnter}
        />
        <ImageText
          position={[position[0] - 0.15, position[1] + 0.2, position[2]]}
          rotation={rotation}
          content={title}
          width={1}
        />
        <ImageText
          position={[position[0] + 0.2, position[1] - 0.1, position[2]]}
          rotation={rotation}
          content={stack}
          width={0.2}
        />
      </Float>
    );
  };
  ImageFrame.defaultProps = {
    id: "null",
    scale: 0.4,
    rotation: [Math.PI / 2, Math.PI / 1.3, -Math.PI / 2],
    position: [-1.3, 0.6, 0.5],
  };

  return (
    <>
      <ImageFrame
        id="0"
        title="SlugCache"
        stack="React Py4Web Mapbox"
        transp={activeCard[0]}
        url="./img/project-img3.png"
      />
      <ImageFrame
        id="1"
        title="Deforestation Detector"
        stack="JavaScript Three.js Python"
        transp={activeCard[1]}
        position={[-1.3, 0.6, 1]}
        url="./img/project-img1.png"
      />
      <ImageFrame
        id="2"
        title="Movie Tracker"
        stack="React TMDB"
        transp={activeCard[2]}
        position={[-1.3, 0.6, 1.5]}
        url="./img/project-img2.png"
      />
      <ImageFrame
        id="3"
        title="SmaalWorld"
        stack="React R3F/Three.js"
        transp={activeCard[3]}
        position={[-1.3, 0.6, 2]}
        url="./img/project-img4.png"
      />
    </>
  );
}

const MemoizedImages = React.memo(Images);

export default MemoizedImages;
