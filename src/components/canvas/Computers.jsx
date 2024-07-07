// /* eslint-disable react/no-unknown-property */
// import React, { Suspense, useEffect, useState, useMemo } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
// import { throttle } from "lodash";

// import CanvasLoader from "../Loader";

// // Optimize GLTF model loading
// const useOptimizedGLTF = (path) => {
//   return useMemo(() => useGLTF(path), [path]);
// };

// const Computers = ({ isMobile }) => {
//   const computer = useOptimizedGLTF("./desktop_pc/scene.gltf");
//   const mobile = useOptimizedGLTF("./models/phone.gltf");

//   return (
//     <mesh>
//       <hemisphereLight intensity={0.15} groundColor="black" />
//       <spotLight
//         position={isMobile ? [10, 60, 20] : [-20, 50, 10]}
//         angle={isMobile ? 0.8 : 0.12}
//         penumbra={1}
//         intensity={isMobile ? 0.5 : 1}
//         castShadow
//         shadow-mapSize={isMobile ? 512 : 1024}
//       />
//       <pointLight intensity={1} />
//       <primitive
//         object={isMobile ? mobile.scene : computer.scene}
//         scale={isMobile ? 0.9 : 0.75}
//         position={isMobile ? [0, -1.6, -1.6] : [0, -3.25, -1.5]}
//         rotation={isMobile ? [-0.02, -0.1, -0.1] : [-0.01, -0.2, -0.1]}
//       />
//     </mesh>
//   );
// };

// const ComputersCanvas = () => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(max-width: 500px)");

//     setIsMobile(mediaQuery.matches);

//     const handleMediaQueryChangeThrottled = throttle((event) => {
//       setIsMobile(event.matches);
//     }, 200);

//     mediaQuery.addEventListener("change", handleMediaQueryChangeThrottled);

//     return () => {
//       mediaQuery.removeEventListener("change", handleMediaQueryChangeThrottled);
//     };
//   }, []);

//   return (
//     <Canvas
//       frameloop="demand"
//       shadows
//       dpr={[1, 2]}
//       camera={{ position: [20, 3, 5], fov: 25 }}
//       gl={{ preserveDrawingBuffer: true }}
//     >
//       <Suspense fallback={<CanvasLoader />}>
//         <OrbitControls
//           enableZoom={false}
//           maxPolarAngle={Math.PI / 2}
//           minPolarAngle={Math.PI / 2}
//         />
//         <Computers isMobile={isMobile} />
//       </Suspense>

//       <Preload all />
//     </Canvas>
//   );
// };

// export default ComputersCanvas;
/* eslint-disable react/no-unknown-property */
import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { throttle } from "lodash";

import CanvasLoader from "../Loader";

// Optimize GLTF model loading
const useOptimizedGLTF = (path) => {
  return useMemo(() => useGLTF(path), [path]);
};

const Computers = ({ isMobile }) => {
  const computer = useOptimizedGLTF("./desktop_pc/scene.gltf");
  const mobile = useOptimizedGLTF("./models/phone.gltf");
  const meshRef = useRef();

  // Use the useFrame hook to rotate the mesh if it is a mobile device
  useFrame(() => {
    if (isMobile && meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={isMobile ? [10, 60, 20] : [-20, 50, 10]}
        angle={isMobile ? 0.8 : 0.12}
        penumbra={1}
        intensity={isMobile ? 0.5 : 1}
        castShadow
        shadow-mapSize={isMobile ? 512 : 1024}
      />
      <pointLight intensity={1} />
      {isMobile && (
        <spotLight
          position={[-10, -60, -20]}
          angle={0.5}
          penumbra={1}
          intensity={0.5}
          castShadow
          shadow-mapSize={512}
        />
      )}
      <primitive
        object={isMobile ? mobile.scene : computer.scene}
        scale={isMobile ? 1 : 0.75} // Adjust scale for mobile
        position={isMobile ? [0, -2, 0] : [0, -3.25, -1.5]} // Center position for mobile
        rotation={isMobile ? [0, 0, 0] : [-0.01, -0.2, -0.1]} // Default rotation for mobile
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChangeThrottled = throttle((event) => {
      setIsMobile(event.matches);
    }, 200);

    mediaQuery.addEventListener("change", handleMediaQueryChangeThrottled);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChangeThrottled);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate={isMobile} // Enable auto-rotate for mobile
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

