/* eslint-disable react/no-unknown-property */
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { throttle } from 'lodash';

import CanvasLoader from "../Loader";

// const Computers = ({ isMobile }) => {
//   const computer = useGLTF("./desktop_pc/scene.gltf");

//   return (
//     <mesh>
//       <hemisphereLight intensity={0.15} groundColor='black' />
//       <spotLight
//         position={[-20, 50, 10]}
//         angle={0.12}
//         penumbra={1}
//         intensity={1}
//         castShadow
//         shadow-mapSize={1024}
//       />
//       <pointLight intensity={1} />
//       <primitive
//         object={computer.scene}
//         scale={isMobile ? 0.7 : 0.75}
//         position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
//         rotation={[-0.01, -0.2, -0.1]}
//       />
//     </mesh>
//   );
// };
const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const my3d  = useGLTF("./my3d/my3d.gltf")
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={isMobile ? [-20, 60, 10] : [-20, 50, 10]}
        angle={isMobile ? 0.3 : 0.12}  // Adjust light angle for mobile
        penumbra={1}
        intensity={isMobile ? 0.5 : 1}  // Adjust light intensity for mobile
        castShadow
        shadow-mapSize={isMobile ? 512 : 1024}  // Adjust shadow map size for mobile
      />
      <pointLight intensity={1} />
      <primitive
        object={isMobile ? my3d.scene : computer.scene}
        scale={isMobile ? 0.5 : 0.75}  // Adjust scale for mobile
        position={isMobile ? [0, -2, -2] : [0, -3.25, -1.5]}
        rotation={isMobile ?[-0.02, -0.2, -0.1]:[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};


const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  

//   useEffect(() => {
//     // Add a listener for changes to the screen size
//     const mediaQuery = window.matchMedia("(max-width: 600px)");

//     // Set the initial value of the `isMobile` state variable
//     setIsMobile(mediaQuery.matches);

//     // Define a callback function to handle changes to the media query
//     const handleMediaQueryChange = (event) => {
//       setIsMobile(event.matches);
//     };

//     // Add the callback function as a listener for changes to the media query
//     mediaQuery.addEventListener("change", handleMediaQueryChange);

//     // Remove the listener when the component is unmounted
//     return () => {
//       mediaQuery.removeEventListener("change", handleMediaQueryChange);
//     };
//   }, []);
useEffect(() => {
  // Add a listener for changes to the screen size
  const mediaQuery = window.matchMedia("(max-width: 500px)");

  // Set the initial value of the `isMobile` state variable
  setIsMobile(mediaQuery.matches);

  // Define a throttled callback function to handle changes to the media query
  const handleMediaQueryChangeThrottled = throttle((event) => {
    setIsMobile(event.matches);
  }, 200); // Adjust the throttle duration as needed (e.g., 200 milliseconds)

  // Add the throttled callback function as a listener for changes to the media query
  mediaQuery.addEventListener("change", handleMediaQueryChangeThrottled);

  // Remove the listener when the component is unmounted
  return () => {
    mediaQuery.removeEventListener("change", handleMediaQueryChangeThrottled);
  };
}, []);


  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;