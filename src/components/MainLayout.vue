<script>
import LeftMenu from '@/components/LeftMenu';
import Vuex from 'vuex';

export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: true,
  }),
  methods: {
    logoff() {
      const { $router, $store } = this;
      $store.dispatch('LOGOFF').then(() => {
        $router.go({ name: 'login' });
      });
    },
  },
  computed: {
    ...Vuex.mapGetters(['logged_user']),
  },
  components: {
    LeftMenu,
  },
};
</script>

<style>
  .input-group__details:after {
    background-color: rgba(255, 255, 255, 0.32) !important;
  }
</style>

<template>
  <v-app dark id="inspire">
    <v-navigation-drawer fixed clipped v-model="drawer" app>
      <LeftMenu></LeftMenu>
    </v-navigation-drawer>

    <v-toolbar color="red" dense fixed clipped-left app>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-icon class="ml-3">fa-youtube</v-icon>
      </v-toolbar-title>
      <v-layout row align-center style="max-width: 650px">
        <v-text-field placeholder="Search..." single-line append-icon="search" 
          :append-icon-cb="() => {}" class="white--text" hide-details></v-text-field>
      </v-layout>
      <v-spacer></v-spacer>

      <v-menu v-if="logged_user" bottom left offset-y origin="top right" transition="v-slide-y-transition">
        <v-btn flat dark ripple slot="activator">
          {{logged_user.username}}
        </v-btn>
        <v-list>
          <v-list-tile @click="logoff()">
            <v-list-tile-title v-text="'Log off'"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>
