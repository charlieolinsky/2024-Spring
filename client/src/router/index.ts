import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { refSession } from '../viewModel/session';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  const session = refSession();
  //Router Guard to prevent unauthenticated users from accessing the app
  if (!['/login', '/register'].includes(to.path) && !session.user) {
    next('/login');
    return;
  }
  console.log('beforeEach', from, to);
  next();
})

export default router
