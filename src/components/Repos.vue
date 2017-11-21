<script>

import AppApi from '~api/api.js';

export default {
  data() {
    return {
      username: '',
      repos: [],
      headers: [
        { text: 'Owner', value: 'owner.login' },
        { text: 'Name', value: 'name' },
      ],
    };
  },
  methods: {
    findrepos() {
      return AppApi.list_repos(this.username).then((response) => {
        this.repos = response.data;
      });
    },
  },
};

</script>

<template>
  <v-container fluid>
    <v-text-field name="input-1" label="Github username" v-model="username" @keyup.enter="findrepos"></v-text-field>
    <v-data-table :headers="headers" :items="repos">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.owner.login }}</td>
        <td>{{ props.item.name }}</td>
      </template>
    </v-data-table>
  </v-container>
</template>