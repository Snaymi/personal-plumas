<template>
    <svg :width="width" :height="height" viewBox="0 0 19 20" :class="computedClass" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="ariaLabel" tabindex="0" v-bind="rest" @click="onActivate"
        @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
        <path
            d="M13.3 0.21C12.89 -0.2 12.18 0.08 12.18 0.65V4.14C12.18 5.6 13.42 6.81 14.93 6.81C15.88 6.82 17.2 6.82 18.33 6.82C18.9 6.82 19.2 6.15 18.8 5.75C17.36 4.3 14.78 1.69 13.3 0.21Z"
            :fill="primaryFill" />
        <path
            d="M18 8.19H15.11C12.74 8.19 10.81 6.26 10.81 3.89V1C10.81 0.45 10.36 0 9.81 0H5.57C2.49 0 0 2 0 5.57V14.43C0 18 2.49 20 5.57 20H13.43C16.51 20 19 18 19 14.43V9.19C19 8.64 18.55 8.19 18 8.19ZM9 15.75H5C4.59 15.75 4.25 15.41 4.25 15C4.25 14.59 4.59 14.25 5 14.25H9C9.41 14.25 9.75 14.59 9.75 15C9.75 15.41 9.41 15.75 9 15.75ZM11 11.75H5C4.59 11.75 4.25 11.41 4.25 11C4.25 10.59 4.59 10.25 5 10.25H11C11.41 10.25 11.75 10.59 11.75 11C11.75 11.41 11.41 11.75 11 11.75Z"
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
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 19)
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
