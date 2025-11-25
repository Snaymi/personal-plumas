<script lang="ts" setup>
import { ref, watch } from "vue";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";

const props = defineProps<{
    modelValue: boolean;
    maxHeight?: string | number;
}>();

const emit = defineEmits(["update:modelValue", "close"]);

const sheet = ref<any>(null);

watch(
    () => props.modelValue,
    (value) => {
        if (value) sheet.value?.open();
        else sheet.value?.close();
    }
);

function handleClosed() {
    emit("update:modelValue", false);
    emit("close");
}
</script>

<template>
    <vue-bottom-sheet ref="sheet" @closed="handleClosed">
        <div class="bg-white w-full px-6 py-5">
            <div class="px-6 py-4 border-b border-gray-200">
                <slot name="header" />
            </div>

            <div class="mt-4">
                <slot />
            </div>

            <div class="mt-6">
                <slot name="footer" />
            </div>
        </div>
    </vue-bottom-sheet>
</template>

<style>
/* ajuste visual se quiser */
.bottom-sheet__content {
    background: #fff !important;
}
</style>
