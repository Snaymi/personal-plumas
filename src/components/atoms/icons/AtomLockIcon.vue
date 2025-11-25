<template>
  <svg
    :class="cls"
    :width="width"
    :height="height"
    viewBox="0 0 20 21"
    xmlns="http://www.w3.org/2000/svg"
    v-bind="rest"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M16.75 6.75V8.85C16.31 8.79 15.81 8.76 15.25 8.75V6.75C15.25 3.6 14.36 1.5 10 1.5C5.64 1.5 4.75 3.6 4.75 6.75V8.75C4.19 8.76 3.69 8.79 3.25 8.85V6.75C3.25 3.85 3.95 0 10 0C16.05 0 16.75 3.85 16.75 6.75Z"
      :fill="primaryFill"
    />
    <path
      d="M16.75 8.85C16.31 8.79 15.81 8.76 15.25 8.75H4.75C4.19 8.76 3.69 8.79 3.25 8.85C0.7 9.16 0 10.41 0 13.75V15.75C0 19.75 1 20.75 5 20.75H15C19 20.75 20 19.75 20 15.75V13.75C20 10.41 19.3 9.16 16.75 8.85ZM6.71 15.46C6.52 15.64 6.26 15.75 6 15.75C5.87 15.75 5.74 15.72 5.62 15.67C5.49 15.62 5.39 15.55 5.29 15.46C5.11 15.27 5 15.01 5 14.75C5 14.62 5.03 14.49 5.08 14.37C5.13 14.25 5.2 14.14 5.29 14.04C5.39 13.95 5.49 13.88 5.62 13.83C5.99 13.67 6.43 13.76 6.71 14.04C6.8 14.14 6.87 14.25 6.92 14.37C6.97 14.49 7 14.62 7 14.75C7 15.01 6.89 15.27 6.71 15.46ZM10.92 15.13C10.87 15.25 10.8 15.36 10.71 15.46C10.52 15.64 10.26 15.75 10 15.75C9.73 15.75 9.48 15.64 9.29 15.46C9.2 15.36 9.13 15.25 9.08 15.13C9.03 15.01 9 14.88 9 14.75C9 14.48 9.11 14.23 9.29 14.04C9.66 13.67 10.33 13.67 10.71 14.04C10.89 14.23 11 14.48 11 14.75C11 14.88 10.97 15.01 10.92 15.13ZM14.71 15.46C14.52 15.64 14.26 15.75 14 15.75C13.74 15.75 13.48 15.64 13.29 15.46C13.11 15.27 13 15.02 13 14.75C13 14.48 13.11 14.23 13.29 14.04C13.67 13.67 14.34 13.67 14.71 14.04C14.75 14.09 14.79 14.14 14.83 14.2C14.87 14.25 14.9 14.31 14.92 14.37C14.95 14.43 14.97 14.49 14.98 14.55C14.99 14.62 15 14.69 15 14.75C15 15.01 14.89 15.27 14.71 15.46Z"
      :fill="secondaryFill"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

const props = defineProps<{
  class?: string
  width?: number | string
  height?: number | string
  fill?: string            // explicit color (e.g. "#022C5C" or "currentColor")
  fillVar?: string         // variable name (e.g. "dark-blue" or "--dark-blue")
  secondaryFill?: string   // optional override for second path
}>()

const attrs = useAttrs()

const cls = computed(() => props.class ?? (attrs.class as string) ?? '')
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 20)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 21)

// normalize fillVar: accept "dark-blue" or "--dark-blue" and return "--dark-blue"
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

const secondaryFill = computed(() => {
  return props.secondaryFill ?? primaryFill.value
})

// repassa outros attributes (exceto class/width/height/fill/fillVar/secondaryFill)
const rest = computed(() => {
  const { class: _c, width: _w, height: _h, fill: _f, fillVar: _fv, secondaryFill: _s, ...others } = attrs as Record<string, unknown>
  return others
})
</script>

<style scoped></style>
