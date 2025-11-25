<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 8 14"
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
      d="M4.91098 9.4836H3.08902C2.99641 9.4836 2.92739 9.56313 2.94679 9.64747L3.85777 13.6072C3.89062 13.75 4.10938 13.75 4.14223 13.6072L5.05321 9.64747C5.07261 9.56313 5.00359 9.4836 4.91098 9.4836Z"
      :fill="primaryFill"
    />
    <path
      d="M0 7.80859V8.36151C0 8.60681 0.211333 8.8062 0.471333 8.8062H7.52864C7.78898 8.80654 8 8.60743 8 8.36151V7.80859C8 7.31731 7.57795 6.91915 7.05733 6.91915H6.96664L6.43299 1.88295C6.67665 1.87258 6.897 1.77539 7.05865 1.62286C7.2283 1.46277 7.33333 1.2423 7.33333 0.997618V0.444714C7.33363 0.199087 7.12267 1.68368e-06 6.86197 1.68368e-06L1.138 3.69572e-07C0.877662 -0.000313057 0.666663 0.198771 0.666663 0.444714V0.997618C0.666663 1.47504 1.06633 1.86157 1.567 1.88295L1.03333 6.91915H0.942661C0.682331 6.91882 0.446666 7.01854 0.275999 7.17957C0.105333 7.3406 0 7.56266 0 7.80859Z"
      :fill="primaryFill"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

/**
 * Emits:
 *  - click (MouseEvent | KeyboardEvent)
 *  - clear (custom semantic event)
 */
const emit = defineEmits<{
  (e: 'click', ev: MouseEvent | KeyboardEvent): void
  (e: 'clear'): void
}>()

/**
 * Props accepted (can be passed or read from attrs)
 * - class, width, height, fill, fillVar, ariaLabel
 */
const props = defineProps<{
  class?: string
  width?: number | string
  height?: number | string
  fill?: string
  fillVar?: string
  ariaLabel?: string
}>()

const attrs = useAttrs()

// resolved class / size / aria
const cls = computed(() => props.class ?? (attrs.class as string) ?? '')
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 8)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 14)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Ícone')

// normalize fillVar: user can pass "name" or "--name"
const normalizedFillVar = (v?: string) => {
  if (!v) return undefined
  return v.startsWith('--') ? v : `--${v}`
}

/**
 * primaryFill resolution order:
 * 1) props.fill
 * 2) props.fillVar -> var(--name)
 * 3) attrs.fill
 * 4) var(--dark-blue, currentColor) as fallback
 *
 * Parent can override by passing `fill` or `fillVar` or via inherited color.
 */
const primaryFill = computed(() => {
  if (props.fill) return props.fill
  const fv = normalizedFillVar(props.fillVar ?? (attrs as any).fillVar)
  if (fv) return `var(${fv})`
  if ((attrs as any).fill) return (attrs as any).fill as string
  return 'var(--dark-blue, currentColor)'
})

// pass-through other attributes (exclude handled ones)
const rest = computed(() => {
  const { class: _c, width: _w, height: _h, fill: _f, fillVar: _fv, ariaLabel: _al, 'aria-label': _al2, ...others } =
    attrs as Record<string, unknown>
  return others
})

// default computed class (cursor + inline-block) merged with provided classes
const computedClass = computed(() => {
  const base = 'cursor-pointer inline-block'
  return [base, cls.value].filter(Boolean).join(' ')
})

// activation handler: prevents default/propagation, emits semantic events
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
