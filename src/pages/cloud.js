// adapted from https://threejs.org/examples/webgl_postprocessing_afterimage
import React, { useEffect } from 'react';
import styled from 'styled-components';

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';

var camera, scene, renderer, composer;
var mesh;

var afterimagePass;

function init() {
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById('projectCanvas')});
    renderer.setPixelRatio( window.devicePixelRatio );
    let bounds = document.querySelector('#canvasContainer').getBoundingClientRect();
    renderer.setSize( bounds.width, bounds.height );

    camera = new THREE.PerspectiveCamera( 70, bounds.width / bounds.height, 1, 1000 );
    camera.position.z = 400;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x000000, 1, 1000 );

    var geometry = new THREE.BoxBufferGeometry( 150, 150, 150, 2, 2, 2 );
    var material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    // postprocessing

    composer = new EffectComposer( renderer );
    composer.addPass( new RenderPass( scene, camera ) );

    afterimagePass = new AfterimagePass();
    afterimagePass.uniforms["damp"].value = 0.997;
    composer.addPass( afterimagePass );

    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    let bounds = document.querySelector('#canvasContainer').getBoundingClientRect();
    camera.aspect = bounds.width / bounds.height;
    camera.updateProjectionMatrix();

    renderer.setSize( bounds.width, bounds.height );
    composer.setSize( bounds.width, bounds.height );
}

let stop = false
function animate() {
    if (stop) return;
    requestAnimationFrame( animate );

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;

    composer.render();
}

const CanvasContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

export default () => {
    useEffect(() => {
        stop = false;
        init();
        animate();
        return () => {
            stop = true;
            window.removeEventListener('resize', onWindowResize, false)
        }
    }, []);

    return (
        <CanvasContainer id="canvasContainer">
            <canvas id="projectCanvas"/>
        </CanvasContainer>
    )
}