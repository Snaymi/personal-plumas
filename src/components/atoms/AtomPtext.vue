<template>
  <component
    :is="tag"
    :class="computedClass"
    role="button"
    :aria-pressed="selected ? 'true' : 'false'"
    tabindex="0"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <!-- ícone só renderiza quando prop selected for true ou quando houver slot explícito e selected -->
    <span v-if="selected && $slots.icon" class="mr-2 flex items-center">
      <slot name="icon" />
    </span>

    <span class="inline-block align-middle">
      {{ text }}
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  id: { type: [String, Number], default: undefined },
  text: { type: String, required: true },
  tag: { type: String as () => keyof HTMLElementTagNameMap, default: 'p' },
  selected: { type: Boolean, default: false },
  className: { type: String, default: '' }
})

const emit = defineEmits<{
  (e: 'select', id?: string | number): void
}>()

const base = 'font-semibold text-blue-900 cursor-pointer hover:underline text-sm flex items-center'

const computedClass = computed(() => {
  // adiciona uma classe visual quando selecionado (pode ser personalizada pelo pai)
  const selClass = props.selected ? 'opacity-100' : 'opacity-90'
  return [base, selClass, props.className].filter(Boolean).join(' ')
})

function handleClick(ev: MouseEvent | KeyboardEvent) {
  if ((ev as Event).preventDefault) (ev as Event).preventDefault()
  if ((ev as Event).stopPropagation) (ev as Event).stopPropagation()
  emit('select', props.id)
}
</script>

<style scoped>
:focus {
  outline: none;
}
</style>
