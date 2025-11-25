<script lang="ts" setup>
import { ref, onMounted } from "vue";

// SubHeader e componentes já existentes
import SubHeader from "../organism/SubHeader.vue";
import { OrganismGridView } from "../organism";

// Filtros
import AtomInput from "../atoms/AtomInput.vue";

// Ícones para ações
import {
  AtomBankIcon,
  AtomUploadIcon,
  AtomEyeIcon,
  AtomSubHeaderDropdown,
  AtomButton
} from "../atoms";

import { MoleculeModalAccountConect, MoleculeModalSendFile } from "../molecule";

const isMobile = ref(false);

onMounted(() => {
  const check = () =>
  (isMobile.value =
    (window.innerWidth || document.documentElement.clientWidth) <= 640);

  check();
  window.addEventListener("resize", check);
});

// opções dos filtros
const banks = ref([
  { id: "itau", label: "Itaú" },
  { id: "bb", label: "Banco do Brasil" },
  { id: "cef", label: "Caixa" },
]);

const tipos = ref([
  { id: "entrada", label: "Entrada" },
  { id: "saida", label: "Saída" },
]);

const selectedBank = ref("");
const selectedTipo = ref("");
const searchNome = ref("");

// controla modal
const showSendFileModal = ref(false);
const showConectAccountModal = ref(false);

// input file (já não usado, mas deixei quieto pq pediu)
const fileInput = ref<HTMLInputElement | null>(null);

const openFilePicker = () => {
  if (fileInput.value) fileInput.value.click();
};

const handleFileChange = (e: Event) => {
  const f = (e.target as HTMLInputElement).files?.[0];
  if (f) {
    console.log("Arquivo selecionado:", f);
  }
};

// Dados provisórios para deixar igual a imagem
const gridData = ref(
  Array.from({ length: 10 }).map(() => ({
    arquivo: "Uploadarquivo.ofx",
    data: "Lorem ipsum",
    banco: "Lorem ipsum",
  }))
);

// Colunas da tabela
const gridColumns = [
  { key: "arquivo", label: "Arquivo" },
  { key: "data", label: "Data" },
  { key: "banco", label: "Banco" },
];

// Ações da tabela
const tableActions = [
  {
    name: "view",
    label: "Visualizar",
    icon: AtomEyeIcon,
  },
  {
    name: "upload",
    label: "Enviar",
    icon: AtomUploadIcon,
  },
];

const handleAction = ({ action, item }) => {
  console.log("Ação:", action, item);
};

const handleAdd = () => console.log("Add clicado");
</script>

<template>
  <div class="w-full min-h-[calc(100vh-80px)] flex flex-col px-6 py-10">
    <!-- input file escondido -->
    <input ref="fileInput" type="file" accept=".ofx,.txt" class="hidden" @change="handleFileChange" />

    <!-- SubHeader -->
    <SubHeader :show-lucro="false" :show-dropdown="false" subtitle-title="Extrato Bancário" :companies="[]"
      :competencies="[]" />

    <!-- Header com inputs e botões -->
    <div class="flex justify-between items-end mt-10 mb-6">
      <div class=" gap-4 hidden lg:flex">

        <AtomInput v-model="searchNome" placeholder="Digite o nome do arquivo" wrapperClass="w-auto" />

        <AtomSubHeaderDropdown v-model="selectedTipo" :options="tipos" label="Tipo" placeholder="Clique para selecionar"
          selectClass="py-2 pl-4 w-52" />

        <AtomSubHeaderDropdown v-model="selectedBank" :options="banks" label="Banco"
          placeholder="Clique para selecionar" selectClass="py-2 pl-4 w-52" />
      </div>

      <div class="flex gap-4">

        <!-- BOTÃO QUE ABRE O MODAL -->
        <AtomButton :color="'var(--light-blue)'" textColor="var(--dark-blue)" class="px-6 py-2"
          @click="showSendFileModal = true">
          <template #icon>
            <AtomUploadIcon />
          </template>
          Carregar arquivo
        </AtomButton>

        <AtomButton class="px-6 py-2" textColor="var(--dark-blue)" :color="'var(--light-blue)'"
          @click="showConectAccountModal = true">
          <template #icon>
            <AtomBankIcon fill="var(--dark-blue)" />
          </template>
          Conectar conta
        </AtomButton>
      </div>
    </div>

    <!-- MODAL SendFile -->
    <MoleculeModalSendFile v-model="showSendFileModal" :isMobile="isMobile" />

    <!--MODAL ConectAccount-->
    <MoleculeModalAccountConect v-model="showConectAccountModal" :isMobile="isMobile" />



    <!-- GRID -->
    <OrganismGridView :data="gridData" :columns="gridColumns" :actions="tableActions" :show-add-button="false"
      @action="handleAction" />
  </div>
</template>
