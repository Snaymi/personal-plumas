<template>
    <svg :class="computedClass" :width="width" :height="height" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="ariaLabel" tabindex="0" @click.stop.prevent="onActivate"
        @keydown.enter.prevent.stop="onActivate" @keydown.space.prevent.stop="onActivate" v-bind="rest">
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M9.375 2.60417C9.375 2.31615 9.60833 2.08333 9.89583 2.08333C10.1833 2.08333 10.4167 2.31615 10.4167 2.60417V4.6875C10.4167 4.97552 10.1833 5.20833 9.89583 5.20833C9.60833 5.20833 9.375 4.97552 9.375 4.6875V2.60417ZM4.6875 6.25H11.9792C12.2667 6.25 12.5 6.01719 12.5 5.72917V0H4.16667V5.72917C4.16667 6.01719 4.4 6.25 4.6875 6.25ZM14.5833 0H13.5417V6.25C13.5417 6.825 13.075 7.29167 12.5 7.29167H4.16667C3.59167 7.29167 3.125 6.825 3.125 6.25V0H2.08333C0.932813 0 0 0.932813 0 2.08333V14.5833C0 15.7339 0.932813 16.6667 2.08333 16.6667H14.5833C15.7339 16.6667 16.6667 15.7339 16.6667 14.5833V2.08333C16.6667 0.932813 15.7339 0 14.5833 0Z"
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
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Ícone')

// normalize fillVar: accept "name" or "--name" and return "--name"
const normalizedFillVar = (v?: string) => {
    if (!v) return undefined
    return v.startsWith('--') ? v : `--${v}`
}

// resolution order for primaryFill:
// 1) props.fill
// 2) props.fillVar -> var(--name)
// 3) attrs.fillVar / attrs['fill-var'] -> var(--name)
// 4) attrs.fill
// 5) CSS variable --icon-color
// 6) fallback literal #B2BBC7 (requested default)
const primaryFill = computed(() => {
    if (props.fill) return props.fill

    const pfv = normalizedFillVar(props.fillVar as string | undefined)
    if (pfv) return `var(${pfv})`

    const a = attrs as Record<string, unknown>
    const afvRaw = (a.fillVar as string) ?? (a['fill-var'] as string) ?? undefined
    const afv = normalizedFillVar(afvRaw)
    if (afv) return `var(${afv})`

    if ((attrs as any).fill) return (attrs as any).fill as string

    return 'var(--icon-color, #B2BBC7)'
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
    const base = 'inline-block'
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
