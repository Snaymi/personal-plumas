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
      d="M3.89167 10.5896H1.66667C0.75 10.5896 0 11.3396 0 12.2563V16.4229C0 16.8813 0.375 17.2562 0.833333 17.2562H3.89167C4.35 17.2562 4.725 16.8813 4.725 16.4229V11.4229C4.725 10.9646 4.35 10.5896 3.89167 10.5896Z"
      :fill="primaryFill"
    />
    <path
      d="M9.44167 7.25625H7.21667C6.3 7.25625 5.55 8.00625 5.55 8.92292V16.4229C5.55 16.8813 5.925 17.2562 6.38333 17.2562H10.275C10.7333 17.2562 11.1083 16.8813 11.1083 16.4229V8.92292C11.1083 8.00625 10.3667 7.25625 9.44167 7.25625Z"
      :fill="primaryFill"
    />
    <path
      d="M15 13.0896H12.775C12.3167 13.0896 11.9417 13.4646 11.9417 13.9229V16.4229C11.9417 16.8813 12.3167 17.2562 12.775 17.2562H15.8333C16.2917 17.2562 16.6667 16.8813 16.6667 16.4229V14.7563C16.6667 13.8396 15.9167 13.0896 15 13.0896Z"
      :fill="primaryFill"
    />
    <path
      d="M10.8417 2.96458C11.1 2.70625 11.2 2.39792 11.1167 2.13125C11.0333 1.86458 10.775 1.67292 10.4083 1.61458L9.60833 1.48125C9.575 1.48125 9.5 1.42292 9.48333 1.38958L9.04167 0.50625C8.70833 -0.16875 7.95 -0.16875 7.61667 0.50625L7.175 1.38958C7.16667 1.42292 7.09167 1.48125 7.05833 1.48125L6.25833 1.61458C5.89167 1.67292 5.64167 1.86458 5.55 2.13125C5.46667 2.39792 5.56667 2.70625 5.825 2.96458L6.44167 3.58958C6.475 3.61458 6.5 3.71458 6.49167 3.74792L6.31667 4.51458C6.18333 5.08958 6.4 5.34792 6.54167 5.44792C6.68333 5.54792 6.99167 5.68125 7.5 5.38125L8.25 4.93958C8.28333 4.91458 8.39167 4.91458 8.425 4.93958L9.16667 5.38125C9.4 5.52292 9.59167 5.56458 9.74167 5.56458C9.91667 5.56458 10.0417 5.49792 10.1167 5.44792C10.2583 5.34792 10.475 5.08958 10.3417 4.51458L10.1667 3.74792C10.1583 3.70625 10.1833 3.61458 10.2167 3.58958L10.8417 2.96458Z"
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
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 18)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Icon')

const normalizedFillVar = (v?: string) => {
  if (!v) return undefined
  return v.startsWith('--') ? v : `--${v}`
}

const readFillVarFromAttrs = () => {
  const a = attrs as Record<string, unknown>
  return (a.fillVar as string) ?? (a['fill-var'] as string) ?? undefined
}

const primaryFill = computed(() => {
  if (props.fill) return props.fill

  const pfv = normalizedFillVar(props.fillVar)
  if (pfv) return `var(${pfv})`

  const afvRaw = readFillVarFromAttrs()
  const afv = normalizedFillVar(afvRaw)
  if (afv) return `var(${afv})`

  if ((attrs as any).fill) return (attrs as any).fill as string

  return 'var(--primary-green, #B2BBC7)'
})

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
    ...others
  } = attrs as Record<string, unknown>
  return others
})

const computedClass = computed(() => {
  const base = 'cursor-pointer'
  return [base, cls.value].filter(Boolean).join(' ')
})

function onActivate(ev: MouseEvent | KeyboardEvent) {
  ev.preventDefault?.()
  ev.stopPropagation?.()
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
