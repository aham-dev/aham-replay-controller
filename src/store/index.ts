import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cameraPositionIncrement: 800
  },
  mutations: {
  },
  actions: {
    alterCameraPosition({state}, axisModifiers: any){
      //payload should be an array of objects
      axios.get("https://127.0.0.1:2999/replay/render")
        .then(response => {
          const renderInfo = response.data;
          const cameraPosition = renderInfo.cameraPosition;
          for (const axisObject of axisModifiers){
            const {axis, modifier} =  axisObject;
            cameraPosition[axis] = cameraPosition[axis] + (state.cameraPositionIncrement*modifier);
          }
          axios.post("https://127.0.0.1:2999/replay/render", {
              cameraMode: 'fps',
              cameraPosition: cameraPosition,
              cameraRotation: {
                y: 100
              }
            })
            .then(response => {
                console.log('Camera Position:', response.data.cameraPosition);
            })
            .catch(err => console.log(err));

        }).catch(err => console.log(err));
    }
  },
  modules: {
  }
})
