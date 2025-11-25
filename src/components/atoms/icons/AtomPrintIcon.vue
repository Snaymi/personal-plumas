<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 15 17"
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
      d="M3.33333 2.5C3.33333 1.11667 4.45 0 5.83333 0H9.16667C10.55 0 11.6667 1.11667 11.6667 2.5C11.6667 2.95833 11.2917 3.33333 10.8333 3.33333H4.16667C3.70833 3.33333 3.33333 2.95833 3.33333 2.5Z"
      :fill="primaryFill"
    />
    <path
      d="M12.2917 10.8333C12.2917 11.175 12.0083 11.4583 11.6667 11.4583H10.8333V14.1667C10.8333 15.55 9.71667 16.6667 8.33333 16.6667H6.66667C5.28333 16.6667 4.16667 15.55 4.16667 14.1667V11.4583H3.33333C2.99167 11.4583 2.70833 11.175 2.70833 10.8333C2.70833 10.4917 2.99167 10.2083 3.33333 10.2083H11.6667C12.0083 10.2083 12.2917 10.4917 12.2917 10.8333Z"
      :fill="primaryFill"
    />
    <path
      d="M12.5 4.16667H2.5C0.833333 4.16667 0 5 0 6.66667V10.8333C0 12.5 0.833333 13.3333 2.5 13.3333H2.8125C3.10015 13.3333 3.33333 13.1001 3.33333 12.8125C3.33333 12.5249 3.09275 12.3004 2.82368 12.1987C2.27182 11.9901 1.875 11.4544 1.875 10.8333C1.875 10.0333 2.53333 9.375 3.33333 9.375H11.6667C12.4667 9.375 13.125 10.0333 13.125 10.8333C13.125 11.4544 12.7282 11.9901 12.1763 12.1987C11.9072 12.3004 11.6667 12.5249 11.6667 12.8125C11.6667 13.1001 11.8999 13.3333 12.1875 13.3333H12.5C14.1667 13.3333 15 12.5 15 10.8333V6.66667C15 5 14.1667 4.16667 12.5 4.16667ZM5.83333 8.125H3.33333C2.99167 8.125 2.70833 7.84167 2.70833 7.5C2.70833 7.15833 2.99167 6.875 3.33333 6.875H5.83333C6.175 6.875 6.45833 7.15833 6.45833 7.5C6.45833 7.84167 6.175 8.125 5.83333 8.125Z"
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
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 15)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 17)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Icon')

// normalize fillVar: accept "name" or "--name" and return "--name"
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

const computedClass = computed(() => cls.value)

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
