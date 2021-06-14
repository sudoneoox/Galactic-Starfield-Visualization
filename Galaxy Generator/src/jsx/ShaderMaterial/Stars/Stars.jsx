
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import './StarsMaterial';
import * as THREE from 'three';


export default function Stars({ amount }) {

    // PARAMETERS FOR STARS
    const parameters = {};
    parameters.count = 2000000;
    parameters.size = .05;
    parameters.radius = 5;
    parameters.branches = 3;
    parameters.spin = 1;
    parameters.randomness = 0.5;
    parameters.randomnessPower = 3;
    parameters.insideColor = "#e54ed0";
    parameters.outsideColor = "#00076f";

    const insideColor = new THREE.Color(parameters.insideColor);
    const outsideColor = new THREE.Color(parameters.outsideColor);

    const [positions, colors, randomness, scales] = useMemo(() => {
        let positions = [], colors = [], randomness = [], scales = [];
        // Randomize the XYZ Coords and Color for each Point
        for (let i = 0; i < amount; i++) {
            const radius = Math.random() * parameters.radius;

            const branchAngle =
                ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

            const randomX =
                Math.pow(Math.random(), parameters.randomnessPower) *
                (Math.random() < 0.5 ? 1 : -1) *
                parameters.randomness *
                radius;

            const randomY =
                Math.pow(Math.random(), parameters.randomnessPower) *
                (Math.random() < 0.5 ? 1 : -1) *
                parameters.randomness *
                radius;

            const randomZ =
                Math.pow(Math.random(), parameters.randomnessPower) *
                (Math.random() < 0.5 ? 1 : -1) *
                parameters.randomness *
                radius;

            positions.push(Math.cos(branchAngle) * radius);
            positions.push(0);
            positions.push(Math.sin(branchAngle) * radius);

            randomness.push(randomX);
            randomness.push(randomY);
            randomness.push(randomZ);

            const mixedColor = insideColor.clone();
            mixedColor.lerp(outsideColor, radius / parameters.radius);

            // colors.push(mixedColor.r);
            // colors.push(mixedColor.g);
            // colors.push(mixedColor.b);

            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;

            scales.push(Math.random());
        }
        return [
            new Float32Array(positions),
            new Float32Array(colors),
            new Float32Array(randomness),
            new Float32Array(scales)];

    }, [amount]);

    const attribute = useRef();

    useFrame((state) => (attribute.current.uniforms.uTime.value = state.clock.elapsedTime));

    return (
        <points>
            <bufferGeometry attach="geometry">

                {/* POSITION ATTRIBUTE */}
                <bufferAttribute
                    attachObject={["attributes", "position"]}
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3} />
                {/* COLOR ATTRIBUTE */}
                <bufferAttribute ref={attribute}
                    attachObject={["attributes", "color"]}
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3} />
                {/* RANDOM ATTRIBUTE */}
                <bufferAttribute
                    attachObject={["attributes", "aRandomness"]}
                    count={randomness.length / 3}
                    array={randomness}
                    itemSize={3} />
                <bufferAttribute
                    attachObject={["attributes", "aScale"]}
                    count={scales.length}
                    array={scales}
                    itemSize={1}
                />

            </bufferGeometry>

            {/* TODO: UPDATE MATERIAL TO USE SHADER MATERIAL */}
            <starsMaterial ref={attribute} attach="material" />

        </points>
    );
}