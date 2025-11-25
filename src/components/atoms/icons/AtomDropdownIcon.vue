<template>
  <svg
    :class="computedClass"
    :width="width"
    :height="height"
    viewBox="0 0 12 7"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    :aria-label="ariaLabel"
    tabindex="0"
    @click.stop.prevent="onActivate"
    @keydown.enter.prevent.stop="onActivate"
    @keydown.space.prevent.stop="onActivate"
    v-bind="rest"
    :style="{ color: primaryFill }"
  >
    <path
      d="M10.7656 0H5.57398H0.898976C0.0989764 0 -0.301023 0.966667 0.265643 1.53333L4.58231 5.85C5.27398 6.54167 6.39898 6.54167 7.09064 5.85L8.73231 4.20833L11.4073 1.53333C11.9656 0.966667 11.5656 0 10.7656 0Z"
      fill="currentColor"
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
  fill?: string         // explicit color like "#fff"
  fillVar?: string      // "dark-blue" or "--dark-blue"
  ariaLabel?: string
}>()

const attrs = useAttrs()

const cls = computed(() => props.class ?? (attrs.class as string) ?? '')
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 12)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 7)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Icon')

// normalize fillVar: accept "dark-blue" or "--dark-blue" and return "--dark-blue"
const normalizedFillVar = (v?: string) => {
  if (!v) return undefined
  return v.startsWith('--') ? v : `--${v}`
}

// read fillVar from props OR attrs in camelCase or kebab-case
const readFillVarFromAttrs = () => {
  const a = attrs as Record<string, unknown>
  return (a.fillVar as string) ?? (a['fill-var'] as string) ?? undefined
}

// resolution order for primaryFill:
// 1) props.fill (explicit color string)
// 2) props.fillVar -> var(--name)
// 3) attrs.fillVar / attrs['fill-var'] -> var(--name)
// 4) attrs.fill (attribute passed directly)
// 5) CSS variable --dark-blue
// 6) fallback currentColor
const primaryFill = computed(() => {
  if (props.fill) return props.fill

  const pfv = normalizedFillVar(props.fillVar as string | undefined)
  if (pfv) return `var(${pfv})`

  const afvRaw = readFillVarFromAttrs()
  const afv = normalizedFillVar(afvRaw)
  if (afv) return `var(${afv})`

  if ((attrs as any).fill) return (attrs as any).fill as string

  return 'var(--dark-blue, currentColor)'
})

// pass other attributes (except class/width/height/fill/fillVar/ariaLabel and kebab 'fill-var')
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
