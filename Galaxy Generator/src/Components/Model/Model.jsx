import React, { useRef } from 'react';
import { useLoader, apply } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { useGLTF, useAnimations, material } from '@react-three/drei';


export default function Model({ url }, props) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF(url);
    const { actions } = useAnimations(animations, group);
    return (
        <group ref={group} {...props} dispose={null} scale={[.004, .004, .004]}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <group rotation={[Math.PI / 2, 0, 0]}>
                    <group rotation={[-Math.PI / 2, 0, 0]}>
                        <mesh geometry={nodes.Blackhole_ring_Blackhole_ring_0.geometry} material={materials.Blackhole_ring} />
                    </group>
                    <group rotation={[-Math.PI / 2, 0, 0]} scale={[0.96, 0.96, 0.96]}>
                        <mesh
                            geometry={nodes.Blackhole_skin_001_Blackhole_skin_0.geometry}
                            material={nodes.Blackhole_skin_001_Blackhole_skin_0.material}
                        />
                    </group>
                    <group rotation={[-Math.PI / 2, 0, 0]} scale={[0.96, 0.96, 0.96]}>
                        <mesh
                            geometry={nodes.Blackhole_skin_002_Blackhole_core_0.geometry}

                            material={nodes.Blackhole_skin_002_Blackhole_core_0.material}
                        />
                    </group>
                    <group rotation={[-Math.PI / 2, 0, 0]} scale={[0.91, 0.91, 0.91]}>
                        <mesh
                            geometry={nodes.Blackhole_skin_003_Blackhole_skin_0.geometry}
                            material={nodes.Blackhole_skin_003_Blackhole_skin_0.material}
                        />
                    </group>
                    <group rotation={[-Math.PI / 2, 0, 0]} scale={[0.91, 0.91, 0.91]}>
                        <mesh
                            geometry={nodes.Blackhole_skin_004_Blackhole_core_0.geometry}
                            material={nodes.Blackhole_skin_004_Blackhole_core_0.material}

                        />
                    </group>
                    <group rotation={[-Math.PI / 2, 0, 0.96]} scale={[0.9, 0.9, 0.9]}>
                        <mesh
                            geometry={nodes.Blackhole_skin_005_Blackhole_skin_0.geometry}
                            material={nodes.Blackhole_skin_005_Blackhole_skin_0.material}
                        />
                    </group>
                    <group rotation={[-Math.PI / 2, 0, -2.01]} scale={[0.86, 0.86, 0.86]}>
                        <mesh
                            geometry={nodes.Blackhole_skin_006_Blackhole_skin_inner_0.geometry}
                            material={nodes.Blackhole_skin_006_Blackhole_skin_inner_0.material}
                        />
                    </group>
                    <group rotation={[-Math.PI / 2, 0, -2.01]} scale={[0.87, 0.87, 0.87]}>
                        <mesh
                            geometry={nodes.Blackhole_skin_007_Blackhole_core_0.geometry}
                            material={nodes.Blackhole_skin_007_Blackhole_core_0.material}
                        />
                    </group>
                    <group rotation={[-Math.PI / 2, 0, 0]}>
                        <mesh
                            geometry={nodes.Blackhole_core001_Blackhole_core_0.geometry}
                            material={nodes.Blackhole_core001_Blackhole_core_0.material}
                        />
                    </group>
                    <group rotation={[-Math.PI / 2, 0, 0.09]} scale={[0.84, 0.84, 0.84]}>
                        <mesh
                            geometry={nodes.Blackhole_skin_008_Blackhole_skin_inner_0.geometry}
                            material={nodes.Blackhole_skin_008_Blackhole_skin_inner_0.material}
                        />
                    </group>
                    <group rotation={[-Math.PI / 2, 0, -0.61]} scale={[0.89, 0.89, 0.89]}>
                        <mesh
                            geometry={nodes.Blackhole_skin_009_Blackhole_skin_0.geometry}
                            material={nodes.Blackhole_skin_009_Blackhole_skin_0.material}
                        />
                    </group>
                    <group rotation={[-Math.PI / 2, 0, -2.53]} scale={[0.93, 0.93, 0.93]}>
                        <mesh
                            geometry={nodes.Blackhole_skin_010_Blackhole_skin_0.geometry}
                            material={nodes.Blackhole_skin_010_Blackhole_skin_0.material}
                        />
                    </group>
                    <group rotation={[-Math.PI / 2, 0, -2.53]} scale={[0.93, 0.93, 0.93]}>
                        <mesh
                            geometry={nodes.Blackhole_skin_011_Blackhole_core_0.geometry}
                            material={nodes.Blackhole_skin_011_Blackhole_core_0.material}
                        />
                    </group>
                    <group rotation={[-Math.PI / 2, 0, 2.09]} scale={[0.86, 0.86, 0.86]}>
                        <mesh
                            geometry={nodes.Blackhole_skin_012_Blackhole_skin_inner_0.geometry}
                            material={nodes.Blackhole_skin_012_Blackhole_skin_inner_0.material}
                        />
                    </group>
                    <group rotation={[-Math.PI / 2, 0, -2.97]} scale={[0.83, 0.83, 0.83]}>
                        <mesh
                            geometry={nodes.Blackhole_skin_013_Blackhole_ring2_0.geometry}
                            material={nodes.Blackhole_skin_013_Blackhole_ring2_0.material}
                        />
                    </group>
                    <group name="Blackhole_core002" rotation={[-Math.PI / 2, 0, 0]} scale={[0.93, 0.93, 0.93]}>
                        <mesh
                            geometry={nodes.Blackhole_core002_Blackhole_ring2_0.geometry}
                            material={nodes.Blackhole_core002_Blackhole_ring2_0.material}
                        />
                    </group>
                    <group rotation={[-Math.PI / 2, 0, 0]} scale={[0.97, 0.97, 0.97]}>
                        <mesh
                            geometry={nodes.Blackhole_core_Blackhole_core_0.geometry}
                            material={nodes.Blackhole_core_Blackhole_core_0.material}
                        />
                    </group>
                </group>
            </group>
        </group>
    );
}
