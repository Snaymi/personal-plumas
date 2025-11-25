<script lang="ts" setup>
import { ref } from "vue";
import SubHeader from "../organism/SubHeader.vue";
import { OrganismGridView } from "../organism";

import ClipBoardIcon from "../atoms/icons/AtomClipBoardIcon.vue"; // (Exemplo)
import EditIcon from "../atoms/icons/EditIcon.vue";
import TrashIcon from "../atoms/icons/TrashIcon.vue";
import AtomEyeIcon from "../atoms/icons/AtomEyeIcon.vue";
import BlockIcon from "../atoms/icons/BlockIcon.vue";
import AtomPlusIcon from "../atoms/icons/AtomPlusIcon.vue";

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
const subtitleText = ref("Cadastro - Parâmetros do Sistema "); // título controlado pelo pai

// 🔹 dados e colunas de exemplo só para renderizar o grid
const gridData = ref([
  {
    indicador: "lore ipsum",
    parametroideal: "lore ipsum",
    sinalideal: "lore ipsum",
    parametrocritico: "lore ipsum",
    sinalcritico: "lore ipsum",
    msgideal: "lore ipsum",
    msgatencao: "lore ipsum",
    msgcritico: "lore ipsum",
    perguntadupla: "lore ipsum",
    tipopergunta: "lore ipsum",
    respostas: "lore ipsum",
    pergunta: "lore ipsum",
    ordem: "lore ipsum",
    descricao: "lore ipsum",
    codigo: "001",
    id: "001",
    nome: "Paulo",
    usuario: "Importação de teste",
    email: "Ativo",
    perfil: "aaaaaaaaaaaaaaaaaaaaa",
    empresa: "lore ipsum",
    numeroempresa: "123",
    razaosocial: "lore ipsum",
    nomefantasia: "loreipsum",
    cnpj: "123",
    bancoofx: "lore ipsum",
    acctid: "lore ipsum",
    agencia: "lore ipsum",
    numeroconta: "123",
    galonagem: "1000 L",
    ideal: "90%",
    atencao: "75%",
    critico: "60%",
    chave: "lore ipsum",
    valor: "lore ipsum",
  },
  {
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
  { key: "chave", label: "Chave" },
  { key: "valor", label: "Valor" },
];
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
        :add-icon="ClipBoardIcon"
      />

      <OrganismGridView
        :data="gridData"
        :showHeader="true"
        :columns="gridColumns"
        :show-add-button="true"
        add-button-text="Salvar tudo"
        :add-icon="ClipBoardIcon"
        class="mt-15"
        :show-search="false"
      />
    </div>
  </div>
</template>
