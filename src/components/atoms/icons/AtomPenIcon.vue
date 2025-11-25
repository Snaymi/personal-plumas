<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 32 32"
    :class="computedClass"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    :aria-label="ariaLabel"
    tabindex="0"
    v-bind="rest"
    @click="onActivate"
    @keydown.enter.prevent="onActivate"
    @keydown.space.prevent="onActivate"
  >
    <rect width="32" height="32" rx="4" :fill="primaryFill" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.3792 7.00003C19.5778 6.99836 19.7487 7.06673 19.8968 7.21182L22.0567 9.32969C22.1966 9.46643 22.265 9.6482 22.2683 9.84832C22.2715 10.0518 22.2129 10.2369 22.0762 10.3786L20.9271 11.6043L17.7353 8.44585L18.873 7.23183C19.013 7.08341 19.1823 7.00337 19.3792 7.00003ZM9.26992 18.3882C9.66055 18.2648 10.0723 18.4899 10.1928 18.8885C10.3132 19.2887 10.0935 19.7106 9.7045 19.834C8.5684 20.1909 7.80667 20.8813 7.55438 21.53C7.48765 21.7034 7.46486 21.8618 7.49091 21.9919C7.51044 22.0903 7.56903 22.1803 7.66506 22.252C8.08011 22.5622 8.97369 22.6423 10.4744 22.2687C11.3631 22.0469 12.3152 21.7468 13.1584 21.4799C14.0194 21.2081 14.7713 20.9697 15.2938 20.8696C16.2574 20.6862 17.2193 20.5611 17.9957 20.6011C19.0146 20.6528 19.7796 20.988 20.0416 21.7901C20.2109 22.3087 20.1637 22.759 20.1214 23.1626C20.1068 23.3076 20.0921 23.4427 20.0986 23.5311C20.0986 23.5344 20.2532 23.5228 20.9987 23.4627C21.8614 23.3927 22.7549 23.0442 23.6371 22.699C24.0896 22.5222 24.5388 22.3471 25.0483 22.187C25.4389 22.0653 25.8507 22.2921 25.9679 22.6906C26.0867 23.0909 25.8653 23.5128 25.4763 23.6328C25.0808 23.7562 24.6235 23.9363 24.1645 24.1148C23.1814 24.4983 22.1885 24.8869 21.1143 24.9736C19.1497 25.132 18.694 24.5634 18.624 23.6478C18.6077 23.4327 18.6289 23.2243 18.6516 23.0008C18.6777 22.7507 18.707 22.4705 18.6402 22.2687C18.611 22.1787 18.3326 22.132 17.9257 22.112C17.2763 22.0786 16.425 22.192 15.5591 22.3571C15.1278 22.4388 14.4116 22.6656 13.5913 22.9258C12.7335 23.1976 11.7651 23.5028 10.8211 23.7379C8.8451 24.2298 7.5316 24.0214 6.7959 23.4711C6.38248 23.1626 6.13671 22.759 6.04231 22.3037C5.95441 21.8802 6.00487 21.4232 6.18065 20.9696C6.58105 19.9457 7.68297 18.8851 9.26992 18.3882ZM12.7189 15.0796L14.6769 17.0091L12.2827 17.6678C12.1964 17.6844 12.1622 17.6494 12.1769 17.5677L12.7189 15.0796ZM16.7229 9.5198L19.9114 12.6666L15.5559 17.3776L11.6528 18.4499C11.5128 18.4782 11.4575 18.4215 11.4803 18.2865L12.3641 14.2325L16.7229 9.5198Z"
      fill="white"
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
const ariaLabel = computed(
  () => props.ariaLabel ?? (attrs["aria-label"] as string) ?? "Icon"
);

const normalizedFillVar = (v?: string) => {
  if (!v) return undefined;
  return v.startsWith("--") ? v : `--${v}`;
};

const readFillVarFromAttrs = () => {
  const a = attrs as Record<string, unknown>;
  return (a.fillVar as string) ?? (a["fill-var"] as string) ?? undefined;
};

// Ordem de prioridade da cor principal
// 1) props.fill
// 2) props.fillVar -> var(--nome)
// 3) attrs.fillVar / attrs['fill-var']
// 4) attrs.fill
// 5) variável CSS --primary-green
// 6) fallback #022C5C
const primaryFill = computed(() => {
  if (props.fill) return props.fill;

  const pfv = normalizedFillVar(props.fillVar as string | undefined);
  if (pfv) return `var(${pfv})`;

  const afvRaw = readFillVarFromAttrs();
  const afv = normalizedFillVar(afvRaw);
  if (afv) return `var(${afv})`;

  if ((attrs as any).fill) return (attrs as any).fill as string;

  return "var(--primary-green, #022C5C)";
});

const rest = computed(() => {
  const {
    class: _c,
    width: _w,
    height: _h,
    fill: _f,
    fillVar: _fv,
    "fill-var": _fv2,
    ariaLabel: _al,
    "aria-label": _al2,
    ...others
  } = attrs as Record<string, unknown>;
  return others;
});

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
