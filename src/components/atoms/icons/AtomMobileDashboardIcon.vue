<template>
    <svg :width="width" :height="height" viewBox="0 0 20 20" :class="computedClass" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="ariaLabel" tabindex="0" v-bind="rest" @click="onActivate"
        @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
        <path
            d="M19.6675 4.94942C19.0275 2.77942 17.2175 0.969416 15.0475 0.329416C13.3975 -0.150584 12.2575 -0.110584 11.4675 0.479416C10.5175 1.18942 10.4075 2.46942 10.4075 3.37942V5.86942C10.4075 8.32942 11.5275 9.57942 13.7275 9.57942H16.5975C17.4975 9.57942 18.7875 9.46942 19.4975 8.51942C20.1075 7.73942 20.1575 6.59942 19.6675 4.94942Z"
            :fill="primaryFill" />
        <path
            d="M16.9075 11.3594C16.6475 11.0594 16.2675 10.8894 15.8775 10.8894H12.2975C10.5375 10.8894 9.10746 9.45942 9.10746 7.69942V4.11942C9.10746 3.72942 8.93746 3.34942 8.63746 3.08942C8.34746 2.82942 7.94746 2.70942 7.56746 2.75942C5.21746 3.05942 3.05746 4.34942 1.64746 6.28942C0.227457 8.23942 -0.292543 10.6194 0.157457 12.9994C0.807457 16.4394 3.55746 19.1894 7.00746 19.8394C7.55746 19.9494 8.10746 19.9994 8.65746 19.9994C10.4675 19.9994 12.2175 19.4394 13.7075 18.3494C15.6475 16.9394 16.9375 14.7794 17.2375 12.4294C17.2875 12.0394 17.1675 11.6494 16.9075 11.3594Z"
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
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 20)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 20)
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

    return '#022C5C'
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
