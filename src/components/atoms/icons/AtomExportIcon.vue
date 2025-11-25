<template>
  <svg
    :class="computedClass"
    :width="width"
    :height="height"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    :aria-label="ariaLabel"
    v-bind="rest"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.11443 5.92603C6.40586 6.21746 6.87838 6.21746 7.16981 5.92603L8.88092 4.21491V12.3635C8.88092 12.7756 9.21505 13.1098 9.62719 13.1098C10.0393 13.1098 10.3735 12.7756 10.3735 12.3635V4.21491L12.0846 5.92603C12.376 6.21746 12.8485 6.21746 13.1399 5.92603C13.4314 5.63459 13.4314 5.16207 13.1399 4.87064L10.1549 1.88557C9.86341 1.59413 9.39097 1.59413 9.09953 1.88557L6.11443 4.87064C5.82299 5.16207 5.82299 5.63459 6.11443 5.92603Z"
      fill="#022C5C"
    />
    <path
      d="M9.62719 18.3337C14.0235 18.3337 17.5874 14.7698 17.5874 10.3735H13.856C12.9179 10.3735 12.4489 10.3735 12.1574 10.6649C11.866 10.9563 11.866 11.4254 11.866 12.3635C11.866 13.5999 10.8636 14.6023 9.62719 14.6023C8.39077 14.6023 7.38839 13.5999 7.38839 12.3635C7.38839 11.4254 7.38839 10.9563 7.09695 10.6649C6.80551 10.3735 6.33646 10.3735 5.39834 10.3735H1.66699C1.66699 14.7698 5.23089 18.3337 9.62719 18.3337Z"
      fill="#022C5C"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";

const props = withDefaults(
  defineProps<{
    width?: number | string;
    height?: number | string;
    class?: string;
    ariaLabel?: string;
  }>(),
  {
    width: 20,
    height: 20,
    class: "",
    ariaLabel: "Ícone de upload",
  }
);

const attrs = useAttrs();
const rest = computed(() => {
  const { width, height, class: _class, ariaLabel, ...others } = attrs;
  return others;
});

const computedClass = computed(() => `inline-block ${props.class}`);
</script>
