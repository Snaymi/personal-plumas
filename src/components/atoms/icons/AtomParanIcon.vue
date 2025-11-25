<template>
    <svg :width="width" :height="height" viewBox="0 0 15 18" :class="computedClass" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="ariaLabel" tabindex="0" v-bind="rest" @click="onActivate"
        @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
        <path
            d="M3.75 2.70833H3.54167V0.625C3.54167 0.283333 3.25833 0 2.91667 0C2.575 0 2.29167 0.283333 2.29167 0.625V2.70833H2.08333C0.758333 2.70833 0 3.46667 0 4.79167V9.79167C0 11.1167 0.758333 11.875 2.08333 11.875H2.29167V17.2917C2.29167 17.6333 2.575 17.9167 2.91667 17.9167C3.25833 17.9167 3.54167 17.6333 3.54167 17.2917V11.875H3.75C5.075 11.875 5.83333 11.1167 5.83333 9.79167V4.79167C5.83333 3.46667 5.075 2.70833 3.75 2.70833Z"
            :fill="primaryFill" />
        <path
            d="M12.9167 6.04167H12.7083V0.625C12.7083 0.283333 12.425 0 12.0833 0C11.7417 0 11.4583 0.283333 11.4583 0.625V6.04167H11.25C9.925 6.04167 9.16667 6.8 9.16667 8.125V13.125C9.16667 14.45 9.925 15.2083 11.25 15.2083H11.4583V17.2917C11.4583 17.6333 11.7417 17.9167 12.0833 17.9167C12.425 17.9167 12.7083 17.6333 12.7083 17.2917V15.2083H12.9167C14.2417 15.2083 15 14.45 15 13.125V8.125C15 6.8 14.2417 6.04167 12.9167 6.04167Z"
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
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 15)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 18)
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
