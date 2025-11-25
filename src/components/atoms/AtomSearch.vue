<template>
  <label :class="['block', wrapperClass]">
    <span v-if="label" class="text-sm font-medium text-gray-700 mb-2 block">{{ label }}</span>

    <div class="relative">
      <!-- ícone à esquerda -->
      <div v-if="$slots.icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <slot name="icon" />
      </div>

      <!-- input principal -->
      <input
        ref="inputRef"
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :aria-label="ariaLabel ?? label ?? placeholder"
        :class="computedClass"
        :value="innerValue"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.down.prevent="onKeyDown('down')"
        @keydown.up.prevent="onKeyDown('up')"
        @keydown.enter.prevent="onKeyDown('enter')"
        @keydown.esc.prevent="closeList"
      />

      <!-- slot para conteúdo à direita -->
      <div v-if="$slots.right || showClear" class="absolute inset-y-0 right-0 pr-2 flex items-center gap-2">
        <slot name="right" />
        <button
          v-if="showClear"
          type="button"
          class="p-1 rounded hover:bg-gray-100"
          @click.prevent="clearAndFocus"
          :aria-label="clearAriaLabel"
        >
          <slot name="clear">
            <!-- fallback clear simple X -->
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-400">
              <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 18L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </slot>
        </button>
      </div>

      <!-- dropdown de resultados -->
      <ul
        v-if="isOpen && filteredItems.length"
        class="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-52 overflow-auto py-1"
        role="listbox"
        :aria-activedescendant="activeDescId"
      >
        <li
          v-for="(it, idx) in filteredItems"
          :key="itemKey(it, idx)"
          :id="getItemId(idx)"
          class="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center gap-2"
          :class="idx === activeIndex ? 'bg-gray-100' : ''"
          role="option"
          :aria-selected="idx === activeIndex"
          @mousedown.prevent="selectItem(it)"
          @mousemove="setActiveIndex(idx)"
        >
          <template v-if="itemSlot">
            <slot name="item" :item="it" />
          </template>
          <template v-else>
            <span>{{ itemLabelFor(it) }}</span>
          </template>
        </li>
      </ul>
    </div>

    <p v-if="hint" class="mt-2 text-xs text-gray-500">{{ hint }}</p>
  </label>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import { nanoid } from 'nanoid'

/* Props */
const props = defineProps({
  items: { type: Array as () => any[], default: () => [] },
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  hint: { type: String, default: '' },
  required: { type: Boolean, default: false },
  ariaLabel: { type: String, default: '' },
  size: { type: String as () => 'md' | 'sm', default: 'md' },
  rounded: { type: String, default: 'lg' },
  wrapperClass: { type: String, default: '' },
  /**
   * itemLabel can be a string key or a function to extract display text from item.
   * If not provided and items are strings, the item itself will be used.
   */
  itemLabel: { type: [String, Function], default: undefined },
  /**
   * optional function to produce a stable key for items
   */
  itemKeyProp: { type: [String, Function], default: undefined },
  /**
   * whether to open dropdown on focus when modelValue is empty
   */
  openOnFocus: { type: Boolean, default: false },
  /**
   * show clear button when value exists
   */
  showClear: { type: Boolean, default: true },
})

/* Emits */
const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
  (e: 'select', item: any): void
  (e: 'focus', ev: FocusEvent): void
  (e: 'blur', ev: FocusEvent): void
}>()

/* id for accessibility */
const id = `atom-search-${nanoid(6)}`

/* refs */
const inputRef = ref<HTMLInputElement | null>(null)

/* local state */
const innerValue = ref(String(props.modelValue ?? ''))
const isOpen = ref(false)
const activeIndex = ref<number>(-1)
const keyedOpen = ref(false) // to differentiate focus open vs manual

/* watch external v-model */
watch(
  () => props.modelValue,
  (v) => {
    innerValue.value = String(v ?? '')
  }
)

/* utilities to get label and key for items */
function itemLabelFor(it: any) {
  if (!props.itemLabel) return String(it ?? '')
  if (typeof props.itemLabel === 'function') return props.itemLabel(it)
  return String(it?.[props.itemLabel as string] ?? '')
}
function itemKey(it: any, idx: number) {
  if (props.itemKeyProp) {
    if (typeof props.itemKeyProp === 'function') return props.itemKeyProp(it)
    return it?.[props.itemKeyProp as string] ?? idx
  }
  return idx
}

/* computed filtered list (search as user types) */
const filteredItems = computed(() => {
  const q = (innerValue.value ?? '').trim().toLowerCase()
  if (!q) return props.items.slice(0, 50) // limit when empty
  return props.items.filter((it) => itemLabelFor(it).toLowerCase().includes(q)).slice(0, 50)
})

/* derived aria active descendant id */
const activeDescId = computed(() => (activeIndex.value >= 0 ? getItemId(activeIndex.value) : undefined))
function getItemId(idx: number) {
  return `${id}-option-${idx}`
}

/* classes from AtomInput model */
const base = 'block w-full border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-indigo-400'
const border = 'border-gray-200'
const focusRing = 'focus:ring-indigo-400'
const roundedMap: Record<string, string> = { md: 'rounded-md', lg: 'rounded-lg', full: 'rounded-full' }
const computedClass = computed(() => {
  const r = roundedMap[props.rounded] ?? roundedMap.lg
  const sizePadding = props.size === 'sm' ? 'py-2 pl-9 pr-3 text-sm' : 'py-3 pl-10 pr-3 text-base'
  return `${base} ${border} ${focusRing} ${r} ${sizePadding}`
})

/* behaviors */
function openList() {
  isOpen.value = true
  keyedOpen.value = true
}
function closeList() {
  isOpen.value = false
  activeIndex.value = -1
  keyedOpen.value = false
}

function onFocus(ev: FocusEvent) {
  emit('focus', ev)
  if (props.openOnFocus) {
    nextTick(() => openList())
  }
}
function onBlur(ev: FocusEvent) {
  // small delay to allow click on list items (mousedown prevented selection uses this)
  setTimeout(() => {
    closeList()
    emit('blur', ev)
  }, 120)
}

function onInput(e: Event) {
  const v = (e.target as HTMLInputElement).value
  innerValue.value = v
  emit('update:modelValue', v)
  if (v.trim() !== '') {
    openList()
  } else if (props.openOnFocus) {
    openList()
  } else {
    // keep closed if nothing typed and openOnFocus false
    closeList()
  }
  activeIndex.value = 0
}

/* keyboard navigation */
function setActiveIndex(i: number) {
  activeIndex.value = i
}
function onKeyDown(action: 'down' | 'up' | 'enter') {
  if (!isOpen.value && (action === 'down' || action === 'up')) {
    openList()
    return
  }
  const len = filteredItems.value.length
  if (len === 0) return

  if (action === 'down') {
    activeIndex.value = activeIndex.value < len - 1 ? activeIndex.value + 1 : 0
    scrollToActive()
  } else if (action === 'up') {
    activeIndex.value = activeIndex.value > 0 ? activeIndex.value - 1 : len - 1
    scrollToActive()
  } else if (action === 'enter') {
    if (activeIndex.value >= 0 && activeIndex.value < len) {
      selectItem(filteredItems.value[activeIndex.value])
    }
  }
}

/* selection */
function selectItem(it: any) {
  const label = itemLabelFor(it)
  innerValue.value = label
  emit('update:modelValue', label)
  emit('select', it)
  // keep input focused and close list
  nextTick(() => {
    inputRef.value?.focus()
    closeList()
  })
}

/* clear helpers */
function clear() {
  innerValue.value = ''
  emit('update:modelValue', '')
  closeList()
}
function clearAndFocus() {
  clear()
  nextTick(() => inputRef.value?.focus())
}

/* expose methods to parent */
defineExpose({ clear, selectItem, inputRef })

/* accessibility scroll into view for active item */
function scrollToActive() {
  nextTick(() => {
    const el = document.getElementById(getItemId(activeIndex.value))
    if (el && el.scrollIntoView) {
      (el as HTMLElement).scrollIntoView({ block: 'nearest' })
    }
  })
}

/* detect whether parent provided an item slot */
const itemSlot = (useSlots => !!useSlots().item)(/* workaround for script-setup usage */)
const clearAriaLabel = 'Limpar'
</script>

<style scoped>
/* small visual polish */
ul::-webkit-scrollbar {
  width: 8px;
}
ul::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.08);
  border-radius: 999px;
}
</style>
