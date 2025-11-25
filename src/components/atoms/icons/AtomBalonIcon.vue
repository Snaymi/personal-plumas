<template>
    <svg :width="width" :height="height" viewBox="0 0 17 16" :class="computedClass" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="ariaLabel" tabindex="0" v-bind="rest" @click="onActivate"
        @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
        <path
            d="M12.5 0H4.16667C1.66667 0 0 1.66667 0 4.16667V9.16667C0 11.6667 1.66667 13.3333 4.16667 13.3333V15.1083C4.16667 15.775 4.90833 16.175 5.45833 15.8L9.16667 13.3333H12.5C15 13.3333 16.6667 11.6667 16.6667 9.16667V4.16667C16.6667 1.66667 15 0 12.5 0ZM8.33333 10.1417C7.98333 10.1417 7.70833 9.85833 7.70833 9.51667C7.70833 9.175 7.98333 8.89167 8.33333 8.89167C8.68333 8.89167 8.95833 9.175 8.95833 9.51667C8.95833 9.85833 8.68333 10.1417 8.33333 10.1417ZM9.38333 6.68333C9.05833 6.9 8.95833 7.04167 8.95833 7.275V7.45C8.95833 7.79167 8.675 8.075 8.33333 8.075C7.99167 8.075 7.70833 7.79167 7.70833 7.45V7.275C7.70833 6.30833 8.41667 5.83333 8.68333 5.65C8.99167 5.44167 9.09167 5.3 9.09167 5.08333C9.09167 4.66667 8.75 4.325 8.33333 4.325C7.91667 4.325 7.575 4.66667 7.575 5.08333C7.575 5.425 7.29167 5.70833 6.95 5.70833C6.60833 5.70833 6.325 5.425 6.325 5.08333C6.325 3.975 7.225 3.075 8.33333 3.075C9.44167 3.075 10.3417 3.975 10.3417 5.08333C10.3417 6.03333 9.64167 6.50833 9.38333 6.68333Z"
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
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 16)
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
