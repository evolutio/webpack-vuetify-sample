import Vue from 'vue';
import Router from 'vue-router';
import auth from './auth.js';

Vue.use(Router);

function page(name) {
  return () => import(`@/pages/${name}.vue`);
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: page('home'),
    },
    {
      path: '/repos',
      name: 'repos',
      component: page('repos'),
    },
    {
      path: '/login',
      name: 'login',
      component: page('login'),
      meta: {
        auth_allow: 'ALL',
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  auth(to, from, next);
});

export default router;
