<template>
    <v-container fluid fill-height>
        <v-row justify="space-between" class="px-2">
            <v-col>
                <GridController />
            </v-col>
            <v-col >
                <HeightController />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import GridController from "./GridController.vue";
import HeightController from "@/components/Controller/General/HeightController.vue";
import axios from 'axios';
import {Action, Mutation, State} from 'vuex-class';

@Component({
    components: {
        GridController,
        HeightController
    }
})
export default class TopView extends Vue {

    @Action('alterCameraPosition') alterCameraPosition: any;
    @State('viewMode') viewMode: any;

    directions = {
        'up': {
            modifiers: [ {axis: 'z', modifier: 1} ]
        },
        'up-right': {
            modifiers: [{axis: 'x', modifier: 1}, {axis: 'z', modifier: 1 } ]
        },
        'right': {
            modifiers: [{axis: 'x', modifier: 1}]
        },
        'down-right': {
            modifiers: [{axis: 'x', modifier:1}, {axis: 'z', modifier: -1}]
        },
        'down': {
            modifiers: [{axis: 'z', modifier: -1}]
        },
        'down-left': {
            modifiers: [{axis: 'x', modifier: -1}, {axis: 'z', modifier:-1}]
        },
        'left': {
            modifiers: [{axis: 'x', modifier: -1}]
        },
        'up-left': {
            modifiers: [{axis: 'x', modifier:-1}, {axis: 'z', modifier:1}]
        }
    }

    keyStatuses: any = {
        ArrowLeft: false,
        ArrowRight: false,
        ArrowUp: false,
        ArrowDown: false 
    }


    //top and follow mode?
    handleKeyDown = (event: any) => {
        
        //console.log(event.code, event.key, event);
        this.keyStatuses[event.key]=true;
        switch (event.key){
            case "ArrowLeft":
                //console.log('arrow left');
                if (this.keyStatuses.ArrowUp){
                    this.alterCameraPosition(this.directions['up-left']['modifiers']);
                } else if (this.keyStatuses.ArrowDown){
                    this.alterCameraPosition(this.directions['down-left']['modifiers']);
                } else {
                    this.alterCameraPosition(this.directions['left']['modifiers']);
                }
                break;
            case "ArrowRight":
                //console.log('arrow right');
                if (this.keyStatuses.ArrowUp){
                    this.alterCameraPosition(this.directions['up-right']['modifiers']);
                } else if (this.keyStatuses.ArrowDown){
                    this.alterCameraPosition(this.directions['down-right']['modifiers']);
                } else {
                    this.alterCameraPosition(this.directions['right']['modifiers']);
                }
                break;
            case "ArrowUp":
                //console.log('arrow up');
                if (this.keyStatuses.Shift){
                    this.alterCameraPosition([{axis: 'y', modifier: -1}])
                } else if (this.keyStatuses.ArrowRight){
                    this.alterCameraPosition(this.directions['up-right']['modifiers']);
                } else if (this.keyStatuses.ArrowLeft){
                    this.alterCameraPosition(this.directions['up-left']['modifiers']);
                } else {
                    this.alterCameraPosition(this.directions['up']['modifiers']);
                }
                break;
            case "ArrowDown":
                //console.log('arrow down');
                if (this.keyStatuses.Shift){
                    this.alterCameraPosition([{axis: 'y', modifier: 1}])
                } else if (this.keyStatuses.ArrowRight){
                    this.alterCameraPosition(this.directions['down-right']['modifiers']);
                } else if (this.keyStatuses.ArrowLeft){
                    this.alterCameraPosition(this.directions['down-left']['modifiers']);
                } else {
                    this.alterCameraPosition(this.directions['down']['modifiers']);
                }
                break;
            default:
                break;
        }
    }

    handleKeyUp = (event: any) => {
        this.keyStatuses[event.key] = false;
    }

    beforeDestroy(){
        document.removeEventListener("keydown", this.handleKeyDown);
        document.removeEventListener("keyup", this.handleKeyUp);

    }

    //top and follow mode?
    mounted(){

        axios.post("https://127.0.0.1:2999/replay/render", {
              cameraMode: 'fps',
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




    
}

</script>

<style scoped>

</style>
