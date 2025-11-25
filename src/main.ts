// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Tailwind
import "./assets/tailwind.css";

// IMPORTANTE: CSS do bottom-sheet correto (o MESMO do projeto antigo)
import "@webzlodimir/vue-bottom-sheet/dist/style.css";

// ApexCharts (registro global)
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);

// Registrar o componente global para funcionar em qualquer lugar:
// <apexchart />
app.component("apexchart", VueApexCharts);

app.use(router);

app.mount("#app");