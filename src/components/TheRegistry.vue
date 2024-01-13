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

import { NTable, NButton, NDropdown, NInput } from 'naive-ui';
import { ref } from 'vue';

const axIndex = 0;
const bxIndex = 1;
const cxIndex = 2;
const dxIndex = 3;

const registry = ref([0, 0, 0, 0]);

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

const changingRegistryOptionsLabel = ref('Wybierz rejestr którego wartość chcesz zmienić');
const changingRegistryOptions = ref([
    {
        label: 'AX',
        key: 'ax',
    },
    {
        label: 'BX',
        key: 'bx',
    },
    {
        label: 'CX',
        key: 'cx',
    },
    {
        label: 'DX',
        key: 'dx',
    },
]);

const handleChangingRegistrySelect = (key: string | number) => {
    changingRegistryOptionsLabel.value = changingRegistryOptions.value.find((option) => option.key === key)!.label;
};
</script>

<template>
    <div class="the-registry-view">
        <div class="changing-registry-value-wrapper">
            <n-dropdown trigger="hover" :options="changingRegistryOptions" @select="handleChangingRegistrySelect">
                <n-button>{{ changingRegistryOptionsLabel }}</n-button>
            </n-dropdown>
            <n-input placeholder="Podaj wartość"></n-input>
            <n-button type="info">ZMIEŃ</n-button>
        </div>
        <n-table>
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
    }
}
th {
    text-align: center;
}
tr {
    text-align: center;
}
</style>
