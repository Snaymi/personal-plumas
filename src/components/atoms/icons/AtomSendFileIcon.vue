<template>
    <svg :class="computedClass" :width="width" :height="height" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="ariaLabel" v-bind="rest" :tabindex="clickable ? 0 : undefined" v-on="listeners">
        <path
            d="M39.4667 18.66H28.6667V35.3267C28.6667 36.42 27.76 37.3267 26.6667 37.3267C25.5733 37.3267 24.6667 36.42 24.6667 35.3267V18.66H13.8667C5.33333 18.66 0 23.9933 0 32.5267V39.4333C0 47.9933 5.33333 53.3267 13.8667 53.3267H39.44C47.9733 53.3267 53.3067 47.9933 53.3067 39.46V32.5267C53.3333 23.9933 48 18.66 39.4667 18.66Z"
            :fill="primaryFill" />
        <path
            d="M28.6667 6.82L34.1867 12.34C34.5867 12.74 35.0933 12.9267 35.6 12.9267C36.1067 12.9267 36.6133 12.74 37.0133 12.34C37.7867 11.5667 37.7867 10.2867 37.0133 9.51333L28.08 0.58C27.3067 -0.193333 26.0267 -0.193333 25.2533 0.58L16.32 9.51333C15.5467 10.2867 15.5467 11.5667 16.32 12.34C17.0933 13.1133 18.3733 13.1133 19.1467 12.34L24.6667 6.82V18.66H28.6667V6.82Z"
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
    clickable?: boolean
}>()

const attrs = useAttrs()

const cls = computed(() => props.class ?? (attrs.class as string) ?? '')
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 54)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 54)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Ícone')
const clickable = computed(() => !!props.clickable)

// normaliza fillVar (aceita "name" ou "--name")
const normalizedFillVar = (v?: string) => {
    if (!v) return undefined
    return v.startsWith('--') ? v : `--${v}`
}

const primaryFill = computed(() => {
    if (props.fill) return props.fill

    const pfv = normalizedFillVar(props.fillVar)
    if (pfv) return `var(${pfv})`

    const a = attrs as Record<string, unknown>
    const afvRaw = (a.fillVar as string) ?? (a['fill-var'] as string)
    const afv = normalizedFillVar(afvRaw)
    if (afv) return `var(${afv})`

    if ((attrs as any).fill) return (attrs as any).fill as string

    return 'var(--icon-color, #022c5c)'
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
        clickable: _cl,
        ...others
    } = attrs as Record<string, unknown>
    return others
})

const computedClass = computed(() => {
    const base = 'inline-block'
    const cursorClass = clickable.value ? 'cursor-pointer' : ''
    return [base, cursorClass, cls.value].filter(Boolean).join(' ')
})

const listeners = computed(() => {
    if (!clickable.value) return {}
    return {
        click: (ev: MouseEvent) => {
            ev.preventDefault?.()
            ev.stopPropagation?.()
            emit('clear')
            emit('click', ev)
        },
        keydown: (ev: KeyboardEvent) => {
            const key = ev.key
            if (key === 'Enter' || key === ' ') {
                ev.preventDefault?.()
                ev.stopPropagation?.()
                emit('clear')
                emit('click', ev)
            }
        }
    }
})
</script>

<style scoped>
/* foco removido conforme padrão global dos ícones */
</style>
