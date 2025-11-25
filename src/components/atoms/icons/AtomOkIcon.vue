<template>
    <svg :width="width" :height="height" viewBox="0 0 14 14" :class="computedClass" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="ariaLabel" tabindex="0" v-bind="rest" @click="onActivate"
        @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
        <path
            d="M6.66667 0C2.99333 0 0 2.99333 0 6.66667C0 10.34 2.99333 13.3333 6.66667 13.3333C10.34 13.3333 13.3333 10.34 13.3333 6.66667C13.3333 2.99333 10.34 0 6.66667 0ZM9.85333 5.13333L6.07333 8.91333C5.98 9.00667 5.85333 9.06 5.72 9.06C5.58667 9.06 5.46 9.00667 5.36667 8.91333L3.48 7.02667C3.28667 6.83333 3.28667 6.51333 3.48 6.32C3.67333 6.12667 3.99333 6.12667 4.18667 6.32L5.72 7.85333L9.14667 4.42667C9.34 4.23333 9.66 4.23333 9.85333 4.42667C10.0467 4.62 10.0467 4.93333 9.85333 5.13333Z"
            :fill="primaryFill" />
    </svg>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

const emit = defineEmits<{
    (e: 'click', ev: MouseEvent | KeyboardEvent): void
    (e: 'activate'): void
}>()

const props = defineProps<{
    class?: string
    width?: number | string
    height?: number | string
    fill?: string
    ariaLabel?: string
    clickable?: boolean
}>()

const attrs = useAttrs()

const cls = computed(() => props.class ?? (attrs.class as string) ?? '')
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 14)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 14)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Icon')

/* Preserve artwork color by default; only override when parent passes `fill` prop */
const DEFAULT_FILL = '#FFFFFF'
const primaryFill = computed(() => props.fill ?? (attrs.fill as string) ?? DEFAULT_FILL)

const rest = computed(() => {
    const { class: _c, width: _w, height: _h, fill: _f, ariaLabel: _al, 'aria-label': _al2, clickable: _cl, ...others } =
        attrs as Record<string, unknown>
    return others
})

const computedClass = computed(() => {
    const base = 'inline-block'
    const cursorClass = props.clickable ? 'cursor-pointer' : 'cursor-default'
    return [base, cursorClass, cls.value].filter(Boolean).join(' ')
})

function onActivate(ev: MouseEvent | KeyboardEvent) {
    ev.preventDefault?.()
    emit('activate')
    emit('click', ev)
}
</script>

<style scoped>

</style>
