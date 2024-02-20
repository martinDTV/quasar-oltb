import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/mapa/:pk', component: () => import('components/ComponenteMapas.vue') },
      { path: '/boton', component: () => import('components/ComponenteLoading.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/error404',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
