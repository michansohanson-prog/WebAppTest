import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { layout: 'auth' },
  },
  {
    path: '/login',
    name: 'LoginRoute', // Standardized naming to PascalCase
    redirect: '/', // Redirect /login to root for consistent entry point
    meta: { layout: 'auth' },
  },
  {
    path: '/hub',
    name: 'Hub',
    component: () => import('../views/HubView.vue'),
    meta: { layout: 'main' },
  },
  {
    path: '/comm',
    name: 'Comm',
    component: () => import('../views/CommView.vue'),
    meta: { layout: 'main' },
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('../views/MessagesView.vue'),
    meta: { layout: 'main' },
  },
  {
    path: '/games',
    name: 'Games',
    component: () => import('../views/GamesView.vue'),
    meta: { layout: 'main' },
  },
  {
    path: '/familiars',
    name: 'Familiars',
    component: () => import('../views/FamiliarsView.vue'),
    meta: { layout: 'main' },
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import('../views/InventoryView.vue'),
    meta: { layout: 'main' },
  },
  {
    path: '/archives',
    name: 'Archives',
    component: () => import('../views/ArchivesView.vue'),
    meta: { layout: 'main' },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

/**
 * Navigation Guard
 * Ensures that any undefined paths default to the login entry point,
 * which is critical for stable behavior in static hosting (GitHub Pages, Netlify, etc.)
 */
router.beforeEach((to) => {
  if (to.matched.length === 0) {
    return '/login'
  }
})

export default router
