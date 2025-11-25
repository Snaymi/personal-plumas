<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 53 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="computedClass"
    :aria-label="ariaLabel"
    vScroll
    v-bind="rest"
  >
    <!-- 
      ATRIBUTOS REMOVIDOS DAQUI: 
      - role="button"
      - tabindex="0"
      - @click="onActivate"
      - @keydown.enter.prevent="onActivate"
      - @keydown.space.prevent="onActivate"
    -->
    <path
      d="M51.2378 45.47L48.6059 42.8381C49.9778 40.7662 50.7898 38.2743 50.7898 35.5865C50.7898 28.3068 44.882 22.399 37.6024 22.399C30.3227 22.399 24.4149 28.3068 24.4149 35.5865C24.4149 42.8661 30.3227 48.7739 37.6024 48.7739C40.2902 48.7739 42.7541 47.9619 44.854 46.59L47.4859 49.2219C48.0179 49.7538 48.6899 50.0058 49.3898 50.0058C50.0898 50.0058 50.7618 49.7538 51.2938 49.2219C52.2737 48.2139 52.2737 46.534 51.2378 45.47Z"
      :fill="primaryFill"
    />
    <path
      d="M48.0459 5.65575V11.8715C48.0459 14.1394 46.646 16.9673 45.246 18.3952L44.7421 18.8432C44.3501 19.2072 43.7621 19.2912 43.2581 19.1232C42.6981 18.9272 42.1382 18.7872 41.5782 18.6472C40.3462 18.3392 39.0303 18.1992 37.6864 18.1992C28.0268 18.1992 20.1871 26.0389 20.1871 35.6984C20.1871 38.8903 21.0551 42.0262 22.707 44.7141C24.1069 47.066 26.0669 49.0259 28.1948 50.3418C28.8387 50.7618 29.0907 51.6578 28.5308 52.1617C28.3348 52.3297 28.1388 52.4697 27.9428 52.6097L24.023 55.1576C20.3831 57.4255 15.3713 54.8776 15.3713 50.3418V35.3625C15.3713 33.3745 14.2514 30.8267 13.1314 29.4267L2.51989 18.1152C1.11995 16.6873 0 14.1394 0 12.4595V5.93574C0 2.54789 2.51989 0 5.57176 0H42.4742C45.526 0 48.0459 2.54789 48.0459 5.65575Z"
      :fill="primaryFill"
    />
  </svg>
</template>

<script setup lang="ts">
// 'defineEmits' foi removido do import
import { computed, useAttrs, defineOptions } from "vue";

defineOptions({
  name: "AtomSearchIcon",
});

/**
 * EMITS REMOVIDOS
 */
// const emit = defineEmits<{
//   (e: "click", ev: MouseEvent | KeyboardEvent): void;
//   (e: "clear"): void;
// }>();

/**
 * Props accepted (can be passed or read from attrs)
 * - class, width, height, fill, fillVar, ariaLabel
 */
const props = defineProps<{
  class?: string;
  width?: number | string;
  height?: number | string;
  fill?: string;
  fillVar?: string;
  ariaLabel?: string;
}>();

const attrs = useAttrs();

// resolved class / size / aria
const cls = computed(() => props.class ?? (attrs.class as string) ?? "");
const width = computed(
  () => props.width ?? (attrs.width as string | number) ?? 53
);
const height = computed(
  () => props.height ?? (attrs.height as string | number) ?? 56
);
const ariaLabel = computed(
  () => props.ariaLabel ?? (attrs["aria-label"] as string) ?? "Ícone de busca"
);

// normalize fillVar: user can pass "dark-blue" or "--dark-blue"
const normalizedFillVar = (v?: string) => {
  if (!v) return undefined;
  return v.startsWith("--") ? v : `--${v}`;
};

/**
 * primaryFill resolution order:
 * 1) props.fill
 * 2) props.fillVar -> var(--name)
 * 3) attrs.fill
 * 4) default color (#B2BBC7)
 * 5) fallback currentColor
 *
 * Default color requested: #B2BBC7
 */
const primaryFill = computed(() => {
  if (props.fill) return props.fill;
  const fv = normalizedFillVar(props.fillVar ?? (attrs as any).fillVar);
  if (fv) return `var(${fv})`;
  if ((attrs as any).fill) return (attrs as any).fill as string;
  return "var(--dark-blue)"; // Cor padrão (cinza)
});

// pass-through other attributes (exclude handled ones)
const rest = computed(() => {
  const {
    class: _c,
    width: _w,
    height: _h,
    fill: _f,
    fillVar: _fv,
    ariaLabel: _al,
    "aria-label": _al2,
    ...others
  } = attrs as Record<string, unknown>;
  return others;
});

// default computed class (cursor + inline-block) merged with provided classes
const computedClass = computed(() => {
  // MODIFICADO: "cursor-pointer" removido
  const base = "inline-block"; // Apenas mantém o 'inline-block' para alinhamento
  return [base, cls.value].filter(Boolean).join(" ");
});

/**
 * FUNÇÃO 'onActivate' REMOVIDA
 */
// function onActivate(ev: MouseEvent | KeyboardEvent) {
//   if ((ev as Event).preventDefault) (ev as Event).preventDefault();
//   if ((ev as Event).stopPropagation) (ev as Event).stopPropagation();

//   emit("clear");
//   emit("click", ev);
// }
</script>

<style scoped>
svg:focus {
  /* Este estilo ainda se aplica se o ícone ganhar foco
     de alguma outra forma, mas como removemos o tabindex="0",
     ele não será mais focável por padrão. */
  outline: none;
  box-shadow: 0 0 0 4px rgba(2, 44, 92, 0.12);
  border-radius: 4px;
}
</style>
