<script setup lang="ts">
/*
 * INSTRUCTIONS
 * MOV
 * XCHG
 * INC
 * DEC
 * NOT
 * NEG
 * ADD
 * SUB
 * AND
 * OR
 * XOR
 * MUL
 * IMUL
 * DIV
 * IDIV
 */

import { NTable, NButton, NDropdown, NInput, useMessage } from 'naive-ui';
import { ref } from 'vue';
import { useWindowSize } from '@vueuse/core';

const message = useMessage();

const { width } = useWindowSize();

const axIndex = 0;
const bxIndex = 1;
const cxIndex = 2;
const dxIndex = 3;

const registry = ref([0, 0, 0, 0]);

const newRegistryValue = ref<any>(null);

const selectedRegistryOption = ref<number | null>(null);

const fillRegistry = () => {
    registry.value[axIndex] = Math.floor(Math.random() * 10) + 1;
    registry.value[bxIndex] = Math.floor(Math.random() * 10) + 1;
    registry.value[cxIndex] = Math.floor(Math.random() * 10) + 1;
    registry.value[dxIndex] = Math.floor(Math.random() * 10) + 1;
};

fillRegistry();

const generateNewRegistry = () => {
    fillRegistry();
};

const handleRegistryValueChange = () => {
    if (!selectedRegistryOption.value) {
        message.error('Wybierz rejestr którego wartość chcesz zmienić!');
        return;
    }
    if (!newRegistryValue.value) {
        message.error('Podaj nową wartość dla rejestru!');
        return;
    }
    newRegistryValue.value = parseInt(newRegistryValue.value);
    if (isNaN(newRegistryValue.value)) {
        newRegistryValue.value = null;
        message.error('Wartość dla rejestru musi być liczbą!');
        return;
    }
    if (newRegistryValue.value < 0 || newRegistryValue.value > 10) {
        message.error('Wartość dla rejestru poza zakresem!');
        return;
    }

    registry.value[selectedRegistryOption.value] = newRegistryValue.value;
};

const changingRegistryOptionsLabel = ref('Wybierz rejestr którego wartość chcesz zmienić');
const changingRegistryOptions = ref([
    {
        label: 'AX',
        key: axIndex,
    },
    {
        label: 'BX',
        key: bxIndex,
    },
    {
        label: 'CX',
        key: cxIndex,
    },
    {
        label: 'DX',
        key: dxIndex,
    },
]);

const handleChangingRegistrySelect = (key: number) => {
    selectedRegistryOption.value = key;
    changingRegistryOptionsLabel.value = changingRegistryOptions.value.find((option) => option.key === key)!.label;
};
</script>

<template>
    <div class="the-registry-view">
        <div class="changing-registry-value-wrapper">
            <n-dropdown trigger="hover" :options="changingRegistryOptions" @select="handleChangingRegistrySelect">
                <n-button>{{ changingRegistryOptionsLabel }}</n-button>
            </n-dropdown>
            <n-input placeholder="Podaj wartość" v-model:value="newRegistryValue"></n-input>
            <n-button type="info" @click="handleRegistryValueChange">ZMIEŃ</n-button>
        </div>
        <n-table v-if="width > 720">
            <thead>
                <tr>
                    <th>AX</th>
                    <th>BX</th>
                    <th>CX</th>
                    <th>DX</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ registry[axIndex] }}</td>
                    <td>{{ registry[bxIndex] }}</td>
                    <td>{{ registry[cxIndex] }}</td>
                    <td>{{ registry[dxIndex] }}</td>
                </tr>
            </tbody>
        </n-table>
        <n-table v-else>
            <tbody>
                <tr>
                    <td>AX</td>
                    <td>{{ registry[axIndex] }}</td>
                </tr>
                <tr>
                    <td>BX</td>
                    <td>{{ registry[bxIndex] }}</td>
                </tr>
                <tr>
                    <td>CX</td>
                    <td>{{ registry[cxIndex] }}</td>
                </tr>
                <tr>
                    <td>DX</td>
                    <td>{{ registry[dxIndex] }}</td>
                </tr>
            </tbody>
        </n-table>
        <n-button @click="generateNewRegistry"> GENERUJ NOWY REJESTR </n-button>
    </div>
</template>

<style lang="scss" scoped>
.the-registry-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    .changing-registry-value-wrapper {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        @media only screen and (max-width: 720px) {
            flex-direction: column;
        }
    }
}
th {
    text-align: center;
}
tr {
    text-align: center;
}
</style>
