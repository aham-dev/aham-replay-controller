<template>
    <div id="height-container" class="ma-0">
        <div 
            class="button-top button d-flex justify-center align-center"
            @click="viewMode=='follow'?alterFieldOfView(-1):alterCameraPosition(axisModifierUp)"
        >
            <v-img :src="require('@/assets/plus.png')" width="48" height="48"/>
        </div>
        <div 
            class="button-bottom button d-flex justify-center align-center"
            @click="viewMode=='follow'?alterFieldOfView(1):alterCameraPosition(axisModifierDown)"
        >
            <v-img :src="require('@/assets/minus.png')" width="48" height="48"/>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {namespace} from 'vuex-class';

const controllerStore = namespace('controllerStore');

@Component({})
export default class HeightController extends Vue {

    @controllerStore.State('viewMode') viewMode: any;

    @controllerStore.Action('alterFieldOfView') alterFieldOfView: any;
    @controllerStore.Action('alterCameraPosition') alterCameraPosition: any;

    axisModifierUp: any = [{axis: 'y', modifier: -1}];
    axisModifierDown: any = [{axis: 'y', modifier: 1}];

    axisModifiers: any[][] = [
        [{axis: 'x', modifier: 1}]
    ];

    //top and follow mode?
    gridInfo: any[][] = [
        [
            { axisModifiers: [{axis: 'x', modifier: -1}, {axis: 'z', modifier: 1}] }, 
            {imageUrl: '@/assets/up-arrow.png', axisModifiers: [{axis: 'z', modifier: 1}]}, 
            {imageUrl: '@/assets/up-right-arrow.png', axisModifiers: [{axis: 'x', modifier: 1}, {axis: 'z', modifier: 1}]}
        ],
        [
            {imageUrl: '@/assets/left-arrow.png', axisModifiers: [{axis: 'x', modifier: -1}]}, 
            {}, 
            {imageUrl: '@/assets/right-arrow.png', axisModifiers: [{axis: 'x', modifier: 1}] }
        ],
        [
            {imageUrl: '@/assets/down-left-arrow.png', axisModifiers: [{axis: 'x', modifier: -1}, {axis: 'z', modifier: -1}]}, 
            {imageUrl: '@/assets/down-arrow.png', axisModifiers: [{axis: 'z', modifier: -1}]}, 
            {imageUrl: '@/assets/down-right-arrow.png', axisModifiers: [{axis: 'x', modifier: 1}, {axis: 'z', modifier: -1}]}
        ]

    ]

    getImage(url: string){
        console.log(url);
        return require(url);
    }

    helloWorld(){
        console.log('hello world');
    }
    
}

</script>

<style scoped>

#height-container {
    border: solid 1px #d1d5de;
    border-radius: 10px;
    height: 180px;
    width: 64px;
}

.button {
  cursor: pointer;
}

.button-top {
    height:90px;
    border-bottom: 1px solid #d1d5de;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.button-bottom {
    height: 90px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.button:hover {
    background-color: #d1d5de;
}

</style>
