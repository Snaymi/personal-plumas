<template>
  <svg :width="width" :height="height" viewBox="0 0 32 28" :class="computedClass" xmlns="http://www.w3.org/2000/svg"
    role="img" :aria-label="ariaLabel" tabindex="0" v-bind="rest" @click="onActivate"
    @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
    <path
      d="M29 22.5467V26.5467H2.33333V22.5467C2.33333 21.8133 2.93333 21.2133 3.66667 21.2133H27.6667C28.4 21.2133 29 21.8133 29 22.5467Z"
      :fill="primaryFill" />
    <path d="M9 11.88H6.33333V21.2133H9V11.88Z" :fill="primaryFill" />
    <path d="M14.3333 11.88H11.6667V21.2133H14.3333V11.88Z" :fill="primaryFill" />
    <path d="M19.6667 11.88H17V21.2133H19.6667V11.88Z" :fill="primaryFill" />
    <path d="M25 11.88H22.3333V21.2133H25V11.88Z" :fill="primaryFill" />
    <path
      d="M30.3333 27.5467H1C0.453333 27.5467 0 27.0933 0 26.5467C0 26 0.453333 25.5467 1 25.5467H30.3333C30.88 25.5467 31.3333 26 31.3333 26.5467C31.3333 27.0933 30.88 27.5467 30.3333 27.5467Z"
      :fill="primaryFill" />
    <path
      d="M28.16 4.88L16.16 0.08C15.8933 -0.0266667 15.44 -0.0266667 15.1733 0.08L3.17333 4.88C2.70667 5.06667 2.33333 5.61333 2.33333 6.12V10.5467C2.33333 11.28 2.93333 11.88 3.66667 11.88H27.6667C28.4 11.88 29 11.28 29 10.5467V6.12C29 5.61333 28.6267 5.06667 28.16 4.88ZM15.6667 8.54667C14.56 8.54667 13.6667 7.65333 13.6667 6.54667C13.6667 5.44 14.56 4.54667 15.6667 4.54667C16.7733 4.54667 17.6667 5.44 17.6667 6.54667C17.6667 7.65333 16.7733 8.54667 15.6667 8.54667Z"
      :fill="primaryFill" />
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
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 32)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 28)
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
// 5) CSS variable --primary-green (component-level variable)
// 6) fallback hardcoded #00B88D
const primaryFill = computed(() => {
  if (props.fill) return props.fill

  const pfv = normalizedFillVar(props.fillVar as string | undefined)
  if (pfv) return `var(${pfv})`

  const afvRaw = readFillVarFromAttrs()
  const afv = normalizedFillVar(afvRaw)
  if (afv) return `var(${afv})`

  if ((attrs as any).fill) return (attrs as any).fill as string

  // prefer CSS variable --primary-green if defined, otherwise fallback to the hex
  return 'var(--primary-green, #00B88D)'
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
