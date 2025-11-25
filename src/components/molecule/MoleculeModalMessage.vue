<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { AtomButton, AtomInput } from '@/components/atoms'

const props = withDefaults(
    defineProps<{
        title: string
        description: string
        textConfirm?: string
        textCancel?: string
        showCancel?: boolean
        isExcluir?: boolean
        isRefresh?: boolean
        width?: string
        maxWidth?: string
        bg?: string
        panelClass?: string
        showIcon?: boolean
        confirmHref?: string
        cancelHref?: string
    }>(),
    {
        title: '',
        description: '',
        textConfirm: 'Finalizar',
        textCancel: 'Cancelar',
        showCancel: true,
        isExcluir: false,
        isRefresh: false,
        width: '348px',
        maxWidth: undefined,
        bg: 'var(--color-surface-primary)',
        panelClass: '',
        showIcon: true,
        confirmHref: undefined,
        cancelHref: undefined
    }
)

const router = useRouter()
const emit = defineEmits(['cancel', 'confirm'])
const show = defineModel()

const confirmText = ref('')

const isConfirmEnabled = computed(() => {
    if (props.isExcluir) {
        return confirmText.value.trim().toUpperCase() === 'SIM'
    }
    return true
})

function navigateTo(href?: string) {
    if (!href) return
    // prefira router.push para rotas internas
    if (href.startsWith('/')) {
        try {
            router.push(href)
            return
        } catch (e) {
            // fallback para window.location
        }
    }
    window.location.href = href
}

function handleConfirm() {
    confirmText.value = ''
    emit('confirm')
    // se o pai passou um href, navega para ele
    if (props.confirmHref) navigateTo(props.confirmHref)
}

function handleCancel() {
    confirmText.value = ''
    emit('cancel')
    if (props.cancelHref) navigateTo(props.cancelHref)
}

watch(() => show.value, (val) => {
    if (!val) {
        confirmText.value = ''
    }
})

/* compute panelStyle inside script setup for reactivity */
const panelStyle = computed(() => {
    const s: Record<string, string | undefined> = {}
    if (props.width) s.width = props.width
    if (props.maxWidth) s.maxWidth = props.maxWidth
    if (props.bg) s.background = props.bg
    return s
})
</script>

<template>
    <Transition name="bounce">
        <div v-if="show" class="fixed inset-0 bg-[rgba(0,0,0,.2)] flex items-center justify-center z-[500]"
            role="dialog" aria-modal="true">
            <div :class="['rounded-[8px] p-6 flex flex-col gap-y-10 items-center', props.panelClass]"
                :style="panelStyle">
                <div v-if="props.showIcon" class="flex justify-center">
                    <div class="w-12 h-12 flex items-center justify-center">
                        <slot name="icon" />
                    </div>
                </div>

                <div class="flex flex-col gap-y-3 max-w-[285px]">
                    <p v-if="props.title" class="font-semibold text-title text-center text-[#292E36]">
                        {{ props.title }}
                    </p>

                    <p v-if="props.description" class="font-400 text-subtitle mt-1 text-center text-sm text-[#697B8E]">
                        {{ props.description }}
                    </p>
                </div>

                <AtomInput v-if="props.isExcluir" v-model="confirmText" label="Digite SIM para confirmar:"
                    class="mt-4" />

                <div class="flex gap-3 mt-6 w-full">
                    <!-- Cancelar -->
                    <AtomButton v-if="props.showCancel" bgColor="bg-transparent" textColor="text-primary"
                        class="flex-1 cursor-pointer" @click="handleCancel">
                        {{ props.textCancel }}
                    </AtomButton>

                    <!-- Confirm -->
                    <AtomButton class="flex-1 text-center cursor-pointer" :disabled="!isConfirmEnabled" @click="handleConfirm">
                        {{ props.textConfirm }}
                    </AtomButton>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style>
/* Mantive apenas o estilo do modal; personalizações via props e panelClass */
</style>
