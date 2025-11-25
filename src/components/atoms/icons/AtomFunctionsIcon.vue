<template>
    <svg :width="width" :height="height" viewBox="0 0 17 17" :class="computedClass" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="ariaLabel" tabindex="0" v-bind="rest" @click="onActivate"
        @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
        <path
            d="M11.825 0H4.84167C1.80833 0 0 1.80833 0 4.84167V11.8167C0 14.8583 1.80833 16.6667 4.84167 16.6667H11.8167C14.85 16.6667 16.6583 14.8583 16.6583 11.825V4.84167C16.6667 1.80833 14.8583 0 11.825 0ZM8.00833 8.2C8.00833 10.7667 7.45 11.3417 5.95833 12.225C5.85833 12.2833 5.75 12.3083 5.64167 12.3083C5.425 12.3083 5.21667 12.2 5.1 12C4.925 11.7 5.025 11.3167 5.31667 11.1417C6.325 10.5417 6.675 10.325 6.74167 8.81667H5.15833C4.25 8.81667 3.54167 8.10833 3.54167 7.2V5.96667C3.54167 5.05833 4.25 4.35 5.15833 4.35H6.4C7.29167 4.35 8.01667 5.075 8.01667 5.96667V8.2H8.00833ZM13.125 8.2C13.125 10.7667 12.5667 11.3417 11.075 12.225C10.975 12.2833 10.8667 12.3083 10.7583 12.3083C10.5417 12.3083 10.3333 12.2 10.2167 12C10.0417 11.7 10.1417 11.3167 10.4333 11.1417C11.4417 10.5417 11.7917 10.325 11.8583 8.81667H10.2667C9.35833 8.81667 8.65 8.10833 8.65 7.2V5.96667C8.65 5.05833 9.35833 4.35 10.2667 4.35H11.5083C12.4 4.35 13.125 5.075 13.125 5.96667V8.2V8.2Z"
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

// resolution order for primaryFill:
// 1) props.fill
// 2) props.fillVar -> var(--name)
// 3) attrs.fillVar / attrs['fill-var'] -> var(--name)
// 4) attrs.fill
// 5) CSS variable --primary-green
// 6) fallback #B2BBC7 (requested default)
const primaryFill = computed(() => {
    if (props.fill) return props.fill

    const pfv = normalizedFillVar(props.fillVar as string | undefined)
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
    if ((ev as Event).preventDefault) (ev as Event).preventDefault()
    if ((ev as Event).stopPropagation) (ev as Event).stopPropagation()
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
