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
import HeightController from "../HeightController.vue";
import axios from 'axios';
import {namespace} from 'vuex-class';

const controllerStore = namespace("controllerStore");

@Component({
    components: {
        HeightController
    }
})
export default class FollowView extends Vue {

    keyStatuses: any = {};

    @controllerStore.Action('alterFieldOfView') alterFieldOfView: any;

    handleKeyDown(event: any) {
        this.keyStatuses[event.key] = true;
        switch (event.key){
            case 'ArrowUp':
                if (this.keyStatuses.Shift){
                    this.alterFieldOfView(-1);
                }
                break;
            case 'ArrowDown':
                if (this.keyStatuses.Shift){
                    this.alterFieldOfView(1);
                }
                break;
            default:
                break;
        }
    }

    handleKeyUp(event: any){
        this.keyStatuses[event.key] = false;
    }


    mounted(){

        axios.post("https://127.0.0.1:2999/replay/render", {
              cameraMode: 'top',
            })
            .then(response => {
                console.log('Camera Position:', response.data.cameraPosition);
            })
            .catch(err => console.log(err));

        document.onkeydown=null;
        document.onkeyup=null;

        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keyup", this.handleKeyUp);

    }

    beforeDestroy(){
        document.removeEventListener("keydown", this.handleKeyDown);
        document.removeEventListener("keyup", this.handleKeyUp);

    }
    
}

</script>

<style scoped>

</style>
