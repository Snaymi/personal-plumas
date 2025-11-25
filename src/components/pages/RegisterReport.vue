<script lang="ts" setup>
import { ref, onMounted } from "vue";

// ORGANISM
import SubHeader from "../organism/SubHeader.vue";
import ContentHome from "@/components/organism/ContentHome.vue";

// ATOMS
import { AtomButton, AtomInput, AtomSubtitle } from "../atoms";
import AtomFilterIcon from "../atoms/icons/AtomFilterIcon.vue";
import AtomFilterSearchIcon from "../atoms/icons/AtomFilterSearchIcon.vue";

// MOLECULES
import MoleculeModal from "../molecule/MoleculeModal.vue";
import MoleculeModalBottomSheetMobile from "../molecule/MoleculeModalBottomSheetMobile.vue";
import MoleculeDatePicker from "../molecule/MoleculeDatePicker.vue";

// ============================
// STATE
// ============================
const isModalOpen = ref(false);
const isMobile = ref(false);

// Detecta mobile (FUNCIONA NO CELULAR E NO DEVTOOLS)
onMounted(() => {
  const check = () => {
    const width = window.innerWidth || document.documentElement.clientWidth;
    isMobile.value = width <= 640;
  };

  check();
  window.addEventListener("resize", check);
});

// Abrir / Fechar modal
function openModal() {
  isModalOpen.value = true;
}
function closeModal() {
  isModalOpen.value = false;
}

// Datas
const dataInicio = ref<Date | null>(null);
const dataFim = ref<Date | null>(null);

// SubHeader config
const companies = ref([
  { id: "1", label: "Plumas" },
  { id: "2", label: "Empresa 2" },
  { id: "3", label: "Empresa 3" },
]);

const competencies = ref([
  { id: "2025-09", label: "Outubro/2025" },
  { id: "2025-10", label: "Novembro/2025" },
  { id: "2025-11", label: "Dezembro/2025" },
]);

const selectedCompany = ref(null);
const selectedCompetence = ref(null);
const showLucroFlag = ref(true);
const subtitleText = ref("Cadastro - Relatório");
</script>

<template>
  <div class="w-full min-h-[calc(100vh-80px)] flex flex-col items-center px-6 py-10">

    <div class="w-full">

      <!-- =========================== -->
      <!--           SUBHEADER         -->
      <!-- =========================== -->
      <SubHeader :companies="companies" :competencies="competencies" v-model:model-value-company="selectedCompany"
        v-model:model-value-competence="selectedCompetence" :show-lucro="showLucroFlag" :subtitle-title="subtitleText"
        :show-add-button="true" :add-icon="AtomFilterIcon" @add="openModal" />

      <!-- BOTÃO DESKTOP -->
      <div class="w-full flex justify-end mt-16">
        <AtomButton class="!hidden sm:!inline-flex px-7 cursor-pointer" size="md" :disableFocus="true"
          @click="openModal">
          <template #icon>
            <AtomFilterIcon class="w-5 h-5 text-white" />
          </template>
          <span class="font-semibold font-sans">Filtrar</span>
        </AtomButton>
      </div>

      <!-- EMPTY STATE -->
      <ContentHome :emptyStateIcon="AtomFilterSearchIcon" emptyStateTitle="Informe os filtros"
        emptyStateText="Antes de gerar o relatório, selecione os filtros acima." />

      <!-- ====================== -->
      <!--     MODAL DESKTOP      -->
      <!-- ====================== -->
      <MoleculeModal v-if="!isMobile" :is-open="isModalOpen" :showFooter="true" @close="closeModal" height="auto">
        <template #header>
          <div class="flex justify-between items-center w-full">
            <h2 class="text-xl font-semibold text-gray-800">Filtros</h2>

            <button @click="closeModal"
              class="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </template>

        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-500 mb-2">Tipo de relatório:</label>
            <select class="w-full cursor-pointer p-3 text-gray-500 border border-gray-300 rounded-md">
              <option>Clique para selecionar</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-2">Data início:</label>
              <MoleculeDatePicker v-model="dataInicio" placeholder="Clique para selecionar" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 mb-2">Data fim:</label>
              <MoleculeDatePicker v-model="dataFim" placeholder="Clique para selecionar" />
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-4">
            <AtomButton class="px-10 bg-[#fafafa] hover:bg-[#DEDEDE]" @click="closeModal">
              <span class="text-[var(--dark-blue)] font-semibold">Cancelar</span>
            </AtomButton>

            <AtomButton class="px-7" @click="closeModal">Gerar relatório</AtomButton>
          </div>
        </template>
      </MoleculeModal>

      <!-- ====================== -->
      <!--  BOTTOM SHEET MOBILE   -->
      <!-- ====================== -->
      <MoleculeModalBottomSheetMobile v-if="isMobile" v-model="isModalOpen">
        <template #header>
          <AtomSubtitle title="Filtros" />
        </template>

        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-500 mb-2">Tipo de relatório:</label>
            <select class="w-full cursor-pointer p-3 border border-gray-300 rounded-md text-gray-500">
              <option>Clique para selecionar</option>
            </select>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-2">Data início:</label>
              <MoleculeDatePicker v-model="dataInicio" placeholder="Clique para selecionar" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 mb-2">Data fim:</label>
              <MoleculeDatePicker v-model="dataFim" placeholder="Clique para selecionar" />
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-4">
            <AtomButton class="bg-white p-2 rounded-md" @click="closeModal">Cancelar</AtomButton>
            <AtomButton class="p-3 rounded-md" @click="closeModal">Gerar relatório</AtomButton>
          </div>
        </template>
      </MoleculeModalBottomSheetMobile>

    </div>
  </div>
</template>
