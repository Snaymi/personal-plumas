<script lang="ts" setup>
import { ref, watch, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";

type ModalSize = "sm" | "md" | "lg" | "xl";
type ModalHeight = "auto" | "sm" | "md" | "lg" | "xl" | "full";

const props = defineProps<{
  modelValue: boolean;        // controle do pai
  isMobile?: boolean;         // se TRUE = bottom-sheet, se FALSE = modal desktop
  size?: ModalSize;           // DESKTOP
  height?: ModalHeight;       // DESKTOP
  scrollable?: boolean;       // DESKTOP
  fullscreenView?: boolean;   // DESKTOP
  showFooter?: boolean;       // DESKTOP
}>();

const emit = defineEmits(["update:modelValue", "close"]);
const showFooter = computed(() => props.showFooter !== false);

/* ----------------------------------------------------------
   MOBILE — BOTTOM SHEET (mantido 100% intacto)
---------------------------------------------------------- */
const sheet = ref<any>(null);

watch(
  () => props.modelValue,
  async (value) => {
    if (!props.isMobile) return; // só controla no mobile
    await nextTick();
    if (value) sheet.value?.open();
    else sheet.value?.close();
  }
);

function handleClosed() {
  emit("update:modelValue", false);
  emit("close");
}

/* ----------------------------------------------------------
   DESKTOP — MODAL CLÁSSICO
---------------------------------------------------------- */
function closeDesktop() {
  emit("update:modelValue", false);
  emit("close");
}

/* ESC fecha no desktop */
function handleKeydown(e: KeyboardEvent) {
  if (!props.isMobile && e.key === "Escape") closeDesktop();
}

onMounted(() => document.addEventListener("keydown", handleKeydown));
onBeforeUnmount(() => document.removeEventListener("keydown", handleKeydown));

/* tamanho desktop */
const modalSizeClass = computed(() => {
  switch (props.size) {
    case "sm": return "w-[30vw] max-w-sm";
    case "md": return "w-[50vw] max-w-md";
    case "lg": return "w-[70vw] max-w-lg";
    case "xl": return "w-[90vw] max-w-7xl";
    default: return "w-[60vw] max-w-3xl";
  }
});

const modalHeightClass = computed(() => {
  switch (props.height) {
    case "sm": return "h-[40vh] max-h-[40vh]";
    case "md": return "h-[60vh] max-h-[60vh]";
    case "lg": return "h-[80vh] max-h-[80vh]";
    case "xl": return "h-[90vh] max-h-[90vh]";
    case "full": return "h-full max-h-none";
    case "auto": return "h-auto max-h-[90vh] overflow-y-auto";
    default: return "h-[80vh] max-h-[80vh]";
  }
});
</script>

<template>
  <!-- ------------------------------------------------------ -->
  <!-- DESKTOP — modal tradicional                            -->
  <!-- ------------------------------------------------------ -->
  <div v-if="!props.isMobile && props.modelValue" :class="[
    'fixed inset-0 bg-black/60 flex justify-center z-50',
    props.fullscreenView
      ? 'items-stretch h-screen py-0'
      : 'items-center py-20 h-full'
  ]" @click.self="closeDesktop">
    <div :class="[
      'relative bg-white rounded-lg shadow-lg p-6 flex flex-col',
      modalSizeClass,
      modalHeightClass,
      { 'h-[80vh] max-h-[80vh]': props.scrollable }
    ]" role="dialog" aria-modal="true">
      <!-- BOTÃO FECHAR -->
      <button @click="closeDesktop" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl">
        ✕
      </button>

      <!-- HEADER -->
      <div v-if="$slots.header" class="mb-6 pb-3 border-b border-gray-200">
        <slot name="header" />
      </div>

      <!-- CONTENT -->
      <div :class="{ 'overflow-y-auto pr-4 -mr-4': props.scrollable }">
        <slot />
      </div>

      <!-- FOOTER -->
      <div v-if="showFooter && $slots.footer" class="mt-8 pt-4 border-t border-gray-200">
        <slot name="footer" />
      </div>
    </div>
  </div>

  <!-- ------------------------------------------------------ -->
  <!-- MOBILE — bottom sheet original                         -->
  <!-- ------------------------------------------------------ -->
  <vue-bottom-sheet v-if="props.isMobile" ref="sheet" @closed="handleClosed">
    <div class="bg-white w-full overflow-y-visible px-6 py-5">
      <div v-if="$slots.header" class="px-6 py-4 border-b border-gray-200">
        <slot name="header" />
      </div>

      <div class="mt-4">
        <slot />
      </div>

      <div v-if="showFooter && $slots.footer" class="mt-6">
        <slot name="footer" />
      </div>
    </div>
  </vue-bottom-sheet>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.bottom-sheet__content {
  background: #fff !important;
  overflow-y: visible !important;
}

.bottom-sheet__card {
  max-height: 90vh !important;
  height: auto !important;
}
</style>
