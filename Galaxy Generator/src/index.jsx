import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import ReactDOM from 'react-dom';
import './index.css';
import { useTweaks } from "use-tweaks";

// COMPONENTS
import Stars from './Components/Stars/Stars';
import Effects from './Components/Effects/Effects';
import Stats from './Components/Stats/Stats';
import Model from './Components/Model/Model';

// MODEL
import BlackholeModel from '../static/models/BlackholeModel/glb/scene.glb';


// TODO: Add DAT GUI and maybe add background shaders or mapping
// ! SCENE.GLTF NOT WORKING MOST LIKELY DUE TO VITE








function ObjectGroup() {
  // const { amount, branches } = useTweaks('Debug', {
  //   amount: { value: 100000, min: 0, max: 100000, onchange: amount },
  //   branches: { value: 10, min: 2, max: 10 }

  // });



  return (
    <>
      <Canvas colorManagement camera={{ position: [0, 1, 3], fov: 35 }}
        gl={{
          powerPreference: 'high-performance',
          antialias: false,
          pixelRatio: 1,
          alpha: false

        }}
        dpr={1} >
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <directionalLight intensity={0.2} />
          <Model url={BlackholeModel} />
          <Stars
            amount={500000}
            branches={10}

          />
          <OrbitControls
            autoRotate
            enablePan
            enableZoom
            enableDamping
            dampingFactor={0.9}
            rotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2.1}
            minPolarAngle={Math.PI / -2}
          />
          <Effects />
          <Stats />
        </Suspense>
      </Canvas>
    </>
  );
}


ReactDOM.render(
  <>
    <ObjectGroup />
  </>
  ,
  document.getElementById('root')
);
