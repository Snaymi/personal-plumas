<template>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M31.9873 13.44C30.7546 5.82035 24.1091 0 16.0961 0C7.20647 0 0 7.16344 0 16C0 20.4758 1.84886 24.5224 4.82883 27.4263V15.92H4.82911C4.87238 9.77123 9.9002 4.8 16.0961 4.8C21.4328 4.8 25.9029 8.48806 27.0677 13.44H31.9873Z"
            fill="white" />
        <path
            d="M9.8991 30.7712C11.8065 31.5628 13.8999 32 16.0961 32C24.1372 32 30.801 26.1389 32 18.48H27.0862C25.9509 23.4722 21.4615 27.2 16.0961 27.2C13.8068 27.2 11.677 26.5213 9.8991 25.3553V30.7712Z"
            fill="white" />
        <path
            d="M9.8991 16C9.8991 19.4021 12.6736 22.16 16.0961 22.16C19.5186 22.16 22.2931 19.4021 22.2931 16C22.2931 12.5979 19.5186 9.84 16.0961 9.84C12.6736 9.84 9.8991 12.5979 9.8991 16Z"
            fill="white" />
    </svg>

</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

const props = defineProps<{
    class?: string
    width?: number | string
    height?: number | string
    fill?: string      // cor direta (ex.: "#022C5C" ou "currentColor")
    fillVar?: string   // nome da variável (ex.: "dark-blue" ou "--dark-blue")
}>()

const attrs = useAttrs()

const cls = computed(() => props.class ?? (attrs.class as string) ?? '')
const width = computed(() => props.width ?? (attrs.width as string | number) ?? 20)
const height = computed(() => props.height ?? (attrs.height as string | number) ?? 18)

// normaliza fillVar: "dark-blue" -> "--dark-blue"
const normalizedFillVar = (v?: string) => {
    if (!v) return undefined
    return v.startsWith('--') ? v : `--${v}`
}

// resolução para primaryFill:
// 1) props.fill
// 2) props.fillVar -> var(--name)
// 3) attrs.fill
// 4) var(--dark-blue)
// 5) currentColor (fallback)
const primaryFill = computed(() => {
    if (props.fill) return props.fill
    const fv = normalizedFillVar(props.fillVar ?? (attrs as any).fillVar)
    if (fv) return `var(${fv})`
    if ((attrs as any).fill) return (attrs as any).fill
    return 'var(--dark-blue, currentColor)'
})

// repassa outros atributos (exclui class/width/height/fill/fillVar)
const rest = computed(() => {
    const { class: _c, width: _w, height: _h, fill: _f, fillVar: _fv, ...others } = attrs as Record<string, unknown>
    return others
})
</script>

<style scoped></style>
