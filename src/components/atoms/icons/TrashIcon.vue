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
      d="M23.5584 10.3584C22.2167 10.2251 20.875 10.1251 19.525 10.0501V10.0417L19.3417 8.95841C19.2167 8.19175 19.0334 7.04175 17.0834 7.04175H14.9C12.9584 7.04175 12.775 8.14175 12.6417 8.95008L12.4667 10.0167C11.6917 10.0667 10.9167 10.1167 10.1417 10.1917L8.44172 10.3584C8.09172 10.3917 7.84172 10.7001 7.87505 11.0417C7.90838 11.3834 8.20838 11.6334 8.55838 11.6001L10.2584 11.4334C14.625 11.0001 19.0251 11.1667 23.4417 11.6084C23.4667 11.6084 23.4834 11.6084 23.5084 11.6084C23.825 11.6084 24.1 11.3667 24.1334 11.0417C24.1584 10.7001 23.9084 10.3917 23.5584 10.3584Z"
      :fill="primaryFill"
    />
    <path
      d="M22.025 12.7834C21.825 12.5751 21.55 12.4584 21.2667 12.4584H10.7334C10.45 12.4584 10.1667 12.5751 9.97505 12.7834C9.78338 12.9917 9.67505 13.2751 9.69172 13.5667L10.2084 22.1167C10.3001 23.3834 10.4167 24.9667 13.325 24.9667H18.675C21.5834 24.9667 21.7 23.3917 21.7917 22.1167L22.3084 13.5751C22.325 13.2751 22.2167 12.9917 22.025 12.7834ZM17.3834 20.7917H14.6084C14.2667 20.7917 13.9834 20.5084 13.9834 20.1667C13.9834 19.8251 14.2667 19.5417 14.6084 19.5417H17.3834C17.725 19.5417 18.0084 19.8251 18.0084 20.1667C18.0084 20.5084 17.725 20.7917 17.3834 20.7917ZM18.0834 17.4584H13.9167C13.5751 17.4584 13.2917 17.1751 13.2917 16.8334C13.2917 16.4917 13.5751 16.2084 13.9167 16.2084H18.0834C18.425 16.2084 18.7084 16.4917 18.7084 16.8334C18.7084 17.1751 18.425 17.4584 18.0834 17.4584Z"
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
