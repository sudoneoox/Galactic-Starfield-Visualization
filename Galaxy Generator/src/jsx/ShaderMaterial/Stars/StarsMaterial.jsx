import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";



const StarsMaterial = shaderMaterial(
    // Uniforms
    { uSize: 30 * window.devicePixelRatio, uTime: null },

    // Vertex.glsl
    `uniform float uSize;
     uniform float uTime;

     attribute float aScale;
     attribute vec3 aRandomness;

     varying vec3 vColor;
     void main( )
     {
         vec4 modelPosition = modelMatrix * vec4( position, 1.0 );

         //rotate
         float angle = atan( modelPosition.x, modelPosition.z );
         float distanceToCenter = length( modelPosition.z );
         float angleOffset = ( 1.0 / distanceToCenter ) * uTime * .2;
         angle += angleOffset;
         modelPosition.x = cos( angle ) * distanceToCenter;
         modelPosition.z = sin( angle ) * distanceToCenter;

         //randomness
         modelPosition.xyz += aRandomness;

         vec4 viewPosition = viewMatrix * modelPosition;
         vec4 projectedPosition = projectionMatrix * viewPosition;
         gl_Position = projectedPosition;

         gl_PointSize = uSize * aScale;
         gl_PointSize *= ( 1.0 / -viewPosition.z );

         vColor = color;
     }`,

    // Fragment.glsl
    `varying vec3 vColor;
       void main( )
       {
           //Light Points
           float strength = distance( gl_PointCoord, vec2( .5 ) );
           strength = 1.0 - strength;
           strength = pow( strength, 10. );

           //Final Color
           vec3 color = mix( vec3( .0 ), vColor, strength );
           gl_FragColor = vec4( color, 1.0 );
       }`,
    (self) => {
        self.vertexColors = true;
        self.depthWrite = false;
        self.blending = THREE.AdditiveBlending;
    },
);
extend({ StarsMaterial });