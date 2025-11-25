<template>
    <svg :width="width" :height="height" viewBox="0 0 18 20" :class="computedClass" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="ariaLabel" tabindex="0" v-bind="rest" @click="onActivate"
        @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
        <path
            d="M11.06 0H6.36C5.32 0 4.47 0.84 4.47 1.88V2.82C4.47 3.86 5.31 4.7 6.35 4.7H11.06C12.1 4.7 12.94 3.86 12.94 2.82V1.88C12.95 0.84 12.1 0 11.06 0Z"
            :fill="primaryFill" />
        <path
            d="M13.95 2.82C13.95 4.41 12.65 5.71 11.06 5.71H6.36C4.77 5.71 3.47 4.41 3.47 2.82C3.47 2.26 2.87 1.91 2.37 2.17C0.96 2.92 0 4.41 0 6.12V15.53C0 17.99 2.01 20 4.47 20H12.95C15.41 20 17.42 17.99 17.42 15.53V6.12C17.42 4.41 16.46 2.92 15.05 2.17C14.55 1.91 13.95 2.26 13.95 2.82ZM12.46 15C12.46 15.41 12.12 15.75 11.71 15.75H8.71C8.3 15.75 7.96 15.41 7.96 15C7.96 14.59 8.3 14.25 8.71 14.25H9.9L5.18 9.53C4.89 9.24 4.89 8.76 5.18 8.47C5.47 8.18 5.95 8.18 6.24 8.47L10.96 13.19V12C10.96 11.59 11.3 11.25 11.71 11.25C12.12 11.25 12.46 11.59 12.46 12V15Z"
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
    fillVar?: string
    ariaLabel?: string
}>()

const attrs = useAttrs()

const cls = computed(() => props.class ?? (attrs.class as string) ?? '')
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 18)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 20)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Icon')

const normalizedFillVar = (v?: string) =>
    v ? (v.startsWith('--') ? v : `--${v}`) : undefined

const readFillVarFromAttrs = () =>
    (attrs as any).fillVar ??
    (attrs as any)['fill-var'] ??
    undefined

const primaryFill = computed(() => {
    if (props.fill) return props.fill

    const pfv = normalizedFillVar(props.fillVar)
    if (pfv) return `var(${pfv})`

    const afvRaw = readFillVarFromAttrs()
    const afv = normalizedFillVar(afvRaw)
    if (afv) return `var(${afv})`

    if ((attrs as any).fill) return (attrs as any).fill

    return '#B2BBC7'
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

const computedClass = computed(() =>
    ['cursor-pointer', cls.value].filter(Boolean).join(' ')
)

function onActivate(ev: MouseEvent | KeyboardEvent) {
    ev.preventDefault?.()
    ev.stopPropagation?.()
    emit('activate')
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
