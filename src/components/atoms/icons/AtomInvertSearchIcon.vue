<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 17 17"
    xmlns="http://www.w3.org/2000/svg"
    :class="computedClass"
    :aria-label="ariaLabel"
    role="button"
    tabindex="0"
    @click="onActivate"
    @keydown.enter.prevent="onActivate"
    @keydown.space.prevent="onActivate"
    v-bind="rest"
  >
    <path
      d="M9.30192 15.0167C5.15519 15.0167 1.79359 11.6551 1.79359 7.50833C1.79359 3.3616 5.15519 0 9.30192 0C13.4487 0 16.8103 3.3616 16.8103 7.50833C16.8103 11.6551 13.4487 15.0167 9.30192 15.0167Z"
      :fill="primaryFill"
    />
    <path
      d="M0.151923 14.125C0.426923 13.6167 1.01026 13.3333 1.79359 13.3333C2.38526 13.3333 2.89359 13.575 3.19359 13.9917C3.49359 14.4083 3.56026 14.9667 3.37692 15.525C3.01859 16.6083 2.39359 16.85 2.05192 16.8917C2.00192 16.9 1.95192 16.9 1.89359 16.9C1.52692 16.9 0.960257 16.7417 0.410257 15.9167C-0.0314101 15.275 -0.114743 14.6333 0.151923 14.125Z"
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
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 17)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 17)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Limpar campo')

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
  if ((attrs as any).fill) return (attrs as any).fill as string
  return 'var(--dark-blue, currentColor)'
})

// repassa outros attributes (exclui class/width/height/fill/fillVar/ariaLabel)
const rest = computed(() => {
  const { class: _c, width: _w, height: _h, fill: _f, fillVar: _fv, ariaLabel: _al, 'aria-label': _al2, ...others } =
    attrs as Record<string, unknown>
  return others
})

// garante cursor-pointer por padrão (pode ser sobrescrito via class passada pelo pai)
const computedClass = computed(() => {
  const base = 'cursor-pointer inline-block'
  return [base, cls.value].filter(Boolean).join(' ')
})

function onActivate(ev: MouseEvent | KeyboardEvent) {
  // evita comportamento padrão e propagação
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
