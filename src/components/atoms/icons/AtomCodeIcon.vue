<template>
    <svg :width="width" :height="height" viewBox="0 0 17 17" :class="computedClass" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="ariaLabel" tabindex="0" v-bind="rest" @click="onActivate"
        @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
        <path
            d="M8.33333 0C3.73333 0 0 3.73333 0 8.33333C0 12.9333 3.73333 16.6667 8.33333 16.6667C12.9333 16.6667 16.6667 12.9333 16.6667 8.33333C16.6667 3.73333 12.9333 0 8.33333 0ZM5.44167 9.55833C5.68333 9.8 5.68333 10.2 5.44167 10.4417C5.31667 10.5667 5.15833 10.625 5 10.625C4.84167 10.625 4.68333 10.5667 4.55833 10.4417L2.89167 8.775C2.65 8.53333 2.65 8.13333 2.89167 7.89167L4.55833 6.225C4.8 5.98333 5.2 5.98333 5.44167 6.225C5.68333 6.46667 5.68333 6.86667 5.44167 7.10833L4.21667 8.33333L5.44167 9.55833ZM9.74167 6.63333L8.075 10.525C7.975 10.7583 7.74167 10.9 7.5 10.9C7.41667 10.9 7.33333 10.8833 7.25833 10.85C6.94167 10.7167 6.79167 10.35 6.93333 10.025L8.6 6.13333C8.73333 5.81667 9.1 5.66667 9.41667 5.80833C9.73333 5.95 9.875 6.31667 9.74167 6.63333ZM13.775 8.775L12.1083 10.4417C11.9833 10.5667 11.825 10.625 11.6667 10.625C11.5083 10.625 11.35 10.5667 11.225 10.4417C10.9833 10.2 10.9833 9.8 11.225 9.55833L12.45 8.33333L11.225 7.10833C10.9833 6.86667 10.9833 6.46667 11.225 6.225C11.4667 5.98333 11.8667 5.98333 12.1083 6.225L13.775 7.89167C14.0167 8.13333 14.0167 8.53333 13.775 8.775Z"
            :fill="primaryFill" />
    </svg>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

const emit = defineEmits<{
    (e: 'click', ev: MouseEvent | KeyboardEvent): void
    (e: 'clear'): void
}>()

const props = defineProps<{
    class?: string
    width?: number | string
    height?: number | string
    fill?: string
    fillVar?: string
    ariaLabel?: string
}>()

const attrs = useAttrs()

const cls = computed(() => props.class ?? (attrs.class as string) ?? '')
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 17)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 17)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Icon')

const normalizedFillVar = (v?: string) => {
    if (!v) return undefined
    return v.startsWith('--') ? v : `--${v}`
}

const readFillVarFromAttrs = () => {
    const a = attrs as Record<string, unknown>
    return (a.fillVar as string) ?? (a['fill-var'] as string) ?? undefined
}

const primaryFill = computed(() => {
    if (props.fill) return props.fill

    const pfv = normalizedFillVar(props.fillVar)
    if (pfv) return `var(${pfv})`

    const afvRaw = readFillVarFromAttrs()
    const afv = normalizedFillVar(afvRaw)
    if (afv) return `var(${afv})`

    if ((attrs as any).fill) return (attrs as any).fill as string

    return 'var(--primary-green, #B2BBC7)'
})

const rest = computed(() => {
    const {
        class: _c,
        width: _w,
        height: _h,
        fill: _f,
        fillVar: _fv,
        'fill-var': _fv2,
        ariaLabel: _al,
        'aria-label': _al2,
        ...others
    } = attrs as Record<string, unknown>
    return others
})

const computedClass = computed(() => {
    const base = 'cursor-pointer'
    return [base, cls.value].filter(Boolean).join(' ')
})

function onActivate(ev: MouseEvent | KeyboardEvent) {
    ev.preventDefault?.()
    ev.stopPropagation?.()
    emit('clear')
    emit('click', ev)
}
</script>

<style scoped>
svg:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(2, 44, 92, 0.12);
    border-radius: 4px;
}
</style>
