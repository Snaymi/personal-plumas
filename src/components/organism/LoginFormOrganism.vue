<script setup lang="ts">
import { reactive, ref } from "vue";
import AtomInput from "../atoms/AtomInput.vue";
import AtomEmailIcon from "../atoms/icons/AtomEmailIcon.vue";
import AtomLockIcon from "../atoms/icons/AtomLockIcon.vue";
import AtomButton from "../atoms/AtomButton.vue";
import AtomButtonShowPassword from "../atoms/AtomButtonShowPassword.vue";
import AtomDeleteIcon from "../atoms/icons/AtomDeleteIcon.vue";
import AtomLoginIcon from "../atoms/icons/AtomOpenIcon.vue";

// form reativo
const form = reactive({
  email: "",
  password: "",
  remember: false,
});

const props = defineProps<{
  title?: string;
  subtitle?: string;
}>();
// control state senha
const showPassword = ref(false);

// ref para acessar métodos expostos pelo AtomInput (defineExpose({ clear }))
const passwordInputRef = ref<{ clear?: () => void } | null>(null);

// handler chamado quando o ícone emitir 'clear'
function onClearPassword() {
  if (passwordInputRef.value?.clear) {
    passwordInputRef.value.clear();
  } else {
    form.password = "";
  }
}

// loading do submit
const isLoading = ref(false);

async function onSubmit() {
  if (isLoading.value) return; // evita envios múltiplos

  isLoading.value = true;
  try {
    // Simulação de chamada assíncrona. Substitua pela sua chamada real (API/router).
    await new Promise((resolve) => setTimeout(resolve, 1400));

    // Sucesso: exemplo de uso
    console.log("submit", { ...form });

    // Se navegar com router.push, você pode aguardar a navegação antes de setar isLoading = false
    // await router.push('/dashboard')
  } catch (err) {
    console.error(err);
    // Trate erros (mostrar toast, validação, etc.)
  } finally {
    // Desliga o spinner; se sua ação causar navegação full-page, não é necessário.
    isLoading.value = false;
  }
}
</script>
<template>
  <div class="lg:min-h-screen flex items-center justify-center bg-gray-50 p-6">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
      <div class="p-8">
        <!-- Cabeçalho -->
        <h2 class="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">{{ title }}</h2>
        <p class="text-sm text-gray-400 mb-6">{{ subtitle }}</p>

        <!-- Formulário -->
        <form @submit.prevent="onSubmit" class="space-y-5">
          <!-- Email -->
          <label class="block">
            <span class="text-sm font-medium text-gray-700 mb-2 block"
              >E-mail</span
            >

            <AtomInput
              input-class="pl-8 w-full h-20 sm:h-auto"
              v-model="form.email"
              type="email"
              placeholder="Digite seu e-mail"
              required
              aria-label="E-mail"
            >
              <template #icon>
                <AtomEmailIcon class="w-5 h-5" fill-var="--dark-blue" />
              </template>
            </AtomInput>
          </label>

          <!-- Senha -->
          <label class="block">
            <span class="text-sm font-medium text-gray-700 mb-2 block"
              >Senha</span
            >

            <AtomInput
              input-class="pl-8 w-full h-20 sm:h-auto"
              ref="passwordInputRef"
              :show-clear="true"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Digite sua senha"
              required
              aria-label="Senha"
            >
              <template #icon>
                <AtomLockIcon class="w-5 h-5" :fillVar="'--dark-blue'" />
              </template>

              <template #right>
                <AtomButtonShowPassword
                  v-if="form.password"
                  :pressed="showPassword"
                  @update:pressed="showPassword = $event"
                  :showLabelVisually="false"
                  class="mr-5"
                />
              </template>
            </AtomInput>
          </label>

          <!-- Lembrar e Esqueceu -->
          <div class="flex items-center justify-between text-sm">
            <label class="inline-flex items-center space-x-2 text-gray-600">
              <input
                type="checkbox"
                v-model="form.remember"
                class="form-checkbox h-4 w-4 text-gray-500 rounded"
              />
              <span>Lembrar login</span>
            </label>
            <a
              href="/forgot-password"
              class="text-[var(--dark-blue)] hover:underline"
              >Esqueceu sua senha?</a
            >
          </div>

          <!-- Botão de login -->
          <AtomButton
            type="submit"
            color="#022C5C"
            class="w-full relative cursor-pointer"
            :loading="isLoading"
          >
            <AtomLoginIcon
              class="left-13 sm:left-30 lg:left-60 bottom-3 mr-2 absolute"
              :fillVar="'--light-gray'"
            />
            Login
          </AtomButton>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
* {
  font-family: "poppins", sans-serif;
}

h2 {
  font-weight: var(--font-weight-bold);
}
</style>
