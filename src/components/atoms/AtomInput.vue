<template>
  <label :class="['block', wrapperClass]">
    <span v-if="label" class="text-sm font-medium text-gray-700 mb-2 block">{{
      label
    }}</span>

    <div class="relative">
      <!-- slot para ícone à esquerda -->
      <div
        v-if="$slots.icon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <slot name="icon" />
      </div>

      <!-- slot para conteúdo à direita (ex.: botão mostrar senha) -->
      <div
        v-if="$slots.right"
        class="absolute inset-y-0 right-0 pr-2 flex items-center"
      >
        <slot name="right" />
      </div>

      <!-- slot principal para conteúdo customizado -->
      <slot v-if="$slots.default" :computedClass="computedClass" />

      <!-- input principal (só renderiza se não tiver slot default) -->
      <input
        v-else
        ref="inputRef"
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :aria-label="ariaLabel ?? label ?? placeholder"
        :class="[baseInputClass, inputClass]"
        :value="modelValue"
        @input="onInput"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />

      <!-- botão clear (similar ao exemplo) -->
      <button
        v-if="modelValue && props.showClear && !$slots.default"
        type="button"
        class="absolute inset-y-0 right-0 flex items-center px-3"
        @click="clear"
      >
        ✕
      </button>
    </div>

    <p v-if="hint" class="mt-2 text-xs text-gray-500">{{ hint }}</p>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, useSlots } from "vue";
import { nanoid } from "nanoid";

const slots = useSlots();

const props = defineProps({
  modelValue: { type: [String, Number], default: "" },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  label: { type: String, default: "" },
  hint: { type: String, default: "" },
  required: { type: Boolean, default: false },
  ariaLabel: { type: String, default: "" },
  size: { type: String as () => "md" | "sm", default: "md" },
  rounded: { type: String, default: "lg" },
  wrapperClass: { type: String, default: "" },
  inputClass: { type: String, default: "" },
  showClear: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  small: { type: Boolean, default: false },
});

// Emits
const emit = defineEmits(["update:modelValue", "focus", "blur"]);

// generate id for accessibility
const id = `atom-input-${nanoid(6)}`;

// ref para o elemento input
const inputRef = ref<HTMLInputElement | null>(null);

// Base classes
const base =
  "block border text-gray-900 focus:outline-none focus:ring-2 focus:border-indigo-400";
const border = "border-gray-200";
const focusRing = "focus:ring-indigo-400";
const roundedMap: Record<string, string> = {
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const baseInputClass = computed(() => {
  const r = roundedMap[props.rounded] ?? roundedMap.lg;
  const sizePadding =
    props.size === "sm" ? "py-2 px-3 text-sm" : "py-3 px-3 text-base";
  const psClass = props.size === "sm" ? "ps-9" : "ps-10";

  return `${base} ${border} ${focusRing} ${r} ${sizePadding} ${
    slots.icon ? psClass : ""
  } ${props.disabled ? "bg-par-gray-lightest" : "bg-surface-primary"} ${
    props.small ? "py-[11.2px] text-sm" : "py-[15.2px]"
  }`;
});

const computedClass = computed(() => baseInputClass.value);

// handler de input para emitir update:modelValue
function onInput(e: Event) {
  const v = (e.target as HTMLInputElement).value;
  emit("update:modelValue", v);
}

// método para limpar valor e garantir update do v-model/DOM
function clear() {
  if (inputRef.value) {
    inputRef.value.value = "";
  }
  emit("update:modelValue", "");
  nextTick(() => {
    const sel = window.getSelection?.();
    if (sel && sel.rangeCount) sel.removeAllRanges();
    inputRef.value?.focus();
  });
}

// expõe o método clear para o pai via ref
defineExpose({ clear });
</script>

<style scoped>
/* placeholder visual para casos onde slot icon não fornece SVG */
:deep(.atom-icon-placeholder) {
  width: 1.25rem;
  height: 1.25rem;
  background: rgba(156, 163, 175, 0.15);
  border-radius: 4px;
}

/* garante que input seja block e permita object-fit quando for imagem dentro (precaução) */
input {
  display: block;
}
</style>

<style>
/* * Remove o "X" nativo que navegadores 
 * colocam em inputs type="search" e type="password"
*/
input::-webkit-clear-button {
  display: none !important;
  -webkit-appearance: none !important;
}

/* Versão para o Internet Explorer / Edge antigo */
input::-ms-clear {
  display: none !important;
}
</style>
