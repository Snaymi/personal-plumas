<script lang="ts" setup>
import { ref, onMounted } from "vue";
import SubHeader from "../organism/SubHeader.vue";
import { OrganismGridView, OrganismTopCard } from "../organism";

import EditIcon from "../atoms/icons/EditIcon.vue";
import TrashIcon from "../atoms/icons/TrashIcon.vue";




import { AtomInput, AtomSubtitle, AtomTextArea, AtomEyeIcon, AtomDownloadIcon } from "../atoms";
import { MoleculeDatePicker, MoleculeWizardLibraryContent, MoleculeModal } from "../molecule";
import AtomButton from "../atoms/AtomButton.vue";

/* ========================== MOBILE CHECK ============================ */

const isMobile = ref(false);

onMounted(() => {
  const check = () =>
  (isMobile.value =
    (window.innerWidth || document.documentElement.clientWidth) <= 640);

  check();
  window.addEventListener("resize", check);
});

/* ========================== DATA ============================ */

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

const selectedCompany = ref("");
const selectedCompetence = ref("");

const showLucroFlag = ref(true);
const subtitleText = ref("Importações");

const gridData = ref([
  { id: "001", nome: "Importação de teste", datainclusao: "Ativo" },
  { id: "002", nome: "Importação 2", datainclusao: "Inativo" },
]);

const gridColumns = [
  { key: "id", label: "ID" },
  { key: "nome", label: "Nome" },
  { key: "datainclusao", label: "Data de Inclusão" },
];

const minhasAcoesDaTela = [
  { name: "edit", label: "Editar", icon: EditIcon, class: "text-blue-900" },
  { name: "delete", label: "Deletar", icon: TrashIcon },
  { name: "view", label: "Visualizar", icon: AtomEyeIcon },
];

/* ========================== MODAIS (v-model) ========================== */

const showImportOfx = ref(false);
const showReleaseModal = ref(false);
const showCashExpenses = ref(false);
const showFolha = ref(false);

const text = ref<string>("");

const fileInput = ref<HTMLInputElement | null>(null);

/* FILE */
function triggerFileSelect() {
  fileInput.value?.click();
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) console.log("Arquivo selecionado:", file.name);
}

/* OPEN / CLOSE */
function openImportOfx() {
  showImportOfx.value = true;
}

function closeImportOfx() {
  showImportOfx.value = false;
}

function openModal(event: string) {
  switch (event) {
    case "open-import-ofx":
      showImportOfx.value = true;
      break;

    case "open-import-provisao":
      showReleaseModal.value = true;
      break;

    case "open-cash-expenses":
      showCashExpenses.value = true;
      break;

    case "import-folha":
      showFolha.value = true;
      break;
  }
}
</script>

<template>
  <div class="w-full min-h-[calc(100vh-80px)] flex flex-col items-center px-6 py-10">
    <div class="w-full">

      <SubHeader :companies="companies" :competencies="competencies" v-model:model-value-company="selectedCompany"
        v-model:model-value-competence="selectedCompetence" :show-lucro="showLucroFlag"
        :subtitle-title="subtitleText" />

      <OrganismTopCard @open-import-ofx="openImportOfx" @open-modal="openModal($event)" />

      <!-- =============================== -->
      <!--  IMPORT OFX - WIZARD            -->
      <!-- =============================== -->
      <MoleculeModal v-model="showImportOfx" :isMobile="isMobile" height="xl" size="xl" :showFooter="false">
        <template #header>
          <AtomSubtitle title="Importar OFX" />
        </template>

        <MoleculeWizardLibraryContent @close="showImportOfx = false" />
      </MoleculeModal>






      <!-- =============================== -->
      <!--  PREVISÃO DE DESPESAS           -->
      <!-- =============================== -->
      <MoleculeModal v-model="showReleaseModal" :isMobile="isMobile" :showFooter="true">
        <template #header>
          <AtomSubtitle title="Lançamento - Previsão de Despesas" />
        </template>

        <div class="flex flex-col gap-y-4 lg:flex-row lg:gap-x-4">
          <MoleculeDatePicker label="Data:" placeholder="Clique para selecionar" :icon="true" />
          <MoleculeDatePicker label="Lançamento contábil (Débito):" placeholder="Clique para selecionar" :icon="true" />
        </div>

        <div class="flex flex-col gap-y-4 lg:flex-row lg:gap-x-4">
          <MoleculeDatePicker label="Lançamento Contábil (Crédito)" placeholder="Clique para selecionar" :icon="true" />
          <AtomInput label="Valor:" placeholder="R$0,00" type="number" step="0.01"
            @keypress="(e) => !/[0-9.,]/.test(e.key) && e.preventDefault()" />
        </div>

        <AtomTextArea :model-value="text" label="Descrição" placeholder="Escreva a descrição aqui..."
          hint="MÁX 500 caracteres" :maxlength="500" :autosize="true" />

        <template #footer>
          <div class="flex justify-between items-center w-full">
            <input ref="fileInput" type="file" accept=".csv" class="hidden" @change="onFileChange" />

            <AtomButton
              class="flex text-xs lg:text-base items-center bg-[var(--dark-blue)]/10 hover:bg-white gap-2 cursor-pointer"
              :style="{ minWidth: '100px', color: 'var(--dark-blue)' }" @click="triggerFileSelect">
              <template #icon>
                <AtomDownloadIcon fill-var="--dark-blue" />
              </template>
              Importar CSV
            </AtomButton>

            <div class="flex gap-3">
              <AtomButton class="flex justify-center uppercase bg-white cursor-pointer p-3"
                :style="{ minWidth: '160px', color: 'var(--dark-blue)' }" @click="showReleaseModal = false">
                Cancelar
              </AtomButton>

              <AtomButton
                class="flex justify-center uppercase p-3 bg-[var(--dark-blue)] hover:bg-blue-700 text-white rounded-md"
                :style="{ minWidth: '160px' }">
                Adicionar
              </AtomButton>
            </div>
          </div>
        </template>
      </MoleculeModal>

      <!-- =============================== -->
      <!--  DESPESAS DO CAIXA              -->
      <!-- =============================== -->
      <MoleculeModal v-model="showCashExpenses" :isMobile="isMobile" :showFooter="true">
        <template #header>
          <AtomSubtitle title="Lançamento - Despesas do Caixa" />
        </template>

        <div class="flex flex-col gap-y-4 lg:flex-row lg:gap-x-4">
          <MoleculeDatePicker label="Data:" placeholder="Clique para selecionar" :icon="true" />
          <MoleculeDatePicker label="Lançamento contábil:" placeholder="Clique para selecionar" :icon="true" />
        </div>

        <div class="flex flex-col gap-y-4 lg:flex-row lg:gap-x-4">
          <AtomInput label="Valor:" placeholder="R$0,00" />
          <AtomTextArea :modelValue="text" label="Descrição" placeholder="Escreva aqui..." hint="Máx. 500 caracteres"
            :maxlength="500" :autosize="true" />
        </div>

        <template #footer>
          <div class="flex justify-end">
            <AtomButton class="flex justify-center uppercase p-3 bg-white"
              :style="{ minWidth: '160px', color: 'var(--dark-blue)' }" @click="showCashExpenses = false">
              Cancelar
            </AtomButton>

            <AtomButton class="uppercase p-3 bg-[var(--dark-blue)] hover:bg-blue-700 text-white rounded-md"
              :style="{ minWidth: '160px' }">
              Adicionar
            </AtomButton>
          </div>
        </template>
      </MoleculeModal>

      <!-- =============================== -->
      <!--  MODAL ADICIONAR FOLHA          -->
      <!-- =============================== -->
      <MoleculeModal v-model="showFolha" :isMobile="isMobile" :showFooter="true">
        <template #header>
          <AtomSubtitle title="Adicionar" />
        </template>

        <div class="flex flex-col gap-y-5">
          <div class="flex flex-col xl:flex-row gap-y-4 gap-x-4">
            <AtomInput label="label aqui" placeholder="Digite Aqui" type="text" />
            <AtomInput label="label aqui" placeholder="Digite Aqui" type="text" />
          </div>
          <div class="flex flex-col xl:flex-row gap-y-4 gap-x-4">
            <AtomInput label="label aqui" placeholder="Digite Aqui" type="text" />
            <AtomInput label="label aqui" placeholder="Digite Aqui" type="text" />
          </div>
          <div class="flex flex-col xl:flex-row gap-y-4 gap-x-4">
            <AtomInput label="label aqui" placeholder="Digite Aqui" type="text" />
            <AtomInput label="label aqui" placeholder="Digite Aqui" type="text" />
          </div>
          <div class="flex flex-col xl:flex-row gap-y-4 gap-x-4">
            <AtomInput label="label aqui" placeholder="Digite Aqui" type="text" />
            <AtomInput label="label aqui" placeholder="Digite Aqui" type="text" />
          </div>
        </div>

        <template #footer>
          <div class="justify-end flex gap-x-4">
            <AtomButton class="uppercase p-2 bg-white rounded-md"
              :style="{ minWidth: '160px', color: 'var(--dark-blue)' }" @click="showFolha = false">
              Cancelar
            </AtomButton>

            <AtomButton class="uppercase p-3 rounded-md bg-[var(--dark-blue)] text-white">
              Adicionar
            </AtomButton>
          </div>
        </template>
      </MoleculeModal>

      <OrganismGridView :data="gridData" :showHeader="false" :columns="gridColumns" :show-add-button="true"
        :actions="minhasAcoesDaTela" add-button-text="" class="pt-5" />
    </div>
  </div>
</template>
