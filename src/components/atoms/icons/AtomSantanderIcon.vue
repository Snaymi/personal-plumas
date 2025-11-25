<template>
  <svg
    :width="width"
    :height="height"
    viewBox="-4.8 -4.8 57.60 57.60"
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
    <defs />
    <path
      d="M15.8216,22.04c0,6.9412,7.6083,12.1141,8.3063,18.0958,0,0,1.3814-1.3813,1.3814-4.7361s-7.1272-13.368-7.1272-16.5765c0-2.4748.2313-3.4644,1.4535-4.9075,0,5.5982,9.0942,11.8363,9.0942,17.9319,0,0,1.3814-1.3814,1.3814-4.7361s-7.1271-13.368-7.1271-16.5765c0-2.4749.2312-3.4644,1.4534-4.9075,0,4.4528,5.7536,9.3408,8.1079,16.5611l0,0C39.1234,23.9408,43.5,27.5492,43.5,31.7161c0,5.8854-8.73,10.6563-19.5,10.6563S4.5,37.6015,4.5,31.7161C4.5,27.4269,9.1372,23.73,15.8216,22.04Z"
      :stroke="primaryFill"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
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
  clickable?: boolean
}>()

const attrs = useAttrs()

const cls = computed(() => props.class ?? (attrs.class as string) ?? '')
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 24)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 24)
const ariaLabel = computed(() => props.ariaLabel ?? (attrs['aria-label'] as string) ?? 'Icon')

const normalizedFillVar = (v?: string) => {
  if (!v) return undefined
  return v.startsWith('--') ? v : `--${v}`
}

const readFillVarFromAttrs = () => {
  const a = attrs as Record<string, unknown>
  return (a.fillVar as string) ?? (a['fill-var'] as string) ?? undefined
}

/* Resolution order for primaryFill:
   1) props.fill
   2) props.fillVar -> var(--name)
   3) attrs.fillVar / attrs['fill-var'] -> var(--name)
   4) attrs.fill
   5) CSS variable --icon-color
   6) fallback literal red
*/
const primaryFill = computed(() => {
  if (props.fill) return props.fill

  const pfv = normalizedFillVar(props.fillVar as string | undefined)
  if (pfv) return `var(${pfv})`

  const afvRaw = readFillVarFromAttrs()
  const afv = normalizedFillVar(afvRaw)
  if (afv) return `var(${afv})`

  if ((attrs as any).fill) return (attrs as any).fill as string

  return 'var(--icon-color, red)'
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
    clickable: _cl,
    ...others
  } = attrs as Record<string, unknown>
  return others
})

const computedClass = computed(() => {
  const base = 'inline-block'
  const cursorClass = props.clickable === false ? 'cursor-default' : 'cursor-pointer'
  return [base, cursorClass, cls.value].filter(Boolean).join(' ')
})

function onActivate(ev: MouseEvent | KeyboardEvent) {
  ev.preventDefault?.()
  // allow propagation so wrapper handlers also run
  // do not call ev.stopPropagation()

  // emit existing events so component users can still listen to icon clicks
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
