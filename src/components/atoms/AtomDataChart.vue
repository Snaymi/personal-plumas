<template>
    <div class="w-full h-80">
        <apexchart type="bar" height="100%" :options="chartOptions" :series="series" />
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

// Tipagem dos dados esperados
interface Dataset {
    label: string
    color: string
    data: number[]
}

interface ChartProps {
    labels: string[]
    datasets: Dataset[]
}

// Props tipadas
const props = defineProps < ChartProps > ()

// Série de dados para o gráfico (ApexCharts espera { name, data })
const series = computed(() => {
    return props.datasets.map((d) => ({
        name: d.label,
        data: d.data
    }))
})

// Opções de configuração do gráfico
const chartOptions = computed(() => ({
    chart: {
        type: "bar",
        toolbar: { show: false },
        fontFamily: "Inter, sans-serif"
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "45%",
            borderRadius: 5
        }
    },
    dataLabels: { enabled: false },
    xaxis: {
        categories: props.labels,
        labels: {
            style: {
                colors: "#475569",
                fontSize: "13px"
            }
        }
    },
    yaxis: {
        labels: {
            formatter: (val: number) => `${val}%`,
            style: {
                colors: "#475569",
                fontSize: "13px"
            }
        }
    },
    fill: { opacity: 1 },
    tooltip: {
        y: {
            formatter: (val: number) => `${val}%`
        }
    },
    legend: {
        position: "top",
        horizontalAlign: "right",
        labels: { colors: "#475569" }
    },
    colors: props.datasets.map((d) => d.color)
}))
</script>
