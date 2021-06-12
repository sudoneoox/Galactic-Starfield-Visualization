import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import Stats from 'stats.js'



let camera;
let scene;
let renderer;
let controls;
let stats;
const canvas = document.querySelector( 'canvas.webgl' );
let supportsExtension = true;

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const init = ( ) =>
{
    /**
     * ANCHOR RENDERER
     */

    Render( )

    /**
     * ANCHOR STATS
     */
    stats = new Stats( );
    document.body.appendChild( stats.dom );

    // Our scene
    scene = new THREE.Scene( );

    // geometry
    testGeometry( )

    // Lights
    lightSetup( )

    /**
     * ANCHOR Camera
     */
    camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.1, 100 )
    camera.position.set( 2, 2, 6 )
    scene.add( camera )


    /**
     * ANCHOR Controls
     */
    controls = new OrbitControls( camera, canvas );
    controls.enableDamping = true;

    // Setup post-processing step
    // setupPost( );

    onWindowResize( );
    window.addEventListener( 'resize', onWindowResize );

    /**
     * ANCHOR Debug Panel
     */
    debugPanel( )
};


function debugPanel( )
{
    const gui = new dat.GUI( );
}

function testGeometry( )
{
    const geometry = new THREE.TorusKnotGeometry( 1, 0.3, 128, 64 );
    const material = new THREE.MeshPhysicalMaterial( );
    const mesh = new THREE.Mesh( geometry, material )
    scene.add( mesh )
}


function lightSetup( LightParams )
{
    // const ambientLight = new THREE.AmbientLight( { color: '#ffff00', intensity: 100 } );
    // scene.add( ambientLight )
    const pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
    pointLight.position.set( 10, 10, 10 );
    scene.add( pointLight );
}



function onWindowResize( )
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix( )

    // Update renderer
    renderer.setSize( sizes.width, sizes.height )
    renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) )
}


window.addEventListener( 'resize', onWindowResize );

function Render( )
{
    renderer = new THREE.WebGLRenderer(
    {
        canvas: canvas,
        powerPreference: 'high-performance',
        antialias: true
    } )
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setSize( sizes.width, sizes.height )
    renderer.setPixelRatio( window.devicePixelRatio )
}

const clock = new THREE.Clock( );

function animate( )
{
    if ( !supportsExtension ) return;

    const elapsedTime = clock.getElapsedTime( )
    // stats
    stats.begin( );

    // Update controls
    controls.update( )

    // Render
    renderer.render( scene, camera )

    // Call tick again on the next frame
    window.requestAnimationFrame( animate )
    stats.end( );
}


init( );
animate( );