import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Stars from './ShaderMaterial/Stars/Stars';
import Blackhole from './ShaderMaterial/blackhole/BlackHole';
import Observer from './ShaderMaterial/Camera/Observer';


function Scene() {
    return (
        <>
            <Stars amount={200000} />
            <Blackhole />
            <OrbitControls
                dampingFactor={.05}
                enablePan={true}
                enableDamping={true}
            />
            <EffectComposer smaa>
                <Bloom
                    intensity={.8}
                    luminanceThreshold={0}
                />
            </EffectComposer>
        </>
    );
}


export default function App() {

    const observer = new Observer(60, window.innerWidth / window.innerHeight, 1, 80000);
    observer.distance = 8;
    return (
        <Canvas colorManagement
            gl={{
                powerPreference: 'high-performance',
                antialias: true,
                pixelRatio: Math.min(window.devicePixelRatio)
            }}
            dpr={Math.min(window.devicePixelRatio, 2)}>
            <Suspense fallback={null}>
                <Scene />
            </Suspense>
        </Canvas>
    );
}