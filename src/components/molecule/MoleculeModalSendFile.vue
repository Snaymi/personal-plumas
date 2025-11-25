<template>
  <MoleculeModal 
    v-model="internalOpen"
    :isMobile="isMobile"
    size="sm"
    height="auto"
    :showFooter="false"
    @close="close"
  >
    <!-- ================= HEADER ================= -->
    <template #header>
      <div class="flex items-center justify-between w-full">
        <h2 class="text-lg font-semibold text-gray-900">
          Carregar arquivo
        </h2>

        <AtomCloseActionIcon
          v-if="!isLoading"
          class="cursor-pointer text-gray-400 hover:text-gray-600"
          @click="close"
        />
      </div>
    </template>

    <!-- ================= CONTENT ================= -->

    <!-- LOADING -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center text-center py-10">

      <svg class="animate-spin w-14 h-14 text-blue-600 mb-4" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>

      <h3 class="text-gray-900 font-semibold text-lg mb-2">
        Carregando seu arquivo
      </h3>

      <p class="text-gray-600 text-sm max-w-xs leading-relaxed">
        Você poderá visualizar o arquivo assim que o carregamento terminar.
      </p>

    </div>

    <!-- NORMAL -->
    <template v-else>

      <p class="text-sm text-gray-600 mb-6 leading-relaxed">
        Para contas não integradas, baixe o extrato em formato OFX no site do seu banco
        e importe entre os dias 1º e 5 do mês seguinte ao período de competência.
      </p>

      <!-- ESTADO 1: sem arquivo -->
      <div v-if="!hasFile"
        class="border border-dashed border-gray-300 rounded-lg py-10 flex flex-col items-center justify-center text-center px-4">

        <AtomSendFileIcon />

        <p class="font-medium text-gray-800 mb-1">
          Arraste o arquivo ou clique no botão
        </p>

        <p class="text-xs text-gray-500 mb-6">
          Arquivos no formato .OFX ou PDF
        </p>

        <!-- BOTÃO -->
        <AtomButton size="sm" :primary="false" :outline="true" class="relative overflow-hidden">
          <span>Selecione</span>

          <input 
            ref="fileInput"
            type="file"
            accept=".ofx,.pdf"
            class="absolute inset-0 opacity-0 cursor-pointer"
            @change="onFileChange"
          />
        </AtomButton>
      </div>

      <!-- ESTADO 2: arquivo concluído -->
      <div v-else class="mt-2">

        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-3">
            <span class="text-gray-800 text-sm font-medium">
              {{ file?.name }}
            </span>

            <span class="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full inline-flex items-center gap-1">
              ✓ Concluído
            </span>
          </div>

          <button @click="removeFile" class="text-gray-500 hover:text-red-600 transition">
            <AtomTrashIcon />
          </button>
        </div>

        <div class="w-full h-[3px] bg-emerald-400 rounded-full mb-1"></div>

        <div class="text-right text-xs text-gray-700 font-medium">100%</div>

        <!-- Botão enviar -->
        <AtomButton class="w-full mt-8" @click="handleSubmit">
          Enviar
        </AtomButton>
      </div>

    </template>
  </MoleculeModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { MoleculeModal } from "../molecule";

import {
  AtomCloseActionIcon,
  AtomSendFileIcon,
  AtomTrashIcon,
  AtomButton,
} from "../atoms";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  isMobile: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "submit"]);

const internalOpen = ref(props.modelValue);
watch(() => props.modelValue, v => internalOpen.value = v);
watch(internalOpen, v => emit("update:modelValue", v));

const isLoading = ref(false);
const file = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const hasFile = computed(() => !!file.value);

function close() {
  isLoading.value = false;
  file.value = null;
  internalOpen.value = false;
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  file.value = target.files?.[0] || null;
}

function removeFile() {
  file.value = null;
  if (fileInput.value) fileInput.value.value = "";
}

function handleSubmit() {
  if (!file.value) return;

  emit("submit", file.value);

  isLoading.value = true;

  setTimeout(() => {
    close();
  }, 2000);
}
</script>
