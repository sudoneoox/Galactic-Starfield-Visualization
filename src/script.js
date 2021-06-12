import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

import PlanetVertexShader from './shaders/planets/vertex.glsl'
import PlanetFragmentShader from './shaders/planets/fragment.glsl'
/**
 * 
 * BASE ANCHOR
 */


// DEBUG PANEL
const gui = new dat.GUI( );

// Canvas 
const canvas = document.querySelector( '.webgl' );

// Scene 
const scene = new THREE.Scene( );

//  Load Manager

const LoadingManager = new THREE.LoadingManager(
    // When finished successfully
    ( Finished ) =>
    {
        console.log( `FINISHED LOADING ${FINISH}` );
    },
    // Items loading
    ( LoadingUrl, itemsLoaded, itemsTotal ) =>
    {
        console.log( `Started Loading : ${LoadingUrl} \n
            Loaded: ${itemsLoaded} of  ${itemsTotal}` );
    },
    // If errors occur on load
    ( Error ) =>
    {
        console.log( `${Error}` )
    } )

// Textures
const textureLoader = new THREE.TextureLoader( LoadingManager );

/**
 * 
 * GEOMETRY
 */
const material = new THREE.ShaderMaterial(
{
    vertexShader: PlanetVertexShader,
    fragmentShader: PlanetFragmentShader,
    wireframe: true,
    // ANCHOR uniforms
    uniforms:
    {
        uTime: { value: null }
    }
} )

const testmaterial = new THREE.MeshNormalMaterial( { wireframe: true } );
const geometry = new THREE.BoxBufferGeometry( 1, 1, 1, 32, 32, 32 );
for ( const i in geometry.vertices )
{
    const vertex = geometry.vertices[ i ];
    vertex.normalize( ).multiplyScalar( radius );

}
const testMesh = new THREE.Mesh( geometry, testmaterial );
scene.add( testMesh )

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};


// Resize Listener 
window.addEventListener( 'resize', ( ) =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix( )

    // Update renderer
    renderer.setSize( sizes.width, sizes.height )
    renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) )

} );

// Camera
const camera = new THREE.PerspectiveCamera( 60, sizes.width / sizes.height, .1, 100 );
camera.position.set( 4, 1, -4 );
scene.add( camera );

// Orbit Controls
const controls = new OrbitControls( camera, canvas )
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer(
{
    canvas: canvas
} )
renderer.setSize( sizes.width, sizes.height )
renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );

// Mouse Coords
const mouse = {
    x: null,
    y: null,
}
window.addEventListener( "mousemove", ( _event ) =>
{
    mouse.x = ( _event.clientX / sizes.width ) * 2 - 1;
    mouse.y = -( _event.clientY / sizes.height ) * 2 + 1;
} );

// Update
const clock = new THREE.Clock( )

const tick = ( ) =>
{
    const elapsedTime = clock.getElapsedTime( )

    material.uniforms.uTime.value = elapsedTime
    // Update controls
    controls.update( )

    // Render
    renderer.render( scene, camera )

    // Call tick again on the next frame
    window.requestAnimationFrame( tick )
}

tick( )