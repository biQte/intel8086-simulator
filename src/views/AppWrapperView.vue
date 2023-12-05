<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useLoadingBar } from 'naive-ui';
import { useUtilsStore } from '../stores/utils';

const loadingBar = useLoadingBar();

const utilsStore = useUtilsStore();

utilsStore.$subscribe((_mutation, state) => {
    switch (state.navigationStatus) {
        case 'inProgress':
            loadingBar.start();
            break;
        case 'success':
            loadingBar.finish();
            break;
        case 'failed':
            loadingBar.error();
            break;
        default:
            loadingBar.error();
            break;
    }
});
</script>

<template>
    <div class="app-wrapper-view">
        <router-view />
    </div>
</template>

<style scoped lang="scss"></style>
