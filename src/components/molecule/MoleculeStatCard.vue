<template>
    <div class="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between">
        <h2 class="text-xl font-semibold text-gray-800">{{ title }}</h2>
        <p class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
    </div>
</template>

<script setup lang="ts">
interface Props {
    title: string
    subtitle: string
}

defineProps<Props>()
</script>
