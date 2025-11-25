<script lang="ts" setup>
import { computed, useAttrs } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

// pega atributos não-declarados (inclui `class` passado pelo pai)
const attrs = useAttrs()

// classe padrão do componente
const defaultClass = 'text-3xl font-semibold text-gray-900'

// se o pai passar classes via `class` (string / array / object), mescla com a padrão
const mergedClass = computed(() => {
  const incoming = attrs.class
  if (!incoming) return defaultClass
  // se for string, concatena
  if (typeof incoming === 'string') return `${defaultClass} ${incoming}`
  // se for array ou objeto, retorna um array com a defaultClass + incoming
  return [defaultClass, incoming]
})
</script>

<template>
  <div v-bind="attrs">
    <h1 class="text-sm lg:text-base" :class="mergedClass">{{ title }}</h1>
  </div>
</template>

<style scoped>
/* nenhum estilo adicional obrigatório aqui; mantenha o que já existe */
</style>
