<template>
    <div
        class="bg-white rounded-2xl shadow-sm flex flex-col items-center justify-between p-6 w-full h-full min-h-[300px]">
        <!-- Título -->
        <h3 class="font-semibold text-gray-800 text-sm mb-4 text-center">
            {{ title }}
        </h3>

        <!-- Gráfico -->
        <div class="flex items-center justify-center w-full flex-grow">
            <apexchart type="radialBar" height="180" :options="chartOptions" :series="[percentage]" />
        </div>

        <!-- Legenda -->
        <div class="flex items-center justify-center gap-6 mt-6 text-sm text-gray-600">
            <div class="flex items-center gap-1">
                <span class="inline-block w-3 h-3 rounded-full" :style="{ backgroundColor: colorPrimary }"></span>
                <span class="text-[10px]">{{ labelPrimary }}</span>
            </div>
            <div class="flex items-center gap-1">
                <span class="inline-block w-3 h-3 rounded-full" :style="{ backgroundColor: colorSecondary }"></span>
                <span class="text-[10px]">{{ labelSecondary }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    title: string
    percentage: number
    colorPrimary?: string
    colorSecondary?: string
    labelPrimary?: string
    labelSecondary?: string
}

const props = defineProps<Props>()

const colorPrimary = props.colorPrimary ?? "#1e3a8a"
const colorSecondary = props.colorSecondary ?? "#e2e8f0"
const labelPrimary = props.labelPrimary ?? "Lorem ipsum"
const labelSecondary = props.labelSecondary ?? "Lorem ipsum"

const chartOptions = {
    chart: {
        type: "radialBar",
        sparkline: { enabled: true },
    },
    plotOptions: {
        radialBar: {
            startAngle: -90,
            endAngle: 90,
            hollow: {
                size: "68%",
            },
            track: {
                background: colorSecondary,
                strokeWidth: "100%",
                margin: 0,
            },
            dataLabels: {
                show: true,
                name: {
                    show: true,
                    offsetY: 60,
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#1e3a8a",
                },
                value: {
                    show: true,
                    fontSize: "20px",
                    fontWeight: 700,
                    offsetY: -10,
                    formatter: (val: number) => `${Math.round(val)}%`,
                },
            },
        },
    },
    fill: {
        colors: [colorPrimary],
    },
    labels: [labelPrimary],
}
</script>

<style scoped>
:deep(.apexcharts-canvas) {
    max-width: 100%;
}
</style>
