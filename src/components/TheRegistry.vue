<script setup lang="ts">
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

const selectedInstruction = ref<number | null>(null);
const selectedInstructionTooltip = ref<string | null>(null);

const firstRegistryDropdown = ref<boolean>(false);
const secondRegistryDropdown = ref<boolean>(false);

const firstRegistryDropdownSelectedOption = ref<number | null>(null);
const secondRegistryDropdownSelectedOption = ref<number | null>(null);

const firstRegistryDropdownSelectedOptionLabel = ref<string | null>(null);
const secondRegistryDropdownSelectedOptionLabel = ref<string | null>(null);

const fillRegistry = () => {
    registry.value[axIndex] = Math.floor(Math.random() * 10) + 1;
    registry.value[bxIndex] = Math.floor(Math.random() * 10) + 1;
    registry.value[cxIndex] = Math.floor(Math.random() * 10) + 1;
    registry.value[dxIndex] = Math.floor(Math.random() * 10) + 1;
};

fillRegistry();

const generateNewRegistry = () => {
    fillRegistry();
    message.success('Wygenerowano nowy rejestr!');
};

const handleRegistryValueChange = () => {
    if (selectedRegistryOption.value === null) {
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

    registry.value[selectedRegistryOption.value] = newRegistryValue.value;
    message.success(
        `Zmieniono wartość rejestru ${
            changingRegistryOptions.value.find((option) => option.key === selectedRegistryOption.value)!.label
        }`,
    );
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

const firstRegistryDropdownOptions = ref(changingRegistryOptions.value.slice());
const secondRegistryDropdownOptions = ref(changingRegistryOptions.value.slice());

const registryInstructionsOptionsLabel = ref('Wybierz instrukcję jaką chcesz wykonać');
const registryInstructionsOptions = ref([
    {
        label: 'MOV',
        key: 0,
        needsDropdown: 2,
        tooltip: 'Kopiuje wartość z jednego rejestru do drugiego.',
        instruction: function () {
            registry.value[secondRegistryDropdownSelectedOption.value!] =
                registry.value[firstRegistryDropdownSelectedOption.value!];
            message.success(
                `Zawartość rejestru ${firstRegistryDropdownSelectedOptionLabel.value} została przekopiowana do rejestru ${secondRegistryDropdownSelectedOptionLabel.value}`,
            );
        },
    },
    {
        label: 'XCHG',
        kay: 1,
        needsDropdown: 2,
        tooltip: 'Zamienia miejscami wartości dwóch rejestrów.',
        instruction: function () {
            const oldFirstRegistryValue = registry.value[firstRegistryDropdownSelectedOption.value!];
            registry.value[firstRegistryDropdownSelectedOption.value!] =
                registry.value[secondRegistryDropdownSelectedOption.value!];
            registry.value[secondRegistryDropdownSelectedOption.value!] = oldFirstRegistryValue;
            message.success(
                `Zawartość rejestru ${firstRegistryDropdownSelectedOptionLabel.value} została zamieniona z wartością rejestru ${secondRegistryDropdownSelectedOptionLabel.value}`,
            );
        },
    },
    {
        label: 'INC',
        key: 2,
        needsDropdown: 1,
        tooltip: 'Zwiększa wartość rejestru o 1.',
        instruction: function () {
            registry.value[firstRegistryDropdownSelectedOption.value!]++;
            message.success(
                `Zawartość rejestru ${firstRegistryDropdownSelectedOptionLabel.value} została zwiększona o 1`,
            );
        },
    },
    {
        label: 'DEC',
        key: 3,
        needsDropdown: 1,
        tooltip: 'Zmniejsza wartość rejestru o 1.',
        instruction: function () {
            registry.value[firstRegistryDropdownSelectedOption.value!]--;
            message.success(
                `Zawartość rejestru ${firstRegistryDropdownSelectedOptionLabel.value} została zmniejszona o 1`,
            );
        },
    },
    {
        label: 'NOT',
        key: 4,
        needsDropdown: 1,
        tooltip: 'Zmienia każdy bit w rejestrze na przeciwny.',
        instruction: function () {
            registry.value[firstRegistryDropdownSelectedOption.value!] =
                ~registry.value[firstRegistryDropdownSelectedOption.value!];
            message.success(
                `Zawartość rejestru ${firstRegistryDropdownSelectedOptionLabel.value} została zanegowana bitowo`,
            );
        },
    },
    {
        label: 'NEG',
        key: 5,
        needsDropdown: 1,
        tooltip: 'Zmienia znak wartości w danym rejestrze (dodatni na ujemny i odwrotnie).',
        instruction: function () {
            registry.value[firstRegistryDropdownSelectedOption.value!] =
                -registry.value[firstRegistryDropdownSelectedOption.value!];
            message.success(`Zmieniono znak wartości rejestru ${firstRegistryDropdownSelectedOptionLabel.value}`);
        },
    },
    {
        label: 'ADD',
        key: 6,
        needsDropdown: 2,
        tooltip: 'Dodaje wartość rejestru do wartości drugiego rejestru.',
        instruction: function () {
            registry.value[firstRegistryDropdownSelectedOption.value!] =
                registry.value[firstRegistryDropdownSelectedOption.value!] +
                registry.value[secondRegistryDropdownSelectedOption.value!];
            message.success(
                `Zawartość rejestru ${secondRegistryDropdownSelectedOptionLabel.value} została dodana zawartości rejestru ${firstRegistryDropdownSelectedOptionLabel.value}`,
            );
        },
    },
    {
        label: 'SUB',
        key: 7,
        needsDropdown: 2,
        tooltip: 'Odejmuje wartość drugiego rejestru od wartości pierwszego rejestru.',
        instruction: function () {
            registry.value[firstRegistryDropdownSelectedOption.value!] =
                registry.value[secondRegistryDropdownSelectedOption.value!] -
                registry.value[secondRegistryDropdownSelectedOption.value!];
            message.success(
                `Wartość rejestru ${firstRegistryDropdownSelectedOptionLabel.value} została odjęta od wartości rejestru ${secondRegistryDropdownSelectedOptionLabel.value} i umieszczona w rejestrze ${firstRegistryDropdownSelectedOptionLabel.value}`,
            );
        },
    },
    {
        label: 'AND',
        key: 8,
        needsDropdown: 2,
        tooltip:
            'Działa na każdym bicie w pierwszym rejestrze, łącząc je z odpowiadającym bitem w drugim rejestrze. Wynikowa wartość bitowa to 1 tylko wtedy, gdy oba bity są jedynkami.',
        instruction: function () {
            registry.value[firstRegistryDropdownSelectedOption.value!] =
                registry.value[firstRegistryDropdownSelectedOption.value!] &
                registry.value[secondRegistryDropdownSelectedOption.value!];
            message.success(
                `Na wartościach rejestrów ${firstRegistryDropdownSelectedOptionLabel.value} i ${secondRegistryDropdownSelectedOptionLabel.value} została przeprowadzona operacja logiczna AND i wynik został zapisany w rejestrze ${firstRegistryDropdownSelectedOptionLabel.value}`,
            );
        },
    },
    {
        label: 'OR',
        key: 9,
        needsDropdown: 2,
        tooltip:
            'Mnoży każde bit w pierwszym rejestrze przez odpowiadający mu bit w drugim rejestrze. Wynikowa wartość bitowa to 1, gdy co najmniej jeden z bitów jest równy 1.',
        instruction: function () {
            registry.value[firstRegistryDropdownSelectedOption.value!] =
                registry.value[firstRegistryDropdownSelectedOption.value!] |
                registry.value[secondRegistryDropdownSelectedOption.value!];
            message.success(
                `Na wartościach rejestrów ${firstRegistryDropdownSelectedOptionLabel.value} i ${secondRegistryDropdownSelectedOptionLabel.value} została przeprowadzona operacja logiczna OR i wynik został zapisany w rejestrze ${firstRegistryDropdownSelectedOptionLabel.value}`,
            );
        },
    },
    {
        label: 'XOR',
        key: 10,
        needsDropdown: 2,
        tooltip:
            'Mnoży każdy bit w pierwszym rejestrze przez odpowiadający mu bit w drugim rejestrze. Wynikowa wartość bitowa to 1, gdy tylko jeden z bitów jest równy 1.',
        instruction: function () {
            registry.value[firstRegistryDropdownSelectedOption.value!] =
                registry.value[firstRegistryDropdownSelectedOption.value!] ^
                registry.value[secondRegistryDropdownSelectedOption.value!];
            message.success(
                `Na wartościach rejestrów ${firstRegistryDropdownSelectedOptionLabel.value} i ${secondRegistryDropdownSelectedOptionLabel.value} została przeprowadzona operacja logiczna XOR i wynik został zapisany w rejestrze ${firstRegistryDropdownSelectedOptionLabel.value}`,
            );
        },
    },
    {
        label: 'MUL',
        key: 11,
        needsDropdown: 2,
        tooltip:
            'Mnoży wartość w danym rejestrze przez wartość w drugim rejestrze, a wynik umieszcza w dwóch rejestrach.',
        instruction: function () {
            registry.value[firstRegistryDropdownSelectedOption.value!] =
                Math.abs(registry.value[firstRegistryDropdownSelectedOption.value!]) *
                Math.abs(registry.value[secondRegistryDropdownSelectedOption.value!]);
            message.success(
                `Wartość rejestru ${firstRegistryDropdownSelectedOptionLabel.value} została przemnożona bez znaku przez wartość rejestru ${secondRegistryDropdownSelectedOptionLabel.value} i zapisana w rejestrze ${firstRegistryDropdownSelectedOptionLabel.value}`,
            );
        },
    },
    {
        label: 'IMUL',
        key: 12,
        needsDropdown: 2,
        tooltip:
            'Mnoży wartość w danym rejestrze przez wartość w drugim rejestrze z uwzględnieniem znaku, a wynik umieszcza w dwóch rejestrach.',
        instruction: function () {
            registry.value[firstRegistryDropdownSelectedOption.value!] =
                registry.value[firstRegistryDropdownSelectedOption.value!] *
                registry.value[secondRegistryDropdownSelectedOption.value!];
            message.success(
                `Wartość rejestru ${firstRegistryDropdownSelectedOptionLabel.value} została przemnożona ze znakiem przez wartość rejestru ${secondRegistryDropdownSelectedOptionLabel.value} i zapisana w rejestrze ${firstRegistryDropdownSelectedOptionLabel.value}`,
            );
        },
    },
    {
        label: 'DIV',
        key: 13,
        needsDropdown: 2,
        tooltip:
            'Dzieli wartość w pierwszym rejestrze przez wartość w drugim rejestrze, wynik umieszcza w pierwszym rejestrze, a resztę w drugim.',
        instruction: function () {
            registry.value[firstRegistryDropdownSelectedOption.value!] =
                Math.abs(registry.value[firstRegistryDropdownSelectedOption.value!]) /
                Math.abs(registry.value[secondRegistryDropdownSelectedOption.value!]);
            message.success(
                `Wartość rejestru ${firstRegistryDropdownSelectedOptionLabel.value} została podzielona bez znaku przez wartość rejestru ${secondRegistryDropdownSelectedOptionLabel.value} i zapisana w rejestrze ${firstRegistryDropdownSelectedOptionLabel.value}`,
            );
        },
    },
    {
        label: 'IDIV',
        key: 14,
        needsDropdown: 2,
        tooltip:
            'Dzieli wartość w pierwszym rejestrze przez wartość w drugim rejestrze z uwzględnieniem znaku, wynik umieszcza w pierwszym rejestrze, a resztę w drugim.',
        instruction: function () {
            registry.value[firstRegistryDropdownSelectedOption.value!] =
                registry.value[firstRegistryDropdownSelectedOption.value!] /
                registry.value[secondRegistryDropdownSelectedOption.value!];
            message.success(
                `Wartość rejestru ${firstRegistryDropdownSelectedOptionLabel.value} została podzielona ze znakiem przez wartość rejestru ${secondRegistryDropdownSelectedOptionLabel.value} i zapisana w rejestrze ${firstRegistryDropdownSelectedOptionLabel.value}`,
            );
        },
    },
]);

const handleChangingRegistrySelect = (key: number) => {
    selectedRegistryOption.value = key;
    changingRegistryOptionsLabel.value =
        'Wybrany rejestr: ' + changingRegistryOptions.value.find((option) => option.key === key)!.label;
};

const handleRegistryInstructionSelect = (key: number) => {
    firstRegistryDropdownSelectedOption.value = null;
    firstRegistryDropdownSelectedOptionLabel.value = null;
    secondRegistryDropdownSelectedOption.value = null;
    secondRegistryDropdownSelectedOptionLabel.value = null;
    selectedInstruction.value = key;
    registryInstructionsOptionsLabel.value =
        'Wybrana instrukcja: ' + registryInstructionsOptions.value.find((option) => option.key === key)!.label;
    selectedInstructionTooltip.value = registryInstructionsOptions.value.find((option) => option.key === key)!.tooltip;
    const dropdownsToDisplay = registryInstructionsOptions.value.find((option) => option.key === key)!.needsDropdown;
    switch (dropdownsToDisplay) {
        case 1:
            firstRegistryDropdown.value = true;
            secondRegistryDropdown.value = false;
            break;
        case 2:
            firstRegistryDropdown.value = true;
            secondRegistryDropdown.value = true;
            break;
        default:
            firstRegistryDropdown.value = false;
            secondRegistryDropdown.value = false;
            break;
    }
};

const handleFirstRegistryDropdownSelect = (key: number) => {
    firstRegistryDropdownSelectedOption.value = key;
    firstRegistryDropdownSelectedOptionLabel.value = changingRegistryOptions.value.find(
        (option) => option.key === key,
    )!.label;
    secondRegistryDropdownOptions.value.forEach((option: any) => {
        option.disabled = false;
    });
    // @ts-expect-error
    secondRegistryDropdownOptions.value[key]['disabled'] = true;
};

const handleSecondRegistryDropdownSelect = (key: number) => {
    secondRegistryDropdownSelectedOption.value = key;
    secondRegistryDropdownSelectedOptionLabel.value = changingRegistryOptions.value.find(
        (option) => option.key === key,
    )!.label;
    firstRegistryDropdownOptions.value.forEach((option: any) => {
        option.disabled = false;
    });
    // @ts-expect-error
    firstRegistryDropdownOptions.value[key]['disabled'] = true;
};

const handleInstruction = () => {
    if (firstRegistryDropdownSelectedOption.value === null && !secondRegistryDropdown.value) {
        message.error('Wybierz rejestr na którym chcesz wykonać operację!');
        return;
    }
    if (
        secondRegistryDropdown.value &&
        firstRegistryDropdownSelectedOption.value === null &&
        secondRegistryDropdownSelectedOption.value === null
    ) {
        message.error('Wybierz rejestry na których chcesz wykonać operację!');
        return;
    }
    if (firstRegistryDropdownSelectedOption.value === null) {
        message.error('Wybierz pierwszy rejestr na którym chcesz wykonać operację!');
        return;
    }
    if (secondRegistryDropdown.value && secondRegistryDropdownSelectedOption.value === null) {
        message.error('Wybierz drugi rejestr na którym chcesz wykonać operację!');
        return;
    }
    registryInstructionsOptionsLabel.value = 'Wybierz instrukcję jaką chcesz wykonać';
    firstRegistryDropdownOptions.value.forEach((option: any) => {
        option.disabled = false;
    });
    secondRegistryDropdownOptions.value.forEach((option: any) => {
        option.disabled = false;
    });
    const selectedInstructionValue = registryInstructionsOptions.value.find(
        (option) => option.key === selectedInstruction.value,
    )!;
    selectedInstructionValue.instruction();
    firstRegistryDropdown.value = false;
    secondRegistryDropdown.value = false;
    selectedInstruction.value = null;
    firstRegistryDropdownSelectedOption.value = null;
    secondRegistryDropdownSelectedOption.value = null;
    firstRegistryDropdownSelectedOptionLabel.value = null;
    secondRegistryDropdownSelectedOptionLabel.value = null;
};
</script>

<template>
    <div class="the-registry-view">
        <div class="instructions-tooltip-wrapper" v-if="selectedInstruction !== null">
            <p>{{ selectedInstructionTooltip }}</p>
        </div>
        <div class="registry-instructions-wrapper">
            <p v-if="width < 720">Wybierz instrukcję jaką chcesz wykonać</p>
            <n-dropdown
                trigger="hover"
                :options="registryInstructionsOptions"
                @select="handleRegistryInstructionSelect"
            >
                <n-button>{{ registryInstructionsOptionsLabel }}</n-button>
            </n-dropdown>
            <div v-if="firstRegistryDropdown">
                <n-dropdown
                    trigger="hover"
                    :options="firstRegistryDropdownOptions"
                    @select="handleFirstRegistryDropdownSelect"
                >
                    <n-button v-if="firstRegistryDropdownSelectedOptionLabel !== null">{{
                        'Wybrany rejestr: ' + firstRegistryDropdownSelectedOptionLabel
                    }}</n-button>
                    <n-button v-else>Wybierz rejestr</n-button>
                </n-dropdown>
            </div>
            <div v-if="secondRegistryDropdown">
                <n-dropdown
                    trigger="hover"
                    :options="secondRegistryDropdownOptions"
                    @select="handleSecondRegistryDropdownSelect"
                >
                    <n-button v-if="secondRegistryDropdownSelectedOptionLabel !== null">{{
                        'Wybrany rejestr: ' + secondRegistryDropdownSelectedOptionLabel
                    }}</n-button>
                    <n-button v-else>Wybierz rejestr</n-button>
                </n-dropdown>
            </div>
            <div v-if="selectedInstruction !== null">
                <n-button type="info" @click="handleInstruction">WYKONAJ INSTRUKCJĘ</n-button>
            </div>
        </div>
        <div class="changing-registry-value-wrapper">
            <p v-if="width < 720">Wybierz rejestr którego wartość chcesz zmienić</p>
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
    .registry-instructions-wrapper {
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
.hidden {
    visibility: hidden;
}
</style>
