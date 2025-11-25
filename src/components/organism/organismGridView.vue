<template>
  <div class="bg-white rounded-lg overflow-hidden">
    <div
      v-if="props.showHeader"
      class="pb-6 border-b border-gray-200 flex items-end justify-between gap-4"
    >
      <div class="flex flex-1 items-end gap-4">
        <div class="w-full md:flex-1 md:max-w-md mb-4 md:mb-0">
          <template v-if="props.showSearch">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ searchLabel }}
            </label>
            <div class="relative">
              <input
                v-model="searchTerm"
                type="text"
                :placeholder="searchPlaceholder"
                class="bg-white w-full px-4 py-4 md:py-2 pr-10 border border-gray-300 rounded-md text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
              />
            </div>
          </template>
        </div>

        <slot name="filters"></slot>
      </div>
      <AtomButton
        v-if="showAddButton"
        @click="handleAdd"
        :class="[
          '!hidden md:!inline-flex p-1.5 md:py-2 md:px-7 justify-end cursor-pointer',
          props.addButtonClass,
        ]"
        size="md"
        :disableFocus="true"
      >
        <template #icon>
          <component
            v-if="props.addIcon"
            :is="props.addIcon"
            :class="['w-5 h-5', props.addButtonTextClass]"
          />
        </template>
        <span
          :class="[
            'hidden md:inline font-semibold font-fami',
            props.addButtonTextClass,
          ]"
        >
          {{ addButtonText }}
        </span>
      </AtomButton>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-3 text-left font-semibold text-black cursor-pointer hover:bg-gray-100 transition-colors"
              :class="column.headerClass"
              @click="column.sortable && handleSort(column.key)"
            >
              <div class="flex items-center gap-1">
                {{ column.label }}
                <svg
                  v-if="column.sortable"
                  class="w-3 h-3 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
              </div>
            </th>
            <th
              v-if="actions.length > 0"
              class="px-6 py-3 text-center font-semibold text-black capitalize"
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr
            v-for="(item, index) in paginatedData"
            :key="index"
            class="hover:bg-gray-50 transition-colors"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-4 text-sm text-gray-600 whitespace-nowrap"
              :class="column.cellClass"
            >
              <slot
                :name="`cell-${column.key}`"
                :item="item"
                :value="item[column.key]"
              >
                {{ item[column.key] }}
              </slot>
            </td>
            <td
              v-if="actions.length > 0"
              class="px-6 py-4 text-center whitespace-nowrap"
            >
              <div class="flex items-center justify-center">
                <button
                  v-for="action in actions"
                  :key="action.name"
                  @click="handleAction(action.name, item)"
                  :title="action.label"
                  class="p-1.5 rounded hover:bg-gray-100 transition-all"
                  :class="action.class || getDefaultActionClass(action.name)"
                >
                  <component
                    v-if="action.icon"
                    :is="action.icon"
                    class="text-[var(--dark-blue)] pointer-events-none"
                  />
                  <span v-else>{{ action.label }}</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-7"
    >
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <span>Mostrando</span>
        <select
          v-model.number="itemsPerPage"
          class="text-[var(--dark-blue)] py-1 px-1 border-none rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
          :style="{ backgroundColor: 'rgba(var(--dark-blue-rgb), 0.1)' }"
        >
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
        <span class="ml-3"
          >{{ startIndex + 1 }}-{{ endIndex }} de
          {{ filteredData.length }}</span
        >
      </div>

      <div class="flex items-center gap-4 lg:pr-15 md:ml-8">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="p-2 rounded bg-[var(--dark-blue)] text-white hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <AtomArrowIcon class="transform rotate-180" fill="white" />
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage >= totalPages"
          class="p-2 rounded bg-[var(--dark-blue)] text-white hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <AtomArrowIcon fill="white" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { PropType, Component } from "vue";
import AtomButton from "@/components/atoms/AtomButton.vue";
import AtomArrowIcon from "@/components/atoms/icons/AtomArrowIcon.vue";

// --- Tipos ---
type DataItem = Record<string, any>;

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  headerClass?: string;
  cellClass?: string;
}

interface Action {
  name: string;
  label: string;
  icon?: string | Component;
  class?: string;
}

// --- Props ---
const props = defineProps({
  data: {
    type: Array as PropType<DataItem[]>,
    default: () => [],
  },
  columns: {
    type: Array as PropType<Column[]>,
    required: true,
  },
  actions: {
    type: Array as PropType<Action[]>,
    default: () => [],
  },
  showAddButton: { type: Boolean, default: true },
  addButtonText: { type: String, required: true },
  searchLabel: { type: String, default: "Pesquisar:" },
  searchPlaceholder: { type: String, default: "Digite aqui para pesquisar" },
  initialItemsPerPage: { type: Number, default: 10 },
  searchableColumns: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  addIcon: {
    type: Object as PropType<Component>,
    default: null, // O padrão é 'null'
  },
  showSearch: {
    type: Boolean,
    default: true,
  },
  addButtonClass: {
    type: String,
    default: "", // Um valor padrão vazio
  },
  addButtonTextClass: {
    type: String,
    default: "text-white", // Padrão que já estava no ícone
  },
});

const emit = defineEmits<{
  (e: "add"): void;
  (e: "action", payload: { action: string; item: DataItem }): void;
  (e: "sort", payload: { key: string; order: "asc" | "desc" }): void;
}>();

const searchTerm = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(props.initialItemsPerPage);
const sortKey = ref("");
const sortOrder = ref<"asc" | "desc">("asc");

const filteredData = computed(() => {
  if (!searchTerm.value) return props.data;

  const term = searchTerm.value.toLowerCase();
  const columnsToSearch =
    props.searchableColumns.length > 0
      ? props.searchableColumns
      : props.columns.map((col) => col.key);

  return props.data.filter((item) =>
    columnsToSearch.some((key) =>
      String(item[key] || "")
        .toLowerCase()
        .includes(term)
    )
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / itemsPerPage.value)
);

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const endIndex = computed(() =>
  Math.min(startIndex.value + itemsPerPage.value, filteredData.value.length)
);

const paginatedData = computed(() =>
  filteredData.value.slice(startIndex.value, endIndex.value)
);

watch([searchTerm, itemsPerPage], () => {
  currentPage.value = 1;
});

function handleAdd() {
  emit("add");
}

function handleAction(actionName: string, item: DataItem) {
  emit("action", { action: actionName, item });
}

function handleSort(columnKey: string) {
  if (sortKey.value === columnKey) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = columnKey;
    sortOrder.value = "asc";
  }
  emit("sort", { key: sortKey.value, order: sortOrder.value });
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function previousPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function getDefaultActionClass(actionName: string) {
  const classMap: Record<string, string> = {
    edit: "text-blue-600 hover:text-blue-700",
    delete: "text-red-600 hover:text-red-700",
    view: "text-indigo-600 hover:text-indigo-700",
  };
  return classMap[actionName] || "text-gray-600 hover:text-gray-700";
}
</script>
