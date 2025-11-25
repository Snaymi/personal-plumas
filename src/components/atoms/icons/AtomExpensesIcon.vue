<template>
    <svg :width="width" :height="height" viewBox="0 0 27 26" :class="computedClass" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="ariaLabel" tabindex="0" v-bind="rest" @click="onActivate"
        @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
        <path
            d="M23.3915 7.13357C23.39 7.12699 23.3884 7.12055 23.3868 7.11411C23.0934 5.98366 22.0728 5.19433 20.9051 5.19433H18.4076V3.76112H22.0159C22.4201 3.76112 22.7476 3.43362 22.7476 3.02944V0.731678C22.7476 0.327499 22.4201 0 22.0159 0H13.3357C12.9315 0 12.604 0.327499 12.604 0.731678V3.02944C12.604 3.43362 12.9315 3.76112 13.3357 3.76112H16.9441V5.19433H5.76401C4.5964 5.19433 3.57571 5.98381 3.28216 7.11396C3.28055 7.12055 3.27894 7.12699 3.27748 7.13357L0.781725 17.9609C0.850942 17.9551 0.920451 17.9503 0.991131 17.9503H25.678C25.7486 17.9503 25.8181 17.9549 25.8875 17.9609L23.3915 7.13357ZM21.1278 10.5168C21.1278 10.921 20.8003 11.2485 20.3961 11.2485H6.27282C5.86864 11.2485 5.54115 10.921 5.54115 10.5168V8.81131C5.54115 8.40713 5.86864 8.07963 6.27282 8.07963H20.3961C20.8003 8.07963 21.1278 8.40713 21.1278 8.81131V10.5168ZM25.678 19.4136H0.990985C0.444568 19.4136 0 19.8582 0 20.4048V24.3422C0 24.8888 0.444568 25.3333 0.990985 25.3333H25.6778C26.2242 25.3333 26.6688 24.8888 26.6688 24.3422V20.4048C26.6689 19.8582 26.2244 19.4136 25.678 19.4136ZM15.5673 22.493C15.5673 23.2377 14.9614 23.8435 14.2167 23.8435H12.5587C11.814 23.8435 11.2081 23.2375 11.2081 22.493V22.2541C11.2081 21.5094 11.8141 20.9036 12.5587 20.9036H14.2165C14.9614 20.9036 15.5672 21.5096 15.5672 22.2541L15.5673 22.493Z"
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
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 27)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 26)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Icon')

// normalize fillVar: accept "name" or "--name" -> return "--name"
const normalizedFillVar = (v?: string) => {
    if (!v) return undefined
    return v.startsWith('--') ? v : `--${v}`
}

const readFillVarFromAttrs = () => {
    const a = attrs as Record<string, unknown>
    return (a.fillVar as string) ?? (a['fill-var'] as string) ?? undefined
}

// color resolution:
// 1) props.fill
// 2) props.fillVar -> var(--name)
// 3) attrs.fillVar / attrs['fill-var']
// 4) attrs.fill
// 5) CSS var --primary-green
// 6) fallback #00B88D
const primaryFill = computed(() => {
    if (props.fill) return props.fill

    const pfv = normalizedFillVar(props.fillVar as string | undefined)
    if (pfv) return `var(${pfv})`

    const afvRaw = readFillVarFromAttrs()
    const afv = normalizedFillVar(afvRaw)
    if (afv) return `var(${afv})`

    if ((attrs as any).fill) return (attrs as any).fill as string

    return 'var(--primary-green, #00B88D)'
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
