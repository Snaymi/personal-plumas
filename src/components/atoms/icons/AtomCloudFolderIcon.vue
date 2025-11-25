<template>
    <svg :width="width" :height="height" viewBox="0 0 18 18" :class="computedClass" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="ariaLabel" tabindex="0" v-bind="rest" @click="onActivate"
        @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
        <path
            d="M11.3167 14.75C9.55833 14.875 9.55833 17.425 11.3167 17.55H15.4917C16 17.55 16.4833 17.3667 16.8583 17.025C18.0917 15.95 17.4333 13.7833 15.8083 13.5833C15.225 10.0667 10.1333 11.4 11.3417 14.75"
            :fill="primaryFill" />
        <path
            d="M11.3167 14.75C9.55833 14.875 9.55833 17.425 11.3167 17.55H15.4917C16 17.55 16.4833 17.3667 16.8583 17.025C18.0917 15.95 17.4333 13.7833 15.8083 13.5833C15.225 10.0667 10.1333 11.4 11.3417 14.75"
            :fill="primaryFill" />
        <path
            d="M16.6667 7.55833V11.1167C16.6667 11.3833 16.2417 11.5 16.0583 11.3083C15.6667 10.9 15.175 10.5917 14.6083 10.4167C13.3 10.0083 11.7917 10.4083 10.8417 11.3917C10.2417 12.0333 9.91667 12.8333 9.9 13.7C9.9 13.85 9.825 13.9833 9.70833 14.075C9.10833 14.55 8.74167 15.2917 8.74167 16.1417V16.15C8.74167 16.4167 8.55 16.6583 8.28333 16.6583H4.45C2 16.6667 0 14.6667 0 12.2083V3.68333C0 1.65 1.65 0 3.68333 0H5.61667C6.975 0 7.4 0.441667 7.94167 1.16667L9.10833 2.71667C9.36667 3.05833 9.4 3.1 9.88333 3.1H12.2083C14.1917 3.1 15.875 4.4 16.45 6.2C16.575 6.575 16.6417 6.95833 16.6583 7.36667C16.6667 7.425 16.6667 7.5 16.6667 7.55833Z"
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
    ariaLabel?: string
    clickable?: boolean
}>()

const attrs = useAttrs()

const cls = computed(() => props.class ?? (attrs.class as string) ?? '')
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 18)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 18)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Icon')

/* Default artwork color preserved; only override when parent passes `fill` prop */
const DEFAULT_FILL = '#022C5C'

const primaryFill = computed(() => {
    return props.fill ?? (attrs.fill as string) ?? DEFAULT_FILL
})

const rest = computed(() => {
    const { class: _c, width: _w, height: _h, fill: _f, ariaLabel: _al, 'aria-label': _al2, clickable: _cl, ...others } =
        attrs as Record<string, unknown>
    return others
})

const computedClass = computed(() => {
    const base = 'inline-block'
    const cursorClass = props.clickable ? 'cursor-pointer' : 'cursor-default'
    return [base, cursorClass, cls.value].filter(Boolean).join(' ')
})

function onActivate(ev: MouseEvent | KeyboardEvent) {
    ev.preventDefault?.()
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
