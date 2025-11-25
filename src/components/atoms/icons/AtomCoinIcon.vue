<template>
    <svg :width="width" :height="height" viewBox="0 0 28 28" :class="computedClass" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="ariaLabel" tabindex="0" v-bind="rest" @click="onActivate"
        @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
        <path
            d="M11 11.7067C11 12.4267 11.2 12.5333 11.6533 12.6933L12.3333 12.9333V10.6667H11.9333C11.4267 10.6667 11 11.1333 11 11.7067Z"
            :fill="primaryFill" />
        <path
            d="M14.3333 18H14.7333C15.2533 18 15.6667 17.5333 15.6667 16.96C15.6667 16.24 15.4667 16.1333 15.0133 15.9733L14.3333 15.7333V18Z"
            :fill="primaryFill" />
        <path
            d="M23.44 5.64L20.7067 8.37333C20.5067 8.57333 20.2533 8.66667 20 8.66667C19.7467 8.66667 19.4933 8.57333 19.2933 8.37333C18.9067 7.98667 18.9067 7.34667 19.2933 6.96L22.0267 4.22667C19.68 2.22667 16.6533 1 13.3333 1C5.97333 1 0 6.97333 0 14.3333C0 21.6933 5.97333 27.6667 13.3333 27.6667C20.6933 27.6667 26.6667 21.6933 26.6667 14.3333C26.6667 11.0133 25.44 7.98667 23.44 5.64ZM15.6667 14.0933C16.52 14.4 17.6667 15.0133 17.6667 16.9733C17.6667 18.64 16.3467 20.0133 14.7333 20.0133H14.3333V20.3467C14.3333 20.8933 13.88 21.3467 13.3333 21.3467C12.7867 21.3467 12.3333 20.8933 12.3333 20.3467V20.0133H12.2267C10.4533 20.0133 9 18.52 9 16.68C9 16.12 9.45333 15.6667 10 15.6667C10.5467 15.6667 11 16.12 11 16.6667C11 17.4 11.5467 18 12.2267 18H12.3333V15.04L11 14.5733C10.1467 14.2667 9 13.6533 9 11.6933C9 10.0267 10.32 8.65333 11.9333 8.65333H12.3333V8.33333C12.3333 7.78667 12.7867 7.33333 13.3333 7.33333C13.88 7.33333 14.3333 7.78667 14.3333 8.33333V8.66667H14.44C16.2133 8.66667 17.6667 10.16 17.6667 12C17.6667 12.5467 17.2133 13 16.6667 13C16.12 13 15.6667 12.5467 15.6667 12C15.6667 11.2667 15.12 10.6667 14.44 10.6667H14.3333V13.6267L15.6667 14.0933Z"
            :fill="primaryFill" />
        <path
            d="M27.5867 0.613333C27.48 0.373333 27.2933 0.173333 27.04 0.0666666C26.92 0.0266666 26.8 0 26.6667 0H21.3333C20.7867 0 20.3333 0.453333 20.3333 1C20.3333 1.54667 20.7867 2 21.3333 2H24.2533L22.0267 4.22667C22.5333 4.66667 23 5.13333 23.44 5.64L25.6667 3.41333V6.33333C25.6667 6.88 26.12 7.33333 26.6667 7.33333C27.2133 7.33333 27.6667 6.88 27.6667 6.33333V1C27.6667 0.866667 27.64 0.746667 27.5867 0.613333Z"
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
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 28)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 28)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Icon')

// normalize fillVar: accept "name" or "--name" -> return "--name"
const normalizedFillVar = (v?: string) => {
    if (!v) return undefined
    return v.startsWith('--') ? v : `--${v}`
}

const readFillVarFromAttrs = () => {
    const a = attrs as Record<string, unknown>
    return (a.fillVar as string) ?? (a['fill-var'] as string) ?? undefined
}

// color resolution:
// 1) props.fill
// 2) props.fillVar -> var(--name)
// 3) attrs.fillVar / attrs['fill-var']
// 4) attrs.fill
// 5) CSS var --primary-green
// 6) fallback #00B88D
const primaryFill = computed(() => {
    if (props.fill) return props.fill

    const pfv = normalizedFillVar(props.fillVar as string | undefined)
    if (pfv) return `var(${pfv})`

    const afvRaw = readFillVarFromAttrs()
    const afv = normalizedFillVar(afvRaw)
    if (afv) return `var(${afv})`

    if ((attrs as any).fill) return (attrs as any).fill as string

    return 'var(--primary-green, #00B88D)'
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