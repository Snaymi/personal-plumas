<script lang="ts" setup>
import { ref } from "vue";
import SubHeader from "../organism/SubHeader.vue";
import ContentHome from "@/components/organism/ContentHome.vue";
import AtomFolderIcon from "../atoms/icons/AtomFolderIcon.vue";

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

/* controle do aparecimento via boolean do pai */
const showLucroFlag = ref(true); // altere para true/false conforme desejar

/* título controlado pelo pai (passado para SubHeader) */
const subtitleText = ref("Lançamentos"); // ajuste o texto conforme necessário
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

      <ContentHome
        :company="selectedCompany"
        :competence="selectedCompetence"
        :emptyStateIcon="AtomFolderIcon"
        emptyStateTitle="Informe os dados"
        emptyStateText="Para acessar o sistema e realizar lançamentos, importações e cadastros, é necessário selecionar uma empresa e uma competência no menu acima."
      />
    </div>
  </div>
</template>

<style>
/* sem alterações */
</style>
