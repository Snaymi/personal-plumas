<template>
  <!-- label do componente permanece, mas o span visual só aparece em group-hover do ancestral -->
  <label
    :for="id"
    :class="[
      'inline-flex items-center gap-2 cursor-pointer',
      wrapperClass
    ]"
    @mousedown.stop
  >
    <!-- input real invisível -->
    <input
      ref="inputRef"
      :id="id"
      type="checkbox"
      class="sr-only peer"
      :checked="modelValue"
      @change="onChange"
      @click.stop
      aria-checked="modelValue ? 'true' : 'false'"
    />

    <!-- visual: por padrão oculto; aparece se algum ancestor tiver class 'group' e estiver hover -->
    <span
      :class="[
        'relative flex items-center justify-center',
        'w-4 h-4 rounded-full border-4 border-blue-900 bg-transparent',
        'peer-focus:ring-2 peer-focus:ring-blue-900/20 peer-checked:bg-blue-900 peer-checked:border-blue-900',
        // visibilidade controlada por group-hover do ancestor; por padrão fica hidden
        'hidden group-hover:flex',
        inputClass
      ]"
      aria-hidden="true"
    />

    <!-- label textual (opcional) -->
    <span v-if="label" class="text-sm text-gray-700 select-none">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { nanoid } from 'nanoid'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  id: { type: String, default: undefined },
  label: { type: String, default: '' },
  wrapperClass: { type: String, default: '' },
  inputClass: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])

const inputRef = ref<HTMLInputElement | null>(null)
const id = props.id ?? `atom-checkbox-${nanoid(6)}`

function onChange(e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  emit('update:modelValue', checked)
}

defineExpose({ inputRef })
</script>

<style scoped>
/* tudo por Tailwind; sem estilos extras */
</style>
