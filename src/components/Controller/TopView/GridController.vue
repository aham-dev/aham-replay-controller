<template>
    <div id="grid-container">
        <div
            class="button grid-row d-flex flex-row bot-border"
            align="center" 
            justify="center"
        >
            <div 
                class="button col d-flex justify-center align-center" 
                @click="alterCameraPosition(gridInfo[0][0].axisModifiers)"
                style="border-top-left-radius: 8px;"
            > 
                <v-img :src="require('@/assets/up-left-arrow.png')" />

            </div>
            <div class="button col center-col d-flex justify-center align-center" @click="alterCameraPosition(gridInfo[0][1].axisModifiers)">
                <v-img :src="require('@/assets/up-arrow.png')" />
            </div>
            <div 
                class="button col d-flex justify-center align-center" 
                @click="alterCameraPosition(gridInfo[0][2].axisModifiers)"
                style="border-top-right-radius: 8px;"
            >
                <v-img :src="require('@/assets/up-right-arrow.png')" />
            </div>
        </div>
        <div
            class="grid-row d-flex flex-row bot-border"
            align="center" 
            justify="center"
        >
            <div class="button col d-flex justify-center align-center" @click="alterCameraPosition(gridInfo[1][0].axisModifiers)"> 
                <v-img :src="require('@/assets/left-arrow.png')" />
            </div>
            <div id="center-panel" class="col center-col" >
            </div>
            <div class="button col d-flex justify-center align-center" @click="alterCameraPosition(gridInfo[1][2].axisModifiers)">
                <v-img :src="require('@/assets/right-arrow.png')" />
            </div>
        </div>
        <div
            class="grid-row d-flex flex-row"
            align="center" 
            justify="center"
        >
            <div 
                class="button col d-flex justify-center align-center" 
                @click="alterCameraPosition(gridInfo[2][0].axisModifiers)"
                style="border-bottom-left-radius: 8px;"
            > 
                <v-img :src="require('@/assets/down-left-arrow.png')" />
            </div>
            <div class="button col center-col justify-center align-center" @click="alterCameraPosition(gridInfo[2][1].axisModifiers)">
                <v-img src="../../../assets/down-arrow.png" />
            </div>
            <div 
                class="button col d-flex justify-center align-center" 
                @click="alterCameraPosition(gridInfo[2][2].axisModifiers)"
                style="border-bottom-right-radius: 8px;"
            >
                <v-img :src="require('@/assets/down-right-arrow.png')" />
            </div>
        </div>
        <!-- <div
            v-for="(rowInfo, rowIndex) of gridInfo"
            :key="rowIndex"
            class="grid-row d-flex flex-row"
            :class="rowIndex<2?'bot-border':''"
            align="center" 
            justify="center"
        >
            <div class="col "> 
                <v-img :src="getImage(rowInfo[0].imageUrl)" />

            </div>
            <div class="col center-col">
                <v-img :src="require('@/assets/up-arrow.png')" />
            </div>
            <div class="col">
            </div>
        </div> -->
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {namespace} from 'vuex-class';

const controllerStore = namespace('controllerStore');

@Component({})
export default class GridController extends Vue {


    @controllerStore.Action('alterCameraPosition') alterCameraPosition: any;

    axisModifiers: any[][] = [
        [{axis: 'x', modifier: 1}]
    ];

    //top and follow mode?
    gridInfo: any[][] = [
        [
            {axisModifiers: [{axis: 'x', modifier: -1}, {axis: 'z', modifier: 1}] }, 
            {axisModifiers: [{axis: 'z', modifier: 1}]}, 
            {axisModifiers: [{axis: 'x', modifier: 1}, {axis: 'z', modifier: 1}]}
        ],
        [
            {axisModifiers: [{axis: 'x', modifier: -1}]}, 
            {}, 
            {axisModifiers: [{axis: 'x', modifier: 1}] }
        ],
        [
            {axisModifiers: [{axis: 'x', modifier: -1}, {axis: 'z', modifier: -1}]}, 
            {axisModifiers: [{axis: 'z', modifier: -1}]}, 
            {axisModifiers: [{axis: 'x', modifier: 1}, {axis: 'z', modifier: -1}]}
        ]

    ]

    getImage(url: string){
        console.log(url);
        return require(url);
    }

    

    
}

</script>

<style scoped>

.button {
    cursor: pointer;
}

#grid-container {
    border: solid 1px #d1d5de;
    border-radius: 10px;
    width: 180px;
}

.grid-row {
    height: 60px;
    width: 100%;
}

.center-col {
    border-right: 1px solid #d1d5de;
    border-left: 1px solid #d1d5de;
}

.bot-border {
    border-bottom: 1px solid #d1d5de;

}

#center-panel:hover {
    background-color: white;

}

.col {
    
    height: 100%;
    width: 33.333%;
    width: calc(100% /3)
}

.col:hover {
    background-color: #d1d5de;
}

/* .theme--light.v-divider {
    border-color: rgba(0,0,0,0.12);
} */

</style>
