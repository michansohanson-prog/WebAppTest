import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/LoginView.vue'),
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
  history: createWebHistory(),
  routes,
})

// Modern Navigation Guard (No warnings)
router.beforeEach((to, from) => {
  if (to.path === '/' && to.matched.length === 0) {
    return '/login' // Returning the path is the modern way to redirect
  }

  // Catch-all: if a user types a random URL that doesn't exist,
  // send them back to login.
  if (to.matched.length === 0) {
    return '/login'
  }
})

export default router
