<script lang="ts" setup>
import { ref } from "vue";
import SubHeader from "../organism/SubHeader.vue";
import { OrganismGridView } from "../organism";
import MoleculeDataPicker from "../molecule/MoleculeDatePicker.vue";
import MoleculeModal from "../molecule/MoleculeModal.vue";

import PlusIcon from "../atoms/icons/AtomPlusIcon.vue";
import EditIcon from "../atoms/icons/EditIcon.vue";
import ExportIcon from "../atoms/icons/AtomExportIcon.vue";
import PenIcon from "../atoms/icons/AtomPenIcon.vue";
import UploadIcon from "../atoms/icons/AtomUploadIcon.vue";
import AtomEyeIcon from "../atoms/icons/AtomEyeIcon.vue";
import AtomSpinner from "../atoms/AtomSpinner.vue";
import { AtomSubHeaderDropdown } from "../atoms";

/* ============================= */
/*        DADOS DA TELA          */
/* ============================= */

const companies = ref([
  { id: "1", label: "Plumas" },
  { id: "2", label: "Empresa 2" },
  { id: "3", label: "Empresa 3" },
]);

const statusOptions = ref([{ label: "Pendente", id: "pendente" }]);

const selectedStatus = ref("");
const selectedCompany = ref("");
const selectedCompetence = ref("");

const competencies = ref([
  { id: "2025-09", label: "Outubro/2025" },
  { id: "2025-10", label: "Novembro/2025" },
  { id: "2025-11", label: "Dezembro/2025" },
]);

const subtitleText = ref("Assinaturas");
const showLucroFlag = ref(true);

/* GRID EXEMPLO */
const gridData = ref([
  {
    codigo: "001",
    id: "001",
    nome: "Paulo",
    usuario: "Importação de teste",
    email: "Ativo",
    nomedodocumento: "Contrato comercial",
    periodo: "Set/2025",
    emissao: "10/09/2025",
    vencimento: "10/10/2025",
    assinatura: "Pendente",
    status: "PENDENTE",
  },
]);

const gridColumns = [
  { key: "nomedodocumento", label: "Nome do documento" },
  { key: "periodo", label: "Período" },
  { key: "emissao", label: "Emissão" },
  { key: "vencimento", label: "Vencimento" },
  { key: "assinatura", label: "Assinatura" },
  { key: "status", label: "Status" },
];

const minhasAcoesDaTela = [
  { name: "assinar", label: "assinar", icon: PenIcon },
  { name: "eye", label: "eye", icon: AtomEyeIcon },
  { name: "upload", label: "upload", icon: UploadIcon },
];

/* =============================== */
/*        ESTADO DO MODAL          */
/* =============================== */

const modalOpen = ref(false);

/* Callback robusto — aceita string OU objeto */
function handleAction(payload: any) {
 
  if (!payload) return; // impede o erro inicial

  const action = payload.action;

  if (action === "assinar") {
    openClicksignModal();
  }
}


/* Mostra modal estilo Clicksign */
function openClicksignModal() {
  modalOpen.value = true;

  setTimeout(() => {
    modalOpen.value = false;
  }, 2000);
}
</script>

<template>
  <div class="w-full min-h-[calc(100vh-80px)] flex flex-col items-center px-6 py-10">
    <div class="w-full">
      <SubHeader :companies="companies" :competencies="competencies" v-model:model-value-company="selectedCompany"
        v-model:model-value-competence="selectedCompetence" :show-lucro="showLucroFlag" :subtitle-title="subtitleText"
        :show-dropdown="false" />

      <OrganismGridView :data="gridData" :showHeader="true" :columns="gridColumns" :show-add-button="true"
        :actions="minhasAcoesDaTela" add-button-text="Exportar" :add-icon="ExportIcon"
        add-button-class="bg-[var(--dark-blue10)] hover:bg-[#afb9c4] text-[var(--dark-blue)] mt-15"
        add-button-text-class="text-[var(--dark-blue)]" @action="handleAction">
        <template #filters>
          <MoleculeDataPicker label="Emissão:" placeholder="Clique para selecionar" inputClass="py-2 pl-4" />
          <MoleculeDataPicker label="Vencimento:" placeholder="Clique para selecionar" inputClass="py-2 pl-4" />
          <MoleculeDataPicker label="Assinatura:" placeholder="Clique para selecionar" inputClass="py-2 pl-4" />

          <AtomSubHeaderDropdown v-model="selectedStatus" :options="statusOptions" label="Status"
            placeholder="Clique para selecionar"
            :selectClass="'text-gray-300 hover:text-gray-500 duration-300 cursor-pointer w-full bg-surface-primary pe-10 border border-gray-300 text-gray-300 rounded-[8px] transition py-2 pl-4'" />
        </template>
      </OrganismGridView>
    </div>
  </div>

  <!-- ========================== -->
  <!--     CLICK SIGN MODAL       -->
  <!-- ========================== -->
  <MoleculeModal :isOpen="modalOpen" size="sm" height="auto" :scrollable="false" :showFooter="false">
    <template #default>
      <div class="flex flex-col items-center text-center py-10">
        <AtomSpinner class="w-16 h-16 mb-6" />

        <h2 class="text-lg font-semibold text-gray-900">
          Preparando assinatura eletrônica
        </h2>

        <p class="text-gray-600 text-sm mt-2 max-w-xs leading-relaxed">
          Aguarde um instante enquanto carregamos seu documento para assinatura.
        </p>
      </div>
    </template>
  </MoleculeModal>
</template>
