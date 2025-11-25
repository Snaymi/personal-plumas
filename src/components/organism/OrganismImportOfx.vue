<script setup lang="ts">
import { ref } from 'vue'
import MoleculeWizardLibrary from '@/components/molecule/MoleculeWizardLibrary.vue'
import MoleculeModal from '../molecule/MoleculeModal.vue';

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'imported', payload?: any): void
}>()

const isOpen = ref(true)

// wizardRef espera que o Wizard exponha onFinish, reset etc.
const wizardRef = ref<{ onFinish?: () => Promise<void> | void; reset?: () => void; next?: () => void } | null>(null)


function close() {
    try {
        wizardRef.value?.reset?.()
    } catch (e) { /* ignore */ }
    isOpen.value = false
    emit('close')
}

function handleWizardEnd(detail?: any) {
    emit('imported', detail)
    close()
}

function handleWizardError(payload: any) {
    console.error('Wizard error', payload)
}

// handler do botão Confirmar: chama onFinish() se exposto, senão next()
async function onConfirmClick() {
    try {
        if (wizardRef.value?.onFinish) {
            const res = wizardRef.value.onFinish()
            // se onFinish retornar uma Promise, aguarde
            if (res instanceof Promise) await res
        } else if (wizardRef.value?.next) {
            wizardRef.value.next()
        }
    } catch (err) {
        console.error('Erro ao confirmar wizard', err)
    }
}

// Reset do wizard quando o componente for remontado
function resetWizard() {
    try {
        wizardRef.value?.reset?.()
    } catch (e) {
        console.warn('Não foi possível resetar o wizard:', e)
    }
}

// Expor métodos para o componente pai
defineExpose({
    reset: resetWizard
})
</script>

<template>




</template>