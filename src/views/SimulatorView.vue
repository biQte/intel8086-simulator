<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import BackHome from '../components/BackHome.vue';
import * as THREE from 'three';
import { ref, onMounted, computed, watch } from 'vue';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const experience = ref<HTMLCanvasElement | null>(null);

let mouseX;
let mouseY;

let targetRotation = new THREE.Vector2();
let currentRotation = new THREE.Vector2();

let rotationSpeed = 0.01;

const { width, height } = useWindowSize();
const windowHalfX = width.value / 2;
const windowHalfY = height.value / 2;

const aspectRatio = computed(() => width.value / height.value);

const loader = new GLTFLoader();

let renderer: THREE.WebGLRenderer;

const updateRenderer = () => {
    renderer.setSize(width.value / 3, height.value / 3);
    renderer.setPixelRatio(window.devicePixelRatio);
};

watch(aspectRatio, updateRenderer);

const handleMouseMove = (event: MouseEvent) => {
    console.log(event);
    mouseX = event.clientX - windowHalfX * -0.1;
    mouseY = event.clientY - windowHalfY * -2;
    targetRotation.x = mouseX;
    targetRotation.y = mouseY;
};

onMounted(async () => {
    renderer = new THREE.WebGLRenderer({
        canvas: experience.value as unknown as HTMLCanvasElement,
        antialias: true,
    });

    renderer.setSize(width.value / 3, height.value / 3);
    renderer.setClearColor(0x242424);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, aspectRatio.value, 1, 1000);
    camera.position.set(4, 5, 11);
    camera.lookAt(0, 0, 0);

    const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
    groundGeometry.rotateX(-Math.PI / 2);

    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x242424,
        side: THREE.DoubleSide,
    });

    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.castShadow = false;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    const spotLight = new THREE.SpotLight(0xffffff, 100005, 100, 0.2, 0.5);
    spotLight.position.set(0, 80, 0);
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.00001;
    scene.add(spotLight);

    // @ts-expect-error
    let mesh;

    console.log('Start loading');
    loader.load(
        '/public/intel8086.glb',
        function (gltf) {
            gltf.scene.scale.set(15, 15, 15);
            mesh = gltf.scene;
            mesh.traverse((child) => {
                // @ts-expect-error
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            mesh.position.set(-1.5, 1, 3);
            mesh.rotateX(120);
            scene.add(mesh);
            groundMesh.visible = false;
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        function (error) {
            console.log('error happened', error);
        },
    );

    console.log('Loaded');

    const animate = () => {
        currentRotation.x = (targetRotation.x - currentRotation.x) * rotationSpeed;
        currentRotation.y = (targetRotation.y - currentRotation.y) * rotationSpeed;
        // @ts-expect-error
        if (mesh) {
            mesh.rotation.set(
                (currentRotation.y * Math.PI) / 180,
                (currentRotation.x * Math.PI) / 180,
                mesh.rotation.z,
            );
        }
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    animate();
});
</script>

<template>
    <div class="simulator-view" @mousemove="handleMouseMove">
        <BackHome class="back-home" />
        <canvas ref="experience" />
    </div>
</template>

<style scoped lang="scss">
.simulator-view {
    width: 100%;
    height: 100%;
    .back-home {
        position: absolute;
        top: 5rem;
        left: 5rem;

        @media only screen and (max-width: 768px) {
            top: 1rem;
            left: 1rem;
        }
    }
}
</style>
