import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function page(name) {
  return () => import(`@/pages/${name}.vue`);
}


export default new Router({
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
  ],
});
