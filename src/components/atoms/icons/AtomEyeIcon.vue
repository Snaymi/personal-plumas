<template>
  <svg :class="computedClass" :width="width" :height="height" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg"
    role="img" :aria-label="ariaLabel" v-bind="rest" :tabindex="clickable ? 0 : undefined" v-on="listeners">
    <path
      d="M19.25 5.72C16.94 2.09 13.56 0 10 0C8.22 0 6.49 0.52 4.91 1.49C3.33 2.47 1.91 3.9 0.75 5.72C-0.25 7.29 -0.25 9.84 0.75 11.41C3.06 15.05 6.44 17.13 10 17.13C11.78 17.13 13.51 16.61 15.09 15.64C16.67 14.66 18.09 13.23 19.25 11.41C20.25 9.85 20.25 7.29 19.25 5.72ZM10 12.61C7.76 12.61 5.96 10.8 5.96 8.57C5.96 6.34 7.76 4.53 10 4.53C12.24 4.53 14.04 6.34 14.04 8.57C14.04 10.8 12.24 12.61 10 12.61Z"
      :fill="primaryFill" />
    <path
      d="M10 5.71C8.43 5.71 7.15 6.99 7.15 8.57C7.15 10.14 8.43 11.42 10 11.42C11.57 11.42 12.86 10.14 12.86 8.57C12.86 7 11.57 5.71 10 5.71Z"
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
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 20)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 18)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Ícone')

const clickable = computed(() => !!props.clickable)

// normalize fillVar: accept "name" or "--name" and return "--name"
const normalizedFillVar = (v?: string) => {
  if (!v) return undefined
  return v.startsWith('--') ? v : `--${v}`
}

const primaryFill = computed(() => {
  if (props.fill) return props.fill

  const pfv = normalizedFillVar(props.fillVar as string | undefined)
  if (pfv) return `var(${pfv})`

  const a = attrs as Record<string, unknown>
  const afvRaw = (a.fillVar as string) ?? (a['fill-var'] as string) ?? undefined
  const afv = normalizedFillVar(afvRaw)
  if (afv) return `var(${afv})`

  if ((attrs as any).fill) return (attrs as any).fill as string

  return 'var(--icon-color, #022c5c)'
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

// listeners is empty object when not clickable -> no event handlers attached
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
/* foco removido conforme solicitado */
</style>
