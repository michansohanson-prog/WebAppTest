import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    // Redirect the root to login automatically if it hits the base path
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login_Route',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/hub',
    name: 'Hub',
    component: () => import('../views/HubView.vue'),
  },
  {
    path: '/comm',
    name: 'Comm',
    component: () => import('../views/CommView.vue'),
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('../views/MessagesView.vue'),
  },
  {
    path: '/games',
    name: 'Games',
    component: () => import('../views/GamesView.vue'),
  },
  {
    path: '/familiars',
    name: 'Familiars',
    component: () => import('../views/FamiliarsView.vue'),
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import('../views/InventoryView.vue'),
  },
  {
    path: '/archives',
    name: 'Archives',
    component: () => import('../views/ArchivesView.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// Remove the manual before_each guards for a moment to see if they are causing conflicts
// with the Hash history mode. The 'redirect' above handles the root path correctly.
router.addRoute('Login_Route', '/') // Ensure login is always reachable

export default router
