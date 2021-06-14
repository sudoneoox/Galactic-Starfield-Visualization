import React, { useRef, useMemo } from 'react';
import Observer from '../Camera/Observer';
import { useCamera } from '@react-three/drei';
import './BlackHoleShader';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

import sceneBackground from './Textures/glitch.jpg';
import starsBackground from './Textures/stars.png';
import blackDisk from './Textures/disk.png';
//**TODO: UPDATE OBSERVER, UPDATE THE LOADER AND FIX IT TO LOAD TEXTURES, UPDATE UNIFORMS, ADD DAT GUI */



export default function Blackhole() {
    const mesh = useRef();
    const observer = new Observer(60, window.innerWidth / window.innerHeight, 1, 80000);
    observer.distance = 8;

    const textureLoader = new TextureLoader();


    let delta, lastframe;

    useFrame((state) => {
        delta = (Date.now() - lastframe) / 2000;
        observer.update(delta);

        mesh.current.uniforms.time.value = state.clock.elapsedTime;
        mesh.current.uniforms.cam_pos.value = observer.position;
        mesh.current.uniforms.cam_up.value = observer.up;
        mesh.current.uniforms.fov.value = observer.fov;

        mesh.current.uniforms.cam_vel.value = observer.velocity;

        lastframe = Date.now();

    });

    const [background, stars, disk] = useLoader(TextureLoader, [sceneBackground, starsBackground, blackDisk]);

    return (
        <mesh raycast={useCamera(observer)}>
            <planeBufferGeometry />
            <blackHoleShader ref={mesh} attach="material" />
        </mesh>
    );
}