<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { LoginImgMobileOrganism, LoginImgDesktopOrganism } from '../organism'
import {
  AtomEmailIcon,
  AtomBackIcon,
  AtomButton,
  AtomInput,
  AtomOpenIcon,
} from '../atoms'

import { MoleculeModal } from '../molecule'

const router = useRouter()

const form = reactive({
  email: '',
})

const isMobile = ref(false)

onMounted(() => {
  const check = () =>
    isMobile.value =
    (window.innerWidth || document.documentElement.clientWidth) <= 640

  check()
  window.addEventListener('resize', check)
})

const showModal = ref(false)

function onModalConfirm() {
  showModal.value = false
  window.location.href = '/recovery'
}

function onModalCancel() {
  showModal.value = false
}

function goHome() {
  router.push({ path: '/' })
}
</script>

<template>
  <div class="flex h-screen flex-col lg:flex-row overflow-hidden">

    <!-- MOBILE/TABLET HEADER -->
    <div class="w-full lg:hidden flex item-center justify-center bg-[#012956] relative">
      <div class="relative overflow-hidden">
        <LoginImgMobileOrganism />
      </div>
    </div>

    <!-- DESKTOP IMAGE -->
    <div class="hidden lg:flex w-full lg:flex-1 lg:h-full">
      <LoginImgDesktopOrganism />
    </div>

    <!-- FORMULÁRIO -->
    <div class="
        w-full lg:flex-1 
        rounded-t-3xl lg:rounded-none 
        -mt-6 lg:mt-0
        z-10
        px-6 py-10
        flex justify-center
        h-full items-center
        relative
        overflow-y-auto
      ">
      <div class="flex flex-col justify-center w-full max-w-md">

        <!-- BOTÃO VOLTAR -->
        <button type="button" @click="goHome"
          class="flex items-center gap-1 text-[var(--dark-blue)] text-sm font-medium mb-6 w-fit absolute top-10 lg:top-5 lg:right-30">
          <AtomBackIcon class="w-4 h-4" />
          Voltar
        </button>

        <!-- TÍTULO -->
        <h2 class="text-2xl text-[var(--light-black)] font-bold mb-2">Esqueceu sua senha?</h2>
        <p class="text-sm text-gray-500 mb-6">
          Fique tranquilo(a)! Enviaremos um e-mail para redefini-la.
        </p>

        <!-- CAMPO EMAIL -->
        <label class="text-sm mb-1">E-mail:</label>
        <AtomInput v-model="form.email" type="email" placeholder="Digite seu e-mail" class="w-full mb-6"
          input-class="pl-8 w-full h-20 sm:h-auto" aria-label="E-mail">
          <template #icon>
            <AtomEmailIcon class="w-5 h-5" fill-var="--dark-blue" />
          </template>
        </AtomInput>

        <!-- BOTÃO ENVIAR -->
        <AtomButton type="button" color="#022C5C" class="w-full relative cursor-pointer" @click="showModal = true">
          <template #icon>
            <AtomOpenIcon class="left-20 lg:left-35 bottom-3 mr-2 absolute" :fillVar="'--light-gray'" />
          </template>
          Enviar
        </AtomButton>
      </div>
    </div>
  </div>

  <!-- ========================= -->
  <!--     ÚNICO MODAL (global)  -->
  <!-- ========================= -->
  <MoleculeModal v-model="showModal" :isMobile="isMobile" :showFooter="true" height = "auto">
    <!-- HEADER -->
    <template #header>
      <div class="flex flex-col items-center text-center">
        <AtomEmailIcon class="w-12 h-12 mb-4" fill-var="--light-green" />
        <h2 class="text-xl font-semibold text-gray-800">
          Email enviado com sucesso!
        </h2>
      </div>
    </template>

    <!-- CONTENT -->
    <div class="text-center text-gray-600 px-4">
      Se este e-mail estiver em nossa base de dados, iremos enviar um link para redefinição de sua senha.
    </div>

    <!-- FOOTER -->
    <template #footer>
      <AtomButton class="w-full" color="#022C5C" @click="onModalConfirm">
        Finalizar
      </AtomButton>
    </template>

  </MoleculeModal>
</template>
