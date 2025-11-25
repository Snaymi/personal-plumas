<template>
  <svg
    :class="computedClass"
    :width="width"
    :height="height"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    :aria-label="ariaLabel"
    tabindex="0"
    @click.stop.prevent="onActivate"
    @keydown.enter.prevent.stop="onActivate"
    @keydown.space.prevent.stop="onActivate"
    v-bind="rest"
    fill="none"
  >
    <path
      d="M10.7021 10.7142L14.75 14.75"
      :stroke="primaryFill"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.4167 6.58333C12.4167 9.80497 9.80497 12.4167 6.58333 12.4167C3.36167 12.4167 0.75 9.80497 0.75 6.58333C0.75 3.36167 3.36167 0.75 6.58333 0.75C9.80497 0.75 12.4167 3.36167 12.4167 6.58333Z"
      :stroke="secondaryFill"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

const emit = defineEmits<{
  (e: 'click', ev: MouseEvent | KeyboardEvent): void
}>()

const props = defineProps<{
  class?: string
  width?: number | string
  height?: number | string
  fill?: string
  fillVar?: string
  secondaryFill?: string
  ariaLabel?: string
}>()

const attrs = useAttrs()

const cls = computed(() => props.class ?? (attrs.class as string) ?? '')
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 16)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 16)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Search')

// normalize fillVar: "dark-blue" -> "--dark-blue"
const normalizedFillVar = (v?: string) => {
  if (!v) return undefined
  return v.startsWith('--') ? v : `--${v}`
}

// resolution for primaryFill:
// 1) props.fill
// 2) props.fillVar -> var(--name)
// 3) attrs.fill
// 4) var(--dark-blue)
// 5) currentColor
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

// pass other attrs except class/width/height/fill/fillVar/secondaryFill/ariaLabel
const rest = computed(() => {
  const { class: _c, width: _w, height: _h, fill: _f, fillVar: _fv, secondaryFill: _s, ariaLabel: _al, 'aria-label': _al2, ...others } =
    attrs as Record<string, unknown>
  return others
})

// ensure cursor-pointer by default; allow parent class to override
const computedClass = computed(() => {
  const base = 'cursor-pointer'
  return [base, cls.value].filter(Boolean).join(' ')
})

function onActivate(ev: MouseEvent | KeyboardEvent) {
  if ((ev as Event).preventDefault) (ev as Event).preventDefault()
  if ((ev as Event).stopPropagation) (ev as Event).stopPropagation()
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
