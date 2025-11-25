<template>
    <svg :width="width" :height="height" viewBox="0 0 17 15" :class="computedClass" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="ariaLabel" tabindex="0" v-bind="rest" @click="onActivate"
        @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
        <path
            d="M15.8083 10.4833C15.6083 12.7083 14 14.1667 11.6667 14.1667H4.16667C1.86667 14.1667 0 12.3 0 10V4.16667C0 1.9 1.36667 0.316667 3.49167 0.05C3.70833 0.0166666 3.93333 0 4.16667 0H11.6667C11.8833 0 12.0917 0.00833329 12.2917 0.0416666C14.2833 0.275 15.6333 1.66667 15.8083 3.68333C15.8333 3.925 15.6333 4.125 15.3917 4.125H14.1C13.3 4.125 12.5583 4.43333 12.025 4.98333C11.3917 5.6 11.075 6.46667 11.15 7.33333C11.2833 8.85 12.6167 10.0417 14.2 10.0417H15.3917C15.6333 10.0417 15.8333 10.2417 15.8083 10.4833Z"
            :fill="primaryFill" />
        <path
            d="M16.6667 6.225V7.94167C16.6667 8.4 16.3 8.775 15.8333 8.79167H14.2C13.3 8.79167 12.475 8.13333 12.4 7.23333C12.35 6.70833 12.55 6.21667 12.9 5.875C13.2083 5.55833 13.6333 5.375 14.1 5.375H15.8333C16.3 5.39167 16.6667 5.76667 16.6667 6.225Z"
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
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 15)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Icon')

// normalize fillVar: accept "dark-blue" or "--dark-blue" and return "--dark-blue"
const normalizedFillVar = (v?: string) => {
    if (!v) return undefined
    return v.startsWith('--') ? v : `--${v}`
}

// read fillVar from attrs (camel or kebab)
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

// pass other attributes (except class/width/height/fill/fillVar/ariaLabel and kebab 'fill-var')
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
