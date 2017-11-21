<script>
import AppApi from '~api/api.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      AppApi.login(this.username, this.password).then((result) => {
        this.loading = false;
        const logged_user = result.data;
        if (logged_user) {
          this.$store.commit('SET_LOGGED_USER', logged_user);
          this.$router.push({ name: 'home' });
        }
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
            <v-text-field label="Password" v-model="password" type="password"></v-text-field>
          </v-form>
          <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>