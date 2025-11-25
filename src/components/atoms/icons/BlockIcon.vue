<template>
  <svg
    role="button"
    tabindex="0"
    :class="computedClass"
    :width="width"
    :height="height"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    v-bind="rest"
    @click="onActivate"
    @keydown.enter.prevent="onActivate"
    @keydown.space.prevent="onActivate"
    :aria-label="ariaLabel"
    aria-hidden="false"
    focusable="true"
  >
    <path
      d="M11.8268 14.6781C11.9654 14.2409 12.1705 13.8333 12.4306 13.4674L18.5317 19.5679C17.8158 20.0762 16.9423 20.3751 15.9986 20.3751C13.5832 20.3751 11.6236 18.4162 11.6236 16.0001C11.6236 15.5392 11.6957 15.0951 11.8268 14.6781Z"
      :fill="primaryFill"
    />
    <path
      d="M13.4617 12.4356L19.5628 18.5374C20.0736 17.8218 20.3736 16.9459 20.3736 16.0001C20.3736 13.5839 18.414 11.6251 15.9986 11.6251C15.053 11.6251 14.1776 11.9253 13.4617 12.4356Z"
      :fill="primaryFill"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.9986 25.7223C21.3686 25.7223 25.7208 21.3695 25.7208 16.0001C25.7208 10.6306 21.3686 6.27783 15.9986 6.27783C10.6286 6.27783 6.27637 10.6306 6.27637 16.0001C6.27637 21.3695 10.6286 25.7223 15.9986 25.7223ZM21.8319 16.0001C21.8319 19.2217 19.221 21.8334 15.9986 21.8334C12.7762 21.8334 10.1653 19.2217 10.1653 16.0001C10.1653 12.7784 12.7762 10.1667 15.9986 10.1667C19.221 10.1667 21.8319 12.7784 21.8319 16.0001Z"
      :fill="primaryFill"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";

const emit = defineEmits<{
  (e: "click", ev: MouseEvent | KeyboardEvent): void;
  (e: "clear"): void;
}>();

const props = defineProps<{
  class?: string;
  width?: number | string;
  height?: number | string;
  fill?: string;
  fillVar?: string;
  ariaLabel?: string;
}>();

const attrs = useAttrs();

const cls = computed(() => props.class ?? (attrs.class as string) ?? "");
const width = computed(
  () => props.width ?? (attrs.width as string | number) ?? 32
);
const height = computed(
  () => props.height ?? (attrs.height as string | number) ?? 32
);
const ariaLabel = computed(() => props.ariaLabel ?? "Ícone personalizado");

// normaliza fillVar: "dark-blue" -> "--dark-blue"
const normalizedFillVar = (v?: string) => {
  if (!v) return undefined;
  return v.startsWith("--") ? v : `--${v}`;
};

// resolução da cor principal (fill)
const primaryFill = computed(() => {
  if (props.fill) return props.fill;
  const fv = normalizedFillVar(props.fillVar ?? (attrs as any).fillVar);
  if (fv) return `var(${fv})`;
  if ((attrs as any).fill) return (attrs as any).fill;
  return "var(--dark-blue, currentColor)";
});

// passa os outros atributos
const rest = computed(() => {
  const {
    class: _c,
    width: _w,
    height: _h,
    fill: _f,
    fillVar: _fv,
    ariaLabel: _al,
    ...others
  } = attrs as Record<string, unknown>;
  return others;
});

const computedClass = computed(() =>
  ["cursor-pointer", cls.value].filter(Boolean).join(" ")
);

function onActivate(ev: MouseEvent | KeyboardEvent) {
  ev.preventDefault?.();
  ev.stopPropagation?.();
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
