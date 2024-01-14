<script setup lang="ts">
import { ref } from 'vue';
import {
    NConfigProvider,
    NMessageProvider,
    NLoadingBarProvider,
    NDialogProvider,
    NNotificationProvider,
    darkTheme,
} from 'naive-ui';
import type { MessageProviderProps, GlobalThemeOverrides, GlobalTheme } from 'naive-ui';
import AppWrapperView from './views/AppWrapperView.vue';

const themeOverrides: GlobalThemeOverrides = {
    common: {
        primaryColor: '#535bf2',
        scrollbarColor: '#535bf2',
    },
    Button: {
        textColorText: '#ffffff',
        textColorTextHover: '#535bf2',
        borderHover: '1px solid #535bf2',
        textColorHover: '#535bf2',
        borderFocus: '1px solid #535bf2',
        textColorFocus: '#535bf2',
        colorInfo: '#535bf2',
        textColorInfo: '#ffffff',
        borderInfo: '1px solid #535bf2',
        colorHoverInfo: '#4c54c5',
        textColorHoverInfo: '#ffffff',
        borderHoverInfo: '1px solid #4c54c5',
        colorFocusInfo: '#4c54c5',
        textColorFocusInfo: '#ffffff',
        borderFocusInfo: '1px solid #4c54c5',
    },
    Input: {
        borderFocus: '1px solid #535bf2',
        borderHover: '1px solid #535bf2',
    },
};

const theme = ref<GlobalTheme | null>(darkTheme);

const messagePlacement = ref<MessageProviderProps['placement']>('top');
</script>

<template>
    <div class="main">
        <n-config-provider :theme-overrides="themeOverrides" :theme="theme">
            <n-loading-bar-provider>
                <n-message-provider :placement="messagePlacement">
                    <n-dialog-provider>
                        <n-notification-provider>
                            <AppWrapperView />
                        </n-notification-provider>
                    </n-dialog-provider>
                </n-message-provider>
            </n-loading-bar-provider>
        </n-config-provider>
    </div>
</template>

<style scoped lang="scss"></style>
