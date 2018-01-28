// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import Goods from './components/goods/goods';
import Ratings from './components/ratings/ratings';
import Vendor from './components/vendor/vendor';

Vue.use(VueRouter);

Vue.config.productionTip = false;

/* eslint-disable no-new */
const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [
    {path: '/', redirect: '/goods'},
    {path: '/goods', component: Goods},
    {path: '/ratings', component: Ratings},
    {path: '/vendor', component: Vendor}
  ]
});

new Vue({
  router,
  components: {App},
  template: '<App/>'
}).$mount('#app');
