<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch, defineEmits, defineProps } from 'vue'
import { nanoid } from 'nanoid'
import {
    AtomBradescoIcon,
    AtomBrazilBankIcon,
    AtomButton,
    AtomNubankIcon,
    AtomOkIcon,
    AtomSantanderIcon,
    AtomTrashIcon,
    AtomBankIcon
} from '../atoms'
import AtomDragdrop from '../atoms/AtomDragdrop.vue'


/* Props */
const props = defineProps({
    startIndex: { type: Number, default: 0 },
    finishLabel: { type: String, default: 'Confirmar' }
})

/* Emits */
const emit = defineEmits([
    'close',
    'imported',
    'update:index',
    'wz.ready',
    'wz.btn.prev',
    'wz.btn.next',
    'wz.nav.forward',
    'wz.nav.backward',
    'wz-form-submit',
    'wz.end',
    'wz.error',
    'wz.lock',
    'wz.unlock',
    'wz.reset',
    'wz.update'
])

/* =============== STATE =============== */

const root = ref<HTMLElement | null>(null)
const formRef = ref<HTMLFormElement | null>(null)
const currentIndex = ref<number>(props.startIndex)

const locked = ref(false)
const steps = ref<Array<{ id: string; title: string }>>([])

const MIN_STEPS = 3
const STEP_TITLES = ['Banco', 'Arquivo', 'Confirmar']

/* per step */
const selectedBank = ref<string>('')
const selectedFileName = ref<string>('')
const selectedFile = ref<File | null>(null)

const isLast = computed(() => steps.value.length > 0 && currentIndex.value === steps.value.length - 1)

/* ========= SETUP STEPS ========== */

function ensureDefaultSteps() {
    if (!steps.value || steps.value.length === 0) {
        steps.value = Array.from({ length: MIN_STEPS }).map((_, i) => ({
            id: nanoid(6),
            title: STEP_TITLES[i] ?? `Passo ${i + 1}`
        }))
    }
}

/* Lifecycle */
onMounted(() => {
    ensureDefaultSteps()
    if (currentIndex.value >= steps.value.length) currentIndex.value = steps.value.length - 1
})

/* ========= NAVIGATION ========== */
function navigateTo(i: number) {
    if (locked.value) return
    if (i < 0 || i >= steps.value.length) return
    currentIndex.value = i
}

function prev() {
    if (locked.value) return
    if (currentIndex.value === 0) return
    currentIndex.value--
}

function next() {
    if (locked.value) return

    if (currentIndex.value === 0 && !selectedBank.value)
        return emit('wz.error', { id: 'bank', msg: 'Selecione um banco' })

    if (currentIndex.value === 1 && !selectedFileName.value)
        return emit('wz.error', { id: 'file', msg: 'Envie um arquivo' })

    if (!isLast.value) currentIndex.value++
}

/* ========== SUBMIT ========== */

function onFinish() {
    emit('wz-form-submit', collectFormData())
    emit('wz.end')
    emit('imported', collectFormData())
    emit('close')
}

/* ========== HELPERS ========== */

function reset() {
    currentIndex.value = 0
    selectedBank.value = ''
    selectedFileName.value = ''
    selectedFile.value = null
}

function collectFormData() {
    return {
        bank: selectedBank.value,
        fileName: selectedFileName.value,
        file: selectedFile.value
    }
}

function onFilesSelected(files: FileList | File[] | null) {
    if (!files || files.length === 0) {
        selectedFileName.value = ''
        selectedFile.value = null
        return
    }

    const f = files[0]
    selectedFileName.value = f.name
    selectedFile.value = f

    // 👉 AVANÇA AUTOMATICAMENTE PARA O STEP 3
    if (currentIndex.value === 1) {
        next()
    }
}


function selectBank(bank: string) {
    selectedBank.value = bank
    next()
}
</script>

<template>
    <div ref="root" class="w-full flex flex-col">

        <!-- NAV -->
        <nav class="w-full mb-4">
            <ol class="flex items-center gap-4 justify-center">
                <li v-for="(s, i) in steps" :key="s.id" class="flex items-center gap-3">
                    <div class="flex flex-col items-center">
                        <div :class="[
                            'w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-lg font-semibold',
                            currentIndex > i ? 'bg-[var(--dark-blue)] text-white'
                                : currentIndex === i ? 'bg-[var(--dark-blue)] text-white'
                                    : 'bg-gray-200 text-gray-600'
                        ]">
                            {{ i + 1 }}
                        </div>
                        <span class="text-xs mt-1 text-gray-600">{{ s.title }}</span>
                    </div>

                    <div v-if="i < steps.length - 1" class="flex-1 h-0.5 bg-gray-200 w-[40px] sm:w-[120px]"></div>
                </li>
            </ol>
        </nav>

        <!-- CONTENT -->
        <form @submit.prevent="onFinish" ref="formRef" class="p-4 flex flex-col gap-y-10">

            <!-- STEP 1 -->
            <div v-if="currentIndex === 0" class="wizard-step space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div role="button" @click="selectBank('santander')" :class="[
                        'border rounded-xl p-4 flex flex-col items-center gap-2',
                        selectedBank === 'santander'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-700'
                    ]">
                        <AtomSantanderIcon width="50" height="50" />
                        <p>Santander</p>
                    </div>

                    <div role="button" @click="selectBank('banco-do-brasil')" :class="[
                        'border rounded-xl p-4 flex flex-col items-center gap-2',
                        selectedBank === 'banco-do-brasil'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-700'
                    ]">
                        <AtomBrazilBankIcon width="50" height="50" />
                        <p>Banco do Brasil</p>
                    </div>

                    <div role="button" @click="selectBank('bradesco')" :class="[
                        'border rounded-xl p-4 flex flex-col items-center gap-2',
                        selectedBank === 'bradesco'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-700'
                    ]">
                        <AtomBradescoIcon width="50" height="50" />
                        <p>Bradesco</p>
                    </div>

                    <div role="button" @click="selectBank('nubank')" :class="[
                        'border rounded-xl p-4 flex flex-col items-center gap-2',
                        selectedBank === 'nubank'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-700'
                    ]">
                        <AtomNubankIcon width="50" height="50" />
                        <p>Nubank</p>
                    </div>
                </div>
            </div>

            <!-- STEP 2 -->
            <div v-else-if="currentIndex === 1" class="wizard-step flex flex-col items-center gap-8">
                <AtomDragdrop accept=".ofx,application/ofx,application/pdf" :multiple="false"
                    containerClass="w-full h-[260px]" @update:files="onFilesSelected" @files="onFilesSelected">

                    <template #label>
                        <p class="text-sm text-gray-700">Arraste ou clique no botão abaixo</p>
                        <p class="text-xs text-gray-500">Arquivos .OFX ou .PDF</p>
                    </template>

                    <p>Selecionar</p>
                </AtomDragdrop>

                <AtomButton class="px-6 py-2 text-sm" @click="prev">Voltar</AtomButton>
            </div>

            <!-- STEP 3 -->
            <div v-else class="wizard-step flex flex-col items-center gap-6">

                <h3 class="text-sm font-semibold">Confirme sua importação</h3>

                <div class="flex flex-col sm:flex-row justify-center items-center sm:justify-between w-full px-4">
                    <span>{{ selectedFileName || '—' }}</span>

                    <div class="flex items-center p-2 rounded bg-green-600 text-white gap-2">
                        <AtomOkIcon />
                        Concluído
                    </div>
                </div>

                <div class="w-full bg-green-600 h-2 rounded"></div>

                <ul class="list-disc text-sm ml-4 text-gray-700">
                    <li>Banco: {{ selectedBank || '—' }}</li>
                </ul>

                <div class="flex gap-3 w-full justify-end">
                    <AtomButton type="button" class="px-6 bg-gray-200 text-gray-900" @click="reset">
                        Cancelar
                    </AtomButton>

                    <AtomButton type="submit" class="px-6 text-white" :color="'var(--dark-blue)'">
                        {{ props.finishLabel }}
                    </AtomButton>
                </div>
            </div>

        </form>
    </div>
</template>
