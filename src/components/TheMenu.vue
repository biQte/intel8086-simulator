<script setup lang="ts"></script>

<template>
    <div class="the-menu-wrapper">
        <div class="the-menu-item">
            <router-link to="/simulator">Symulator procesora</router-link>
        </div>
        <div class="the-menu-item">
            <router-link to="/about-intel-8086">O procesorze Intel 8086</router-link>
        </div>
    </div>
</template>

<style scoped lang="scss">
.the-menu-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    .the-menu-item {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        background-color: #535bf2;
        &:hover {
            // border: 1px solid #ffffff;
            box-shadow: 0 0 10px #ffffff;
        }
        a {
            display: block;
            padding: 10px 20px;
            width: 100%;
            height: 100%;
            color: #ffffff;
            text-decoration: none;
        }
    }
}
</style>
