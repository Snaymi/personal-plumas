<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  options: { type: Array as () => Array<{ id: string; label: string }>, default: () => [] },
  placeholder: { type: String, default: 'Selecione' },
  label: { type: String, default: '' },
  id: { type: String, default: '' },
  // permite customizar a classe do select se necessário, por padrão usa a mesma do seu layout
  selectClass: { type: String, default: 'block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#022C5C]' }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: string | number): void
}>()

const current = computed({
  get: () => props.modelValue,
  set: (v: string | number) => emit('update:modelValue', v)
})
</script>

<template>
  <div>
    <label v-if="label" class="block text-xs text-gray-600 mb-1">{{ label }}</label>
    <div class="relative">
      <select
        :id="id"
        v-model="current"
        :class="selectClass"
        :aria-label="label || placeholder"
      >
        <option value="">{{ placeholder }}</option>
        <option v-for="opt in options" :key="opt.id" :value="opt.id">{{ opt.label }}</option>
      </select>
    </div>
  </div>
</template>
