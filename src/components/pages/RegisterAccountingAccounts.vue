<script lang="ts" setup>
import { ref } from "vue";
import SubHeader from "../organism/SubHeader.vue";
import { OrganismGridView } from "../organism";

import PlusIcon from "../atoms/icons/AtomPlusIcon.vue";
import EditIcon from "../atoms/icons/EditIcon.vue";
import TrashIcon from "../atoms/icons/TrashIcon.vue";
import AtomEyeIcon from "../atoms/icons/AtomEyeIcon.vue";
import BlockIcon from "../atoms/icons/BlockIcon.vue";
import MoleculeModal from "../molecule/MoleculeModal.vue";
import { AtomInput, AtomSubtitle } from "../atoms";
import AtomButton from "../atoms/AtomButton.vue";

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
const subtitleText = ref("Cadastro - Contas Contábeis"); // título controlado pelo pai

// 🔹 dados e colunas de exemplo só para renderizar o grid
const gridData = ref([
  {
    historico: "123",
    codigo: "001",
    id: "001",
    nome: "Paulo",
    usuario: "Importação de teste",
    classificaçao: "lore ipsum",
    email: "Ativo",
    perfil: "aaaaaaaaaaaaaaaaaaaaa",
    empresa: "lore ipsum",
    bancoofx: "lore ipsum",
    acctid: "lore ipsum",
    agencia: "lore ipsum",
    numeroconta: "123",
  },
  {
    classificaçao: "lore ipsum",
    codigo: "001",
    id: "001",
    nome: "Paulo",
    usuario: "Importação de teste",
    email: "Ativo",
    perfil: "aaaaaaaaaaaaaaaaaaaaa",
    empresa: "lore ipsum",
  },
  {},
  {},
  {},
]);

const gridColumns = [
  { key: "codigo", label: "Código" },
  { key: "classificaçao", label: "classificação" },
  { key: "historico", label: "Histórico" },
];

const minhasAcoesDaTela = [
  {
    name: "edit",
    label: "Editar",
    icon: EditIcon,
    class: "text-blue-900",
  },
  { name: "delete", label: "Deletar", icon: TrashIcon },
  { name: "eyeVisualizar", label: "Visualizar", icon: AtomEyeIcon },
];

const isAddModalOpen = ref(false);

// 👇 3. CRIE A FUNÇÃO DE 'ADD'
function funcaoParaAdicionar() {
  isAddModalOpen.value = true;
}
</script>

<template>
  <div
    class="w-full min-h-[calc(100vh-80px)] flex flex-col items-center px-6 py-10"
  >
    <div class="w-full">
      <SubHeader
        :companies="companies"
        :competencies="competencies"
        v-model:model-value-company="selectedCompany"
        v-model:model-value-competence="selectedCompetence"
        :show-lucro="showLucroFlag"
        :subtitle-title="subtitleText"
        :show-add-button="true"
        :add-icon="PlusIcon"
        @add="funcaoParaAdicionar"
      />

      <OrganismGridView
        :data="gridData"
        :showHeader="true"
        :columns="gridColumns"
        :show-add-button="true"
        :actions="minhasAcoesDaTela"
        add-button-text="Adicionar conta contábil"
        class="mt-15"
        :add-icon="PlusIcon"
        @add="funcaoParaAdicionar"
      />
    </div>

    <MoleculeModal
      :showFooter="true"
      v-if="isAddModalOpen"
      :is-open="isAddModalOpen"
      @close="isAddModalOpen = false"
      scrollable
    >
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
          <AtomButton
            class="uppercase cursor-pointer hover:bg-white bg-white p-2 rounded-md"
            :style="{ minWidth: '160px', color: 'var(--dark-blue)' }"
            @click="isAddModalOpen = false"
          >
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
