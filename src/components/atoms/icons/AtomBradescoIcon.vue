<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 512 512"
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
    <!-- paths use primaryFill (default keeps original artwork color) -->
    <g :fill="primaryFill">
      <path d="M246.07,156.49c-21.25,0-44.48,1.95-67.43,5.85c23.23-29.83,60.07-49.06,101.15-49.06
            c30.32,0,60.63,11.43,81.03,28.43c3.68,3.07,6.52,3.35,9.35,0.56c2.83-2.79,2.55-5.58-0.57-9.2
            c-26.63-30.94-65.73-51.85-111.92-51.01c-60.35,1.11-111.63,39.31-131.18,92.27c-17.85,5.58-34.28,12.27-48.73,20.35
            c-3.97,2.23-5.38,5.02-3.97,8.36c1.42,3.07,4.25,4.18,8.22,3.07c12.47-3.62,25.22-6.69,38.53-9.48
            c-1.42,6.97-2.27,14.22-2.27,21.74c-1.13,48.78,24.93,95.06,65.17,120.43c3.97,2.51,7.37,2.51,9.63-0.56
            c2.27-3.07,1.98-5.85-1.42-8.92c-25.5-22.86-39.67-56.87-39.67-90.6c0-17,3.4-33.45,9.92-48.23c13.32-1.12,27.77-1.95,43.63-1.95
            c103.13,0,190.12,34.01,190.12,78.61c0,22.58-28.62,45.16-62.62,60.21c-8.22,3.62-9.07,6.13-7.93,9.76
            c1.13,3.35,4.82,4.46,9.07,3.07c59.5-19.51,104.55-51.57,104.55-90.32C438.73,197.19,353.73,156.49,246.07,156.49z"/>
      <path d="M295.31,424.48V311.6c0-4.32-4.18-5.9-7.62-3.94L259,324.17v105.75l30.82,0.04
            C292.85,429.97,295.31,427.51,295.31,424.48z"/>
      <path d="M224.07,348.37v78.06c0,1.95,1.58,3.54,3.54,3.54h21.71V329.74l-21.68,12.48
            C225.43,343.48,224.07,345.46,224.07,348.37z"/>
    </g>
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
  clickable?: boolean
}>()

const attrs = useAttrs()

const cls = computed(() => props.class ?? (attrs.class as string) ?? '')
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 24)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 24)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Bradesco icon')

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

  return '#CC092F' // original artwork default
})

const rest = computed(() => {
  const { class: _c, width: _w, height: _h, fill: _f, fillVar: _fv, 'fill-var': _fv2, ariaLabel: _al, 'aria-label': _al2, clickable: _cl, ...others } =
    attrs as Record<string, unknown>
  return others
})

const computedClass = computed(() => {
  const base = 'inline-block'
  const cursorClass = props.clickable === false ? 'cursor-default' : 'cursor-pointer'
  return [base, cursorClass, cls.value].filter(Boolean).join(' ')
})

function onActivate(ev: MouseEvent | KeyboardEvent) {
  ev.preventDefault?.()
  // allow propagation so wrapper handlers also run
  // do not call ev.stopPropagation()
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
