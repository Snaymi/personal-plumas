<template>
    <svg :width="width" :height="height" viewBox="0 0 21 19" :class="computedClass" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="ariaLabel" tabindex="0" v-bind="rest" @click="onActivate"
        @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
        <path
            d="M18.1 6.6589C16.29 6.6589 15.55 5.3789 16.45 3.8089C16.97 2.8989 16.66 1.7389 15.75 1.2189L14.02 0.228901C13.23 -0.241099 12.21 0.0389014 11.74 0.828901L11.63 1.0189C10.73 2.5889 9.25 2.5889 8.34 1.0189L8.23 0.828901C7.78 0.0389014 6.76 -0.241099 5.97 0.228901L4.24 1.2189C3.33 1.7389 3.02 2.9089 3.54 3.8189C4.45 5.3789 3.71 6.6589 1.9 6.6589C0.86 6.6589 0 7.5089 0 8.5589V10.3189C0 11.3589 0.85 12.2189 1.9 12.2189C3.71 12.2189 4.45 13.4989 3.54 15.0689C3.02 15.9789 3.33 17.1389 4.24 17.6589L5.97 18.6489C6.76 19.1189 7.78 18.8389 8.25 18.0489L8.36 17.8589C9.26 16.2889 10.74 16.2889 11.65 17.8589L11.76 18.0489C12.23 18.8389 13.25 19.1189 14.04 18.6489L15.77 17.6589C16.68 17.1389 16.99 15.9689 16.47 15.0689C15.56 13.4989 16.3 12.2189 18.11 12.2189C19.15 12.2189 20.01 11.3689 20.01 10.3189V8.5589C20 7.5189 19.15 6.6589 18.1 6.6589ZM10 12.6889C8.21 12.6889 6.75 11.2289 6.75 9.4389C6.75 7.6489 8.21 6.1889 10 6.1889C11.79 6.1889 13.25 7.6489 13.25 9.4389C13.25 11.2289 11.79 12.6889 10 12.6889Z"
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
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 21)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 19)
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
