import Vue from 'vue';
import Vuex from 'vuex';
import { AUTH_USER } from '@/store/actions';
import AppApi from '@/api/api';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    logged_user: undefined,
  },
  mutations: {
    SET_LOGGED_USER(state, logged_user) {
      state.logged_user = logged_user;
    },
  },
  getters: {
    logged_user: (state) => {
      return state.logged_user;
    },
  },
  actions: {
    [AUTH_USER]({ commit }) {
      AppApi.whoami().then((response) => {
        if (response.data.authenticated) {
          const { user } = response.data;
          commit('SET_LOGGED_USER', user);
          return user;
        }

        commit('SET_LOGGED_USER', null);
        throw Error('Invalid auth');
      });
    },
  },
});

export default store;
