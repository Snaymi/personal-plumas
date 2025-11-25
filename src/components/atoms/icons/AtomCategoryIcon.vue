<template>
    <svg :width="width" :height="height" viewBox="0 0 17 17" :class="computedClass" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="ariaLabel" tabindex="0" v-bind="rest" @click="onActivate"
        @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
        <path
            d="M4.36667 0H2.78333C0.958333 0 0 0.958333 0 2.775V4.35833C0 6.175 0.958333 7.13333 2.775 7.13333H4.35833C6.175 7.13333 7.13333 6.175 7.13333 4.35833V2.775C7.14167 0.958333 6.18333 0 4.36667 0Z"
            :fill="primaryFill" />
        <path
            d="M13.8917 0H12.3083C10.4917 0 9.53333 0.958333 9.53333 2.775V4.35833C9.53333 6.175 10.4917 7.13333 12.3083 7.13333H13.8917C15.7083 7.13333 16.6667 6.175 16.6667 4.35833V2.775C16.6667 0.958333 15.7083 0 13.8917 0Z"
            :fill="primaryFill" />
        <path
            d="M13.8917 9.525H12.3083C10.4917 9.525 9.53333 10.4833 9.53333 12.3V13.8833C9.53333 15.7 10.4917 16.6583 12.3083 16.6583H13.8917C15.7083 16.6583 16.6667 15.7 16.6667 13.8833V12.3C16.6667 10.4833 15.7083 9.525 13.8917 9.525Z"
            :fill="primaryFill" />
        <path
            d="M4.36667 9.525H2.78333C0.958333 9.525 0 10.4833 0 12.3V13.8833C0 15.7083 0.958333 16.6667 2.775 16.6667H4.35833C6.175 16.6667 7.13333 15.7083 7.13333 13.8917V12.3083C7.14167 10.4833 6.18333 9.525 4.36667 9.525Z"
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
// 6) fallback #B2BBC7
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
