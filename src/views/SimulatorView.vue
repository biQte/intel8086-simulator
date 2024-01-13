<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import BackHome from '../components/BackHome.vue';
import * as THREE from 'three';
import { ref, onMounted, computed, watch } from 'vue';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const experience = ref<HTMLCanvasElement | null>(null);

const scene = new THREE.Scene();

const light = new THREE.AmbientLight(0xffffff, 1);

const { width, height } = useWindowSize();

const aspectRatio = computed(() => width.value / height.value);

const loader = new GLTFLoader();

let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;

camera = new THREE.PerspectiveCamera(75, aspectRatio.value, 0.1, 2000);

scene.add(camera);

const updateRenderer = () => {
    renderer.setSize(width.value / 3, height.value / 3);
    renderer.setPixelRatio(window.devicePixelRatio);
};
const updateCamera = () => {
    camera.aspect = aspectRatio.value;
    camera.updateProjectionMatrix();
};

watch(aspectRatio, updateRenderer);

watch(aspectRatio, updateCamera);

const helper = new THREE.AxesHelper(1);

onMounted(async () => {
    console.log('Start loading');
    loader.load(
        './public/intel8086.glb',
        function (gltf) {
            console.log(gltf);
            gltf.scene.scale.set(15, 15, 15);
            gltf.scene.position.set(-2, 0, -5);
            scene.add(gltf.scene);
            const box = new THREE.Box3().setFromObject(gltf.scene);
            console.log(box);
            light.position.set(2, 2, 5);
            renderer.render(scene, camera);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        function (error) {
            console.log('error happened', error);
        },
    );

    console.log('Loaded');

    renderer = new THREE.WebGLRenderer({
        canvas: experience.value as unknown as HTMLCanvasElement,
        antialias: true,
    });

    // camera.position.set(0, 5, 0);
    camera.lookAt(scene.position);
    scene.add(light);
    // scene.add(helper);

    renderer.setSize(width.value / 3, height.value / 3);

    renderer.render(scene, camera);
});
</script>

<template>
    <div class="simulator-view">
        <BackHome class="back-home" />
        <canvas ref="experience" />
    </div>
</template>

<style scoped lang="scss">
.simulator-view {
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
