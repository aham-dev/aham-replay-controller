<template>
    <v-container >
        <v-row justify="center" align="center" class="px-2">
            <v-col></v-col>
            <v-col >
                <HeightController />
            </v-col>
            <v-col></v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import HeightController from "@/components/Controller/General/HeightController.vue";
import axios from 'axios';

@Component({
    components: {
        HeightController
    }
})
export default class FollowView extends Vue {

    //top and follow mode?

    mounted(){

        axios.post("https://127.0.0.1:2999/replay/render", {
              cameraMode: 'top',
            })
            .then(response => {
                console.log('Camera Position:', response.data.cameraPosition);
            })
            .catch(err => console.log(err));

    }
    
}

</script>

<style scoped>

</style>
