<template>
    <div class="flex flex-col w-full max-h-[75vh] overflow-y-auto pr-2">

        <!-- ===================== RESUMO ===================== -->
        <template v-if="mode === 'resumo'">
            <!-- HEADER -->
            <div class="flex items-center justify-between w-full mb-6">
                <p class="text-lg font-semibold text-[#292E36]">Editar perfil</p>
                <AtomCloseActionIcon @click="emit('close')" class="cursor-pointer" />
            </div>

            <!-- AVATAR -->
            <div class="relative w-28 h-28 mx-auto mb-6">
                <img :src="avatarUrl" class="w-28 h-28 rounded-full object-cover border-4 border-white shadow" />

                <button class="absolute bottom-1 right-1 w-9 h-9 flex items-center justify-center
                 bg-white rounded-full shadow hover:bg-gray-100 transition" @click="onEditAvatar">
                    <AtomEditIcon />
                </button>
            </div>

            <!-- Input username -->
            <div class="w-full mb-8">
                <AtomInput v-model="username" label="Usuário:" placeholder="Digite seu nome" clearable />
            </div>

            <!-- FOOTER -->
            <div class="flex gap-3 w-full pt-4">
                <AtomButton color="bg-transparent" textColor="#022C5C" class="flex-1" @click="emit('close')">
                    Cancelar
                </AtomButton>

                <AtomButton class="flex-1" @click="onSaveResumo">
                    Salvar
                </AtomButton>
            </div>
        </template>

        <!-- ===================== EDITAR ===================== -->
        <template v-else>
            <!-- HEADER -->
            <div class="flex items-center justify-between w-full mb-6">
                <p class="text-lg font-semibold text-[#292E36]">Editar perfil</p>
                <AtomCloseActionIcon @click="emit('close')" class="cursor-pointer" />
            </div>

            <!-- AVATAR -->
            <div class="relative w-28 h-28 mx-auto mb-4">
                <img :src="avatarUrl" class="w-28 h-28 rounded-full object-cover border-4 border-white shadow" />

                <button class="absolute bottom-1 right-1 w-9 h-9 flex items-center justify-center
                 bg-white rounded-full shadow hover:bg-gray-100 transition" @click="emit('changeAvatar')">
                    <AtomEditIcon />
                </button>
            </div>

            <!-- VOLTAR PARA RESUMO -->
            <button class="text-sm underline text-[#0B3D6D] hover:text-blue-900 mb-4" @click="voltarParaResumo">
                ◀ Voltar para o resumo
            </button>

            <!-- TABS -->
            <div class="w-full flex justify-center border-b border-gray-200">
                <button class="px-6 py-2 text-sm" :class="activeTab === 'dados'
                        ? 'text-[#0B3D6D] border-b-2 border-[#0B3D6D]'
                        : 'text-gray-500'
                    " @click="activeTab = 'dados'">
                    Dados
                </button>

                <button class="px-6 py-2 text-sm" :class="activeTab === 'endereco'
                        ? 'text-[#0B3D6D] border-b-2 border-[#0B3D6D]'
                        : 'text-gray-500'
                    " @click="activeTab = 'endereco'">
                    Endereço
                </button>

                <button class="px-6 py-2 text-sm" :class="activeTab === 'matriz'
                        ? 'text-[#0B3D6D] border-b-2 border-[#0B3D6D]'
                        : 'text-gray-500'
                    " @click="activeTab = 'matriz'">
                    Matriz & Filial
                </button>
            </div>

            <!-- SCROLLABLE CONTENT -->
            <div class="flex-1 min-h-0 w-full mt-6 overflow-y-auto pr-2">

                <div class="grid grid-cols-2 gap-6">

                    <!-- TAB: DADOS -->
                    <template v-if="activeTab === 'dados'">
                        <AtomInput label="Número da empresa:" v-model="username" />
                        <AtomInput label="Razão Social:" v-model="razaoSocial" />
                        <AtomInput label="Nome fantasia:" v-model="nomeFantasia" />
                        <AtomInput label="CNPJ:" v-model="cnpj" />
                    </template>

                    <!-- TAB: ENDEREÇO -->
                    <template v-else-if="activeTab === 'endereco'">
                        <AtomInput label="CEP:" v-model="cep" />
                        <AtomInput label="Logradouro:" v-model="logradouro" />
                        <AtomInput label="Número:" v-model="numero" />
                        <AtomInput label="Complemento:" v-model="complemento" />
                        <AtomInput label="Bairro:" v-model="bairro" />
                        <AtomInput label="Cidade:" v-model="cidade" />
                        <AtomInput label="Estado:" v-model="estado" />
                    </template>

                    <!-- TAB: MATRIZ -->
                    <template v-else>
                        <AtomInput label="Tipo de empresa:" v-model="tipoEmpresa" />
                        <AtomInput label="Filiais:" v-model="filialSelecionada" placeholder="Clique para selecionar" />
                    </template>

                </div>
            </div>

            <!-- FOOTER -->
            <div class="flex gap-3 w-full pt-6 mt-6 border-t border-gray-200">
                <AtomButton color="bg-transparent" textColor="#022C5C" class="flex-1" @click="emit('close')">
                    Cancelar
                </AtomButton>

                <AtomButton class="flex-1" @click="emit('save')">
                    Salvar
                </AtomButton>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import {
    AtomButton,
    AtomCloseActionIcon,
    AtomEditIcon,
    AtomInput
} from "@/components/atoms"

const props = defineProps({
    userName: String,
    avatarUrl: String
})

const emit = defineEmits([
    "save",
    "changeAvatar",
    "update:userName",
    "openCompanyInfo",
    "close"
])

/* Estado */
const mode = ref<"resumo" | "editar">("resumo")
const activeTab = ref<"dados" | "endereco" | "matriz">("dados")

/* Forms */
const username = ref(props.userName)
const cnpj = ref("12.345.678/0001-90")
const razaoSocial = ref("Soluções Integradas Vale do Sol Ltda.")
const nomeFantasia = ref("ValeTech")

const cep = ref("04567-890")
const logradouro = ref("Rua das Palmeiras")
const numero = ref("1234")
const complemento = ref("Sala 502")
const bairro = ref("Jardim Europa")
const cidade = ref("São Paulo")
const estado = ref("SP")

const tipoEmpresa = ref("Filial")
const filialSelecionada = ref("")

watch(
    () => props.userName,
    val => (username.value = val)
)

function onSaveResumo() {
    emit("update:userName", username.value)
    emit("save")
}

function onEditAvatar() {
    mode.value = "editar"
}

function voltarParaResumo() {
    mode.value = "resumo"
}
</script>
