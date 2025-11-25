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
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.5 4.87509C2.5 3.56337 3.56333 2.5 4.875 2.5H15.9583C17.27 2.5 18.3333 3.56337 18.3333 4.87509V5.80262C18.3333 6.43254 18.0831 7.03665 17.6377 7.48207L13.0235 12.0964C12.8751 12.2449 12.7917 12.4463 12.7917 12.6562V14.5113C12.7917 15.1412 12.5414 15.7454 12.096 16.1908L10.3528 17.9341C9.49992 18.787 8.04167 18.1829 8.04167 16.9768V12.6562C8.04167 12.4463 7.95826 12.2449 7.8098 12.0964L3.19562 7.48207C2.75022 7.03665 2.5 6.43254 2.5 5.80262V4.87509Z"
      :fill="primaryFill"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, useAttrs, defineOptions } from "vue";

// Dando um nome explícito ao componente para ajudar ferramentas de build
defineOptions({
  name: "AtomFilterIcon",
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
const width = computed(
  () => props.width ?? (attrs.width as string | number) ?? 20
);
const height = computed(
  () => props.height ?? (attrs.height as string | number) ?? 20
);
const ariaLabel = computed(
  () => props.ariaLabel ?? (attrs["aria-label"] as string) ?? "Ícone de filtro"
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
