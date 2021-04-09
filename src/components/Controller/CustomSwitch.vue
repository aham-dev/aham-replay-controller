<template>
    <label class="switch">
        <input type="checkbox" :checked="checked" @click="checked=!checked">
        <span class="slider round"  ></span>
    </label>
</template>

<script lang="ts">
import {Vue, Component, Watch, Prop} from 'vue-property-decorator';

@Component({})
export default class CustomSwitch extends Vue {

    checked = true;

    @Prop() onFunction: any;
    @Prop() offFunction: any;

    @Watch('checked')
    onCheckChange(newVal){
        if (newVal){
            this.onFunction();
        } else {
            this.offFunction();
        }
    }

}


</script>


<style scoped>

.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #4ab9ce;
}

input:focus + .slider {
  box-shadow: 0 0 1px #4ab9ce;
}

input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}




</style>