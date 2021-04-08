<template>

  <v-app>
    <!-- <v-main style="background-color: black;"> -->
      <Controller/>
<!--       
    </v-main> -->
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Controller from "@/components/Controller/Controller.vue";

export default Vue.extend({
  name: 'App',

  components: {
    // HelloWorld,
    Controller
  },

  data: () => ({
    //
  }),
});
</script>
