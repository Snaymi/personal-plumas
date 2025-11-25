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
      d="M14.7448 0H8.47917C7.88542 0 7.33854 0.208333 6.90625 0.552083C6.75 0.6875 6.60417 0.833333 6.47917 1C6.39583 1.10417 6.31771 1.21875 6.25 1.34375C6.14063 1.54167 6.05729 1.76042 6.01042 1.98958C5.97396 2.15625 5.95833 2.33333 5.95833 2.51042V3.76042C5.95833 5.14583 7.07813 6.27083 8.46875 6.27083H14.7448C16.1354 6.27083 17.2552 5.14583 17.2552 3.76042V2.51042C17.2656 1.125 16.1354 0 14.7448 0Z"
      :fill="primaryFill"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.3281 7.27083L15.8802 7.4375C15.5208 7.55208 15.1406 7.61458 14.7448 7.61458H8.47917C7.61458 7.61458 6.8125 7.32292 6.16667 6.84375C5.76042 6.54167 5.41667 6.15625 5.15625 5.71875C4.81771 5.13542 4.625 4.46875 4.625 3.76042C4.625 3.01042 3.82813 2.54167 3.16146 2.89583C2.23438 3.38542 1.45313 4.11458 0.901042 5.01042C0.328125 5.92708 0 7 0 8.15625V20.7083C0 23.9896 2.68229 26.6667 5.95833 26.6667H17.2656C18.5417 26.6667 19.724 26.2604 20.6927 25.5729C22.224 24.5 23.2292 22.7188 23.2292 20.7083V8.15625C23.2292 5.875 21.9479 3.89583 20.0677 2.89583C19.401 2.54167 18.599 3.01042 18.599 3.76042C18.599 5.1875 17.8125 6.4375 16.651 7.10417L16.3281 7.27083ZM8.03646 13.6979L6.59375 15.8125L8.15104 18.0833C8.20313 18.1563 8.23958 18.2396 8.26042 18.3125L8.29167 18.5C8.29167 18.8438 8.02083 19.1146 7.64583 19.1146C7.52604 19.1146 7.41667 19.0833 7.31771 19.0208C7.22917 18.9688 7.15104 18.8958 7.07813 18.7917L5.8125 16.9479L4.5625 18.7917C4.41146 19.0208 4.22396 19.1146 3.99479 19.1146C3.84375 19.1146 3.70833 19.0729 3.59896 19C3.44271 18.8854 3.34896 18.7083 3.34896 18.5C3.34896 18.3958 3.375 18.2813 3.4375 18.1771L3.48958 18.0833L5.03646 15.8125L3.59896 13.6979C3.54167 13.6146 3.50521 13.5313 3.48438 13.4375L3.46354 13.2813C3.46354 12.9375 3.72917 12.6667 4.10417 12.6667C4.33854 12.6667 4.52604 12.7708 4.67188 12.9896L5.82813 14.6667L6.96875 12.9896C7.11458 12.7708 7.30208 12.6667 7.53646 12.6667C7.90625 12.6667 8.17708 12.9375 8.17708 13.2813C8.17708 13.4271 8.13021 13.5625 8.03646 13.6979ZM14.349 12.6667C13.9375 12.6667 13.7135 12.8854 13.5104 13.375L12.1875 16.4375L10.7969 13.375C10.5833 12.8854 10.3594 12.6667 9.94792 12.6667C9.48958 12.6667 9.19271 12.9792 9.19271 13.4896V18.4583C9.19271 18.875 9.45313 19.1146 9.82813 19.1146C10.1823 19.1146 10.4427 18.875 10.4427 18.4583V15.3958L11.4792 17.6771C11.6719 18.125 11.8333 18.25 12.151 18.25C12.2813 18.25 12.3854 18.2292 12.474 18.1771C12.6042 18.0938 12.7031 17.9375 12.8177 17.6771L13.7969 15.3958L13.8438 18.4583C13.8438 18.5833 13.8646 18.6875 13.9115 18.7813L13.9635 18.875C14.0729 19.0313 14.25 19.1146 14.4688 19.1146C14.8438 19.1146 15.0938 18.875 15.0938 18.4583V13.4896C15.0938 13.0938 14.9167 12.8125 14.625 12.7188L14.4948 12.6875L14.349 12.6667ZM17.7344 17.8438H19.9896C20.4115 17.8438 20.6771 18.0938 20.6771 18.4479C20.6771 18.6354 20.6094 18.7917 20.4792 18.8958C20.3594 19 20.1927 19.0625 19.9896 19.0625H16.9948C16.5781 19.0625 16.3073 18.7813 16.3073 18.375V13.3958C16.3073 12.9583 16.5938 12.6667 16.9948 12.6667C17.3906 12.6667 17.6771 12.9583 17.6771 13.3958V17.7813C17.6771 17.8229 17.6979 17.8438 17.7344 17.8438Z"
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
