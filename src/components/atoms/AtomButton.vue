<template>
  <button
    :type="type"
    v-bind="attrs"
    :class="[baseComputedClass, attrs.class]"
    :style="buttonStyle"
    :disabled="disabled || loading"
    @click="onClick"
    :aria-pressed="ariaPressed"
    :aria-busy="loading ? 'true' : 'false'"
  >
    <!-- spinner aparece antes do icon quando loading -->
    <span v-if="loading" class="inline-flex items-center mr-2">
      <svg
        class="animate-spin"
        :width="spinnerSize"
        :height="spinnerSize"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          :stroke="spinnerTrack"
          stroke-width="3"
          fill="none"
        />
        <path :d="spinnerArc" :fill="spinnerColor" />
      </svg>
    </span>

    <!-- ícone à esquerda (slot opcional) -->
    <span v-else-if="$slots.icon" class="inline-flex items-center md:mr-2">
      <slot name="icon" />
    </span>

    <span v-if="$slots.default" class="flex-1">
      <slot>Button</slot>
    </span>

    <span v-if="$slots.right" class="inline-flex items-center ml-2">
      <slot name="right" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";

const props = defineProps({
  disableShadow: { type: Boolean, default: false },
  color: { type: String, default: "" },
  textColor: { type: String, default: "" },
  type: {
    type: String as () => "button" | "submit" | "reset",
    default: "button",
  },
  ariaPressed: {
    type: Boolean as () => boolean | undefined,
    default: undefined,
  },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  spinnerColor: { type: String, default: "#FFFFFF" },
  spinnerTrack: { type: String, default: "rgba(255,255,255,0.15)" },
  size: { type: String as () => "sm" | "md" | "lg", default: "md" },
  disableFocus: { type: Boolean, default: false },
  textClass: { type: String, default: "flex-1" },
});

const emit = defineEmits<{
  (e: "click", ev: MouseEvent): void;
}>();

const attrs = useAttrs();

// classes base do botão
const baseClasses =
  "inline-flex items-center gap-2 py-3 px-4 font-medium rounded-lg cursor-pointer";

// cor padrão
const defaultBgClass = "bg-[#022C5C] hover:bg-[#021f4b] text-white";
const defaultFocusRing = "focus:ring-[#022C5C]";

const baseComputedClass = computed(() => {
  const classes: string[] = [baseClasses];

  if (!props.color) {
    classes.push(defaultBgClass);
  } else {
    classes.push("hover:opacity-95");
  }

  if (!props.disableFocus) {
    classes.push("focus:outline-none focus:ring-2 focus:ring-offset-2");
    if (!props.color) classes.push(defaultFocusRing);
  } else {
    classes.push("focus:outline-none");
  }

  if (!props.disableShadow) {
    classes.push("shadow-sm");
  }

  return classes.join(" ");
});

const buttonStyle = computed(() => {
  if (props.color) {
    return {
      backgroundColor: props.color,
      color: props.textColor || "white",
    } as Record<string, string>;
  }
  return undefined;
});

const type = computed(() => props.type ?? "button");
const ariaPressed = computed(() => props.ariaPressed);
const loading = computed(() => props.loading);
const disabled = computed(() => props.disabled);

const spinnerSize = computed(() =>
  props.size === "sm" ? 14 : props.size === "lg" ? 20 : 16
);
const spinnerArc = "M22 12a10 10 0 00-10-10v4a6 6 0 016 6h4z";

function onClick(ev: MouseEvent) {
  if (loading.value || disabled.value) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    return;
  }
  emit("click", ev);
}
</script>

<style scoped>
button {
  transition: background-color 150ms ease, opacity 120ms ease, filter 120ms ease;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
