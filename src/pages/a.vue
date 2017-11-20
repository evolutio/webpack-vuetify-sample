<script>
  import AppApi from '~api/api.js';

  export default {
    methods: {
      vai() {
        AppApi.list_repos('tonylampada').then((response) => {
          console.log(response.data);
        });
      },
    },
    data: () => {
      return {};
    },
  };
</script>
<template>
<v-container fill-height>
  <v-layout justify-center align-center>
    <v-tooltip right>
      <v-btn icon large target="_blank" slot="activator">
        <v-icon large>code</v-icon>
      </v-btn>
      <span>Source</span>
    </v-tooltip>
    <v-btn color="primary" @click="vai()">Vai</v-btn>
  </v-layout>
</v-container>
</template>
