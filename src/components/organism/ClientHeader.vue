<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import AtomPlumasLogo from "../atoms/AtomPlumasLogo.vue";
import { AtomMobileRingIcon, AtomExitIcon, AtomMobileDashboardIcon, AtomMobileSignatureIcon, AtomButton } from "../atoms";
import { MoleculeModal, MoleculeModalProfileContent } from "../molecule"
import MoleculeModalProfile from "../molecule/MoleculeModalProfile.vue";
import AtomCoinIcon from "../atoms/icons/AtomCoinIcon.vue";


const isMobile = ref(false);

onMounted(() => {
    isMobile.value = window.innerWidth <= 640;

    window.addEventListener("resize", () => {
        isMobile.value = window.innerWidth <= 640;
    });
});
const props = defineProps({
    height: { type: Number, default: 80 },
    maxWidthClass: { type: String, default: "max-w-[1920px]" },
});

const router = useRouter();
const route = useRoute();

const showModal = ref(false);
const showUserModal = ref(false);
const isMobileMenuOpen = ref(false);

const userName = ref("Jéssica Faria");
const userAvatar = ref("https://i.pravatar.cc/150?img=3");

function go(to: string) {
    router.push(to).catch(() => { });
    isMobileMenuOpen.value = false;
}

function isActivePath(path: string) {
    return route.path === path;
}

function onModalConfirm() {
    showModal.value = false;
    router.push("/").catch(() => { });
}

function onModalCancel() {
    showModal.value = false;
}

function salvarPerfil(novoNome: string) {
    userName.value = novoNome;
    showUserModal.value = false;
}

function abrirUploadAvatar() {
    alert("Abrir modal de upload de avatar");
}

const heightClass = computed(() => (props.height === 80 ? "h-20" : ""));
const inlineStyle = computed(() =>
    props.height === 80 ? undefined : { height: `${props.height}px` }
);

</script>

<template>
    <div class="flex flex-col min-h-screen">

        <!-- HEADER -->
        <header :class="['w-full bg-[#0B3D6D] text-white flex-shrink-0', heightClass]" :style="inlineStyle"
            role="banner">

            <div :class="[
                `mx-auto w-full ${props.maxWidthClass} px-8`,
                'h-full flex items-center justify-between'
            ]">

                <!-- LOGO -->
                <div class="flex items-center select-none cursor-pointer" @click="go('/clientdashboard')">
                    <AtomPlumasLogo width="32" height="32" />
                    <div class="ml-3">
                        <div class="text-lg font-semibold leading-tight font-thin whitespace-nowrap">
                            <span class="font-bold">Plumas</span> Contábil
                        </div>
                    </div>
                </div>

                <!-- ÍCONE SINO (MOBILE) -->
                <button class="lg:hidden p-2 relative" aria-label="Notificações">
                    <AtomMobileRingIcon width="26" height="26" />
                    <span class="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                </button>

                <!-- NAVEGAÇÃO (DESKTOP) -->
                <nav class="hidden lg:flex items-center gap-12">
                    <button @click="go('/clientdashboard')" :class="[
                        'relative text-sm font-medium cursor-pointer',
                        isActivePath('/clientdashboard')
                            ? 'after:content-[\'\'] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-white'
                            : 'text-white/90 hover:text-white'
                    ]">
                        Dashboard
                    </button>

                    <button @click="go('/bankstatement')" :class="[
                        'relative text-sm font-medium cursor-pointer',
                        isActivePath('/bankstatement')
                            ? 'after:content-[\'\'] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-white'
                            : 'text-white/90 hover:text-white'
                    ]">
                        Extrato bancário
                    </button>

                    <button @click="go('/clientsubscriptions')" :class="[
                        'relative text-sm font-medium cursor-pointer',
                        isActivePath('/clientsubscriptions')
                            ? 'after:content-[\'\'] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-white'
                            : 'text-white/90 hover:text-white'
                    ]">
                        Assinaturas
                    </button>
                </nav>

                <!-- AVATAR + SAIR (DESKTOP) -->
                <div class="hidden lg:flex items-center gap-3">
                    <div class="cursor-pointer flex items-center gap-3" @click="showUserModal = true">
                        <img :src="userAvatar" alt="Avatar do usuário" class="w-10 h-10 rounded-md object-cover" />

                        <div class="text-left">
                            <p class="text-sm font-semibold leading-tight">
                                {{ userName }}
                            </p>
                            <p class="text-xs text-white/80">
                                Plumas Contabilidade LTDA.
                            </p>
                        </div>
                    </div>

                    <button @click="showModal = true" class="p-2 rounded-md hover:bg-white/10 transition-colors">
                        <AtomExitIcon width="22" fill="#fff" />
                    </button>
                </div>

                <!-- BURGER MOBILE -->
                <button class="lg:hidden flex flex-col justify-center items-center w-10 h-10"
                    @click="isMobileMenuOpen = true">
                    <span class="block w-6 h-0.5 bg-white mb-1"></span>
                    <span class="block w-6 h-0.5 bg-white mb-1"></span>
                    <span class="block w-6 h-0.5 bg-white"></span>
                </button>
            </div>
        </header>

        <!-- =========================================
             MENU MOBILE (NOVO - COMPLETO E AJUSTADO)
        ===========================================-->
        <transition name="fade">
            <div v-if="isMobileMenuOpen"
                class="absolute top-[70px] inset-0 bg-[#fff] text-white z-50 flex flex-col p-8 lg:hidden">
                <div class=" relative flex items-center gap-3 pt-10">

                    <div class="cursor-pointer flex items-center gap-3" @click="showUserModal = true">

                        <img :src="userAvatar" class="w-10 h-10 rounded-md object-cover" />

                        <div>
                            <p class="text-sm text-black font-semibold">{{ userName }}</p>
                            <p class="text-xs text-black">
                                Plumas Contabilidade LTDA.
                            </p>
                        </div>
                    </div>

                    <button @click="showModal = true" class="ml-auto p-2 rounded-md hover:bg-white/10">
                        <AtomExitIcon width="22" fill-var="--dark-blue" />
                    </button>
                    <AtomButton class=" w-1 h-1 text-lg flex justify-center items-center absolute top-1 right-0 "
                        @click="isMobileMenuOpen = false"> X </AtomButton>
                </div>



                <nav class="flex flex-col text-lg font-medium gap-6 mt-4">

                    <AtomButton
                        class="w-full text-[var(--dark-blue)] flex gap-x-3 text-left bg-transparent shadow-none p-0 justify-start"
                        :disableShadow="true" textColor="--dark-blue" color="transparent"
                        @click="go('/clientdashboard')">
                        <template #icon>
                            <AtomMobileDashboardIcon />
                        </template>

                        Dashboard
                    </AtomButton>


                    <AtomButton
                        class="w-full text-[var(--dark-blue)] items-center flex gap-x-3 text-left bg-transparent shadow-none p-0 justify-start"
                        :disableShadow="true" textColor="--dark-blue" color="transparent" @click="go('/bankstatement')">
                        <template #icon>
                            <AtomCoinIcon width="25px" fill-var="--dark-blue" />
                        </template>

                        Extrato bancário
                    </AtomButton>


                    <AtomButton
                        class="w-full text-[var(--dark-blue)] items-center flex gap-x-2 text-left bg-transparent shadow-none p-0 justify-start"
                        :disableShadow="true" textColor="--dark-blue" color="transparent"
                        @click="go('/clientsubscriptions')">
                        <template #icon>
                            <AtomMobileSignatureIcon fill-var="--dark-blue" />
                        </template>

                        Assinaturas
                    </AtomButton>


                </nav>


                <!-- USER FOOTER (MESMO DO DESKTOP) -->

            </div>
        </transition>

        <!-- CONTEÚDO -->
        <main class="flex-1 bg-gray-50">
            <slot />
        </main>

        <!-- Modal Sair -->
        <MoleculeModal v-model="showModal" :isMobile="isMobile" size="sm" height="xl" :showFooter="true">
            <!-- HEADER -->
            <template #header>
                <div class="flex flex-col items-center">
                    <AtomExitIcon class="w-12 h-12" fill-var="--dark-blue" />
                    <h3 class="text-lg font-semibold text-gray-800">
                        Deseja sair?
                    </h3>
                </div>
            </template>

            <!-- CONTENT -->
            <div class="text-gray-600 text-sm leading-relaxed">
                Você será redirecionado para a página de login.
            </div>

            <!-- FOOTER -->
            <template #footer>
                <div class="flex justify-center w-full">


                    <AtomButton class="p-3 bg-[var(--dark-blue)] text-white rounded-md w-full" @click="onModalConfirm">
                        Sair
                    </AtomButton>
                </div>
            </template>
        </MoleculeModal>


        <!-- Modal Perfil -->
        <!-- Modal Perfil (NOVO MODELO NO PADRÃO MoleculeModal) -->
        <MoleculeModal v-model="showUserModal" :isMobile="isMobile" size="lg" height="xl" :showFooter="false">

            <template #header>
                <!-- Se quiser, pode deixar vazio ou personalizar -->
            </template>

            <MoleculeModalProfileContent :userName="userName" :avatarUrl="userAvatar" @save="salvarPerfil"
                @changeAvatar="abrirUploadAvatar" @update:userName="userName = $event" @close="showUserModal = false" />
        </MoleculeModal>

    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
