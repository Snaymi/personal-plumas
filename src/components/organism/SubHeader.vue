<script setup lang="ts">
import { toRef, computed } from "vue";
import type { PropType, Component } from "vue";
import AtomSubtitle from "../atoms/AtomSubtitle.vue";
import AtomSubHeaderDropDown from "../atoms/AtomSubHeaderDropDown.vue";
import AtomButton from "../atoms/AtomButton.vue";

const props = defineProps({
  subtitleTitle: { type: String, default: "" },
  modelValueCompany: { type: [String, Number], default: "" },
  modelValueCompetence: { type: [String, Number], default: "" },
  companies: {
    type: Array as () => Array<{ id: string; label: string }>,
    default: () => [],
  },
  competencies: {
    type: Array as () => Array<{ id: string; label: string }>,
    default: () => [],
  },
  showLucro: { type: Boolean, default: false },

  // NEW: por padrão o dropdown existe; o pai pode passar :show-dropdown="false" para removê‑lo
  showDropdown: { type: Boolean, default: true },

  showAddButton: { type: Boolean, default: false },
  addIcon: { type: Object as PropType<Component>, default: null },
  addButtonClass: {
    type: String,
    default: "bg-[#022C5C] hover:bg-[#021f4b]", // Estilo padrão
  },
  addButtonTextClass: { type: String, default: "text-white" },
});

const emit = defineEmits<{
  (e: "update:modelValueCompany", v: string | number): void;
  (e: "update:modelValueCompetence", v: string | number): void;
  (e: "add"): void;
}>();

const company = toRef(props, "modelValueCompany");
const competence = toRef(props, "modelValueCompetence");
const showDropdown = toRef(props, "showDropdown");

function onCompanyUpdate(v: string | number) {
  emit("update:modelValueCompany", v);
}
function onCompetenceUpdate(v: string | number) {
  emit("update:modelValueCompetence", v);
}
function handleAdd() {
  emit("add");
}

const anyDropdownHasValue = computed(() => {
  const c = String(company.value ?? "");
  const k = String(competence.value ?? "");
  return c !== "" || k !== "";
});

const shouldShowLucro = computed(
  () => props.showLucro && anyDropdownHasValue.value
);
</script>

<template>
  <div class="flex justify-between items-center w-full">
    <div class="flex gap-x-10 items-center">
      <AtomSubtitle :title="subtitleTitle" />
      <h2
        v-if="shouldShowLucro"
        class="bg-blue-100 p-2 rounded-md text-blue-500 font-semibold uppercase text-sm"
      >
        Lucro presumido
      </h2>
    </div>

    <div v-if="showDropdown" class="flex items-center gap-x-5">
      <AtomButton
        v-if="props.showAddButton"
        @click="handleAdd"
        :class="[
          'sm:hidden !p-1.5 justify-end cursor-pointer ',
          props.addButtonClass,
        ]"
        :disableFocus="true"
      >
        <template #icon>
          <component
            v-if="props.addIcon"
            :is="props.addIcon"
            :class="['w-5 h-5 pointer-events-none', props.addButtonTextClass]"
          />
        </template>
      </AtomButton>
      <div class="min-w-[220px] hidden sm:block">
        <AtomSubHeaderDropDown
          :model-value="company"
          @update:modelValue="onCompanyUpdate"
          :options="companies"
          label="Empresa"
          placeholder="Clique para selecionar"
          id="select-company"
          :select-class="'cursor-pointer block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#022C5C]'"
        />
      </div>

      <div class="w-[160px] hidden sm:block">
        <AtomSubHeaderDropDown
          :model-value="competence"
          @update:modelValue="onCompetenceUpdate"
          :options="competencies"
          label="Competência"
          placeholder="Clique para selecionar"
          id="select-competence"
          :select-class="' cursor-pointer block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-3 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#022C5C]'"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* sem alterações adicionais */
</style>
