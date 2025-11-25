<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 17 18"
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
      d="M15.6863 3.31667C14.3446 3.18333 13.003 3.08333 11.653 3.00833V3L11.4696 1.91667C11.3446 1.15 11.1613 0 9.21131 0H7.02798C5.08631 0 4.90298 1.1 4.76965 1.90833L4.59465 2.975C3.81965 3.025 3.04465 3.075 2.26965 3.15L0.569646 3.31667C0.219646 3.35 -0.0303537 3.65833 0.0029796 4C0.0363129 4.34167 0.336313 4.59167 0.686313 4.55833L2.38631 4.39167C6.75298 3.95833 11.153 4.125 15.5696 4.56667C15.5946 4.56667 15.6113 4.56667 15.6363 4.56667C15.953 4.56667 16.228 4.325 16.2613 4C16.2863 3.65833 16.0363 3.35 15.6863 3.31667Z"
      :fill="primaryFill"
    />
    <path
      d="M14.153 5.74167C13.953 5.53333 13.678 5.41667 13.3946 5.41667H2.86131C2.57798 5.41667 2.29465 5.53333 2.10298 5.74167C1.91131 5.95 1.80298 6.23333 1.81965 6.525L2.33631 15.075C2.42798 16.3417 2.54465 17.925 5.45298 17.925H10.803C13.7113 17.925 13.828 16.35 13.9196 15.075L14.4363 6.53333C14.453 6.23333 14.3446 5.95 14.153 5.74167ZM9.51131 13.75H6.73631C6.39465 13.75 6.11131 13.4667 6.11131 13.125C6.11131 12.7833 6.39465 12.5 6.73631 12.5H9.51131C9.85298 12.5 10.1363 12.7833 10.1363 13.125C10.1363 13.4667 9.85298 13.75 9.51131 13.75ZM10.2113 10.4167H6.04465C5.70298 10.4167 5.41965 10.1333 5.41965 9.79167C5.41965 9.45 5.70298 9.16667 6.04465 9.16667H10.2113C10.553 9.16667 10.8363 9.45 10.8363 9.79167C10.8363 10.1333 10.553 10.4167 10.2113 10.4167Z"
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
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 17)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 18)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Icon')

/* Preserve artwork color by default; only override when parent passes `fill` prop */
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
svg:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(2, 44, 92, 0.12);
  border-radius: 4px;
}
</style>
