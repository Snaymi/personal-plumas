<template>
    <svg :width="width" :height="height" viewBox="0 0 17 17" :class="computedClass" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="ariaLabel" tabindex="0" v-bind="rest" @click="onActivate"
        @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
        <path
            d="M14.8272 1.84375C12.3605 -0.614583 8.36049 -0.614583 5.91049 1.84375C4.18549 3.55208 3.66882 6.01042 4.33549 8.17708L0.418823 12.0938C0.143823 12.3771 -0.0478436 12.9354 0.0104898 13.3354L0.26049 15.1521C0.352156 15.7521 0.91049 16.3188 1.51049 16.4021L3.32716 16.6521C3.72716 16.7104 4.28549 16.5271 4.56882 16.2354L5.25216 15.5521C5.41882 15.3937 5.41882 15.1271 5.25216 14.9604L3.63549 13.3438C3.39382 13.1021 3.39382 12.7021 3.63549 12.4604C3.87716 12.2187 4.27716 12.2187 4.51882 12.4604L6.14382 14.0854C6.30216 14.2437 6.56882 14.2437 6.72716 14.0854L8.49382 12.3271C10.6522 13.0021 13.1105 12.4771 14.8272 10.7688C17.2855 8.31042 17.2855 4.30208 14.8272 1.84375ZM10.4188 8.32708C9.26882 8.32708 8.33549 7.39375 8.33549 6.24375C8.33549 5.09375 9.26882 4.16042 10.4188 4.16042C11.5688 4.16042 12.5022 5.09375 12.5022 6.24375C12.5022 7.39375 11.5688 8.32708 10.4188 8.32708Z"
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
