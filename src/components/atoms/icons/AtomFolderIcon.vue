<template>
  <svg
    :class="computedClass"
    :width="width"
    :height="height"
    viewBox="0 0 64 56"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    :aria-label="ariaLabel"
    tabindex="0"
    @click.stop.prevent="onActivate"
    @keydown.enter.prevent.stop="onActivate"
    @keydown.space.prevent.stop="onActivate"
    v-bind="rest"
    :fill="primaryFill"
  >
    <path
      d="M62.4221 14.2568L32.7464 0.167844C32.2717 -0.0559479 31.7221 -0.0559479 31.2487 0.167844L1.57801 14.2568C0.969741 14.5449 0.581893 15.1584 0.581893 15.8326C0.581893 16.5039 0.969741 17.1167 1.57801 17.4062L31.2487 31.493C31.4854 31.6046 31.7411 31.6618 31.9969 31.6618C32.2533 31.6618 32.5098 31.6046 32.7464 31.493L62.4221 17.4062C63.0304 17.1167 63.4182 16.5039 63.4182 15.8326C63.4182 15.1584 63.0304 14.5449 62.4221 14.2568Z"
    />
    <path
      d="M31.9976 44.1207C31.6564 44.1207 31.3159 44.0466 30.9987 43.8969L1.32862 29.8093C0.167906 29.2579 -0.325205 27.8721 0.225129 26.7129C0.776171 25.5537 2.16225 25.0603 3.32509 25.6102L31.9962 39.2234L60.675 25.6102C61.8329 25.0596 63.2225 25.5516 63.7736 26.7129C64.3246 27.8728 63.8322 29.2579 62.6701 29.8093L32.9958 43.8969C32.68 44.0458 32.3388 44.1207 31.9976 44.1207Z"
    />
    <path
      d="M31.9976 56C31.6564 56 31.3159 55.9259 30.9987 55.7762L1.32862 41.6893C0.167906 41.1387 -0.325205 39.7507 0.225129 38.5908C0.776171 37.4295 2.16225 36.9375 3.32509 37.4881L31.9962 51.1006L60.6758 37.4881C61.8358 36.9375 63.2233 37.4295 63.7743 38.5908C64.3253 39.7507 63.8329 41.138 62.6722 41.6893L32.9958 55.7762C32.68 55.9259 32.3388 56 31.9976 56Z"
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
  fill?: string; // explicit color (e.g. "#022C5C" or "currentColor")
  fillVar?: string; // variable name (e.g. "dark-blue" or "--dark-blue")
  ariaLabel?: string;
}>();

const attrs = useAttrs();

const cls = computed(() => props.class ?? (attrs.class as string) ?? "");
const width = computed(
  () => props.width ?? (attrs.width as string | number) ?? 64
);
const height = computed(
  () => props.height ?? (attrs.height as string | number) ?? 56
);
const ariaLabel = computed(
  () => props.ariaLabel ?? (attrs["aria-label"] as string) ?? "Icon"
);

// normalize fillVar: accept "dark-blue" or "--dark-blue" and return "--dark-blue"
const normalizedFillVar = (v?: string) => {
  if (!v) return undefined;
  return v.startsWith("--") ? v : `--${v}`;
};

// resolution order for primaryFill:
// 1. props.fill (explicit color string)
// 2. props.fillVar (variable name) -> var(--name)
// 3. attrs.fill (attribute)
// 4. CSS variable --dark-blue
// 5. fallback currentColor
const primaryFill = computed(() => {
  if (props.fill) return props.fill;
  const fv = normalizedFillVar(props.fillVar ?? (attrs as any).fillVar);
  if (fv) return `var(${fv})`;
  if ((attrs as any).fill) return (attrs as any).fill;
  return "var(--dark-blue, currentColor)";
});

// repassa outros attributes (exceto class/width/height/fill/fillVar/ariaLabel)
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

// garante cursor-pointer por padrão (pode ser sobrescrito via class passada pelo pai)
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
