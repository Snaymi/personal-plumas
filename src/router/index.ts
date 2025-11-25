// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";

// rotas com lazy-load (recomendado)
const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/components/pages/LoginForm.vue"),
    meta: { layout: "authLayout" },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("@/components/pages/ForgotPassword.vue"),
    meta: { layout: "authLayout" },
  },
  {
    path: "/recovery",
    name: "Recovery",
    component: () => import("@/components/pages/Recovery.vue"),
    meta: { layout: "authLayout" },
  },
  {
    path: "/admin",
    name: "Home",
    component: () => import("@/components/pages/Home.vue"),
    meta: { layout: "defaultLayout" },
  },
  {
    path: "/import",
    name: "Import",
    component: () => import("@/components/pages/Import.vue"),
    meta: { layout: "defaultLayout" },
  },
  {
    path: "/registerusers",
    name: "RegisterUsers",
    component: () => import("@/components/pages/RegisterUsers.vue"),
    meta: { layout: "defaultLayout" },
  },
  {
    path: "/registerfunctions",
    name: "RegisterFunctions",
    component: () => import("@/components/pages/RegisterFunctions.vue"),
    meta: { layout: "defaultLayout" },
  },
  {
    path: "/registercurrentaccount",
    name: "RegisterCurrentAccount",
    component: () => import("@/components/pages/RegisterCurrentAccount.vue"),
    meta: { layout: "defaultLayout" },
  },
  {
    path: "/registerbanks",
    name: "RegisterBanks",
    component: () => import("@/components/pages/RegisterBanks.vue"),
    meta: { layout: "defaultLayout" },
  },
  {
    path: "/registeraccountingaccounts",
    name: "RegisterAccountingAcconts",
    component: () =>
      import("@/components/pages/RegisterAccountingAccounts.vue"),
    meta: { layout: "defaultLayout" },
  },
  {
    path: "/registeraccountingentries",
    name: "RegisterAccountingEntries",
    component: () => import("@/components/pages/RegisterAccountingEntries.vue"),
    meta: { layout: "defaultLayout" },
  },
  {
    path: "/registercompanies",
    name: "RegisterCompanies",
    component: () => import("@/components/pages/RegisterCompanies.vue"),
    meta: { layout: "defaultLayout" },
  },
  {
    path: "/registercategories",
    name: "RegisterCategories",
    component: () => import("@/components/pages/RegisterCategories.vue"),
    meta: { layout: "defaultLayout" },
  },
  {
    path: "/registerasks",
    name: "RegisterAsks",
    component: () => import("@/components/pages/RegisterAsks.vue"),
    meta: { layout: "defaultLayout" },
  },
  {
    path: "/registersmartmanagement",
    name: "RegisterSmartManagement",
    component: () => import("@/components/pages/RegisterSmartManagement.vue"),
    meta: { layout: "defaultLayout" },
  },
  {
    path: "/registerreleasecode",
    name: "RegisterReleaseCode",
    component: () => import("@/components/pages/RegisterReleaseCode.vue"),
    meta: { layout: "defaultLayout" },
  },
  {
    path: "/registersmartmanagementindicators",
    name: "RegisterSmartManagementIndicators",
    component: () =>
      import("@/components/pages/RegisterSmartManagementIndicators.vue"),
    meta: { layout: "defaultLayout" },
  },
  {
    path: "/registerkeywordsnf",
    name: "RegisterKeyWordsNF",
    component: () => import("@/components/pages/RegisterKeyWordsNF.vue"),
    meta: { layout: "defaultLayout" },
  },
  {
    path: "/registersystemparameters",
    name: "RegisterSystemParameters",
    component: () => import("@/components/pages/RegisterSystemParameters.vue"),
    meta: { layout: "defaultLayout" },
  },
  {
    path: "/registerreport",
    name: "RegisterReport",
    component: () => import("@/components/pages/RegisterReport.vue"),
    meta: { layout: "defaultLayout" },
  },
  {
    path: "/importofx",
    name: "importofx",
    component: () => import("@/components/pages/ImportOFX.vue"),
    meta: { layout: "defaultLayout" },
  },
  {
    path: "/clientsubscriptions",
    name: "clientsubscriptions",
    component: () =>
      import("@/components/pages-client/ClientSubscriptions.vue"),
    meta: { layout: "ClientHeader" },
  },
  {
    path: "/clientdashboard",
    name: "clientdashboard",
    component: () => import("@/components/pages-client/ClientDashboard.vue"),
    meta: { layout: "ClientHeader" },
  },
   {
    path: "/bankstatement",
    name: "bankstatement",
    component: () => import("@/components/pages-client/BankStatement.vue"),
    meta: { layout: "ClientHeader" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const isPublic = to.meta.public === true
//   const requiresAuth = to.meta.requiresAuth === true

//   // exemplo simples: checagem baseada em localStorage; substitua pela sua store
//   const token = localStorage.getItem('auth_token')
//   const isAuthenticated = !!token

//   if (requiresAuth && !isAuthenticated) {
//     return next({ name: 'Login', query: { redirect: to.fullPath } })
//   }

//   return next()
// })
export { routes };
export default router;
