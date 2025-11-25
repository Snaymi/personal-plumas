<script lang="ts" setup>
import { useRouter } from 'vue-router'
import LoginForm from "../organism/LoginFormOrganism.vue";
import LoginImgMobile from "../organism/LoginImgMobileOrganism.vue";
import LoginImgDesktop from "../organism/LoginImgDesktopOrganism.vue";

const router = useRouter()

function go(path: string) {
  router.push(path)
}

</script>

<template>
  <div class="flex h-screen flex-col lg:flex-row overflow-hidden">

    <!-- IMAGEM MOBILE/TABLET -->
    <div class="w-full flex justify-center lg:hidden bg-[#012956]">
      <LoginImgMobile />
    </div>

    <!-- IMAGEM DESKTOP -->
    <div class="hidden lg:flex w-screen lg:flex-1 lg:h-full relative">
      <div class="absolute p-3 flex flex-col gap-y-2">
        <a @click.prevent="go('/admin')" class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-2  rounded">Tela da Administração</a>
        <a @click.prevent="go('/import')" class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-2  rounded">Tela de Importação</a>
        <a @click.prevent="go('/registerusers')" class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-2  rounded">Tela para Registrar Usuários</a>
        <a @click.prevent="go('/registerfunctions')" class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-2  rounded">Tela para Registrar Funções</a>
        <a @click.prevent="go('/registercurrentaccount')" class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-2  rounded">Tela Registrar Conta Atual</a>
        <a @click.prevent="go('/registerbanks')" class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-2  rounded">Tela para Registrar Bancos</a>
        <a @click.prevent="go('/registeraccountingaccounts')" class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-2  rounded">Tela para Registrar Contas</a>
      </div>
      <LoginImgDesktop />
    </div>

    <!-- FORMULÁRIO -->
    <div class="
        w-full lg:flex-1 
        bg-white 
        rounded-t-3xl lg:rounded-none 
        -mt-6 lg:mt-0
         z-10
        px-6 py-10
        flex justify-center
      ">
      <LoginForm title="Seja Bem-vindo!"
        subtitle="Preencha os campos abaixo corretamente para utilizar nossa plataforma com segurança" />
    </div>
  </div>
</template>
