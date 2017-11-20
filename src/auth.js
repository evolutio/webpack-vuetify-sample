import AppApi from '~api/api.js';
import store from '@/store/index.js';

const unauth_redirect = { name: 'login' };

function allow(policy, logged_user) {
  if (policy === 'ALL') {
    return true;
  } else if (policy === 'LOGGED') {
    return !!logged_user;
  }
  // TODO: podemos implementar regras mais complexas aqui se necessario.
  // e policy nao tem que ser uma string
  throw new Error(`unknown auth policy ${policy}`);
}

function proceed(to, next) {
  const policy = (to.meta && to.meta.auth_allow) || 'LOGGED';
  const allowed = allow(policy, store.state.logged_user);
  if (allowed) {
    next();
  } else {
    next(unauth_redirect);
  }
}

export default function (to, from, next) {
  if (store.state.logged_user === undefined) {
    AppApi.whoami().then((response) => {
      if (response.data.authenticated) {
        store.commit('SET_LOGGED_USER', response.data.user);
      } else {
        store.commit('SET_LOGGED_USER', null);
      }
      proceed(to, next);
    });
  } else {
    proceed(to, next);
  }
}
