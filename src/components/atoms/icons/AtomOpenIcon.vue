<template>
  <svg
    :class="cls"
    :width="width"
    :height="height"
    viewBox="0 0 18 21"
    xmlns="http://www.w3.org/2000/svg"
    v-bind="rest"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M7.52 0C7.04 0 6.66 0.38 6.66 0.86V9.32H10.33L8.76 7.75C8.47 7.46 8.47 6.98 8.76 6.69C9.05 6.4 9.53 6.4 9.82 6.69L12.66 9.54C12.95 9.83 12.95 10.31 12.66 10.6L9.82 13.45C9.67 13.6 9.48 13.67 9.29 13.67C9.1 13.67 8.91 13.6 8.76 13.45C8.47 13.16 8.47 12.68 8.76 12.39L10.32 10.83H6.66V19.16C6.66 19.63 7.04 20.02 7.52 20.02C13.41 20.02 17.52 15.91 17.52 10.02C17.52 4.13 13.4 0 7.52 0Z"
      :fill="primaryFill"
    />
    <path
      d="M0.75 9.32C0.34 9.32 0 9.66 0 10.07C0 10.48 0.34 10.82 0.75 10.82H6.65V9.32H0.75Z"
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
  fill?: string      // explicit color (e.g. "#022C5C" or "currentColor")
  fillVar?: string   // variable name (e.g. "dark-blue" or "--dark-blue")
}>()

const attrs = useAttrs()

const cls = computed(() => props.class ?? (attrs.class as string) ?? '')
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 18)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 21)

// normaliza fillVar: "dark-blue" -> "--dark-blue"
const normalizedFillVar = (v?: string) => {
  if (!v) return undefined
  return v.startsWith('--') ? v : `--${v}`
}

// resolução para primaryFill:
// 1) props.fill
// 2) props.fillVar -> var(--name)
// 3) attrs.fill
// 4) var(--dark-blue)
// 5) currentColor (fallback)
const primaryFill = computed(() => {
  if (props.fill) return props.fill
  const fv = normalizedFillVar(props.fillVar ?? (attrs as any).fillVar)
  if (fv) return `var(${fv})`
  if ((attrs as any).fill) return (attrs as any).fill
  return 'var(--dark-blue, currentColor)'
})

// repassa outros attributes (exclui class/width/height/fill/fillVar)
const rest = computed(() => {
  const { class: _c, width: _w, height: _h, fill: _f, fillVar: _fv, ...others } = attrs as Record<string, unknown>
  return others
})
</script>

<style scoped></style>
