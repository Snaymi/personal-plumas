<script lang="ts" setup>
import { ref } from "vue";
import SubHeader from "../organism/SubHeader.vue";
import { OrganismGridView } from "../organism";

import EditIcon from "../atoms/icons/EditIcon.vue";
import TrashIcon from "../atoms/icons/TrashIcon.vue";
import AtomEyeIcon from "../atoms/icons/AtomEyeIcon.vue";
import BlockIcon from "../atoms/icons/BlockIcon.vue";

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
const subtitleText = ref("Cadastro - Parametrização da Gestão Inteligente "); // título controlado pelo pai

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
  { key: "indicador", label: "Indicador" },
  { key: "parametroideal", label: "Parâmetro ideal" },
  { key: "sinalideal", label: "Sinal ideal" },
  { key: "parametrocritico", label: "Parâmetro crítico" },
  { key: "sinalcritico", label: "Sinal crítico" },
  { key: "msgideal", label: "Msg. ideal" },
  { key: "msgatencao", label: "Msg. atenção" },
  { key: "msgcritico", label: "Msg. crítico" },
];

const minhasAcoesDaTela = [
  {
    name: "edit",
    label: "Editar",
    icon: EditIcon,
  },
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
      />

      <OrganismGridView
        :data="gridData"
        :showHeader="true"
        :columns="gridColumns"
        :show-add-button="false"
        :actions="minhasAcoesDaTela"
        add-button-text="Adicionar pergunta"
        class="mt-15"
      />
    </div>
  </div>
</template>
