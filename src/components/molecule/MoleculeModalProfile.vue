<template>
    <MoleculeModal v-model="open" :isMobile="isMobile" height="xl" size="lg" :showFooter="false">
        <!-- HEADER -->
        <template #header>
            <div class="flex items-center justify-between w-full">
                <h3 class="text-lg font-semibold text-gray-800">
                    Editar perfil
                </h3>

                <AtomCloseActionIcon class="cursor-pointer" @click="close" />
            </div>
        </template>

        <!-- CONTENT -->
        <MoleculeModalProfileContent :userName="userName" :avatarUrl="avatarUrl" @save="emit('save')"
            @update:userName="emit('update:userName', $event)" @changeAvatar="emit('changeAvatar')"
            @openCompanyInfo="emit('openCompanyInfo')" />
    </MoleculeModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MoleculeModal, MoleculeModalProfileContent } from '../molecule'
import { AtomCloseActionIcon } from '../atoms'

const props = defineProps({
    modelValue: Boolean,
    userName: String,
    avatarUrl: String,
    isMobile: Boolean
})

const emit = defineEmits([
    'update:modelValue',
    'update:userName',
    'save',
    'changeAvatar',
    'openCompanyInfo'
])

const open = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v)
})

function close() {
    emit('update:modelValue', false)
}
</script>
