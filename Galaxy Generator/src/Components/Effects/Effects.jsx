import React, { useEffect, useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass, SSAOPass });

export default function Effect() {
    const composer = useRef();
    const { scene, gl, size, camera } = useThree();
    useEffect(() => void composer.current.setSize(size.width, size.height), [size]);
    useFrame(() => composer.current.render(), 1);
    return (
        <effectComposer ref={composer} args={[gl]}>
            <renderPass attachArray="passes" scene={scene} camera={camera} />
            <sSAOPass attachArray="passes" args={[scene, camera, 1024, 1024]} kernelRadius={0.8} maxDistance={0.4} />
            <unrealBloomPass attachArray="passes" args={[undefined, 1.6, 1, 0.5]} />
            <shaderPass attachArray="passes" args={[FXAAShader]} material-uniforms-resolution-value={[1 / size.width, 1 / size.height]} />
        </effectComposer>
    );
}