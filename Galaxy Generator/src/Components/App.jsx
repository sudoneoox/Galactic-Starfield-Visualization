import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
// COMPONENTS
import Stars from './Stars/Stars';
import Effects from './Effects/Effects';
import Stats from './Stats/Stats';
// import Model from './Components/Model/Model';
// MODEL
// import BlackholeModel from './public/static/blackhole/scene.gltf';

// TODO: Add DAT GUI and maybe add background shaders or mapping
// ! SCENE.GLTF NOT WORKING MOST LIKELY DUE TO VITE

function ObjectGroup() {
    return (
        <>
            {/* <Model /> */}
            <Stars amount={200000} />
            {/* <Blackhole /> */}
            <OrbitControls
                dampingFactor={.05}
                enablePan={true}
                enableDamping={true}
            />
            <Effects />
            <Stats />
        </>
    );
}
export default function App() {
    return (
        <Canvas colorManagement

            gl={{
                powerPreference: 'high-performance',
                antialias: true,
                pixelRatio: Math.min(window.devicePixelRatio)
            }}

            dpr={Math.min(window.devicePixelRatio, 2)}>

            <Suspense fallback={null}>
                <ObjectGroup />
            </Suspense>

        </Canvas>
    );
}

