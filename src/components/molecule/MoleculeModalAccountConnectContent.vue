<template>
    <div class="overflow-y-auto max-h-[80vh] pr-1 sm:pr-2">

        <!-- STEP 1 — ESCOLHER BANCO -->
        <div v-if="step === 1" class="border border-gray-200 rounded-xl p-4 sm:p-6">

            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h3 class="text-gray-900 font-semibold text-lg sm:text-xl">
                    Conectar conta
                </h3>

                <AtomButton color="#E6EAEF" textColor="#022c5c" size="sm" class="w-full sm:w-auto justify-center"
                    @click="openConnectedAccounts">
                    Contas conectadas
                </AtomButton>
            </div>

            <ul class="flex flex-col gap-4">
                <li v-for="bank in bankList" :key="bank.id"
                    class="flex items-center justify-between py-3 px-2 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition"
                    @click="selectBank(bank)">
                    <div class="flex items-center gap-3">
                        <component :is="getBankIcon(bank.id)" class="w-10 h-10 rounded-md" />

                        <div>
                            <p class="text-gray-900 font-medium">{{ bank.name }}</p>
                            <p class="text-gray-500 text-sm">{{ bank.description }}</p>
                        </div>
                    </div>

                    <span class="text-gray-400 text-xl">›</span>
                </li>
            </ul>

            <div class="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                <p class="text-sm text-blue-900">
                    Banco não listado? Volte e clique no botão <strong>Carregar</strong>
                    para enviar seu extrato.
                </p>
            </div>
        </div>

        <!-- STEP 2 — CONFIRMAÇÃO -->
        <div v-else-if="step === 2" class="border border-gray-200 rounded-xl p-6 text-center">

            <h3 class="text-gray-900 font-semibold text-lg sm:text-xl">
                Conexão Plumas Contábil com
                <span class="text-blue-700 underline">{{ selectedBank.name }}</span>
            </h3>

            <div class="flex items-center justify-center gap-6 my-8">
                <div class="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center">
                    <AtomPlumasIcon />
                </div>

                <span class="text-3xl text-gray-400">⇄</span>

                <component :is="getBankIcon(selectedBank.id)" class="w-16 h-16 rounded-md" />
            </div>

            <div class="flex items-start gap-3 mb-8 text-left">
                <div class="text-blue-600 text-xl leading-none">ℹ️</div>

                <p class="text-gray-700 text-sm">
                    Ao conectar sua conta, apenas seu extrato bancário será compartilhado.
                    Você pode desconectar quando quiser.
                </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 justify-between mt-6">
                <AtomButton color="#E6EAEF" textColor="#022C5C" class="w-full sm:w-auto px-10" @click="resetStep">
                    Voltar
                </AtomButton>

                <AtomButton color="#022C5C" textColor="white" class="w-full sm:w-auto px-10" @click="startConnecting">
                    Prosseguir com conexão
                </AtomButton>
            </div>
        </div>

        <!-- STEP 3 — LOADING -->
        <div v-else-if="step === 3" class="border border-gray-200 rounded-xl p-10 text-center">

            <svg class="animate-spin w-12 h-12 text-blue-600 mx-auto mb-6" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke-width="4" fill="none" />
                <path class="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>

            <h3 class="text-gray-900 font-semibold text-lg">
                Redirecionando para {{ selectedBank.name }}
            </h3>

            <p class="text-gray-600 text-sm mt-1">
                Você está sendo redirecionado com segurança pelo
                <strong>Open Finance</strong>.
            </p>

            <div class="w-32 h-10 bg-gray-200 rounded-md mt-4 mx-auto">
                <AtomOpenFinanceIcon />
            </div>
        </div>

        <!-- STEP 100 — CONTAS CONECTADAS -->
        <div v-else-if="step === 100" class="border border-gray-200 rounded-xl p-6">

            <h3 class="text-xl font-semibold text-gray-900">Contas conectadas</h3>
            <p class="text-gray-600 text-sm mb-8">
                Gerencie suas conexões com liberdade.
            </p>

            <ul class="flex flex-col divide-y divide-gray-200">
                <li v-for="acc in connectedAccounts" :key="acc.id" class="py-4 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <component :is="getBankIcon(acc.id)" class="w-10 h-10 rounded-md" />

                        <div>
                            <p class="text-gray-900 font-medium">{{ acc.name }}</p>
                            <p class="text-gray-500 text-sm">Ag: 0001 / Cc: 1234567-8</p>
                        </div>
                    </div>

                    <AtomButton color="#FF4D4D" textColor="white" size="sm" class="px-6"
                        @click="openConfirmDisconnect(acc)">
                        Desconectar
                    </AtomButton>
                </li>
            </ul>

            <button class="mt-8 text-blue-700 underline mx-auto block" @click="step = 1">
                Voltar
            </button>
        </div>

        <!-- STEP 101 — CONFIRMAR DESCONECTAR -->
        <div v-else-if="step === 101" class="border border-gray-200 rounded-xl p-6">

            <h3 class="text-xl font-semibold text-gray-900">
                Tem certeza que deseja desconectar a conta?
            </h3>

            <p class="text-gray-600 text-sm mt-1">
                Essa ação apenas interrompe a sincronização.
            </p>

            <div class="flex items-center gap-3 mt-6 border-b pb-4">
                <component :is="getBankIcon(disconnectTarget.id)" class="w-12 h-12 rounded-md" />
                <div>
                    <p class="text-gray-900 font-medium">{{ disconnectTarget.name }}</p>
                    <p class="text-gray-500 text-sm">Ag: 0001 / Cc: 1234567-8</p>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 mt-8 justify-between">
                <AtomButton color="#E6EAEF" textColor="#022C5C" class="w-full sm:w-auto px-10" @click="step = 100">
                    Voltar
                </AtomButton>

                <AtomButton color="#022C5C" textColor="white" class="w-full sm:w-auto px-10"
                    @click="startDisconnecting">
                    Desconectar
                </AtomButton>
            </div>
        </div>

        <!-- STEP 102 — LOADING DESCONECTAR -->
        <div v-else-if="step === 102" class="border border-gray-200 rounded-xl p-10 text-center">

            <svg class="animate-spin w-12 h-12 text-blue-600 mx-auto" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" fill="none" />
                <path class="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>

            <h3 class="text-gray-900 font-semibold text-lg mt-6">
                Desconectando sua conta
            </h3>

            <p class="text-gray-600 text-sm mt-1">
                Aguarde um instante...
            </p>
        </div>

        <!-- STEP 103 — SUCESSO DESCONECTAR -->
        <div v-else-if="step === 103" class="border border-gray-200 rounded-xl p-10 text-center">

            <div
                class="w-14 h-14 mx-auto mb-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl">
                ✓
            </div>

            <h3 class="text-gray-900 font-semibold text-lg">
                Conta desconectada com sucesso!
            </h3>

            <p class="text-gray-600 text-sm mt-1">
                Sincronização encerrada.
            </p>

            <AtomButton color="#022C5C" textColor="white" class="px-10 mt-6" @click="emitClose">
                Finalizar
            </AtomButton>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
    AtomBradescoIcon,
    AtomBrazilBankIcon,
    AtomItauIcon,
    AtomNubankIcon,
    AtomSicoobIcon,
    AtomPlumasIcon,
    AtomOpenFinanceIcon
} from "../atoms";
import AtomButton from "../atoms/AtomButton.vue";

const emit = defineEmits(["close"]);

const step = ref(1);
const selectedBank = ref<any>(null);

const connectedAccounts = ref([
    { id: "nubank", name: "Nubank" },
    { id: "bradesco", name: "Bradesco" },
    { id: "bb", name: "Banco do Brasil" },
    { id: "itau", name: "Itaú" },
]);

const disconnectTarget = ref<any>(null);

const emitClose = () => {
    step.value = 1;
    selectedBank.value = null;
    emit("close");
};

const selectBank = (bank: any) => {
    selectedBank.value = bank;
    step.value = 2;
};

const startConnecting = () => {
    step.value = 3;
    setTimeout(() => emitClose(), 3000);
};

const resetStep = () => {
    step.value = 1;
    selectedBank.value = null;
};

const openConnectedAccounts = () => {
    step.value = 100;
};

const openConfirmDisconnect = (acc: any) => {
    disconnectTarget.value = acc;
    step.value = 101;
};

const startDisconnecting = () => {
    step.value = 102;
    setTimeout(() => {
        step.value = 103;
    }, 2000);
};

const bankList = [
    { id: "nubank", name: "Nubank", description: "Nu Pagamentos S.A." },
    { id: "itau", name: "Itaú", description: "Itaú Unibanco S.А." },
    { id: "bradesco", name: "Bradesco", description: "Banco Bradesco S.А." },
    { id: "bb", name: "Banco do Brasil", description: "Banco do Brasil S.А." },
    { id: "sicoob", name: "Sicoob", description: "Banco Cooperativo S.А." },
];

function getBankIcon(id: string) {
    switch (id) {
        case "nubank": return AtomNubankIcon;
        case "itau": return AtomItauIcon;
        case "bradesco": return AtomBradescoIcon;
        case "bb": return AtomBrazilBankIcon;
        case "sicoob": return AtomSicoobIcon;
        default: return null;
    }
}
</script>
