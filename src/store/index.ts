/* eslint @typescript-eslint/no-var-requires: "off" */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import controllerStore from './controllerStore';
const electron = require('electron');
const remote = require('electron').remote;
const {ipcRenderer} = require('electron');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    viewMode: "top",
    cameraPositionIncrement: 800,
    fieldOfViewIncrement: 10,
    healthOn: true,
    open: false,
    healthToggle: true,
    scoreToggle: true
  },
  mutations: {
    mutateValue(state, payload){
        const {property, value} = payload;
        state[property] = value;
    },
    changeViewMode(state, newMode){
        state.viewMode=newMode;
        console.log('newmode ', newMode);

        axios.post("https://127.0.0.1:2999/replay/render", {
              cameraMode: newMode=="top"?'fps':'top'
            })
            .then(response => {
                console.log('Camera Position:', response.data.cameraPosition);
            })
            .catch(err => console.log(err));
    },
    toggleController(state){
        state.open = !state.open;
    }
  },
  actions: {
    closeWindow(){
      // console.log('HAHAHAHAH', electron, remote, ipcRenderer);
      // const window = remote.getCurrentWindow();
      // window.close();
      ipcRenderer.send('close-player');
    },
    toggleHealth({state}){
      const changeObject: any = {};
      const healthBarItems = ["Champions", "Minions", "Pets", "Structures", "Wards"];
      state.healthOn = !state.healthOn;
      for (const item of healthBarItems){
        changeObject["healthBar"+item] = state.healthOn;
      }

      axios.post("https://127.0.0.1:2999/replay/render", changeObject)
          .then(response => {
              console.log(response.data);
          })
          .catch(err => console.log(err));


    },
    alterFieldOfView({state}, modifier: number){
      //console.log('ALTERING FIELD OF VIEW!')
      axios.get("https://127.0.0.1:2999/replay/render")
        .then(response => {
          const renderInfo = response.data;
          const fieldOfView = renderInfo.fieldOfView;
          axios.post("https://127.0.0.1:2999/replay/render", {
              cameraMode: 'top',
              fieldOfView: fieldOfView+(state.fieldOfViewIncrement*modifier)
            })
            .then(response => {
                console.log('Camera Position:', response.data.cameraPosition);
            })
            .catch(err => console.log(err));

        }).catch(err => console.log(err));

    },
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
    controllerStore: controllerStore

  }
})
