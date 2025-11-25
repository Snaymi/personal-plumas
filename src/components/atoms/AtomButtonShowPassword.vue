<template>
  <button
    :type="type"
    :class="[baseClass, sizeClass, attrs.class]"
    :style="buttonStyle"
    v-bind="restAttrs"
    @click="onClick"
    :aria-pressed="pressed"
    :aria-label="computedAriaLabel"
  >
    <AtomEyeIcon
      class="inline-block"
      :width="iconSize"
      :height="iconSize"
      fill-var="--dark-blue"
      aria-hidden="true"
      focusable="false"
    />
    <span class="sr-only" v-if="!showLabelVisually">{{ computedAriaLabel }}</span>
    <span v-else class="ml-2 select-none">
      <slot>{{ pressed ? hideText : showText }}</slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import AtomEyeIcon from './icons/AtomEyeIcon.vue'

const props = defineProps<{
  pressed?: boolean
  type?: 'button' | 'submit' | 'reset'
  color?: string            // inline background color when provided
  size?: 'sm' | 'md' | 'lg'
  showText?: string
  hideText?: string
  showLabelVisually?: boolean
  iconFill?: string         // fallback for icon fill (e.g. 'currentColor' or hex)
}>()

const emit = defineEmits<{
  (e: 'update:pressed', val: boolean): void
  (e: 'click', ev: MouseEvent): void
}>()

const attrs = useAttrs()

const pressed = computed(() => !!props.pressed)
const type = computed(() => props.type ?? 'button')

// base classes; parent classes (attrs.class) are appended last so they can override sizing/layout
const baseClass = 'inline-flex items-center justify-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2'
const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'px-2 py-1 text-sm'
    case 'lg': return 'px-3 py-2 text-base'
    default: return 'px-2.5 py-1.5 text-sm'
  }
})

// inline style for background when color prop is provided
const buttonStyle = computed(() => {
  if (props.color) {
    return { backgroundColor: props.color, color: 'white' } as Record<string,string>
  }
  return undefined
})

// icon sizing mapping
const iconSize = computed(() => {
  switch (props.size) {
    case 'sm': return 14
    case 'lg': return 20
    default: return 16
  }
})

// icon fill resolution (prefers prop.iconFill, then inherit currentColor)
const iconFill = computed(() => props.iconFill ?? 'currentColor')

// text / aria label
const showText = props.showText ?? 'Mostrar'
const hideText = props.hideText ?? 'Ocultar'
const showLabelVisually = props.showLabelVisually ?? false
const computedAriaLabel = computed(() => (pressed.value ? hideText : showText))

// restAttrs: repassa todos os atributos exceto class/style (já tratadas)
const restAttrs = computed(() => {
  const { class: _c, style: _s, ...others } = attrs as Record<string, unknown>
  return others
})

function onClick(ev: MouseEvent) {
  const next = !pressed.value
  emit('update:pressed', next)
  emit('click', ev)
}
</script>

<style scoped>
/* foco sutil */
button:focus {
  box-shadow: 0 0 0 4px rgba(2,44,92,0.12);
  outline: none;
}
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
</style>
