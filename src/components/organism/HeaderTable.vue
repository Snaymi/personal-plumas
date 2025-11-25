<template>
  <div
    class="bg-[var(--bg-color-gray)] pb-6 border-b border-gray-200 flex items-end justify-between gap-4"
  >
    <div class="flex-1 max-w-md">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        {{ searchLabel }}
      </label>
      <div class="relative">
        <input
          :value="modelValue"
          @input="handleInput"
          type="text"
          :placeholder="searchPlaceholder"
          class="bg-white w-full px-4 py-2 pr-10 border border-gray-300 rounded-md text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
        />
      </div>
    </div>

    <AtomButton
      v-if="showAddButton"
      @click="emit('add')"
      class="px-7"
      size="md"
    >
      <template #icon>
        <svg
          class="w-5 h-5 bg-white rounded"
          fill="none"
          stroke="var(--dark-blue)"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </template>

      {{ addButtonText }}
    </AtomButton>
  </div>
</template>

<script setup lang="ts">
// 💡 Assumindo o mesmo caminho do AtomButton que você usou no OrganismGridView
import AtomButton from "@/components/atoms/AtomButton.vue";

// --- Props ---
defineProps({
  // Prop para o v-model
  modelValue: {
    type: String,
    required: true,
  },
  searchLabel: {
    type: String,
    default: "Pesquisar:",
  },
  searchPlaceholder: {
    type: String,
    default: "Digite aqui para pesquisar",
  },
  showAddButton: {
    type: Boolean,
    default: true,
  },
  addButtonText: {
    type: String,
    default: "Adicionar", // Default genérico, o pai pode sobrepor
  },
});

// --- Emits ---
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void; // Para o v-model
  (e: "add"): void; // Para o clique no botão
}>();

// --- Métodos ---
function handleInput(event: Event) {
  // Emite a atualização para o v-model
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>
