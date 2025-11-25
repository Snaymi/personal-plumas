<template>
  <svg
    role="button"
    tabindex="0"
    :class="computedClass"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    v-bind="rest"
    @click="onActivate"
    @keydown.enter.prevent="onActivate"
    @keydown.space.prevent="onActivate"
    :aria-label="ariaLabel"
    aria-hidden="false"
    focusable="true"
  >
    <path
      opacity="0.2"
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      :fill="primaryFill"
    />
    <path
      d="M14.2981 8.64124L12 10.9393L9.70189 8.64124C9.41197 8.35133 8.93114 8.35133 8.64123 8.64124C8.35131 8.93116 8.35131 9.41199 8.64123 9.7019L10.9393 12L8.64123 14.2981C8.35131 14.588 8.35131 15.0688 8.64123 15.3588C8.93114 15.6487 9.41197 15.6487 9.70189 15.3588L12 13.0607L14.2981 15.3588C14.588 15.6487 15.0688 15.6487 15.3587 15.3588C15.6487 15.0688 15.6487 14.588 15.3587 14.2981L13.0606 12L15.3587 9.7019C15.6487 9.41199 15.6487 8.93116 15.3587 8.64124C15.0688 8.35133 14.588 8.35133 14.2981 8.64124Z"
      :fill="primaryFill"
    />
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
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 24)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 24)
const ariaLabel = computed(() => props.ariaLabel ?? 'Limpar campo')

// normaliza fillVar: "dark-blue" -> "--dark-blue"
const normalizedFillVar = (v?: string) => {
  if (!v) return undefined
  return v.startsWith('--') ? v : `--${v}`
}

// resolution for primaryFill:
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

// pass other attrs except class/width/height/fill/fillVar/ariaLabel
const rest = computed(() => {
  const { class: _c, width: _w, height: _h, fill: _f, fillVar: _fv, ariaLabel: _al, ...others } = attrs as Record<string, unknown>
  return others
})

// ensure cursor-pointer by default; allow parent class to override
const computedClass = computed(() => {
  const base = 'cursor-pointer'
  return [base, cls.value].filter(Boolean).join(' ')
})

function onActivate(ev: MouseEvent | KeyboardEvent) {
  // previne comportamento padrão e propagação para evitar seleção no input pai
  if ((ev as Event).preventDefault) (ev as Event).preventDefault()
  if ((ev as Event).stopPropagation) (ev as Event).stopPropagation()

  emit('clear')
  emit('click', ev)
}
</script>

<style scoped>
svg:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(2,44,92,0.12);
  border-radius: 4px;
}
</style>
