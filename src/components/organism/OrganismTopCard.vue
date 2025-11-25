<script lang="ts" setup>
import { ref } from 'vue'
import {
  AtomBankIcon,
  AtomXmlIcon,
  AtomPaperIcon,
  AtomCoinIcon,
  AtomExpensesIcon,
  AtomInputCheckBox,
  AtomTopCardTitle,
  AtomTopCardContent
} from '@/components/atoms'

type Card = {
  key: string
  icon: any
  title: string
  content: string
  notifyOpen?: boolean
}

const cards: Card[] = [
  { key: 'import-ofx', icon: AtomBankIcon, title: 'Importar', content: 'Extratos bancários OFX', notifyOpen: true },
  { key: 'import-xml', icon: AtomXmlIcon, title: 'Importar', content: 'XML das NF Entradas' },
  { key: 'import-folha', icon: AtomPaperIcon, title: 'Importar', content: 'Resumo da folha' },
  { key: 'import-provisao', icon: AtomCoinIcon, title: 'Importar', content: 'Provisão das despesas' },
  { key: 'import-openCashExpenses', icon: AtomExpensesIcon, title: 'Lançamento', content: 'Despesas diversas' }
]

// controle dos checkboxes por índice (mesma ordem dos cards)
const checks = ref<boolean[]>(cards.map(() => false))

/* Emits:
   - mantemos 'open-import-ofx' para compatibilidade com o pai atual (primeiro card)
   - emitimos também 'open-modal' com a chave do card para os demais (você pode usar no pai)
*/
const emit = defineEmits<{
  (e: 'open-import-ofx'): void
  (e: 'open-modal', modalKey: string): void
}>()

/* Handler de clique: toggle visual + switch para decidir qual evento emitir */
function onCardClick(card: Card, index: number) {
  // toggle checkbox visual
  checks.value[index] = !checks.value[index]

  // switch-case: primeiro card mantém emit 'open-import-ofx'
  // demais cases emitem 'open-modal' com a chave correspondente para o pai preencher
  switch (card.key) {
    case 'import-ofx':
      // mantém compatibilidade com o pai que já escuta 'open-import-ofx'
      emit('open-modal','open-import-ofx')
      break

    case 'import-xml':
      // TODO: preencha no pai qual modal/component abrir para XML
      emit('open-modal', 'import-xml')
      break

    case 'import-folha':
      // TODO: preencha no pai qual modal/component abrir para Resumo da folha
      emit('open-modal', 'import-folha')
      break

    case 'import-provisao':
      // abre modal de provisão (não deve abrir o wizard)
      emit('open-modal', 'open-import-provisao')
      break

    case 'import-openCashExpenses':
      // TODO: preencha no pai qual modal/component abrir para Lançamento
      emit('open-modal', 'open-cash-expenses')
      break

    default:
      // fallback genérico
      emit('open-modal', card.key)
      break
  }
}

/* router helper se precisar navegar */
import { useRouter } from 'vue-router'
const router = useRouter()
function go(path: string) { router.push(path) }
</script>

<template>
  <div>
    <div class="flex flex-col  sm:flex-row sm:justify-between mt-15 px-2">
      <div v-for="(card, i) in cards" :key="card.key" :class="[
        'group border border-neutral-300 p-4 rounded-lg sm:w-[200px] flex flex-col items-center',
        card ? '' : ''
      ]">
        <button type="button"
          class="w-full block flex flex-col items-center gap-y-2 cursor-pointer bg-transparent border-0 p-0"
          @click.prevent="onCardClick(card, i)">
          <!-- checkbox com stop para não propagar clique para o botão -->
          <AtomInputCheckBox v-model="checks[i]" class="w-full h-1" @click.stop />
          <component :is="card.icon" class="mb-2" />
          <AtomTopCardTitle :title="card.title" />
          <AtomTopCardContent :content="card.content" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* mantém comportamento visual do original */

</style>
