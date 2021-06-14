import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// import BlackholeModel from './blackhole Model/scene.gltf';

export default function Model({ url }) {
    const modelRef = useRef();
    const model = useLoader(GLTFLoader, BlackholeModel);

    return (
        <group
            rotation={[-Math.PI / 2.05, 0, 0]}
            position={[0, -1, 0]}
            scale={[0.1, 0.1, 0.1]}
        >
            {model.map(({ geometry, material }) => {
                return (
                    <mesh
                        key={geometry.uuid}
                        geometry={geometry}
                        ref={modelRef}
                        receiveShadow
                    >
                        <meshPhongMaterial
                            attach="material"
                            map={material.map}
                            emissiveMap={material.emissiveMap}
                            specular="#fff"
                            color="#000"
                            shininess={0}
                            metalness={0}
                            emissive="#ededed"
                            emissiveIntensity={7.5}
                            transparent
                        // Don't show both sides as it ruins the black hole effect
                        // args={[{side: DoubleSide}]}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}