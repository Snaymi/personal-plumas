<script lang="ts" setup>
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ptBR } from "date-fns/locale";
import { AtomInput } from "../atoms";
import { ref, watch, computed } from "vue";
import AtomDropdownIcon from "../atoms/icons/AtomDropdownIcon.vue";

const datepicker = ref<any>(null);

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    yearPicker?: boolean;
    label?: string;
    inputClass?: string;
    showDay?: boolean;
    placeholder?: string;
    icon?: boolean;
  }>(),
  {
    showDay: true,
    inputClass: "p-3 py-3 px-3",
  }
);

const date = defineModel<any>({
  default: null,
});

function onPickerClose() {
  if (date.value instanceof Date) {
    if (
      date.value.getHours() === 0 &&
      date.value.getMinutes() === 0 &&
      date.value.getSeconds() === 0
    ) {
      return;
    }

    const cleanDate = new Date(date.value);
    cleanDate.setHours(0, 0, 0, 0);
    date.value = cleanDate;
  }
}

const formattedDate = computed(() => {
  if (date.value instanceof Date) {
    return date.value.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
  return props.placeholder || "";
});

const currentYear = new Date().getFullYear();

watch(
  () => date.value,
  (newVal) => {
    if (!newVal && props.yearPicker) {
      date.value = new Date(currentYear, 0, 1);
    }
  },
  { immediate: true }
);

const datePickerInputClass =
  "block w-full bg-surface-primary pe-10 border border-gray-300s text-gray-300 rounded-[8px] transition focus:ring-primary focus:border-primary focus:outline-none cursor-pointer hover:text-gray-500 duration-300";
</script>

<template>
  <div class="datepicker-container">
    <AtomInput class="relative" :label="label" :showClear="false">
      <VueDatePicker ref="datepicker" v-model="date" :locale="ptBR" :month-picker="!yearPicker && !showDay"
        :year-picker="yearPicker" position="top" :auto-position="false" :teleport="false"
        :day-names="['D', 'S', 'T', 'Q', 'Q', 'S', 'S']" :enable-time-picker="false" :auto-apply="false">
        <template #dp-input="{ value }">
          <input type="text" :value="formattedDate" :placeholder="props.placeholder" :class="[
            datePickerInputClass,
            {
              'border-danger': false,
              'bg-par-gray-lightest': props.disabled,
            },
            props.inputClass,
          ]" readonly />
        </template>

        <template #time-picker> </template>

        <template #action-buttons>
          <button type="button" class="dp__action_button dp__action_select" @click="
            datepicker?.selectDate();
          datepicker?.closePicker();
          ">
            Confirmar
          </button>
        </template>
      </VueDatePicker>
      <template v-if="props.icon" #icon>
        <AtomDropdownIcon class="absolute -right-75" />
      </template>
    </AtomInput>
  </div>
</template>

<style scoped>
/* Esconder o time picker com CSS se ainda aparecer */
:deep(.dptime_col) {
  display: none !important;
}

:deep(.dptime_display) {
  display: none !important;
}

:deep(.dp__time_input) {
  display: none !important;
}

/* Permitir que o calendário "vaze" do modal e FORCE abrir para cima */
:deep(.dp__menu) {
  z-index: 999999 !important;
  position: fixed !important;
  bottom: auto !important;
  top: auto !important;
  transform: translateY(-100%) !important;
  margin-top: -8px !important;
}

:deep(.dp__overlay) {
  z-index: 999998 !important;
}

/* Força o wrapper a ter z-index alto */
:deep(.dp__menu_wrapper) {
  z-index: 999999 !important;
}

/* Garante que o container pai permita overflow */
.datepicker-container {
  overflow: visible !important;
}

:deep(.relative) {
  overflow: visible !important;
}

/* Garante que o menu apareça acima do input */
:deep(.dp__main) {
  position: relative !important;
}
</style>