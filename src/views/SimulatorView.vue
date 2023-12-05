<script setup lang="ts">
import BackHome from '../components/BackHome.vue';
</script>

<template>
    <div class="simulator-view">
        <BackHome class="back-home" />
    </div>
</template>

<style scoped lang="scss">
.simulator-view {
    .back-home {
        position: absolute;
        top: 5rem;
        left: 5rem;
    }
}
</style>
