import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function page(name) {
  return () => import(`@/components/pages/${name}.vue`);
}


export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: page('index'),
    },
    {
      path: '/a',
      name: 'a',
      component: page('a'),
    },
  ],
});
