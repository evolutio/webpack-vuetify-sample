<script>
  import LeftMenu from '@/components/LeftMenu';
  
  export default {
    data: () => ({
      drawer: true,
    }),
    props: {
      source: String,
    },
    components: { LeftMenu },
  };
</script>

<style>
  .input-group__details:after {
    background-color: rgba(255, 255, 255, 0.32) !important;
  }
</style>

<template>
  <v-app
    dark
    id="inspire"
  >
    <v-navigation-drawer fixed clipped v-model="drawer" app>
      <LeftMenu></LeftMenu>
    </v-navigation-drawer>

    <v-toolbar color="red" dense fixed clipped-left app>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-icon class="ml-3">fa-youtube</v-icon>
      </v-toolbar-title>
      <v-layout row align-center style="max-width: 650px">
        <v-text-field
          placeholder="Search..."
          single-line
          append-icon="search"
          :append-icon-cb="() => {}"
          class="white--text"
          hide-details
        ></v-text-field>
      </v-layout>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>
