<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 17 17"
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
      d="M7.16667 1.79167C7.16667 1.95 7.03333 2.08333 6.875 2.08333H5.93333C4.13333 2.08333 2.66667 3.55 2.66667 5.35V13.0417C2.66667 13.2 2.53333 13.3333 2.375 13.3333H1.79167C0.8 13.3333 0 12.5333 0 11.5417V1.79167C0 0.8 0.8 0 1.79167 0H5.375C6.36667 0 7.16667 0.8 7.16667 1.79167Z"
      :fill="primaryFill"
    />
    <path
      d="M16.6667 1.79167V11.5417C16.6667 12.5333 15.8667 13.3333 14.875 13.3333H14.35C14.1917 13.3333 14.0583 13.2 14.0583 13.0417V5.35C14.0583 3.55 12.5917 2.08333 10.7917 2.08333H9.79167C9.63333 2.08333 9.5 1.95 9.5 1.79167C9.5 0.8 10.3 0 11.2917 0H14.875C15.8667 0 16.6667 0.8 16.6667 1.79167Z"
      :fill="primaryFill"
    />
    <path
      d="M10.7917 3.33333H5.93333C4.81667 3.33333 3.91667 4.23333 3.91667 5.35V14.65C3.91667 15.7667 4.81667 16.6667 5.93333 16.6667H7.29167C7.525 16.6667 7.70833 16.4833 7.70833 16.25V14.1667C7.70833 13.825 7.99167 13.5417 8.33333 13.5417C8.675 13.5417 8.95833 13.825 8.95833 14.1667V16.25C8.95833 16.4833 9.14167 16.6667 9.375 16.6667H10.8C11.9083 16.6667 12.8083 15.7667 12.8083 14.6583V5.35C12.8083 4.23333 11.9083 3.33333 10.7917 3.33333ZM10 10.625H6.66667C6.325 10.625 6.04167 10.3417 6.04167 10C6.04167 9.65833 6.325 9.375 6.66667 9.375H10C10.3417 9.375 10.625 9.65833 10.625 10C10.625 10.3417 10.3417 10.625 10 10.625ZM10 8.125H6.66667C6.325 8.125 6.04167 7.84167 6.04167 7.5C6.04167 7.15833 6.325 6.875 6.66667 6.875H10C10.3417 6.875 10.625 7.15833 10.625 7.5C10.625 7.84167 10.3417 8.125 10 8.125Z"
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
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Icon')

// normalize fillVar: accept "dark-blue" or "--dark-blue" and return "--dark-blue"
const normalizedFillVar = (v?: string) => {
  if (!v) return undefined
  return v.startsWith('--') ? v : `--${v}`
}

// read fillVar from attrs (camel or kebab)
const readFillVarFromAttrs = () => {
  const a = attrs as Record<string, unknown>
  return (a.fillVar as string) ?? (a['fill-var'] as string) ?? undefined
}

// resolution order for primaryFill:
// 1) props.fill
// 2) props.fillVar -> var(--name)
// 3) attrs.fillVar / attrs['fill-var'] -> var(--name)
// 4) attrs.fill
// 5) CSS variable --primary-green
// 6) fallback #B2BBC7
const primaryFill = computed(() => {
  if (props.fill) return props.fill

  const pfv = normalizedFillVar(props.fillVar as string | undefined)
  if (pfv) return `var(${pfv})`

  const afvRaw = readFillVarFromAttrs()
  const afv = normalizedFillVar(afvRaw)
  if (afv) return `var(${afv})`

  if ((attrs as any).fill) return (attrs as any).fill as string

  return 'var(--primary-green, #B2BBC7)'
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
