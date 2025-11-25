<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 512 512"
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
    <!-- background rect (default purple) -->
    <rect width="512" height="512" :fill="bgFill" />

    <!-- foreground shapes (default white) -->
    <g :fill="glyphFill">
      <path
        d="M155.06,185.14c9.99-10.54,23.24-16.71,38.81-16.71c30.33,0,50.44,22.25,54.29,55.58
        c1.25,10.82,1.24,26.09,1.22,43.76c0,1.81,0,3.65,0,5.51v66.22h-41.71v-48.98c0,0-0.08-41.92-0.34-49.75
        c-1.12-34.12-21.22-55.56-52.28-55.58c-9.37,9.95-14.39,22.1-15.13,40.7c-0.1,2.59-0.08,11.78-0.04,23.9
        c0.02,6.28,0.04,13.34,0.04,20.67c0.03,31.92,0,69.05,0,69.05H98.21v-75.37c0-2.58-0.05-5.19-0.09-7.8
        c-0.09-5.26-0.19-10.56,0.09-15.81c0.47-8.75,1.98-17.35,6.04-25.34c9.3-18.3,28.36-30.09,48.68-30.09
        C153.65,185.09,154.36,185.11,155.06,185.14L155.06,185.14z"
      />
      <path
        d="M413.78,271.47c0.28-5.25,0.19-10.55,0.09-15.81c-0.05-2.61-0.09-5.22-0.09-7.8v-75.37h-41.71
        c0,0-0.03,37.13,0,69.05c0.01,7.33,0.02,14.4,0.04,20.67c0.03,12.11,0.06,21.31-0.04,23.9c-0.74,18.59-5.76,30.75-15.13,40.69
        c-31.05-0.02-51.16-21.46-52.28-55.58c-0.26-7.83-0.36-27.27-0.36-49.79v-48.98l-41.68,0.04v66.22c0,1.86,0,3.7,0,5.51
        c-0.01,17.68-0.02,32.94,1.22,43.76c3.84,33.33,23.95,55.58,54.28,55.58c15.57,0,28.82-6.16,38.81-16.71
        c0.7,0.03,1.41,0.04,2.12,0.04c20.32,0,39.38-11.79,48.68-30.09C411.81,288.82,413.32,280.22,413.78,271.47L413.78,271.47z"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

/* Props:
   - bgFill / glyphFill: direct hex/string overrides for background and glyph
   - fillVarBg / fillVarGlyph: CSS variable names (without --) to resolve var(--name)
   - clickable: boolean (default true) controls cursor and indicates whether icon should appear interactive
   - width/height/class/ariaLabel accepted
   Resolution order per color:
     1) prop (bgFill / glyphFill)
     2) prop fillVar -> var(--name)
     3) attrs['fill-var-bg' | 'fill-var-glyph'] -> var(--name)
     4) attrs.fill (generic)
     5) default literal color (keeps original artwork colors)
*/

const props = defineProps<{
  class?: string
  width?: number | string
  height?: number | string
  bgFill?: string
  glyphFill?: string
  fillVarBg?: string
  fillVarGlyph?: string
  ariaLabel?: string
  clickable?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', ev: MouseEvent | KeyboardEvent): void
  (e: 'activate'): void
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

const readAttr = (key: string) => {
  const a = attrs as Record<string, unknown>
  return (a[key] as string) ?? undefined
}

const resolveColor = (propFill?: string, propFillVar?: string, attrFillVarKey?: string, attrFillKey?: string, fallback?: string) => {
  if (propFill) return propFill
  const pfv = normalizedFillVar(propFillVar)
  if (pfv) return `var(${pfv})`
  const afvRaw = readAttr(attrFillVarKey)
  const afv = normalizedFillVar(afvRaw)
  if (afv) return `var(${afv})`
  const aFill = readAttr(attrFillKey)
  if (aFill) return aFill
  return fallback
}

/* Default original artwork colors */
const DEFAULT_BG = '#7E0ACA'
const DEFAULT_GLYPH = '#FFFFFF'

const bgFill = computed(() => resolveColor(props.bgFill, props.fillVarBg, 'fill-var-bg', 'fill', DEFAULT_BG))

const glyphFill = computed(() => resolveColor(props.glyphFill, props.fillVarGlyph, 'fill-var-glyph', 'fill', DEFAULT_GLYPH))

const rest = computed(() => {
  const {
    class: _c,
    width: _w,
    height: _h,
    bgFill: _fb,
    glyphFill: _fg,
    fillVarBg: _fvb,
    fillVarGlyph: _fvg,
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

  emit('activate')
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
