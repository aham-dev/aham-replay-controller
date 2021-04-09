<template>

  <v-app>
    <!-- <v-main style="background-color: black;"> -->
      <ReplayController/>
<!--       
    </v-main> -->
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import ReplayController from "@/components/Controller/ReplayController.vue";

export default Vue.extend({
  name: 'App',

  components: {
    // HelloWorld,
    ReplayController
  },

  data: () => ({
    //
  }),
});
</script>

<style >

::-webkit-scrollbar {
display: none;
}

</style>
