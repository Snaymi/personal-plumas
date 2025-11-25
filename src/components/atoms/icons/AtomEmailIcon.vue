<template>
  <svg
    :class="cls"
    :width="width"
    :height="height"
    viewBox="0 0 20 17"
    xmlns="http://www.w3.org/2000/svg"
    v-bind="rest"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M15 0H5C2 0 0 1.5 0 5V12C0 15.5 2 17 5 17H15C18 17 20 15.5 20 12V5C20 1.5 18 0 15 0ZM15.47 6.09L12.34 8.59C11.68 9.12 10.84 9.38 10 9.38C9.16 9.38 8.31 9.12 7.66 8.59L4.53 6.09C4.21 5.83 4.16 5.35 4.41 5.03C4.67 4.71 5.14 4.65 5.46 4.91L8.59 7.41C9.35 8.02 10.64 8.02 11.4 7.41L14.53 4.91C14.85 4.65 15.33 4.7 15.58 5.03C15.84 5.35 15.79 5.83 15.47 6.09Z"
      :fill="primaryFill"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

const props = defineProps<{
  class?: string
  width?: number | string
  height?: number | string
  fill?: string       // explicit color (e.g. "#022C5C" or "currentColor")
  fillVar?: string    // variable name (e.g. "dark-blue" or "--dark-blue")
}>()

const attrs = useAttrs()

const cls = computed(() => props.class ?? (attrs.class as string) ?? '')
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 20)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 17)

const normalizedFillVar = (v?: string) => {
  if (!v) return undefined
  return v.startsWith('--') ? v : `--${v}`
}

// resolution order for primaryFill:
// 1. props.fill (explicit color string)
// 2. props.fillVar (variable name) -> var(--name)
// 3. attrs.fill (attribute)
// 4. CSS variable --dark-blue
// 5. fallback currentColor
const primaryFill = computed(() => {
  if (props.fill) return props.fill
  const fv = normalizedFillVar(props.fillVar ?? (attrs as any).fillVar)
  if (fv) return `var(${fv})`
  if ((attrs as any).fill) return (attrs as any).fill
  return 'var(--dark-blue, currentColor)'
})

// repassa outros attributes (exceto class/width/height/fill/fillVar)
const rest = computed(() => {
  const { class: _c, width: _w, height: _h, fill: _f, fillVar: _fv, ...others } = attrs as Record<string, unknown>
  return others
})
</script>

<style scoped></style>
