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
      d="M23.5 24.3334H8.5C8.15833 24.3334 7.875 24.05 7.875 23.7084C7.875 23.3667 8.15833 23.0834 8.5 23.0834H23.5C23.8417 23.0834 24.125 23.3667 24.125 23.7084C24.125 24.05 23.8417 24.3334 23.5 24.3334Z"
      :fill="primaryFill"
    />
    <path
      d="M21.85 8.90005C20.2333 7.28338 18.65 7.24172 16.9917 8.90005L15.9833 9.90838C15.9 9.99172 15.8667 10.125 15.9 10.2417C16.5333 12.45 18.3 14.2167 20.5083 14.85C20.5417 14.8584 20.575 14.8667 20.6083 14.8667C20.7 14.8667 20.7833 14.8334 20.85 14.7667L21.85 13.7584C22.675 12.9417 23.075 12.15 23.075 11.35C23.0833 10.525 22.6833 9.72505 21.85 8.90005Z"
      :fill="primaryFill"
    />
    <path
      d="M19.0083 15.6084C18.7667 15.4917 18.5333 15.375 18.3083 15.2417C18.125 15.1334 17.95 15.0167 17.775 14.8917C17.6333 14.8 17.4667 14.6667 17.3083 14.5334C17.2917 14.525 17.2333 14.475 17.1667 14.4084C16.8917 14.175 16.5833 13.8751 16.3083 13.5417C16.2833 13.525 16.2417 13.4667 16.1833 13.3917C16.1 13.2917 15.9583 13.125 15.8333 12.9334C15.7333 12.8084 15.6167 12.625 15.5083 12.4417C15.375 12.2167 15.2583 11.9917 15.1417 11.7584C15.124 11.7206 15.1069 11.6829 15.0904 11.6455C14.9674 11.3677 14.6052 11.2865 14.3904 11.5013L9.61667 16.275C9.50833 16.3834 9.40833 16.5917 9.38333 16.7334L8.93333 19.925C8.85 20.4917 9.00833 21.025 9.35833 21.3834C9.65833 21.675 10.075 21.8334 10.525 21.8334C10.625 21.8334 10.725 21.8251 10.825 21.8084L14.025 21.3584C14.175 21.3334 14.3833 21.2334 14.4833 21.125L19.2511 16.3573C19.4674 16.141 19.3858 15.7698 19.1045 15.6497C19.0728 15.6362 19.0408 15.6224 19.0083 15.6084Z"
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

const normalizedFillVar = (v?: string) => {
  if (!v) return undefined;
  return v.startsWith("--") ? v : `--${v}`;
};

const primaryFill = computed(() => {
  if (props.fill) return props.fill;
  const fv = normalizedFillVar(props.fillVar ?? (attrs as any).fillVar);
  if (fv) return `var(${fv})`;
  if ((attrs as any).fill) return (attrs as any).fill;
  return "var(--dark-blue, currentColor)";
});

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
