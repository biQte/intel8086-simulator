<script setup lang="ts">
import BackHome from '../components/BackHome.vue';
import { NButton } from 'naive-ui';
</script>

<template>
    <div class="about-intel-8086-view">
        <BackHome class="back-home" />
        <h1>Procesor Intel 8086</h1>
        <img src="../assets/img/intel8086photo.png" alt="photo of intel 8086" class="intel-8086-photo" />
        <p class="intel-8086-description">
            8086 - 16-bitowy mikroprocesor wprowadzony na rynek 8 czerwca 1978 roku. Miał także oznaczenia: 8086-1,
            8086-2, 8086-4, iAPX 86/10, a dla wykonywanych w technologii CMOS: 80C86, 80C86-2, 80C86A. Mikroprocesor
            został zaprojektowany przez firmę Intel w technologii 3 μm HMOS (ang. High performance MOS, później także
            HMOS-II, HMOS-III i CHMOS) jako rozszerzenie 8-bitowego 8080/8085. Wykonywany głównie w obudowach 40-pin
            DIP, także jako 44-pin PLCC i 56-pin QFP (ang. Quad Flat Package). Wciąż jeszcze produkowany przez różnych
            dostawców. Jego zastosowanie (w szczególności jego późniejszej odmiany z 8-bitowym interfejsem - 8088) w
            pierwszych ogólnodostępnych komputerach osobistych (IBM PC), doprowadziło do jego wielkiej popularyzacji i
            dalszego rozwoju tej rodziny procesorów (architektura x86). W związku z historycznym znaczeniem procesora
            8086 firmie Intel przydzielono identyfikator 0x8086 na liście identyfikatorów (PCI ID) dostawców urządzeń
            dla magistrali PCI.
        </p>
        <n-button tag="a" href="https://pl.wikipedia.org/wiki/Intel_8086" target="_blank" type="info" ghost size="large"
            >Czytaj więcej</n-button
        >
    </div>
</template>

<style scoped lang="scss">
.about-intel-8086-view {
    .back-home {
        position: absolute;
        top: 5rem;
        left: 5rem;

        @media only screen and (max-width: 768px) {
            top: 1rem;
            left: 1rem;
        }
    }

    h1 {
        font-size: 3.2rem;

        @media only screen and (max-width: 768px) {
            padding-top: 2rem;
            font-size: 2.4rem;
        }
    }
    .intel-8086-photo {
        max-width: 250px;

        @media only screen and (max-width: 768px) {
            max-width: 150px;
        }
    }
    .intel-8086-description {
        padding-top: 5rem;
        text-align: justify;
        font-size: 1.8rem;

        @media only screen and (max-width: 768px) {
            padding-top: 2rem;
            font-size: 1.2rem;
            line-height: 35px;
        }
    }
}
</style>
