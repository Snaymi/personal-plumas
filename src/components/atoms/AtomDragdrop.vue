<template>
    <div ref="root" :class="['atom-dragdrop', containerClass]" @dragenter.prevent="onDragEnter"
        @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
        <input ref="input" type="file" :accept="accept" :multiple="multiple" class="hidden" @change="onInputChange" />

        <div :class="[
            'w-full mx-auto h-full rounded-2xl border-2 flex flex-col items-center justify-center gap-3 p-6 transition-colors',
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white',
            disabled ? 'opacity-60 pointer-events-none' : 'cursor-pointer'
        ]" role="button" tabindex="0" @click="openPicker" @keydown.enter.prevent="openPicker"
            @keydown.space.prevent="openPicker">
            <!-- Icon / slot -->
            <div class="flex flex-col items-center text-center">


                <slot name="label">
                    <p class="text-sm font-medium text-gray-700">Arraste ou clique no botão abaixo</p>
                    <p class="text-xs text-gray-500 mt-1">Arquivos no formato {{ acceptLabel }}</p>
                </slot>
            </div>

            <div class="pt-2">
                <button type="button"
                    class="px-4 py-2 rounded-md border border-gray-300  text-sm hover:-translate-y-1 active:translate-0 focus:outline-none cursor-pointer "
                    @click.stop.prevent="openPicker" :disabled="disabled">
                    <slot name="button">
                        <AtomCloudFolderIcon />
                        Selecionar
                    </slot>
                </button>
            </div>

            <p v-if="hint" class="text-xs text-gray-400 mt-2">{{ hint }}</p>
            <p v-if="fileCountLabel" class="text-xs text-gray-600 mt-1">{{ fileCountLabel }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineEmits, defineProps } from 'vue'
import AtomCloudFolderIcon from './icons/AtomCloudFolderIcon.vue';

const props = defineProps({
    // Default updated to include PDF (extension and mime). Parent can still override by passing accept prop.
    accept: { type: String, default: '.ofx,.pdf,application/ofx,application/pdf,application/octet-stream' },
    multiple: { type: Boolean, default: false },
    // optional class to add to container wrapper (outer)
    containerClass: { type: [String, Object, Array], default: '' },
    disabled: { type: Boolean, default: false },
    hint: { type: String, default: '' }
})

const emit = defineEmits<{
    (e: 'update:files', files: FileList | null): void
    (e: 'files', files: FileList | File[]): void
    (e: 'error', msg: string): void
}>()

const root = ref<HTMLElement | null>(null)
const input = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const lastFiles = ref<FileList | null>(null)

const acceptLabel = computed(() => {
    // show first extension token from accept for the label (keeps your original behavior)
    if (!props.accept) return 'qualquer formato'
    const first = props.accept.split(',').map(s => s.trim()).find(Boolean) ?? ''
    return first.replace(/^(.*\/)?/, '').replace(/\./g, '').toUpperCase()
})

const fileCountLabel = computed(() => {
    if (!lastFiles.value || lastFiles.value.length === 0) return ''
    return `${lastFiles.value.length} arquivo(s) selecionado(s)`
})

function openPicker() {
    if (props.disabled) return
    input.value?.click()
}

function onInputChange(e: Event) {
    const target = e.target as HTMLInputElement
    const files = target.files
    handleFiles(files)
    // keep lastFiles and emit
}

function onDragEnter(ev: DragEvent) {
    if (props.disabled) return
    isDragging.value = true
}

function onDragOver(ev: DragEvent) {
    if (props.disabled) return
    // allow drop
    ev.dataTransfer!.dropEffect = 'copy'
    isDragging.value = true
}

function onDragLeave(ev: DragEvent) {
    if (props.disabled) return
    // ensure we only clear when leaving the root
    // use relatedTarget check when possible, fallback to timeout
    const to = ev.relatedTarget as Node | null
    if (!to || !root.value?.contains(to)) {
        isDragging.value = false
    }
}

function onDrop(ev: DragEvent) {
    if (props.disabled) return
    isDragging.value = false
    const dt = ev.dataTransfer
    if (!dt) {
        emit('error', 'Drag event sem dataTransfer')
        return
    }
    const files = dt.files
    handleFiles(files)
}

function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) {
        emit('error', 'Nenhum arquivo selecionado')
        lastFiles.value = null
        emit('update:files', null)
        return
    }
    // validation using accept prop (supports extensions and mime types)
    const accepted = props.accept ? props.accept.split(',').map(s => s.trim().toLowerCase()) : []
    if (accepted.length && accepted[0] !== '') {
        const invalid = Array.from(files).some(f => {
            const ext = '.' + (f.name.split('.').pop() ?? '').toLowerCase()
            const mime = (f.type || '').toLowerCase()
            const matched = accepted.some(a => a === ext || a === mime || a === '*/*' || a === 'application/octet-stream')
            return !matched
        })
        if (invalid) {
            // emit but don't block; caller can decide
            emit('error', 'Algum arquivo possui formato não aceito')
        }
    }

    // save and emit
    lastFiles.value = files
    emit('update:files', files)
    // if single, emit File[] for convenience
    emit('files', props.multiple ? Array.from(files) : [files[0]])
}

watch(() => props.disabled, val => {
    if (val) {
        isDragging.value = false
    }
})
</script>

<style scoped>
.atom-dragdrop :focus {
    outline: none;
}

.atom-dragdrop .hidden {
    display: none;
}
</style>
