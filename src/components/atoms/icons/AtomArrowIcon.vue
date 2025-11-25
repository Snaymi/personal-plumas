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
      d="M12.6664 8.74161L11.0247 7.09994L8.34974 4.42494C7.78307 3.86661 6.81641 4.26661 6.81641 5.06661V10.2583V14.9333C6.81641 15.7333 7.78307 16.1333 8.34974 15.5666L12.6664 11.2499C13.3581 10.5666 13.3581 9.43327 12.6664 8.74161Z"
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
    props.ariaLabel ?? (attrs["aria-label"] as string) ?? "Seta para a direita"
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
  return "var(--dark-blue, currentColor)";
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
