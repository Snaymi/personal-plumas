<script lang="ts" setup>
import { ref, onMounted } from "vue";
import SubHeader from "../organism/SubHeader.vue";
import { OrganismGridView } from "../organism";

import EditIcon from "../atoms/icons/EditIcon.vue";
import TrashIcon from "../atoms/icons/TrashIcon.vue";
import AtomEyeIcon from "../atoms/icons/AtomEyeIcon.vue";
import BlockIcon from "../atoms/icons/BlockIcon.vue";
import AtomPlusIcon from "../atoms/icons/AtomPlusIcon.vue";

import MoleculeModal from "../molecule/MoleculeModal.vue";
import MoleculeModalBottomSheetMobile from "../molecule/MoleculeModalBottomSheetMobile.vue";

import { AtomInput, AtomSubtitle } from "../atoms";
import AtomButton from "../atoms/AtomButton.vue";

const isAddModalOpen = ref(false);
const isMobile = ref(false);

onMounted(() => {
  const check = () => (isMobile.value = window.innerWidth <= 640);
  check();
  window.addEventListener("resize", check);
});

function funcaoParaAdicionar() {
  isAddModalOpen.value = true;
}

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
const subtitleText = ref("Cadastro - Usuários");

const gridData = ref([
  { nome: "001", usuario: "Importação de teste", email: "Ativo", perfil: "aaaaaaaaaaaaaaaaaaaaa" },
  { nome: "001", usuario: "Importação de teste", email: "Ativo", perfil: "aaaa" },
  {},
  {},
  {},
]);

const gridColumns = [
  { key: "nome", label: "Nome de Usuário" },
  { key: "usuario", label: "Usuário" },
  { key: "email", label: "E-mail" },
  { key: "perfil", label: "Perfil" },
];

const minhasAcoesDaTela = [
  { name: "edit", label: "Editar", icon: EditIcon, class: "text-blue-900" },
  { name: "delete", label: "Deletar", icon: TrashIcon },
  { name: "block", label: "Block", icon: BlockIcon },
];
</script>

<template>
  <div class="w-full min-h-[calc(100vh-80px)] flex flex-col items-center px-6 py-10">
    <div class="w-full">
      <SubHeader :companies="companies" :competencies="competencies" v-model:model-value-company="selectedCompany"
        v-model:model-value-competence="selectedCompetence" :show-lucro="showLucroFlag" :subtitle-title="subtitleText"
        :show-add-button="true" :add-icon="AtomPlusIcon" @add="funcaoParaAdicionar" />

      <OrganismGridView :data="gridData" :showHeader="true" :columns="gridColumns" :show-add-button="true"
        :actions="minhasAcoesDaTela" add-button-text="Adicionar usuário" class="mt-15" :add-icon="AtomPlusIcon"
        @add="funcaoParaAdicionar" />
    </div>

    <!-- MODAL UNIFICADO -->
    <MoleculeModal v-model="isAddModalOpen" :isMobile="isMobile" :showFooter="true" size="md" height="auto" scrollable>
      <!-- HEADER -->
      <template #header>
        <AtomSubtitle title="Adicionar" />
      </template>

      <!-- CONTENT -->
      <div class="flex flex-col gap-y-5">
        <div class="flex flex-col xl:flex-row gap-y-4 gap-x-4">
          <AtomInput label="label aqui" placeholder="Digite Aqui" type="text" />
          <AtomInput label="label aqui" placeholder="Digite Aqui" type="text" />
        </div>
      </div>

      <!-- FOOTER -->
      <template #footer>
        <div class="justify-end flex gap-x-4 w-full">
          <AtomButton class="uppercase cursor-pointer bg-white p-2 rounded-md"
            :style="{ minWidth: '120px', color: 'var(--dark-blue)' }" @click="isAddModalOpen = false">
            Cancelar
          </AtomButton>

          <AtomButton class="uppercase cursor-pointer p-3 rounded-md">
            Adicionar
          </AtomButton>
        </div>
      </template>
    </MoleculeModal>




  </div>
</template>

<style>
.bottom-sheet-enter-active,
.bottom-sheet-leave-active {
  transition: all 0.28s ease;
}

.bottom-sheet-enter-from,
.bottom-sheet-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
