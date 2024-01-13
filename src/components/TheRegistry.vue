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
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                </tr>
            </tbody>
        </n-table>
        <n-button> RESET </n-button>
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
