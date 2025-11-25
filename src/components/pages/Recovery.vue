<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import {
  AtomInput,
  AtomLockIcon,
  AtomBackIcon,
  AtomButton,
  AtomOpenIcon,
  AtomButtonShowPass,
  AtomDeleteIcon,
  AtomKeyIcon,
} from '@/components/atoms'

import LoginImgMobileOrganism from '../organism/LoginImgMobileOrganism.vue'
import LoginImgDesktopOrganism from '../organism/LoginImgDesktopOrganism.vue'

import MoleculeModal from '../molecule/MoleculeModal.vue'
const router = useRouter()

/* Detectar mobile */
const isMobile = ref(false)

onMounted(() => {
  const check = () =>
    (isMobile.value = (window.innerWidth || document.documentElement.clientWidth) <= 640)

  check()
  window.addEventListener('resize', check)
})

/* Form */
const form = reactive({
  password: '',
})

const confirmPassword = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const passwordInputRef = ref(null)
const confirmInputRef = ref(null)

/* Modal */
const showModal = ref(false)

function goHome() {
  router.push('/')
}

function onModalConfirm() {
  showModal.value = false
  router.push('/')
}

function onModalCancel() {
  showModal.value = false
}

function onClearPassword() {
  if (passwordInputRef.value?.clear) passwordInputRef.value.clear()
  else form.password = ''
}

function onClearConfirmPassword() {
  if (confirmInputRef.value?.clear) confirmInputRef.value.clear()
  else confirmPassword.value = ''
}

async function onSubmit() {
  if (isLoading.value) return

  errorMessage.value = ''

  if (!form.password || !confirmPassword.value) {
    errorMessage.value = 'Preencha os dois campos de senha'
    return
  }
  if (form.password.length < 6) {
    errorMessage.value = 'A senha precisa ter pelo menos 6 caracteres'
    return
  }
  if (form.password !== confirmPassword.value) {
    errorMessage.value = 'As senhas não coincidem'
    return
  }

  isLoading.value = true
  await new Promise(r => setTimeout(r, 1000))
  isLoading.value = false

  showModal.value = true
}
</script>

<template>
  <div class="flex h-screen flex-col lg:flex-row overflow-hidden">

    <!-- MOBILE IMAGE -->
    <div class="w-full lg:hidden flex justify-center bg-[#012956] relative">
      <LoginImgMobileOrganism />
    </div>

    <!-- DESKTOP IMAGE -->
    <div class="hidden lg:flex w-full lg:flex-1 lg:h-full">
      <LoginImgDesktopOrganism />
    </div>

    <!-- FORM CARD -->
    <div
      class="
        w-full lg:flex-1
        bg-white
        rounded-t-3xl lg:rounded-none
        -mt-6 lg:mt-0
        z-10
        px-6 py-10
        flex justify-center
        h-full items-center
        relative
        overflow-y-auto
      "
    >
      <div class="flex flex-col justify-center w-full max-w-md">

        <!-- BACK -->
        <button
          type="button"
          @click="goHome"
          class="flex items-center gap-1 text-[var(--dark-blue)] text-sm font-medium mb-6 w-fit absolute top-10 lg:top-5 lg:right-30"
        >
          <AtomBackIcon class="w-4 h-4" />
          Voltar
        </button>

        <!-- TITLE -->
        <h2 class="text-2xl text-[var(--light-black)] font-bold mb-2">Redefina sua senha</h2>
        <p class="text-sm text-gray-500 mb-6">
          Insira a nova senha desejada para login.
        </p>

        <!-- FORM -->
        <form @submit.prevent="onSubmit" class="space-y-5">

          <!-- SENHA -->
          <div>
            <label class="text-sm font-medium text-gray-700 mb-2 block">Senha:</label>

            <AtomInput
              ref="passwordInputRef"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              input-class="pl-8 w-full h-20 sm:h-auto"
              placeholder="Digite sua nova senha"
            >
              <template #icon>
                <AtomLockIcon class="w-5 h-5" fill-var="--dark-blue" />
              </template>

              <template #right>
                <span @click.stop>
                  <AtomButtonShowPass v-model:pressed="showPassword" :showLabelVisually="false" class="mr-2" />
                </span>
                <span @click.stop>
                  <AtomDeleteIcon class="ml-1" @clear="onClearPassword" />
                </span>
              </template>
            </AtomInput>
          </div>

          <!-- CONFIRMAR -->
          <div>
            <label class="text-sm font-medium text-gray-700 mb-2 block">Confirme a senha:</label>

            <AtomInput
              ref="confirmInputRef"
              v-model="confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              input-class="pl-8 w-full h-20 sm:h-auto"
              placeholder="Confirme a sua nova senha"
            >
              <template #icon>
                <AtomLockIcon class="w-5 h-5" fill-var="--dark-blue" />
              </template>

              <template #right>
                <span @click.stop>
                  <AtomButtonShowPass v-model:pressed="showPassword" :showLabelVisually="false" class="mr-2" />
                </span>
                <span @click.stop>
                  <AtomDeleteIcon class="ml-1" @clear="onClearConfirmPassword" />
                </span>
              </template>
            </AtomInput>
          </div>

          <!-- ERRO -->
          <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>

          <!-- BOTÃO -->
          <AtomButton type="submit" color="#022C5C" class="w-full relative" :loading="isLoading">
            <AtomOpenIcon class="left-20 lg:left-35 bottom-3 mr-2 absolute" fill-var="--light-gray" />
            Confirmar
          </AtomButton>
        </form>
      </div>
    </div>
  </div>

  <!-- =============================== -->
  <!--     MODAL MESSAGE ADAPTADO     -->
  <!-- =============================== -->
  <MoleculeModal
  v-model="showModal"
  :isMobile="isMobile"
  :showFooter="true"
  size="sm"
  height="auto"
  
>
  <!-- HEADER -->
  <template #header>
    <div class="flex flex-col items-center text-center w-full">
      <slot name="icon">
        <AtomKeyIcon class="w-12 h-12 mb-3" fill-var="--light-green" />
      </slot>

      <h3 class="text-lg font-semibold text-gray-800">
        Senha redefinida com sucesso!
      </h3>
    </div>
  </template>

  <!-- CONTENT -->
  <div class="text-gray-600 text-sm leading-relaxed text-center mt-2">
    Efetue o login na plataforma com sua nova senha.
  </div>

  <!-- FOOTER -->
  <template #footer>
    <div class="flex justify-center mt-6">
      <AtomButton
        class="px-6 py-3 bg-[var(--dark-blue)] text-white rounded-md"
        @click="onModalConfirm"
      >
        Finalizar
      </AtomButton>
    </div>
  </template>
</MoleculeModal>

</template>

<style scoped>
* {
  font-family: 'poppins', sans-serif;
}
</style>
