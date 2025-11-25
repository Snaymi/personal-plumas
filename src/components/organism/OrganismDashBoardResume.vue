<template>
    <section class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Linha 1: Cards de valor -->
        <div class="lg:col-span-4 grid sm:grid-cols-2 gap-6">
            <MoleculeStatCard title="R$00,00" subtitle="Lorem ipsum dolor sit." />
            <MoleculeStatCard title="R$00,00" subtitle="Lorem ipsum dolor sit." />
        </div>

        <!-- Linha 2: Gráfico + lateral -->
        <!-- Gráfico ocupa 2 colunas -->
        <div class="lg:col-span-2 space-y-6">
            <MoleculeChartCard title="Comparativo de Desempenho" :chartLabels="labels" :datasets="datasets" />
        </div>

        <!-- Coluna lateral direita (ocupa as outras 2 colunas) -->
        <div class="lg:col-span-2 grid grid-cols-2 gap-6 items-stretch">
            <!-- Coluna 1: Progressos empilhados -->
            <div class="flex flex-col gap-6 h-full">
                <MoleculeProgressCard title="Lorem ipsum" :percentage="25" labelPrimary="Lorem ipsum"
                    labelSecondary="Lorem ipsum" />
                <MoleculeProgressCard title="Lorem ipsum" :percentage="75" labelPrimary="Lorem ipsum"
                    labelSecondary="Lorem ipsum" />
            </div>

            <!-- Coluna 2: Notificações -->
            <MoleculeNotificationList class="h-full" />
        </div>
    </section>
</template>

<script setup lang="ts">
import {
    MoleculeChartCard,
    MoleculeProgressCard,
    MoleculeNotificationList,
    MoleculeStatCard,
} from "../molecule"

interface Dataset {
    label: string
    color: string
    data: number[]
}

type DatasetGroup = Record<string, Dataset[]>

const labels: string[] = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"]

const datasets: DatasetGroup = {
    S1: [
        { label: "Ano Atual", color: "#1e3a8a", data: [82, 68, 55, 59, 81, 78] },
        { label: "Ano Anterior", color: "#cbd5e1", data: [73, 88, 69, 39, 90, 85] },
    ],
    S2: [
        { label: "Ano Atual", color: "#1e3a8a", data: [72, 70, 77, 80, 88, 94] },
        { label: "Ano Anterior", color: "#cbd5e1", data: [64, 60, 82, 73, 80, 87] },
    ],
}
</script>

<style scoped>
section {
    @apply w-full;
}
</style>
