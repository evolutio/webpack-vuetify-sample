let logged_user = null;

export default {
  list_repos: mockasync(list_repos),
  list_issues: mockasync(list_issues),
  login: mockasync(login),
  logoff: mockasync(logoff),
  whoami: mockasync(whoami),
};

// eslint-disable-next-line
function list_repos(u) {
  return [
    {
      name: 'angularjs',
      owner: { login: 'ze' },
    },
    {
      name: 'vuejs',
      owner: { login: 'ze' },
    },
    {
      name: 'react',
      owner: { login: 'ze' },
    },
  ];
}

// eslint-disable-next-line
function list_issues(u, r) {
  return [
    {
      number: 313,
      title: 'Construir a maquina do tempo',
    },
    {
      number: 312,
      title: 'Voltar no passado e impedir a 2a guerra mundial',
    },
  ];
}

function login(username, password) {
  if (password) {
    logged_user = {
      username,
      name: username,
      permissions: {
        ADMIN: false,
        STAFF: false,
      },
    };
  }
  return logged_user;
}

function logoff() {
  logged_user = null;
}

function whoami() {
  return logged_user ? {
    authenticated: true,
    user: logged_user,
  } : { authenticated: false };
}

function mockasync(f) {
  function mocked(...args) {
    const res = f.apply(this, args);
    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve({ data: res });
      }, 600);
    });
  }
  return mocked;
}
