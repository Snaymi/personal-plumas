<script setup lang="ts">
import { computed, ref } from 'vue'
import { nanoid } from 'nanoid'
import { useAttrs } from 'vue'

const attrs = useAttrs()

const props = defineProps({
  title: { type: String, default: 'Lançamento' },
  id: { type: String, default: undefined },
  // classe visual adicional aplicada ao h2
  className: { type: String, default: '' }
})

const emit = defineEmits([])

const internalId = ref(props.id ?? `atom-card-title-${nanoid(6)}`)
const rootClass = computed(() =>
  [
    'text-lg',          // tamanho padrão
    'leading-6',
    'font-extrabold',   // peso padrão
    'text-gray-900',    // cor padrão
    props.className,
    (attrs.class as string) ?? ''
  ]
    .filter(Boolean)
    .join(' ')
)
</script>

<template>
  <h2 :id="internalId" v-bind="attrs" :class="rootClass">{{ title }}</h2>
</template>

<style scoped>
/* Nothing extra — styles via Tailwind utilities */
</style>
