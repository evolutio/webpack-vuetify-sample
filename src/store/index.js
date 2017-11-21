import Vue from 'vue';
import Vuex from 'vuex';
import AppApi from '~api/api';

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
    AUTH_USER({ commit }) {
      return AppApi.whoami().then((response) => {
        if (response.data.authenticated) {
          const { user } = response.data;
          commit('SET_LOGGED_USER', user);
          return user;
        }

        commit('SET_LOGGED_USER', null);
        return null;
      });
    },
    LOGIN({ commit }, { username, password }) {
      return AppApi.login(username, password).then((result) => {
        const logged_user = result.data;
        if (logged_user) {
          commit('SET_LOGGED_USER', logged_user);
          return logged_user;
        }
        commit('SET_LOGGED_USER', null);
        throw Error('Invalid auth');
      });
    },
    LOGOFF({ commit }) {
      return AppApi.logoff().then(() => {
        commit('SET_LOGGED_USER', null);
        return null;
      });
    },
  },
});

export default store;
