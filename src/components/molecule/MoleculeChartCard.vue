<template>
    <div class="p-10 bg-white rounded-2xl shadow-sm w-full h-full flex flex-col justify-around">
        <!-- Cabeçalho -->
        <div class="flex justify-between items-center mb-4">
            <h3 class="font-semibold text-gray-800">{{ title }}</h3>

            <div class="flex gap-2">
                <button v-for="option in toggleOptions" :key="option.value" @click="selected = option.value" :class="[
                    'px-3 py-1 rounded-lg text-sm border transition-all',
                    selected === option.value
                        ? 'bg-blue-100 text-blue-700 border-blue-500'
                        : 'text-gray-600 border-gray-200 hover:bg-gray-50'
                ]">
                    {{ option.label }}
                </button>
            </div>
        </div>

        <!-- Gráfico -->
        <div class="min-h-[250px]">
            <AtomDataChart v-if="datasets[selected]" :labels="chartLabels" :datasets="datasets[selected]" />
            <div v-else class="flex justify-center items-center h-full text-gray-400">
                Nenhum dado disponível
            </div>
        </div>

        <!-- Legenda -->
        <div v-if="datasets[selected]" class="flex items-center justify-end gap-4 mt-4 pt-2 border-t border-gray-100">
            <div class="flex items-center gap-1 text-sm text-gray-600">
                <span class="inline-block w-3 h-3 rounded-full"
                    :style="{ backgroundColor: datasets[selected][0].color }"></span>
                <span>{{ datasets[selected][0].label }}</span>
            </div>
            <div class="flex items-center gap-1 text-sm text-gray-600">
                <span class="inline-block w-3 h-3 rounded-full"
                    :style="{ backgroundColor: datasets[selected][1].color }"></span>
                <span>{{ datasets[selected][1].label }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import AtomDataChart from "@/components/atoms/AtomDataChart.vue"

// Tipos das props
interface Dataset {
    label: string
    color: string
    data: number[]
}

interface ToggleOption {
    label: string
    value: string
}

const props = defineProps<{
    title: string
    chartLabels: string[]
    datasets: Record<string, Dataset[]>
    toggleOptions?: ToggleOption[]
}>()

const selected = ref<string>("S1")

// fallback para opções de toggle
const toggleOptions = props.toggleOptions ?? [
    { label: "1º Semestre", value: "S1" },
    { label: "2º Semestre", value: "S2" }
]
</script>

<style scoped>
/* Força o gráfico a preencher o card verticalmente */
:deep(.apexcharts-canvas) {
    height: 100% !important;
    width: 100% !important;
}
</style>
