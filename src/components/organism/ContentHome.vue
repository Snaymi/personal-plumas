<script setup lang="ts">
import { computed, ref, watch } from "vue";
// 1. Importações de 'Component' e 'PropType'
import type { Component, PropType } from "vue";
// O AtomFolderIcon só é importado para o caso de ser usado, mas não é mais o padrão
import AtomFolderIcon from "../atoms/icons/AtomFolderIcon.vue";
import ReleaseContent from "./ReleaseContent.vue";

const props = defineProps({
  company: { type: [String, Number], default: "" },
  competence: { type: [String, Number], default: "" },

  // 2. Novas props com valores padrão 'null' ou '""' (vazio)
  emptyStateIcon: {
    type: Object as PropType<Component>,
    default: null, // Padrão agora é NULO (sem ícone)
  },
  emptyStateTitle: {
    type: String,
    default: "", // Padrão agora é VAZIO (sem título)
  },
  emptyStateText: {
    type: String,
    default: "", // Padrão agora é VAZIO (sem texto)
  },
});

const pageKey = ref(0);
const loadingWorkspace = ref(false);
// Lógica para ativar o workspace (hardcoded no seu exemplo)
const isWorkspaceActive = computed(
  () => props.company === "1" && props.competence === "2025-11"
);

watch(isWorkspaceActive, async (val) => {
  if (!val) {
    loadingWorkspace.value = false;
    return;
  }
  loadingWorkspace.value = true;
  await new Promise((r) => setTimeout(r, 120));
  pageKey.value++;
  loadingWorkspace.value = false;
});
</script>

<template>
  <div class="w-full mt-7">
    <section
      class="w-full bg-white rounded-xl border border-gray-200 border-2 border-dashed p-12 min-h-[420px] flex items-start justify-center"
    >
      <div
        v-if="!isWorkspaceActive"
        class="min-w-0 text-center flex flex-col items-center gap-4"
      >
        <component
          v-if="props.emptyStateIcon"
          :is="props.emptyStateIcon"
          class="text-gray-300"
        />

        <h2
          v-if="props.emptyStateTitle"
          class="text-xl md:text-2xl font-semibold text-gray-900 mb-2"
        >
          {{ props.emptyStateTitle }}
        </h2>

        <p v-if="props.emptyStateText" class="text-sm text-gray-500 max-w-xl">
          {{ props.emptyStateText }}
        </p>
      </div>

      <div v-else :key="pageKey" id="workspace" class="w-full h-full">
        <div
          class="w-full h-full bg-white rounded-md border border-dashed border-gray-200 p-6"
        >
          <div v-if="loadingWorkspace" class="text-center text-gray-500">
            Preparando workspace...
          </div>

          <div v-else class="w-full h-full">
            <ReleaseContent />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ajustes finos */
</style>
