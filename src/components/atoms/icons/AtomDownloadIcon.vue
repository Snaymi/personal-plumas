<template>
    <svg :width="width" :height="height" viewBox="0 0 16 17" :class="computedClass" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="ariaLabel" tabindex="0" v-bind="rest" @click="onActivate"
        @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
        <path
            d="M15 6.825H12.5917C10.6167 6.825 9.00833 5.21667 9.00833 3.24167V0.833333C9.00833 0.375 8.63333 0 8.175 0H4.64167C2.075 0 0 1.66667 0 4.64167V12.025C0 15 2.075 16.6667 4.64167 16.6667H11.1917C13.7583 16.6667 15.8333 15 15.8333 12.025V7.65833C15.8333 7.2 15.4583 6.825 15 6.825ZM8.15 11.4833L6.48333 13.15C6.425 13.2083 6.35 13.2583 6.275 13.2833C6.2 13.3167 6.125 13.3333 6.04167 13.3333C5.95833 13.3333 5.88333 13.3167 5.80833 13.2833C5.74167 13.2583 5.675 13.2083 5.625 13.1583C5.61667 13.15 5.60833 13.15 5.60833 13.1417L3.94167 11.475C3.7 11.2333 3.7 10.8333 3.94167 10.5917C4.18333 10.35 4.58333 10.35 4.825 10.5917L5.41667 11.2V7.70833C5.41667 7.36667 5.7 7.08333 6.04167 7.08333C6.38333 7.08333 6.66667 7.36667 6.66667 7.70833V11.2L7.26667 10.6C7.50833 10.3583 7.90833 10.3583 8.15 10.6C8.39167 10.8417 8.39167 11.2417 8.15 11.4833Z"
            :fill="primaryFill" />
        <path
            d="M12.4417 5.675C13.2333 5.68333 14.3333 5.68333 15.275 5.68333C15.75 5.68333 16 5.125 15.6667 4.79167C14.4667 3.58333 12.3167 1.40833 11.0833 0.175C10.7417 -0.166667 10.15 0.0666667 10.15 0.541667V3.45C10.15 4.66667 11.1833 5.675 12.4417 5.675Z"
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
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 16)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 17)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Icon')

// normalize fillVar: accept "name" or "--name" and return "--name"
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

const computedClass = computed(() => cls.value)

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
