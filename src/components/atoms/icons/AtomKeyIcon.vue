<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 34 34"
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
    <path
      d="M29.6543 3.6875C24.721 -1.22917 16.721 -1.22917 11.821 3.6875C8.37098 7.10417 7.33765 12.0208 8.67098 16.3542L0.837646 24.1875C0.287646 24.7542 -0.0956872 25.8708 0.0209795 26.6708L0.520979 30.3042C0.704313 31.5042 1.82098 32.6375 3.02098 32.8042L6.65431 33.3042C7.45431 33.4208 8.57098 33.0542 9.13765 32.4708L10.5043 31.1042C10.8376 30.7875 10.8376 30.2542 10.5043 29.9208L7.27098 26.6875C6.78765 26.2042 6.78765 25.4042 7.27098 24.9208C7.75431 24.4375 8.55431 24.4375 9.03765 24.9208L12.2876 28.1708C12.6043 28.4875 13.1376 28.4875 13.4543 28.1708L16.9876 24.6542C21.3043 26.0042 26.221 24.9542 29.6543 21.5375C34.571 16.6208 34.571 8.60417 29.6543 3.6875ZM20.8376 16.6542C18.5376 16.6542 16.671 14.7875 16.671 12.4875C16.671 10.1875 18.5376 8.32083 20.8376 8.32083C23.1376 8.32083 25.0043 10.1875 25.0043 12.4875C25.0043 14.7875 23.1376 16.6542 20.8376 16.6542Z"
      :fill="primaryFill"
    />
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
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 34)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 34)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Location icon')

const DEFAULT_FILL = '#00B88D'
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
/* foco intencionalmente removido conforme solicitado */
</style>
