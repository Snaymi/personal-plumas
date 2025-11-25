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
      <div class="absolute gap-x-1 flex text-sm">
        <div class="flex flex-col gap-y-2">
          <a @click.prevent="go('/admin')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-2  rounded">Tela
            da Administração</a>
          <a @click.prevent="go('/import')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-2  rounded">Tela
            de Importação</a>
          <a @click.prevent="go('/registerusers')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-2  rounded">Tela
            para Registrar Usuários</a>
          <a @click.prevent="go('/registerfunctions')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-2  rounded">Tela
            para Registrar Funções</a>
          <a @click.prevent="go('/registercurrentaccount')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-2  rounded">Tela
            Registrar Conta Atual</a>
        </div>
        <div class="gap-y-2 flex flex-col">
          <a @click.prevent="go('/registerbanks')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-2  rounded">Tela
            para Registrar Bancos</a>
          <a @click.prevent="go('/registeraccountingaccounts')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-2  rounded">Tela
            para Registrar Contas</a>
          <a @click.prevent="go('/registeraccountingentries')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-2  rounded">Tela
            para Registrar entradas na conta</a>
          <a @click.prevent="go('/registercompanies')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-2  rounded">Tela
            para Registrar Empresas</a>
          <a @click.prevent="go('/registercategories')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-2  rounded">Tela
            para Registrar Categorias</a>
        </div>
        <div class="gap-y-2 flex flex-col">

          <a @click.prevent="go('/registerasks')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-1  rounded">Tela
            para Registrar Perguntas</a>
          <a @click.prevent="go('/registerreleasecode')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-1  rounded">Tela
            de Código</a>
          <a @click.prevent="go('/registersmartmanagementindicators')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-1  rounded">Tela
            para Indicadores</a>
          <a @click.prevent="go('/registerkeywordsnf')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-1  rounded">Tela
            para Chaves</a>
          <a @click.prevent="go('/registersystemparameters')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-1  rounded">Tela
            para Parâmetros</a>
          <a @click.prevent="go('/registerreport')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-1  rounded">Tela
            para Reportes</a>





        </div>
        <div>
        </div>
      </div>
        <LoginImgDesktop />

          <div class="absolute flex flex-col left-0 bottom-0">
            <h2 class="text-white">Telas de cliente</h2>
            <div class="flex flex-col gap-x-2">
              <a @click.prevent="go('/clientsubscriptions')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-1  rounded">Tela
            para Inscrições de cliente</a>
            <a @click.prevent="go('/clientsubscriptions')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-1  rounded">Tela
            para Inscrições de cliente</a>

            <a @click.prevent="go('/clientdashboard')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-1  rounded">Tela
            para Gráfico de cliente</a>

            <a @click.prevent="go('/clientdashboard')"
            class="cursor-pointer text-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-white border p-1  rounded">Tela
            para Extrato Bancário</a>
            </div>
          
        </div>


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
