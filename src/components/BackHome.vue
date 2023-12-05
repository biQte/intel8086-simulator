<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui';
import { ArrowHookDownLeft20Regular } from '@vicons/fluent';
import router from '../router';
</script>

<template>
    <div class="back-home-wrapper">
        <n-button text size="large" @click="router.push({ path: '/' })">
            <template #icon>
                <n-icon>
                    <ArrowHookDownLeft20Regular class="back-icon" />
                </n-icon>
            </template>
            Wróć na stronę główną
        </n-button>
    </div>
</template>

<style scoped lang="scss"></style>
