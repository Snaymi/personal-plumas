<script lang="ts" setup>
import LoginForm from "../organism/LoginFormOrganism.vue";
import LoginImgMobile from "../organism/LoginImgMobileOrganism.vue";
import LoginImgDesktop from "../organism/LoginImgDesktopOrganism.vue";
</script>

<template>
  <div class="flex h-screen flex-col lg:flex-row">

    <!-- IMAGEM MOBILE/TABLET -->
    <div class="w-full flex justify-center lg:hidden bg-[#012956]">
      <LoginImgMobile />
    </div>

    <!-- IMAGEM DESKTOP -->
    <div class="hidden lg:flex w-screen lg:flex-1 lg:h-full">
      <LoginImgDesktop />
    </div>

    <!-- FORMULÁRIO -->
    <div
      class="
        w-full lg:flex-1 
        bg-white 
        rounded-t-3xl lg:rounded-none 
        -mt-6 lg:mt-0
         z-10
        px-6 py-10
        flex justify-center
      "
    >
      <LoginForm
        title="Seja Bem-vindo!"
        subtitle="Preencha os campos abaixo corretamente para utilizar nossa plataforma com segurança"
      />
    </div>
  </div>
</template>
