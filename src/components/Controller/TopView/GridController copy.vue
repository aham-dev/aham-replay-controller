<template>
    <v-container id="grid-container">
        <v-row class="grid-row" align="center" justify="center">
            <v-col class="col">
                <v-row>
                </v-row>
            </v-col>
            <v-col class="center-col col">
                <v-row class="test" justify="center" align="center">
                    <v-img :src="require('@/assets/up-arrow.png')" />
                </v-row>
            </v-col>
            <v-col class="col">
                <v-row>
                </v-row>
            </v-col>
        </v-row>
        <!-- <v-row>
            <v-divider />
        </v-row> -->
        <v-row class="grid-row">
            <v-col>
            </v-col>
            <v-col class="center-col">
            </v-col>
            <v-col>
            </v-col>
        </v-row>
        <v-row>
            <v-divider />
        </v-row>
        <v-row class="grid-row">
            <v-col>
            </v-col>
            <v-col class="center-col">
            </v-col>
            <v-col>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class GridController extends Vue {

    //top and follow mode?
    gridInfo: any[][] = [
        [{}, {imageUrl: '@/assets/up-arrow.png', function: this.helloWorld}, {}],

    ]

    helloWorld(){
        console.log('hello world');
    }
    
}

</script>

<style scoped>

#grid-container {
    border: solid 1px #d1d5de;
    border-radius: 10px;
}

.grid-row {
    height: 60px;
}

.center-col {
    border-right: 1px solid #d1d5de;
    border-left: 1px solid #d1d5de;
}

.col {
    border-bottom: 1px solid #d1d5de;
    height: 100%;
}

.test:hover {
    background-color: #d1d5de;
}

/* .theme--light.v-divider {
    border-color: rgba(0,0,0,0.12);
} */

</style>
