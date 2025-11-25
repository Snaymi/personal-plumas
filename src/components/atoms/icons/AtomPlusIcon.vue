<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="computedClass"
    :aria-label="ariaLabel"
    role="button"
    tabindex="0"
    @click="onActivate"
    @keydown.enter.prevent="onActivate"
    @keydown.space.prevent="onActivate"
    v-bind="rest"
  >
    <path
      d="M13.491 1.66699H6.50768C3.47435 1.66699 1.66602 3.47533 1.66602 6.50866V13.4837C1.66602 16.5253 3.47435 18.3337 6.50768 18.3337H13.4827C16.516 18.3337 18.3243 16.5253 18.3243 13.492V6.50866C18.3327 3.47533 16.5243 1.66699 13.491 1.66699ZM14.9993 10.6253H10.6243V15.0003C10.6243 15.342 10.341 15.6253 9.99935 15.6253C9.65768 15.6253 9.37435 15.342 9.37435 15.0003V10.6253H4.99935C4.65768 10.6253 4.37435 10.342 4.37435 10.0003C4.37435 9.65866 4.65768 9.37533 4.99935 9.37533H9.37435V5.00033C9.37435 4.65866 9.65768 4.37533 9.99935 4.37533C10.341 4.37533 10.6243 4.65866 10.6243 5.00033V9.37533H14.9993C15.341 9.37533 15.6243 9.65866 15.6243 10.0003C15.6243 10.342 15.341 10.6253 14.9993 10.6253Z"
      :fill="primaryFill"
    />
  </svg>
</template>

<script setup lang="ts">
// NOTE: Adicionado 'defineOptions' ao import
import { computed, useAttrs, defineOptions } from "vue";

// NOTE: Adicionado um nome explícito ao componente.
// Isso não é obrigatório, mas pode ajudar ferramentas de build.
defineOptions({
  name: "PlusIcon",
});

/**
 * Emits:
 * - click (MouseEvent | KeyboardEvent)
 * - clear (custom semantic event)
 */
const emit = defineEmits<{
  (e: "click", ev: MouseEvent | KeyboardEvent): void;
  (e: "clear"): void;
}>();

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
// ATUALIZADO: O padrão agora é 20, com base no novo SVG
const width = computed(
  () => props.width ?? (attrs.width as string | number) ?? 20
);
const height = computed(
  () => props.height ?? (attrs.height as string | number) ?? 20
);
const ariaLabel = computed(
  () => props.ariaLabel ?? (attrs["aria-label"] as string) ?? "Ícone"
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
  return "#fff";
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
  const base = "cursor-pointer inline-block";
  return [base, cls.value].filter(Boolean).join(" ");
});

// activation handler: prevents default/propagation, emits semantic events
function onActivate(ev: MouseEvent | KeyboardEvent) {
  if ((ev as Event).preventDefault) (ev as Event).preventDefault();
  if ((ev as Event).stopPropagation) (ev as Event).stopPropagation();

  emit("clear");
  emit("click", ev);
}
</script>

<style scoped>
svg:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(2, 44, 92, 0.12);
  border-radius: 4px;
}
</style>
