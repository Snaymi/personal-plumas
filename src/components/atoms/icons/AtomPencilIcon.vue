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
      d="M15.625 16.6615H0.625C0.283333 16.6615 0 16.3782 0 16.0365C0 15.6948 0.283333 15.4115 0.625 15.4115H15.625C15.9667 15.4115 16.25 15.6948 16.25 16.0365C16.25 16.3782 15.9667 16.6615 15.625 16.6615Z"
      :fill="primaryFill"
    />
    <path
      d="M13.975 1.22817C12.3583 -0.388492 10.775 -0.430159 9.11667 1.22817L8.10833 2.23651C8.025 2.31984 7.99167 2.45317 8.025 2.56984C8.65833 4.77817 10.425 6.54484 12.6333 7.17817C12.6667 7.18651 12.7 7.19484 12.7333 7.19484C12.825 7.19484 12.9083 7.16151 12.975 7.09484L13.975 6.08651C14.8 5.26984 15.2 4.47817 15.2 3.67817C15.2083 2.85317 14.8083 2.05317 13.975 1.22817Z"
      :fill="primaryFill"
    />
    <path
      d="M11.1333 7.93651C10.8917 7.81984 10.6583 7.70317 10.4333 7.56984C10.25 7.46151 10.075 7.34484 9.9 7.21984C9.75833 7.12817 9.59167 6.99484 9.43333 6.86151C9.41667 6.85317 9.35833 6.80317 9.29167 6.73651C9.01667 6.50317 8.70833 6.20318 8.43333 5.86984C8.40833 5.85317 8.36667 5.79484 8.30833 5.71984C8.225 5.61984 8.08333 5.45317 7.95833 5.26151C7.85833 5.13651 7.74167 4.95317 7.63333 4.76984C7.5 4.54484 7.38333 4.31984 7.26667 4.08651C7.24901 4.04868 7.23193 4.01104 7.21537 3.97362C7.09239 3.69586 6.73019 3.61465 6.51539 3.82945L1.74167 8.60317C1.63333 8.71151 1.53333 8.91984 1.50833 9.06151L1.05833 12.2532C0.975 12.8198 1.13333 13.3532 1.48333 13.7115C1.78333 14.0032 2.2 14.1615 2.65 14.1615C2.75 14.1615 2.85 14.1532 2.95 14.1365L6.15 13.6865C6.3 13.6615 6.50833 13.5615 6.60833 13.4532L11.3761 8.68541C11.5924 8.46912 11.5108 8.0979 11.2295 7.97785C11.1978 7.96434 11.1658 7.95056 11.1333 7.93651Z"
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
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 17)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 17)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Ícone')

// normalize fillVar: user can pass "dark-blue" or "--dark-blue"
const normalizedFillVar = (v?: string) => {
  if (!v) return undefined
  return v.startsWith('--') ? v : `--${v}`
}

/**
 * primaryFill resolution order:
 * 1) props.fill
 * 2) props.fillVar -> var(--name)
 * 3) attrs.fill
 * 4) default color (#B2BBC7)
 * 5) fallback currentColor
 *
 * Default color requested: #B2BBC7
 */
const primaryFill = computed(() => {
  if (props.fill) return props.fill
  const fv = normalizedFillVar(props.fillVar ?? (attrs as any).fillVar)
  if (fv) return `var(${fv})`
  if ((attrs as any).fill) return (attrs as any).fill as string
  return '#B2BBC7'
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
