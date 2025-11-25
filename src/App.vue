<script setup lang="ts">
import { computed, onMounted, defineAsyncComponent, onUnmounted } from "vue";
import { RouterView, useRoute } from "vue-router";

const defaultLayout = defineAsyncComponent(
  () => import("@/components/organism/Header.vue")
);
const authLayout = defineAsyncComponent(
  () => import("@/layout/authLayout.vue")
);
const ClientHeader = defineAsyncComponent(
    () => import("@/components/organism/ClientHeader.vue")
)


const route = useRoute();

const layouts = {
  defaultLayout,
  authLayout,
  ClientHeader
};

type Layout = keyof typeof layouts;

const layout = computed(() => {
  return (route?.meta?.layout as Layout) || "defaultLayout";
});

onMounted(() => {
  document.body.style.overflow = "auto";
  document.body.style.overflowX = "hidden";
});

// const resultados = websocketData.resultados
</script>

<template>
  <component :is="layouts[layout]">
    <RouterView />
    <div id="datepicker-teleport"></div>
  </component>
</template>

<style>
#datepicker-teleport {
  position: fixed;
  z-index: 9999;
}
/* CSS global — funciona mesmo com teleport */
.dp__menu {
  min-width: 320px !important; /* largura desejada */
  min-height: 350px !important; /* altura desejada */
  font-size: 1rem !important; /* tamanho do texto */
  padding: 1rem !important; /* espaçamento interno */
}

.dp__calendar_item {
  width: 42px !important;
  height: 42px !important;
  font-size: 0.95rem !important;
}

.dp__calendar_row {
  gap: 6px !important;
}

/* remove a linha que fica abaixo dos dias da semana */
.dp__calendar_header_separator {
  display: none !important;
}

/* Remove a pré-visualização da seleção de data */
.dp__selection_preview {
  display: none !important;
}

/* Remove o botão de cancelamento abaixo do calendário */
.dp__action_button.dp__action_cancel {
  display: none !important;
}

/* Estilo do botão “Selecionar” do VueDatePicker igual ao AtomButton */
.dp__action_button.dp__action_select {
  background-color: #fff !important; /* cor de fundo igual ao AtomButton */
  color: var(--dark-blue) !important; /* texto branco */
  font-weight: 600 !important; /* negrito */
  padding: 20px 20px !important; /* padding */
  border-radius: 20px !important; /* borda arredondada */
  border: none !important; /* remove borda padrão */
  cursor: pointer !important; /* cursor pointer */
  transition: background-color 0.3s ease !important;
}

.dp__action_button.dp__action_select:hover {
  background-color: rgb(193, 196, 201) !important; /* hover igual AtomButton */
}
</style>
