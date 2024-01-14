<script setup lang="ts">
import TheMenu from '../components/TheMenu.vue';
</script>

<template>
    <div class="home-view">
        <img src="/intel-logo.svg" alt="intel-logo" class="intel-logo" loading="lazy" width="300" height="198.72" />
        <h1>Witaj!</h1>
        <h3>Tutaj powstaje symulator procesora Intel 8086</h3>
        <TheMenu />
    </div>
</template>

<style scoped lang="scss">
.home-view {
    .intel-logo {
        max-width: 300px;
    }
}
</style>
