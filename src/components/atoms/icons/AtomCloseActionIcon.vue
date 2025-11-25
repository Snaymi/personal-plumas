<template>
    <svg :class="computedClass" :width="width" :height="height" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="ariaLabel" tabindex="0" @click.stop.prevent="onActivate"
        @keydown.enter.prevent.stop="onActivate" @keydown.space.prevent.stop="onActivate" v-bind="rest">
        <path
            d="M4.8418 0.5H11.8252C13.2424 0.500039 14.3131 0.920683 15.0283 1.63672C15.7434 2.35265 16.162 3.42315 16.1582 4.83984V11.8252C16.1582 13.2422 15.7377 14.313 15.0215 15.0293C14.3051 15.7457 13.2336 16.167 11.8164 16.167H4.8418C3.42458 16.167 2.35303 15.7465 1.63672 15.0293C0.920352 14.312 0.5 13.2381 0.5 11.8164V4.8418C0.5 3.42457 0.920344 2.35309 1.63672 1.63672C2.35309 0.920344 3.42457 0.5 4.8418 0.5ZM12.6641 4.00195C12.2272 3.56542 11.51 3.56527 11.0732 4.00195L8.33301 6.74121L5.59375 4.00195C5.15689 3.5651 4.43881 3.5651 4.00195 4.00195C3.56526 4.43868 3.56551 5.15589 4.00195 5.59277L6.74219 8.33301L4.00195 11.0732C3.56534 11.51 3.56544 12.2272 4.00195 12.6641C4.43881 13.1009 5.15689 13.1009 5.59375 12.6641L8.33301 9.92383L11.0732 12.6641C11.5101 13.1009 12.2272 13.1009 12.6641 12.6641C13.1009 12.2272 13.1009 11.5101 12.6641 11.0732L9.92383 8.33301L12.6641 5.59277C13.1008 5.15591 13.1009 4.43878 12.6641 4.00195Z"
            :fill="primaryFill" :stroke="primaryFill" />
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
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Icon')

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
// 6) fallback literal #B2BBC7
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
