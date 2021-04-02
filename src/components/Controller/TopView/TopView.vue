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
import HeightController from "./HeightController.vue";

@Component({
    components: {
        GridController,
        HeightController
    }
})
export default class TopView extends Vue {

    //top and follow mode?
    
}

</script>

<style scoped>

</style>
