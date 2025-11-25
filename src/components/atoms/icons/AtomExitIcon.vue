<template>
  <svg :width="width" :height="height" viewBox="0 0 30 34" :class="computedClass" xmlns="http://www.w3.org/2000/svg"
    role="img" :aria-label="ariaLabel" tabindex="0" v-bind="rest" @click="onActivate"
    @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
    <path
      d="M7.73333 16.7833C7.73333 16.1 8.3 15.5333 8.98333 15.5333H18.1167V1.43333C18.1 0.633333 17.4667 0 16.6667 0C6.85 0 0 6.85 0 16.6667C0 26.4833 6.85 33.3333 16.6667 33.3333C17.45 33.3333 18.1 32.7 18.1 31.9V18.0167H8.98333C8.28333 18.0333 7.73333 17.4667 7.73333 16.7833Z"
      :fill="primaryFill" />
    <path
      d="M28.8333 15.9L24.1 11.15C23.6167 10.6667 22.8167 10.6667 22.3333 11.15C21.85 11.6333 21.85 12.4333 22.3333 12.9167L24.9333 15.5167H18.1V18.0167L24.9167 18.0167L22.3167 20.6167C21.8333 21.1 21.8333 21.9 22.3167 22.3833C22.5667 22.6333 22.8833 22.75 23.2 22.75C23.5167 22.75 23.8333 22.6333 24.0833 22.3833L28.8167 17.6333C29.3167 17.1667 29.3167 16.3833 28.8333 15.9Z"
      :fill="primaryFill" />
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
  ariaLabel?: string
  clickable?: boolean
}>()

const attrs = useAttrs()

const cls = computed(() => props.class ?? (attrs.class as string) ?? '')
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 30)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 34)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Icon')

const DEFAULT_FILL = '#022C5C'
const primaryFill = computed(() => props.fill ?? (attrs.fill as string) ?? DEFAULT_FILL)

const rest = computed(() => {
  const { class: _c, width: _w, height: _h, fill: _f, ariaLabel: _al, 'aria-label': _al2, clickable: _cl, ...others } =
    attrs as Record<string, unknown>
  return others
})

const computedClass = computed(() => {
  const base = 'inline-block'
  const cursorClass = props.clickable ? 'cursor-pointer' : 'cursor-default'
  return [base, cursorClass, cls.value].filter(Boolean).join(' ')
})

function onActivate(ev: MouseEvent | KeyboardEvent) {
  ev.preventDefault?.()
  emit('activate')
  emit('click', ev)
}
</script>

<style scoped>
/* foco removido conforme padrão solicitado */
</style>
