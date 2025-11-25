<template>
    <svg
        :width="width"
        :height="height"
        viewBox="0 0 18 24"
        :class="computedClass"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        :aria-label="ariaLabel"
        tabindex="0"
        v-bind="rest"
        @click="onActivate"
        @keydown.enter.prevent="onActivate"
        @keydown.space.prevent="onActivate"
    >
        <path
            d="M17.5343 14.5717L16.3676 12.635C16.1226 12.2033 15.901 11.3867 15.901 10.9083V7.95667C15.901 5.215 14.291 2.84667 11.9693 1.73833C11.3626 0.665 10.2426 0 8.9593 0C7.68763 0 6.5443 0.688333 5.93763 1.77333C3.66263 2.905 2.08763 5.25 2.08763 7.95667V10.9083C2.08763 11.3867 1.86596 12.2033 1.62096 12.6233L0.442629 14.5717C-0.0240379 15.3533 -0.129038 16.2167 0.162629 17.01C0.442629 17.7917 1.10763 18.3983 1.97096 18.69C4.2343 19.46 6.6143 19.8333 8.9943 19.8333C11.3743 19.8333 13.7543 19.46 16.0176 18.7017C16.8343 18.4333 17.4643 17.815 17.7676 17.01C18.071 16.205 17.9893 15.3183 17.5343 14.5717Z"
            :fill="primaryFill"
        />
        <path
            d="M12.2726 21.0117C11.7826 22.365 10.4876 23.3333 8.97096 23.3333C8.0493 23.3333 7.1393 22.96 6.49763 22.295C6.1243 21.945 5.8443 21.4783 5.68096 21C5.83263 21.0233 5.9843 21.035 6.14763 21.0583C6.41596 21.0933 6.69596 21.1283 6.97596 21.1517C7.64096 21.21 8.31763 21.245 8.9943 21.245C9.6593 21.245 10.3243 21.21 10.9776 21.1517C11.2226 21.1283 11.4676 21.1167 11.701 21.0817C11.8876 21.0583 12.0743 21.035 12.2726 21.0117Z"
            :fill="primaryFill"
        />
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
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 18)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 24)
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

    return '#B2BBC7'
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
