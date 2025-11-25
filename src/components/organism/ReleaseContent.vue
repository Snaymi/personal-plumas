<script lang="ts" setup>
import { ref, computed, watch, nextTick } from 'vue'
import {
  AtomInput,
  AtomInvertSearchIcon,
  AtomPtext,
  AtomDropdown,
  AtomPencilIcon,
  AtomFixedIcon
} from '@/components/atoms'
import MoleculeTable from '@/components/molecule/MoleculeTable.vue' // ajuste caminho se necessário

// items originais (estado reativo)
const items = ref([
  { id: 'federais', text: 'Impostos Federais e Contribuições' },
  { id: 'estaduais', text: 'Impostos e Taxas Estaduais' },
  { id: 'municipais', text: 'Impostos e Taxas Municipais' },
  { id: 'receitas', text: 'Receitas' },
  { id: 'outras', text: 'Outras Despesas' },
  { id: 'emprestimos', text: 'Empréstimos Financeiros' },
  { id: 'despesas-gerais', text: 'Despesas Gerais' },
  { id: 'conservacao', text: 'Despesas Conservação' },
  { id: 'contas-pagar', text: 'Contas a Pagar' },
  { id: 'servicos-tomados', text: 'Despesas Serviços Tomados' },
  { id: 'seguranca', text: 'Despesas com Segurança do Trabalho' },
  { id: 'sindicato', text: 'Despesas com Sindicato Patronal' },
  { id: 'contas-receber', text: 'Contas a Receber' },
  { id: 'operacionais', text: 'Despesas Operacionais' },
  { id: 'mensais-fixas', text: 'Despesas Mensais Fixas' },
  { id: 'diversas', text: 'Despesas Diversas' },
  { id: 'financeiras', text: 'Despesas Financeiras' },
  { id: 'deducoes', text: 'Deduções - PIS/COFINS/ICMS' }
])

const selectedId = ref<string | null>(null)
const openId = ref<string | null>(null)

// pinned ids (ordem de fixação; índice 0 = mais antigo)
const pinnedIds = ref<string[]>([])
const MAX_PINNED = 3

// dropdown options controladas pelo PAI (as 5 opções de teste)
const dropdownOptions = ref([
  { id: 'teste-1', label: 'Teste 1' },
  { id: 'teste-2', label: 'Teste 2' },
  { id: 'teste-3', label: 'Teste 3' },
  { id: 'teste-4', label: 'Teste 4' },
  { id: 'teste-5', label: 'Teste 5' }
])

// helper: verifica se está fixado
function isPinned(id: string) {
  return pinnedIds.value.includes(String(id))
}

// rebuild: ordena items colocando os pinned (na ordem de pinnedIds) no começo,
// seguido pelos itens não fixados, preservando os objetos originais
function rebuildItemsPinnedFirst() {
  const pinnedSet = new Set(pinnedIds.value)
  const map = new Map(items.value.map(i => [i.id, i]))
  const newList: Array<{ id: string; text: string }> = []

  for (const pid of pinnedIds.value) {
    const it = map.get(pid)
    if (it) newList.push(it)
  }
  for (const it of items.value) {
    if (!pinnedSet.has(it.id)) newList.push(it)
  }
  items.value.splice(0, items.value.length, ...newList)
}

// togglePin chamado ao clicar no item da coluna 1
function togglePin(id: string) {
  const sid = String(id)
  const idx = pinnedIds.value.indexOf(sid)

  if (idx !== -1) {
    pinnedIds.value.splice(idx, 1)
    rebuildItemsPinnedFirst()
    if (selectedId.value === sid) selectedId.value = null
    return
  }

  if (pinnedIds.value.length >= MAX_PINNED) {
    pinnedIds.value.shift()
  }

  pinnedIds.value.push(sid)
  rebuildItemsPinnedFirst()
  selectedId.value = sid
  openId.value = null
}

// função auxiliar que promove um item individualmente ao front
function promoteToFront(id: string) {
  const idx = items.value.findIndex(i => i.id === id)
  if (idx === -1) return
  if (idx === 0) return
  const [item] = items.value.splice(idx, 1)
  items.value.unshift(item)
}

// seleção tradicional
function selectAndPromote(id?: string | number) {
  if (!id) {
    selectedId.value = null
    return
  }
  const sid = String(id)
  selectedId.value = sid
  promoteToFront(sid)
  openId.value = null
}

// controle de abertura por dropdown
function toggleDropdown(id: string, nextOpen: boolean) {
  openId.value = nextOpen ? id : null
}

/* -------------------------
   Integração MoleculeTable
   ------------------------- */

// mapeia dropdownOptions para o formato esperado pela MoleculeTable
const tableRows = computed(() =>
  dropdownOptions.value.map((o, i) => ({
    id: o.id,
    code: String(i + 1).padStart(3, '0'),
    description: o.label,
    amount: null // <- sem valor inicial para não mostrar R$
  }))
)

// colunas para o MoleculeTable
const tableColumns = computed(() => ([
  { key: 'code', label: 'Cód.', sortable: false, width: '80px' },
  { key: 'description', label: 'Descrição', sortable: false },
  { key: 'amount', label: 'Valor', sortable: false, width: '180px' }
]))

// valores editáveis por linha
const rowValues = ref<Record<string, string | number>>({})

// inicializa rowValues sempre que um painel abre
watch(openId, async (v) => {
  if (!v) return
  await nextTick()
  // popular os valores a partir de tableRows
  for (const r of tableRows.value) {
    rowValues.value[r.id] = r.amount !== null ? r.amount : ''
  }
})

// handler quando uma linha é selecionada na tabela
function onTableSelect(row: any) {
  // exemplo mínimo: promove item correspondente (por id) e fecha dropdown daquele item
  promoteToFront(row.id)
  openId.value = null
}

// confirm action from row (OK button)
function confirmRow(row: any) {
  const raw = rowValues.value[row.id]
  // aqui você pode validar/parsear raw para número/centavos e integrar com seu fluxo
  console.log('confirmRow', row.id, raw)
}
</script>

<template>
  <div class="flex justify-center gap-4">
    <!-- coluna 1: cada item é um botão que ao clicar fixa/desfixa -->
    <div class="w-1/3 p-0.5 relative">
      <div class="relative">
        <AtomInput inputClass="pl-8" placeholder="Pesquise aqui" />
        <AtomInvertSearchIcon class="absolute top-4.5 left-3" />
        <AtomPencilIcon class="absolute top-4.5 right-3" />
      </div>

      <div class="flex relative flex-col gap-y-1 mt-5">
        <button v-for="it in items" :key="it.id" type="button"
          class="group relative w-full text-left px-0 py-2 border-0 cursor-pointer" @click="selectAndPromote(it.id)">
          <AtomPtext :id="it.id" :text="it.text" :selected="selectedId === it.id" />

          <!-- ícone à direita: visível no hover ou sempre se pinned -->
          <AtomFixedIcon @click.stop="togglePin(it.id)" class="z-0 absolute top-3.5 right-2" :class="[
            isPinned(it.id) ? 'text-indigo-600 opacity-100' : 'text-gray-300 opacity-0 group-hover:opacity-100',
            'transition-opacity duration-150'
          ]" />
        </button>
      </div>
    </div>

    <!-- coluna 2: mostra dropdowns; pin visível apenas se item for fixado (indicador, não clicável) -->
    <div class="flex-1 justify-center p-0.5">
      <div class="flex flex-wrap -mx-2 gap-y-4">
        <div v-for="value in items" :key="value.id" class="px-2 w-1/2">
          <div class="relative flex">
            <AtomDropdown class="w-full rounded-sm shadow p-2" :label="value.text" :showPin="false"
              :showCheck="isPinned(value.id)" :modelValue="openId === value.id"
              @update:modelValue="(v) => toggleDropdown(value.id, v)" @toggle="(v) => toggleDropdown(value.id, v)">
              <!-- pin dentro do dropdown somente se estiver fixado (indicador) -->
              <template #icon v-if="isPinned(value.id)">
                <AtomFixedIcon class="text-indigo-600" />
              </template>

              <template #panel>
                <!-- intercepta na fase de captura para evitar que o evento chegue ao listener global -->
                <div class="p-2" @pointerdown.capture.stop @mousedown.capture.stop @click.capture.stop
                  @touchstart.capture.stop>
                  <MoleculeTable :show-pagination="false" :columns="tableColumns" :data="tableRows" :showPagination="false" :selectable="false"
                    @row:click="onTableSelect">
                    <template #cell-amount="{ row }">
                      <div class="flex items-center gap-2">
                        <AtomInput v-model="rowValues[row.id]" inputClass="w-36 text-right text-sm" placeholder="R$0,00"
                          @pointerdown.capture.stop @mousedown.capture.stop @click.capture.stop />
                      </div>
                    </template>
                  </MoleculeTable>
                </div>
              </template>
            </AtomDropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-4\.5 {
  top: 1.125rem;
}

/* foco visual para o botão (opcional) */
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08);
}

/* pequenos ajustes visuais para o dropdown/painel da tabela */
.w-1\/3 {
  width: 33.333333%;
}

.w-1\/2 {
  width: 50%;
}
</style>
