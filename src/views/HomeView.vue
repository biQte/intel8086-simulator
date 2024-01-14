<script setup lang="ts">
import TheMenu from '../components/TheMenu.vue';
</script>

<template>
    <div class="home-view">
        <img src="/intel-logo.svg" alt="intel-logo" class="intel-logo" width="300" height="198.72" />
        <h1>Witaj!</h1>
        <h2>Tutaj powstaje symulator procesora Intel 8086</h2>
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
