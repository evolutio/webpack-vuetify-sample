<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      error: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.error = false;
      const { username, password, $router, $store } = this;
      $store.dispatch('LOGIN', { username, password }).then(() => {
        $router.push({ name: 'home' });
        this.loading = false;
      }).catch(() => {
        this.error = true;
        this.loading = false;
      });
    },
  },
};
</script>

<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3 class="px-2">
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline">Login</h3>
          </div>
        </v-card-title>
        <v-container fluid>
          <v-form>
            <v-text-field label="Username" v-model="username"></v-text-field>
            <v-text-field label="Password" v-model="password" type="password" @keyup.enter="login()"></v-text-field>
            <small style="color: red;" v-if="error">Usuário ou senha inválido</small>
          </v-form>
          <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>
