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
    // next();
    next(unauth_redirect);
  }
}

export default function (to, from, next) {
  // proceed if already logged
  if (store.state.logged_user) {
    proceed(to, next);
    return;
  }

  store.dispatch('AUTH_USER').then(() => {
    proceed(to, next);
  });
}
