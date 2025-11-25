<template>
    <svg :width="width" :height="height" viewBox="0 0 191.8 190.9" :class="computedClass"
        xmlns="http://www.w3.org/2000/svg" role="img" :aria-label="ariaLabel" tabindex="0" v-bind="rest"
        @click="onActivate" @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
        <!-- background (primary / default yellow) -->
        <path clip-rule="evenodd" d="M1 1h189.8v188.9H1z" :fill="bgFill" fill-rule="evenodd" />

        <!-- glyph group (primary / default blue) -->
        <g :fill="glyphFill">
            <path d="M191.8 190.9H0V0h191.8zM2 188.9h187.8V2H2z" />
            <path clip-rule="evenodd"
                d="M81.2 130.5l-15.5-10.4 73.7-49.7-45.5-30.6-21.4 14.4 16.6 11-38.3 25.6-32.1-21.2L96 18.1l76.7 51.3zM110.3 60l15.5 10.4-73.7 49.7 45.6 30.6 21.4-14.4-16.6-10.9 38.4-25.6L173 121l-77.5 51.4L19 121.3zm-60.1 92l-15.8-10.8-16 10.8.2 20.8zM142 39.3l15.9 10.8 15.5-10.3V18.5z"
                fill-rule="evenodd" />
        </g>
    </svg>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

/* Props accepted:
   - fillBg / fillGlyph: direct color overrides for background and glyph
   - fillVarBg / fillVarGlyph: CSS variable names (without --) to resolve var(--name)
   - clickable: boolean (default true) controls cursor appearance and indicates interactive
   - width/height/class/ariaLabel accepted
   Resolution order for colors:
     1) prop fill (fillBg / fillGlyph)
     2) prop fillVar -> var(--name)
     3) attrs['fill-var-*'] -> var(--name)
     4) attrs.fill (generic)
     5) default literal color
*/
const props = defineProps<{
    class?: string
    width?: number | string
    height?: number | string
    fillBg?: string
    fillGlyph?: string
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

const resolveColor = (
    propFill?: string,
    propFillVar?: string,
    attrFillVarKey?: string,
    attrFillKey?: string,
    fallback?: string
) => {
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

/* Default artwork colors (kept as default)
   - bg default: #ffef38
   - glyph default: #003da4
*/
const bgFill = computed(() => resolveColor(props.fillBg, props.fillVarBg, 'fill-var-bg', 'fill', '#ffef38'))

const glyphFill = computed(() => resolveColor(props.fillGlyph, props.fillVarGlyph, 'fill-var-glyph', 'fill', '#003da4'))

const rest = computed(() => {
    const {
        class: _c,
        width: _w,
        height: _h,
        fillBg: _fb,
        fillGlyph: _fg,
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

    // still emit component-level events
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
