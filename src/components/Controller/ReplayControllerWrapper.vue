<template>
<div>
    <div v-if="open" class="corner-fixed">
        <ReplayController />
    </div>
    <div 
        v-else 
        id="closed-controller" 
        class="corner-fixed d-flex justify-center align-center px-3" 
        @click="toggleController"
    >

        <div>{{"관전 뷰어 리모컨"}}</div>
    </div>
</div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import ReplayController from "@/components/ReplayController/ReplayController.vue";
import {namespace} from 'vuex-class';


const controllerStore = namespace('controllerStore');

@Component({
    components: {
        ReplayController
    }
})
export default class ReplayControllerTest extends Vue {

    @controllerStore.State('open') open;
    @controllerStore.Mutation('toggleController') toggleController;

}


</script>


<style scoped>

.corner-fixed {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 0 2vw 20vh 0;
}

#closed-controller {
    /* width: 147px; */
    height: 60px;
    /* padding: 19px ; */
    border-radius: 30px;
    background-image: linear-gradient(to bottom, #689fff, #4ab9ce);
    font-size: 15px;
    color: white;
}



#closed-controller:hover {
  filter: brightness(90%);
}

</style>