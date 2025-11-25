<template>
  <label :class="['block', 'w-full']">
    <span v-if="label" class="text-sm font-medium text-gray-700 mb-2 block">{{ label }}</span>

    <div class="relative ">
      <textarea ref="taRef" :id="id" :class="[baseClass, textareaClass, { 'opacity-50 cursor-not-allowed': disabled }]"
        :placeholder="placeholder" :rows="rows" :maxlength="maxlength" :disabled="disabled"
        :aria-label="ariaLabel ?? label ?? placeholder" :aria-describedby="describedBy" :aria-invalid="Boolean(error)"
        :value="model" @input="onInput" @focus="$emit('focus', $event)" @blur="$emit('blur', $event)"
        @keydown="$emit('keydown', $event)"></textarea>

      <!-- clear button (decorative/action) -->
      <button v-if="showClear && model && !disabled" type="button"
        class="absolute right-2 top-2 text-sm text-gray-500 hover:text-gray-700" @click="clear"
        aria-label="Limpar texto">
        ✕
      </button>
    </div>

    <div class="mt-2 flex items-center justify-between gap-4">
      <p v-if="error" class="text-xs text-red-600">{{ error }}</p>
      <p v-else-if="hint" class="text-xs text-gray-500">{{ hint }}</p>

      <div v-if="showCount && maxlength" class="text-xs text-gray-400 ml-auto">
        {{ currentLength }} / {{ maxlength }}
      </div>
    </div>
  </label>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { nanoid } from 'nanoid'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  ariaLabel: { type: String, default: '' },
  rows: { type: Number, default: 4 },
  maxlength: { type: Number, default: undefined },
  showCount: { type: Boolean, default: true },
  showClear: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  wrapperClass: { type: String, default: '' },
  textareaClass: { type: String, default: '' },
  resize: { type: String as () => 'none' | 'vertical' | 'both' | 'horizontal', default: 'vertical' },
  autosize: { type: Boolean, default: false } // quando true ajusta altura conforme conteúdo
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'keydown'])

const id = `atom-textarea-${nanoid(6)}`
const describedBy = computed(() => {
  const ids: string[] = []
  if (props.hint) ids.push(`${id}-hint`)
  if (props.error) ids.push(`${id}-error`)
  return ids.join(' ') || undefined
})

const taRef = ref<HTMLTextAreaElement | null>(null)
// usa state interno `model` como fonte de verdade local
const model = ref(props.modelValue ?? '')

watch(() => props.modelValue, (v) => {
  // atualiza model quando prop muda
  model.value = v ?? ''
  if (props.autosize) nextTick(resizeToContent)
})

watch(model, (v) => {
  // emite atualização para o pai
  emit('update:modelValue', v)
})

const currentLength = computed(() => (model.value ? model.value.length : 0))

const baseClass = computed(() => {
  const border = props.error ? 'border-red-300 focus:ring-red-300 focus:border-red-500' : 'border-gray-200 focus:ring-indigo-400 focus:border-indigo-400'
  const resizeClass = props.resize === 'none' ? 'resize-none' : props.resize === 'vertical' ? 'resize-y' : props.resize === 'horizontal' ? 'resize-x' : 'resize'
  return [
    'block w-full px-3 py-2 text-sm text-gray-900 bg-white rounded-md shadow-sm',
    border,
    'focus:outline-none',
    resizeClass
  ].join(' ')
})

function onInput(e: Event) {
  const v = (e.target as HTMLTextAreaElement).value
  if (props.maxlength) {
    model.value = v.slice(0, props.maxlength)
  } else {
    model.value = v
  }
  if (props.autosize) resizeToContent()
}

function clear() {
  model.value = ''
  nextTick(() => {
    taRef.value?.focus()
    if (props.autosize) resizeToContent()
  })
}

function resizeToContent() {
  const el = taRef.value
  if (!el) return
  el.style.height = 'auto'
  const scroll = el.scrollHeight
  const max = Math.max(window.innerHeight * 0.6, 200)
  el.style.height = `${Math.min(scroll, max)}px`
}

// inicializa autosize se necessário
if (props.autosize) {
  nextTick(resizeToContent)
}
</script>

<style scoped>
/* pequenos ajustes visuais */
textarea {
  min-height: 6rem;
  line-height: 1.25;
}

/* ícone/clear button alinhamento */
button[aria-label="Limpar texto"] {
  background: transparent;
  border: none;
}

/* quando disabled */
textarea:disabled {
  background-color: #f3f4f6;
  /* tailwind gray-100 equivalent */
}
</style>
