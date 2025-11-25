<template>
    <MoleculeModal v-model="modalOpen" :isMobile="isMobile" :showFooter="false" size="lg" height="auto">
        <!-- HEADER -->
        <template #header>
            <h2 class="text-lg font-semibold text-gray-900">
                Conectar conta
            </h2>
        </template>

        <!-- CONTENT -->
        <MoleculeModalAccountConnectContent @close="close" />
    </MoleculeModal>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { MoleculeModal, MoleculeModalAccountConnectContent } from "../molecule";


const props = defineProps({
    modelValue: Boolean,
    isMobile: Boolean
});

const emit = defineEmits(["update:modelValue"]);

const modalOpen = computed({
    get: () => props.modelValue,
    set: (v) => emit("update:modelValue", v)
});

function close() {
    modalOpen.value = false;
}
</script>
