<template>
    <div class="bg-white rounded-2xl shadow-sm p-6 w-full">
        <h3 class="font-semibold text-gray-800 mb-4">Notificações</h3>
        <div class="space-y-3">
            <div v-for="(item, i) in notifications" :key="i"
                class="flex justify-between text-sm text-gray-600 border-b pb-2">
                <div>
                    <p class="font-medium text-gray-700">{{ item.title }}</p>
                    <p class="text-gray-500">{{ item.subtitle }}</p>
                </div>
                <a href="#" class="text-blue-600 font-medium hover:underline">
                    Assinar
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Notification {
    title: string
    subtitle: string
}

const notifications: Notification[] = [
    { title: "Lorem ipsum dolor sit", subtitle: "Lorem ipsum dolor" },
    { title: "Lorem ipsum dolor sit", subtitle: "Lorem ipsum dolor" },
    { title: "Lorem ipsum dolor sit", subtitle: "Lorem ipsum dolor" },
    { title: "Lorem ipsum dolor sit", subtitle: "Lorem ipsum dolor" }
]
</script>
