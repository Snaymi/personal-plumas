<script setup lang="ts">
import { ref, computed, watch, toRefs } from 'vue'

/* Props */
const props = defineProps({
    columns: {
        type: Array as () => Array<{ key: string; label: string; sortable?: boolean; width?: string }>,
        required: true
    },
    data: {
        type: Array as () => Array<Record<string, any>>,
        required: true
    },
    pageSize: { type: Number, default: 10 },
    showPagination: { type: Boolean, default: true }, // controle por instância
    selectable: { type: Boolean, default: false },
    actions: {
        type: Array as () => Array<{ name: string; label: string; class?: string }>,
        default: () => []
    },
    emptyLabel: { type: String, default: 'Nenhum registro encontrado' },
    // novo prop opcional de moeda — pode ser string (ex: "BRL") ou undefined
    currency: { type: [String, Object] as any, default: 'BRL' }
})

/* Emits */
const emit = defineEmits<{
    (e: 'row:click', row: Record<string, any>): void
    (e: 'action:click', payload: { action: string; row: Record<string, any> }): void
    (e: 'selection:update', selected: Record<string, any>[]): void
    (e: 'sort:update', payload: { key: string; dir: 'asc' | 'desc' | null }): void
    (e: 'page:update', page: number): void
}>()

/* Reactive state */
const { data: rawData, columns } = toRefs(props)
const sortKey = ref<string | null>(null)
const sortDir = ref<'asc' | 'desc' | null>(null)
const page = ref(1)
const internalSelected = ref<Record<string, any>[]>([])

/* Computed: sorted and paged data */
const sortedData = computed(() => {
    if (!sortKey.value || !sortDir.value) return rawData.value.slice()
    return rawData.value.slice().sort((a, b) => {
        const av = a[sortKey.value] ?? ''
        const bv = b[sortKey.value] ?? ''
        if (av === bv) return 0
        if (sortDir.value === 'asc') return av > bv ? 1 : -1
        return av < bv ? 1 : -1
    })
})

const totalPages = computed(() => {
    return Math.max(1, Math.ceil(sortedData.value.length / props.pageSize))
})

const pagedData = computed(() => {
    if (!props.showPagination) return sortedData.value
    const start = (page.value - 1) * props.pageSize
    return sortedData.value.slice(start, start + props.pageSize)
})

/* Watchers */
watch(page, (p) => emit('page:update', p))
watch(internalSelected, (s) => emit('selection:update', s), { deep: true })

/* Helpers */
function toggleSort(colKey: string, sortable = true) {
    if (!sortable) return
    if (sortKey.value !== colKey) {
        sortKey.value = colKey
        sortDir.value = 'asc'
    } else {
        if (sortDir.value === 'asc') sortDir.value = 'desc'
        else if (sortDir.value === 'desc') { sortKey.value = null; sortDir.value = null }
        else sortDir.value = 'asc'
    }
    emit('sort:update', { key: sortKey.value ?? '', dir: sortDir.value })
}

function handleRowClick(row: Record<string, any>) {
    emit('row:click', row)
}

function handleActionClick(actionName: string, row: Record<string, any>) {
    emit('action:click', { action: actionName, row })
}

function toggleSelectRow(row: Record<string, any>) {
    const idx = internalSelected.value.indexOf(row)
    if (idx === -1) internalSelected.value.push(row)
    else internalSelected.value.splice(idx, 1)
}

/* Select all on page */
function selectAllOnPage(checked: boolean) {
    if (!checked) {
        // remove any rows from current page
        pagedData.value.forEach(r => {
            const idx = internalSelected.value.indexOf(r)
            if (idx !== -1) internalSelected.value.splice(idx, 1)
        })
    } else {
        pagedData.value.forEach(r => {
            if (!internalSelected.value.includes(r)) internalSelected.value.push(r)
        })
    }
}

function isRowSelected(row: Record<string, any>) {
    return internalSelected.value.includes(row)
}

/* Pagination controls */
function goTo(pageNum: number) {
    page.value = Math.max(1, Math.min(pageNum, totalPages.value))
}

/* Currency handling: validate and fallback */
const currency = computed(() => {
    // ensure we return valid ISO 4217 three-letter code (fallback to BRL)
    try {
        // if prop is object, coerce to string; otherwise toString and uppercase
        const c = props.currency as unknown
        if (!c) return 'BRL'
        const s = typeof c === 'string' ? c : String(c)
        const code = s.toUpperCase().trim()
        // simple validation: 3 letters
        return /^[A-Z]{3}$/.test(code) ? code : 'BRL'
    } catch {
        return 'BRL'
    }
})

function formatCurrencySafe(value: number | undefined | null) {
    const v = typeof value === 'number' ? value : 0
    try {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: currency.value }).format(v)
    } catch (err) {
        // fallback to BRL if supplied currency is invalid at runtime
        console.error('formatCurrencySafe failed for currency:', currency.value, err)
        try {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
        } catch {
            // last resort plain number
            return v.toFixed(2)
        }
    }
}

/* Expose minimal API */
defineExpose({
    nextPage: () => goTo(page.value + 1),
    prevPage: () => goTo(page.value - 1),
    clearSelection: () => { internalSelected.value = [] }
})
</script>

<template>
    <div class="molecule-table w-full">
        <div class="overflow-x-auto rounded bg-white">
            <table class="min-w-full text-sm">
                <thead class="bg-gray-50 text-left">
                    <tr>
                        <th v-if="props.selectable" class="px-3 py-2">
                            <input type="checkbox" :checked="pagedData.length && pagedData.every(r => isRowSelected(r))"
                                @change="(e) => selectAllOnPage(e.target.checked)" />
                        </th>

                        <th v-for="col in columns" :key="col.key" :style="{ width: col.width || 'auto' }"
                            class="px-3 py-2 select-none">
                            <div class="flex items-center gap-2">
                                <span>{{ col.label }}</span>
                                <button v-if="col.sortable" class="ml-auto text-xs text-gray-400"
                                    @click="toggleSort(col.key, col.sortable)">
                                    <span v-if="sortKey === col.key && sortDir === 'asc'">▲</span>
                                    <span v-else-if="sortKey === col.key && sortDir === 'desc'">▼</span>
                                    <span v-else>⇅</span>
                                </button>
                            </div>
                        </th>

                        <th v-if="props.actions && props.actions.length" class="px-3 py-2">Ações</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-if="!pagedData.length" class="text-center">
                        <td :colspan="(columns.length) + (props.selectable ? 1 : 0) + (props.actions && props.actions.length ? 1 : 0)"
                            class="px-4 py-8 text-gray-500">
                            {{ props.emptyLabel }}
                        </td>
                    </tr>

                    <tr v-for="(row, idx) in pagedData" :key="idx" class="hover:bg-gray-50"
                        @click="handleRowClick(row)">
                        <td v-if="props.selectable" class="px-3 py-2">
                            <input type="checkbox" :checked="isRowSelected(row)"
                                @change.stop="() => toggleSelectRow(row)" />
                        </td>

                        <td v-for="col in columns" :key="col.key" class="px-3 py-2 ">
                            <slot :name="`cell-${col.key}`" :row="row">
                                <!-- default rendering -->
                                <span>{{ row[col.key] }}</span>
                            </slot>
                        </td>

                        <td v-if="props.actions && props.actions.length" class=" px-3 py-2 text-right">
                            <div class="inline-flex gap-2">
                                <button v-for="act in props.actions" :key="act.name"
                                    @click.stop="() => handleActionClick(act.name, row)"
                                    :class="act.class || 'px-2 py-1 text-xs border rounded'">
                                    {{ act.label }}
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- pagination (renderiza somente se showPagination = true) -->
        <div v-if="props.showPagination" class="mt-3 flex items-center justify-between text-sm">
            <div>
                <span>Mostrando</span>
                <strong class="mx-1">{{ (page - 1) * props.pageSize + (pagedData.length ? 1 : 0) }}</strong>
                <span>até</span>
                <strong class="mx-1">{{ (page - 1) * props.pageSize + pagedData.length }}</strong>
                <span>de</span>
                <strong class="mx-1">{{ rawData.length }}</strong>
            </div>

            <div class="flex items-center gap-2">
                <button class="px-2 py-1 border rounded" :disabled="page <= 1" @click="goTo(page - 1)">Anterior</button>
                <span> {{ page }} / {{ totalPages }} </span>
                <button class="px-2 py-1 border rounded" :disabled="page >= totalPages"
                    @click="goTo(page + 1)">Próxima</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.molecule-table table {
    border-collapse: collapse;
    width: 100%;
}

.molecule-table th,
.molecule-table td {
    border-bottom: 1px solid #eef2f7;
}
</style>
