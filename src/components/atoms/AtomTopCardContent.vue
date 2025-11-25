<script setup lang="ts">
import { computed } from 'vue'
import { useAttrs } from 'vue'

const attrs = useAttrs()

const props = defineProps({
  content: { type: String, default: 'Despesas do caixa' },
  wrapperClass: { type: String, default: '' }
})

const rootClass = computed(() =>
  [
    'font-light',
    'text-sm',
    'text-gray-400',
    props.wrapperClass,
    (attrs.class as string) ?? ''
  ].filter(Boolean).join(' ')
)
</script>

<template>
  <!-- Prioriza slot; se não houver slot usa prop content (vindo do pai) -->
  <p v-bind="attrs" :class="rootClass">
    <slot>{{ content }}</slot>
  </p>
</template>

<style scoped>
/* Sem estilos adicionais — tudo via Tailwind */
</style>
