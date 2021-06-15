import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
// COMPONENTS
import Stars from './Stars/Stars';
import Effects from './Effects/Effects';
import Stats from './Stats/Stats';
import Model from './Model/Model';

// MODEL
import BlackholeModel from '../../static/models/BlackholeModel/glb/scene.glb';

// TODO: Add DAT GUI and maybe add background shaders or mapping
// ! SCENE.GLTF NOT WORKING MOST LIKELY DUE TO VITE

function ObjectGroup() {
    return (
        <>
            <ambientLight intensity={1.5} />
            <directionalLight intensity={0.2} />
            <fog attach="fog" args={['#000', 500, 2050]} />
            <Model url={BlackholeModel} />
            <Stars amount={200000} />
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
        </>
    );
}
export default function App() {
    return (
        <Canvas colorManagement camera={{ position: [0, 1, 10], fov: 35 }}

            gl={{
                powerPreference: 'high-performance',
                antialias: false,
                pixelRatio: Math.min(window.devicePixelRatio),
                alpha: false
            }}

            dpr={Math.min(window.devicePixelRatio, 2)}>

            <Suspense fallback={null}>
                <ObjectGroup />
            </Suspense>

        </Canvas>
    );
}

