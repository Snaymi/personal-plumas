<template>
  <svg
    :class="computedClass"
    :width="width"
    :height="height"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    role="button"
    :aria-label="ariaLabel"
    tabindex="0"
    @click.stop.prevent="onActivate"
    @keydown.enter.prevent.stop="onActivate"
    @keydown.space.prevent.stop="onActivate"
    v-bind="rest"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.041 4.27116C11.041 3.98314 11.2744 3.75033 11.5618 3.75033C11.8493 3.75033 12.0827 3.98314 12.0827 4.27116V6.35449C12.0827 6.64251 11.8493 6.87533 11.5618 6.87533C11.2744 6.87533 11.041 6.64251 11.041 6.35449V4.27116ZM6.35352 7.91699H13.6452C13.9327 7.91699 14.166 7.68418 14.166 7.39616V1.66699H5.83268V7.39616C5.83268 7.68418 6.06602 7.91699 6.35352 7.91699ZM16.2493 1.66699H15.2077V7.91699C15.2077 8.49199 14.741 8.95866 14.166 8.95866H5.83268C5.25768 8.95866 4.79102 8.49199 4.79102 7.91699V1.66699H3.74935C2.59883 1.66699 1.66602 2.5998 1.66602 3.75033V16.2503C1.66602 17.4008 2.59883 18.3337 3.74935 18.3337H16.2493C17.3999 18.3337 18.3327 17.4008 18.3327 16.2503V3.75033C18.3327 2.5998 17.3999 1.66699 16.2493 1.66699Z"
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
  () => props.width ?? (attrs.width as string | number) ?? 20
);
const height = computed(
  () => props.height ?? (attrs.height as string | number) ?? 20
);
const ariaLabel = computed(
  () =>
    props.ariaLabel ?? (attrs["aria-label"] as string) ?? "Ícone de prancheta"
);

// normaliza fillVar: "dark-blue" -> "--dark-blue"
const normalizedFillVar = (v?: string) => {
  if (!v) return undefined;
  return v.startsWith("--") ? v : `--${v}`;
};

// resolução para primaryFill:
// 1) props.fill
// 2) props.fillVar -> var(--name)
// 3) attrs.fill
// 4) var(--dark-blue)
// 5) currentColor (fallback)
const primaryFill = computed(() => {
  if (props.fill) return props.fill;
  const fv = normalizedFillVar(props.fillVar ?? (attrs as any).fillVar);
  if (fv) return `var(${fv})`;
  if ((attrs as any).fill) return (attrs as any).fill;
  return "#FFFFFF"; // Cor padrão agora é branca";
});

// repassa outros attributes (exclui class/width/height/fill/fillVar/ariaLabel)
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

// garante cursor-pointer por padrão
const computedClass = computed(() => {
  const base = "cursor-pointer";
  return [base, cls.value].filter(Boolean).join(" ");
});

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
