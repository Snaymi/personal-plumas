<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 27"
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
      d="M14.7448 0H8.47917C7.09375 0 5.95833 1.125 5.95833 2.51042V3.76042C5.95833 5.14583 7.07813 6.27083 8.46875 6.27083H14.7448C16.1354 6.27083 17.2552 5.14583 17.2552 3.76042V2.51042C17.2656 1.125 16.1354 0 14.7448 0Z"
      :fill="primaryFill"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.651 7.10417C16.4115 7.23958 16.151 7.35417 15.8802 7.4375C15.5208 7.55208 15.1406 7.61458 14.7448 7.61458H8.47917C7.61458 7.61458 6.8125 7.32292 6.16667 6.84375C5.23438 6.13542 4.625 5.01042 4.625 3.76042C4.625 3.01042 3.82813 2.54167 3.16146 2.89583C2.23438 3.38542 1.45313 4.11458 0.901042 5.01042C0.328125 5.92708 0 7 0 8.15625V20.7083C0 23.9896 2.68229 26.6667 5.95833 26.6667H17.2656C18.5417 26.6667 19.724 26.2604 20.6927 25.5729C22.224 24.5 23.2292 22.7188 23.2292 20.7083V8.15625C23.2292 5.875 21.9479 3.89583 20.0677 2.89583C19.401 2.54167 18.599 3.01042 18.599 3.76042C18.599 5.1875 17.8125 6.4375 16.651 7.10417ZM6.28125 20C5.91306 20 5.61458 20.2985 5.61458 20.6667C5.61458 21.0349 5.91306 21.3333 6.28125 21.3333H16.9479C17.3161 21.3333 17.6146 21.0349 17.6146 20.6667C17.6146 20.2985 17.3161 20 16.9479 20H6.28125ZM5.61458 16.6667C5.61458 16.2985 5.91306 16 6.28125 16H16.9479C17.3161 16 17.6146 16.2985 17.6146 16.6667C17.6146 17.0349 17.3161 17.3333 16.9479 17.3333H6.28125C5.91306 17.3333 5.61458 17.0349 5.61458 16.6667ZM6.28125 12C5.91306 12 5.61458 12.2985 5.61458 12.6667C5.61458 13.0349 5.91306 13.3333 6.28125 13.3333H16.9479C17.3161 13.3333 17.6146 13.0349 17.6146 12.6667C17.6146 12.2985 17.3161 12 16.9479 12H6.28125Z"
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
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 27)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Icon')

// normalize fillVar: accept "name" or "--name" -> return "--name"
const normalizedFillVar = (v?: string) => {
  if (!v) return undefined
  return v.startsWith('--') ? v : `--${v}`
}

const readFillVarFromAttrs = () => {
  const a = attrs as Record<string, unknown>
  return (a.fillVar as string) ?? (a['fill-var'] as string) ?? undefined
}

// color resolution:
// 1) props.fill
// 2) props.fillVar -> var(--name)
// 3) attrs.fillVar / attrs['fill-var']
// 4) attrs.fill
// 5) CSS var --primary-green
// 6) fallback #00B88D
const primaryFill = computed(() => {
  if (props.fill) return props.fill

  const pfv = normalizedFillVar(props.fillVar as string | undefined)
  if (pfv) return `var(${pfv})`

  const afvRaw = readFillVarFromAttrs()
  const afv = normalizedFillVar(afvRaw)
  if (afv) return `var(${afv})`

  if ((attrs as any).fill) return (attrs as any).fill as string

  return 'var(--primary-green, #00B88D)'
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
