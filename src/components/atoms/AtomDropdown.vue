<template>
  <div :id="id" :class="rootClass" ref="rootRef">
    <button
      ref="buttonRef"
      type="button"
      :class="buttonClass"
      :aria-expanded="open ? 'true' : 'false'"
      :aria-controls="panelId"
      @click="onButtonClick"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
      @keydown.esc="close"
    >
      <div :class="contentLeftClass">
        <span v-if="showPin || $slots.icon" :class="iconWrapperClass">
          <slot name="icon">
            <svg
              v-if="showPin"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 1.5L12 3L9 6L10.5 14L8 15L6 10L2 9L4 1.5Z"
                fill="#1E88E5"
              />
            </svg>
          </slot>
        </span>

        <span :class="labelClass">{{ label }}</span>
      </div>

      <div :class="controlsClass">
        <svg
          v-if="showCheck"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          :class="checkClass"
        >
          <circle cx="8" cy="8" r="8" fill="#16A34A" />
          <path
            d="M4.5 8.2L6.6 10.3L11.5 5.4"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          :class="caretClass"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="#6B7280"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </button>

    <!-- dropdown painel absolutamente posicionado -->
    <transition name="v">
      <div
        v-show="open"
        :id="panelId"
        :class="panelClass"
        role="menu"
        ref="panelRef"
        tabindex="-1"
        @keydown.esc.prevent="close"
        @mousedown.stop
      >
        <slot name="panel">
          <div class="text-sm text-gray-600">Nenhuma opção</div>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch,
  nextTick,
  useAttrs,
} from "vue";
import { nanoid } from "nanoid";

const props = defineProps({
  label: { type: String, default: "" },
  showPin: { type: Boolean, default: false },
  showCheck: { type: Boolean, default: false },
  modelValue: { type: Boolean, default: undefined },
  wrapperClass: { type: String, default: "" },
  buttonClassProp: { type: String, default: "" },
  labelClassProp: { type: String, default: "" },
});

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "toggle", open: boolean): void;
}>();

const id = `atom-dropdown-${nanoid(6)}`;
const panelId = `${id}-panel`;
const attrs = useAttrs();
const attrsClass = computed(() => (attrs.class as string) ?? "");

const rootRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);

const localOpen = ref(Boolean(props.modelValue ?? false));
const open = computed({
  get() {
    return props.modelValue === undefined
      ? localOpen.value
      : Boolean(props.modelValue);
  },
  set(v: boolean) {
    localOpen.value = v;
    emit("update:modelValue", v);
    emit("toggle", v);
  },
});

function toggle() {
  open.value = !open.value;
}
function close() {
  open.value = false;
}

function onDocumentPointerDown(e: MouseEvent) {
  const path = e.composedPath && e.composedPath();
  const root = rootRef.value;
  const panel = panelRef.value;
  if (!root) return;

  if (path) {
    for (const node of path) {
      if (node === root || node === panel) return;
    }
    close();
    return;
  }

  if (
    !root.contains(e.target as Node) &&
    !(panel && panel.contains(e.target as Node))
  )
    close();
}

onMounted(() => window.addEventListener("mousedown", onDocumentPointerDown));
onUnmounted(() =>
  window.removeEventListener("mousedown", onDocumentPointerDown)
);

watch(open, (v) => {
  if (v) nextTick(() => panelRef.value?.focus?.());
});

/* --- classes --- */
const rootBase = "relative w-full inline-block";
const buttonBase =
  "w-full text-left flex items-center justify-between gap-3 px-3 py-2 bg-blue-100 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400";
const contentLeftBase = "flex items-center gap-3 truncate";
const iconWrapperBase = "flex-shrink-0";
const labelBase = "truncate text-sm text-blue-900 font-normal select-none";
const controlsBase = "flex items-center gap-2";
const checkBase = "flex-shrink-0";
const caretBase = "transition-transform duration-150";
/*
  panelBase: mantive absolute + z-index.
  O controle de overflow foi movido para CSS para permitir crescer sem scroll.
*/
const panelBase =
  "absolute right-0 mt-5 rounded-md shadow-md bg-white z-50 min-w-[300px]";

const rootClass = computed(() =>
  [rootBase, props.wrapperClass, attrsClass.value].filter(Boolean).join(" ")
);
const buttonClass = computed(() =>
  [buttonBase, props.buttonClassProp].filter(Boolean).join(" ")
);
const contentLeftClass = computed(() => [contentLeftBase].join(" "));
const iconWrapperClass = computed(() => [iconWrapperBase].join(" "));
const labelClass = computed(() =>
  [labelBase, props.labelClassProp].filter(Boolean).join(" ")
);
const controlsClass = computed(() => [controlsBase].join(" "));
const checkClass = computed(() => [checkBase].join(" "));
const caretClass = computed(() =>
  open.value ? `${caretBase} transform rotate-180` : caretBase
);
const panelClass = computed(() => [panelBase, "p-2"].join(" "));

function onButtonClick(e: MouseEvent) {
  e.stopPropagation();
  toggle();
}

defineExpose({ close, toggle });
</script>

<style scoped>
button:focus {
  outline: none;
}

/* REMOVIDO: max-height + overflow: auto;
   ADICIONADO: permite que o painel cresça o quanto for necessário */
[role="menu"] {
  max-height: none;
  overflow: visible;
}

/* animação */
.v-enter-active,
.v-leave-active {
  transition: all 160ms ease;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}

.v-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
