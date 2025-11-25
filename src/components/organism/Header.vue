<script setup lang="ts">
import { ref, computed, onUnmounted, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import AtomPlumasLogo from "../atoms/AtomPlumasLogo.vue";
import AtomInput from "../atoms/AtomInput.vue";

import {
  AtomSubtitle,
  AtomSearchIcon,
  AtomOpenIcon,
  AtomCoinIcon,
  AtomCategoryIcon,
  AtomDropdown,
  AtomFunctionsIcon,
  AtomPagIcon,
  AtomUserIcon,
  AtomAccountIcon,
  AtomBankIcon,
  AtomCompanyIcon,
  AtomBalonIcon,
  AtomParanIcon,
  AtomCodeIcon,
  AtomPositionIcon,
  AtomNFSearchIcon,
  AtomPrintIcon,
  AtomDownloadIcon,
  AtomEyeIcon,
  AtomSaveIcon,
  AtomCloseActionIcon,
  AtomEmailIcon,
  AtomExitIcon,
  AtomMobileImportIcon,
  AtomMobileRegistrationsIcon,
  AtomMobileActionIcon,
  AtomSubHeaderDropdown,
} from "../atoms";

import MoleculeModal from "../molecule/MoleculeModal.vue";
import AtomPenIcon from "../atoms/icons/AtomPenIcon.vue";
import { MoleculeDatePicker } from "../molecule";

/* props */
const props = defineProps({
  height: { type: Number, default: 80 },
  maxWidthClass: { type: String, default: "max-w-[1920px]" },
  logoAlt: { type: String, default: "Logo" },
});

const router = useRouter();
const route = useRoute();
const search = ref("");

function onSubmitSearch(ev: Event) {
  ev.preventDefault();
  router.push({ name: "Search", query: { q: search.value } }).catch(() => { });
}

const heightClass = computed(() => (props.height === 80 ? "h-20" : ""));
const inlineStyle = computed(() =>
  props.height === 80 ? undefined : { height: `${props.height}px` }
);

function go(to: string) {
  router.push(to).catch(() => { });
  closeAllMobile();
}

function isActivePath(path: string, exact = false) {
  const cur = route.path;
  if (exact) return cur === path;
  return cur === path || cur.startsWith(path);
}
const isMobile = ref(false);

onMounted(() => {
  const check = () =>
  (isMobile.value =
    (window.innerWidth || document.documentElement.clientWidth) <= 640);

  check();
  window.addEventListener("resize", check);
});
const baseBefore =
  "before:content-[''] before:block before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-0 before:translate-y-3 before:h-[3px] before:rounded-full before:bg-white before:transition-opacity before:w-full";

/* mobile menu */
const isMobileMenuOpen = ref(false);
const activePanel = ref<"main" | "cadastros" | "acoes">("main");

function openMobile() {
  activePanel.value = "main";
  isMobileMenuOpen.value = true;
  document.body.style.overflow = "hidden";
}
function closeAllMobile() {
  isMobileMenuOpen.value = false;
  activePanel.value = "main";
  document.body.style.overflow = "";
}
function toggleMobileMenu() {
  isMobileMenuOpen.value ? closeAllMobile() : openMobile();
}
function openSubmenu(name: "cadastros" | "acoes") {
  activePanel.value = name;
}

onUnmounted(() => {
  document.body.style.overflow = "";
});

/* modal */
const showModal = ref(false);
const openEditModal = ref(false);
function onModalConfirm() {
  showModal.value = false;

  router.push("/").catch(() => { });
  closeAllMobile();
}
function onModalCancel() {
  showModal.value = false;
  openEditModal.value = false;
}

</script>

<template>
  <header :class="['w-full --darker-blue text-white shadow-sm z-50 relative', heightClass]" :style="inlineStyle"
    role="banner">
    <div :class="[`mx-auto w-full ${props.maxWidthClass} px-15`, 'h-full']">
      <div class="h-full flex items-center justify-between gap-x-3">
        <!-- logo -->
        <div class="flex items-center gap-6 w-full">
          <slot name="logo">
            <div class="flex items-center select-none">
              <AtomPlumasLogo width="32" height="32" />
              <div class="ml-3">
                <div class="text-lg font-semibold whitespace-nowrap">
                  <span class="font-bold">Plumas</span> Contábil
                </div>
              </div>
            </div>
          </slot>
        </div>

        <!-- search desktop -->
        <form @submit.prevent="onSubmitSearch"
          class="hidden lg:flex items-center rounded px-3 w-full mx-20 py-1.5 relative text-gray-700" role="search"
          aria-label="Pesquisar">
          <AtomInput input-class="pl-4 bg-white w-full placeholder-gray-400" v-model="search" type="search"
            placeholder="Busque por nome, valor, palavra chave..." wrapperClass="w-full" />
          <div class="absolute right-6 p-2 bg-[var(--dark-blue)]/10 rounded-lg">
            <AtomSearchIcon fill-var="dark-blue" />
          </div>
        </form>

        <!-- desktop nav -->
        <nav class="hidden lg:flex items-center gap-6" aria-label="Main navigation">

          <a href="/admin" @click.prevent="go('/admin')" :class="[
            'relative text-sm px-1 py-1',
            baseBefore,
            isActivePath('/admin')
              ? 'text-white before:opacity-100 before:translate-y-5'
              : 'text-white/90 hover:text-white before:opacity-0'
          ]">
            Lançamentos
          </a>

          <a href="/import" @click.prevent="go('/import')" :class="[
            'relative text-sm px-1 py-1',
            baseBefore,
            isActivePath('/import')
              ? 'text-white before:opacity-100 before:translate-y-5'
              : 'text-white/90 hover:text-white before:opacity-0'
          ]">
            Importações
          </a>

          <!-- Cadastros dropdown -->
          <AtomDropdown wrapperClass="relative inline-block" :buttonClassProp="[
            'text-sm px-1 py-1 bg-transparent rounded-none flex items-center gap-1 cursor-pointer',
            isActivePath('/cadastros') ? 'text-white' : 'text-white/90 hover:text-white'
          ].join(' ')" label="Cadastros" :showCheck="false" :showPin="false" labelClassProp="text-white">
            <template #panel>
              <ul class="bg-white rounded-md shadow-md min-w-[240px]">

                <li><a @click.prevent="go('/registerusers')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomUserIcon /><span>Usuários</span>
                    </div>
                  </a></li>

                <li><a @click.prevent="go('/registerfunctions')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomFunctionsIcon /><span>Funções</span>
                    </div>
                  </a></li>

                <li><a @click.prevent="go('/registercurrentaccount')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomAccountIcon /><span>Contas Correntes</span>
                    </div>
                  </a></li>

                <li><a @click.prevent="go('/registerbanks')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomBankIcon class="w-5" fill="#B2BBC7" /><span>Bancos</span>
                    </div>
                  </a></li>

                <li><a @click.prevent="go('/registeraccountingaccounts')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomAccountIcon /><span>Contas Contábeis</span>
                    </div>
                  </a></li>

                <li><a @click.prevent="go('/registeraccountingentries')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomCoinIcon class="w-4" fill="#B2BBC7" /><span>Lançamentos Contábeis</span>
                    </div>
                  </a></li>

                <li><a @click.prevent="go('/registerreport')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomPagIcon /><span>Relatório</span>
                    </div>
                  </a></li>

                <li><a @click.prevent="go('/registercompanies')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomCompanyIcon /><span>Empresas</span>
                    </div>
                  </a></li>

                <li><a @click.prevent="go('/registercategories')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomCategoryIcon /><span>Categorias</span>
                    </div>
                  </a></li>

                <li><a @click.prevent="go('/registerasks')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomBalonIcon /><span>Perguntas do Relatório de Visita</span>
                    </div>
                  </a></li>

                <li><a @click.prevent="go('/registersmartmanagement')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomParanIcon /><span>Parâmetros da Gestão Inteligente</span>
                    </div>
                  </a></li>

                <li><a @click.prevent="go('/registerreleasecode')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomCodeIcon /><span>Código do Lançamento Folha</span>
                    </div>
                  </a></li>

                <li><a @click.prevent="go('/registersmartmanagementindicators')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomPositionIcon /><span>Indicadores Gestão Inteligente</span>
                    </div>
                  </a></li>

                <li><a @click.prevent="go('/registerkeywordsnf')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomNFSearchIcon /><span>Palavra chave NF's</span>
                    </div>
                  </a></li>

                <li><a @click.prevent="go('/registersystemparameters')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomParanIcon class="rotate-90" /><span>Parâmetros</span>
                    </div>
                  </a></li>

              </ul>
            </template>
          </AtomDropdown>

          <!-- Ações dropdown -->
          <AtomDropdown wrapperClass="relative inline-block" :buttonClassProp="[
            'text-sm px-1 py-1 bg-transparent rounded-none flex items-center gap-1 font-semibold cursor-pointer',
            isActivePath('/acoes') ? 'text-white' : 'text-white/90 hover:text-white'
          ].join(' ')" label="Ações" :showCheck="false" :showPin="false" labelClassProp="text-white">
            <template #panel>
              <ul class="bg-white rounded-md shadow-md min-w-[220px]">

                <li><a @click.prevent="go('/print/dre')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomPrintIcon /><span>Imprimir DRE</span>
                    </div>
                  </a></li>

                <li><a @click.prevent="go('/print/visit')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomPrintIcon /><span>Imprimir Rel. Visita</span>
                    </div>
                  </a></li>

                <li><a @click.prevent="go('/download/txt')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomDownloadIcon /><span>Baixar .TXT</span>
                    </div>
                  </a></li>

                <li><a @click.prevent="go('/imports/view')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomEyeIcon fill="#B2BBC7" /><span>Visualizar Importações</span>
                    </div>
                  </a></li>

                <li><a @click.prevent="go('/save')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomSaveIcon /><span>Salvar</span>
                    </div>
                  </a></li>

                <li><a @click.prevent="go('/close')"
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                    <div class="flex items-center gap-4">
                      <AtomCloseActionIcon /><span>Fechamento</span>
                    </div>
                  </a></li>

              </ul>
            </template>
          </AtomDropdown>

          <!-- modal button -->
          <AtomButton type="button"
            class="ml-2 p-1 rounded shadow-none bg-transparent hover:bg-white/10 focus:outline-none"
            @click="showModal = true" aria-label="Abrir modal de mensagem">
            <template #icon>
              <AtomOpenIcon fill="#fff" width="28" />
            </template>
          </AtomButton>

        </nav>


        <!-- mobile burger -->
        <button class="lg:hidden flex flex-col justify-center items-center w-10 h-10" @click="toggleMobileMenu"
          :aria-expanded="isMobileMenuOpen" aria-label="Abrir menu">
          <span class="block w-6 h-0.5 bg-white transition-all duration-300"
            :class="isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''" />
          <span class="block w-6 h-0.5 bg-white my-1 transition-all duration-300"
            :class="isMobileMenuOpen ? 'opacity-0' : ''" />
          <span class="block w-6 h-0.5 bg-white transition-all duration-300"
            :class="isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''" />
        </button>
      </div>
    </div>

    <!-- overlay mobile -->
    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black/50 z-40 lg:hidden" @click.self="closeAllMobile" />
    </transition>

    <!-- mobile panels (no mode="out-in" to avoid screen missing) -->
    <transition name="slide-down">
      <div v-if="isMobileMenuOpen" class="fixed top-0 left-0 w-full h-screen bg-white z-50 overflow-hidden lg:hidden"
        aria-modal="true" role="dialog">
        <div class="relative w-full h-full">

          <!-- MAIN PANEL -->

          <div v-show="activePanel === 'main'" class="absolute inset-0 w-full h-full p-8 flex flex-col">
            <div class="flex items-center justify-between relative mb-8">
              <div class="flex items-center gap-3">
                <AtomPlumasLogo width="32" height="32" />
                <span class="ml-2 text-lg font-semibold text-[var(--dark-blue)]">Plumas Contábil</span>
              </div>

              <AtomButton color="transparent"
                class="text-2xl text-[var(--dark-blue)] absolute lg:right-10 shadow-none p-0 hover:opacity-70"
                @click="closeAllMobile">
                ✕
              </AtomButton>
            </div>

            <nav class="flex flex-col gap-6 text-lg text-[var(--dark-blue)] font-medium mt-4">
              <div>
                <div class="flex justify-between items-center">
                  <AtomSubtitle class="text-nowrap gap" title="Plumas Contabilidade LTDA" />
                  <AtomButton @click="openEditModal=true">
                    <AtomPenIcon class="pointer-events-none"/>
                  </AtomButton>

                </div>
                <AtomSubtitle class="!text-gray-400" title="Dezembro/2025" />
              </div>



              <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                @click="go('/admin')">
                <AtomCoinIcon fill="var(--gray-icon)" class="w-5 h-5" />
                Lançamentos
              </AtomButton>

              <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                @click="go('/import')">
                <AtomMobileImportIcon class="w-5 h-5" />
                Importações
              </AtomButton>

              <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                @click="openSubmenu('cadastros')">
                <AtomMobileRegistrationsIcon class="w-5 h-5" />
                Cadastros
              </AtomButton>

              <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                @click="openSubmenu('acoes')">
                <AtomMobileActionIcon class="w-5 h-5" />
                Ações
              </AtomButton>

            </nav>

            <div class="mt-auto">
              <AtomButton
                class="w-full text-left flex items-center gap-2 text-lg bg-transparent shadow-none p-0 text-[var(--dark-blue)]"
                @click="showModal = true">
                <AtomExitIcon class="w-6" fill-var="--dark-blue" />
                Sair
              </AtomButton>
            </div>
          </div>

          <!-- CADASTROS PANEL -->
          <transition name="slide-left" mode="out-in">
            <div v-if="activePanel === 'cadastros'" class="absolute inset-0 w-full h-screen p-8 flex flex-col">
              <div class="flex items-center justify-between mb-6">

                <AtomButton color="transparent"
                  class="text-2xl text-[var(--dark-blue)] shadow-none p-0 hover:opacity-70"
                  @click="activePanel = 'main'">
                  ←
                </AtomButton>

                <div class="text-lg font-semibold text-[var(--dark-blue)]">Cadastros</div>

                <div style="width:32px" />
              </div>

              <nav class="flex flex-col gap-3 mt-4 text-[var(--dark-blue)]">

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/registerusers')">
                  <AtomUserIcon class="w-5 h-5" />
                  Usuários
                </AtomButton>

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/registerfunctions')">
                  <AtomFunctionsIcon class="w-5 h-5" />
                  Funções
                </AtomButton>

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/registercurrentaccount')">
                  <AtomAccountIcon class="w-5 h-5" />
                  Contas Correntes
                </AtomButton>

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/registerbanks')">
                  <AtomBankIcon fill="var(--gray-icon)" class="w-5 h-5" />
                  Bancos
                </AtomButton>

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/registeraccountingaccounts')">
                  <AtomAccountIcon class="w-5 h-5" />
                  Contas Contábeis
                </AtomButton>

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/registeraccountingentries')">
                  <AtomCoinIcon fill="var(--gray-icon)" class="w-5 h-5" />
                  Lançamentos Contábeis
                </AtomButton>

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/registerreport')">
                  <AtomPagIcon class="w-5 h-5" />
                  Relatório
                </AtomButton>

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/registercompanies')">
                  <AtomCompanyIcon class="w-5 h-5" />
                  Empresas
                </AtomButton>

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/registercategories')">
                  <AtomCategoryIcon class="w-5 h-5" />
                  Categorias
                </AtomButton>

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/registerasks')">
                  <AtomBalonIcon class="w-5 h-5" />
                  Perguntas do Relatório de Visita
                </AtomButton>

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/registersmartmanagement')">
                  <AtomParanIcon class="w-5 h-5" />
                  Parâmetros da Gestão Inteligente
                </AtomButton>

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/registerreleasecode')">
                  <AtomCodeIcon class="w-5 h-5" />
                  Código do Lançamento Folha
                </AtomButton>

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/registersmartmanagementindicators')">
                  <AtomPositionIcon class="w-5 h-5" />
                  Indicadores Gestão Inteligente
                </AtomButton>

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/registerkeywordsnf')">
                  <AtomNFSearchIcon class="w-5 h-5" />
                  Palavra chave NF's
                </AtomButton>

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/registersystemparameters')">
                  <AtomParanIcon class="w-5 h-5 rotate-90" />
                  Parâmetros
                </AtomButton>

              </nav>

              <div class="mt-auto">
                <AtomButton
                  class="w-full text-left flex items-center gap-2 text-lg bg-transparent shadow-none p-0 text-[var(--dark-blue)]"
                  @click="showModal = true">
                  <AtomExitIcon class="w-6" fill-var="--dark-blue" />
                  Sair
                </AtomButton>
              </div>
            </div>
          </transition>

          <!-- AÇÕES PANEL -->
          <transition name="slide-left" mode="out-in">
            <div v-if="activePanel === 'acoes'" class="absolute inset-0 w-full h-full p-8 flex flex-col">
              <div class="flex items-center justify-between mb-6">

                <AtomButton color="transparent"
                  class="text-2xl text-[var(--dark-blue)] shadow-none p-0 hover:opacity-70"
                  @click="activePanel = 'main'">
                  ←
                </AtomButton>

                <div class="text-lg font-semibold text-[var(--dark-blue)]">Ações</div>

                <div style="width:32px" />
              </div>

              <nav class="flex flex-col gap-4 mt-4 text-[var(--dark-blue)]">

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/print/dre')">
                  <AtomPrintIcon class="w-5 h-5" />
                  Imprimir DRE
                </AtomButton>

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/print/visit')">
                  <AtomPrintIcon class="w-5 h-5" />
                  Imprimir Rel. Visita
                </AtomButton>

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/download/txt')">
                  <AtomDownloadIcon class="w-5 h-5" />
                  Baixar .TXT
                </AtomButton>

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/imports/view')">
                  <AtomEyeIcon fill="var(--gray-icon)" class="w-5 h-5" />
                  Visualizar Importações
                </AtomButton>

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/save')">
                  <AtomSaveIcon class="w-5 h-5" />
                  Salvar
                </AtomButton>

                <AtomButton class="text-left w-full bg-transparent shadow-none p-0 flex items-center gap-3"
                  @click="go('/close')">
                  <AtomCloseActionIcon class="w-5 h-5" />
                  Fechamento
                </AtomButton>

              </nav>

              <div class="mt-auto">
                <AtomButton
                  class="w-full text-left flex items-center gap-2 text-lg bg-transparent shadow-none p-0 text-[var(--dark-blue)]"
                  @click="showModal = true">
                  <AtomExitIcon class="w-6" fill-var="--dark-blue" />
                  Sair
                </AtomButton>
              </div>
            </div>
          </transition>

        </div>
      </div>
    </transition>

  </header>

  <slot />
  <MoleculeModal v-model="openEditModal" :isMobile="isMobile" size="sm" height="full" :showFooter="true">
    <!-- HEADER -->
    <template #header>
      <div class="flex justify-center items-center gap-3">
        <h3 class="text-sm font-semibold text-gray-800">
          Empresa & Competência
        </h3>
      </div>
    </template>

    <!-- CONTENT -->
     <div class="flex flex-col gap-y-3">
      <div class="text-gray-600 text-sm leading-relaxed">
      <AtomSubHeaderDropdown label="Empresa:" />
    </div>
    <div class="text-gray-600 text-sm leading-relaxed">
      <MoleculeDatePicker label = "Competência:" placeholder="Clique para selecionar" :icon="true" />
    </div>
     </div>
    
    <!-- FOOTER -->
    <template #footer>
      <div class="flex justify-center gap-3 w-full">
        <AtomButton class="bg-[var(--dark-blue)] p-3 w-full text-center text-white" @click="onModalCancel">
         Confirmar
        </AtomButton>

        
      </div>
    </template>
  </MoleculeModal>
  <MoleculeModal v-model="showModal" :isMobile="isMobile" :showFooter="true">
    <!-- HEADER -->
    <template #header>
      <div class="flex flex-col items-center text-center">
        <AtomExitIcon class="w-12 h-12 mb-4" fill-var="--dark-blue" />

        <h2 class="text-xl font-semibold text-gray-800">
          Deseja sair?
        </h2>
      </div>
    </template>

    <!-- CONTENT -->
    <div class="text-center text-gray-600 px-4">
      Você será redirecionado para a página de login.
    </div>

    <!-- FOOTER -->
    <template #footer>
      <div class="flex flex-col gap-3 w-full">


        <!-- CONFIRMAR -->
        <AtomButton class="w-full text-center bg-[var(--dark-blue)] text-white p-3 text-xl"  @click="onModalConfirm">
          Sair
        </AtomButton>

      </div>
    </template>
  </MoleculeModal>

</template>

<style scoped>
/* overlay fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .22s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* geral slide-down */
.slide-down-enter-active {
  animation: slideDown .28s ease forwards;
}

.slide-down-leave-active {
  animation: slideUp .22s ease forwards;
}

@keyframes slideDown {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(0);
    opacity: 1;
  }

  to {
    transform: translateY(-10px);
    opacity: 0;
  }
}

/* slide-left for panels */
.slide-left-enter-active {
  animation: slideLeftIn .28s ease forwards;
}

.slide-left-leave-active {
  animation: slideLeftOut .22s ease forwards;
}

@keyframes slideLeftIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideLeftOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }

  to {
    transform: translateX(-30%);
    opacity: 0;
  }
}

/* small visual */
a.relative::before {
  transition: opacity 160ms ease, transform 160ms ease;
}
</style>
