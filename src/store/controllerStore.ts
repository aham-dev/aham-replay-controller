import axios from 'axios';

// const API_SERVER = "http://127.0.0.1:3000/api/v1";
const axiosInstance = axios.create(
    {
        // withCredentials: true
    }
);

export default {
    namespaced: true,
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
            const renderObject = {};
            if (newMode=='top'){
                renderObject['cameraRotation']= {y: 100};
                renderObject['cameraMode'] = 'fps';
            } else {
                renderObject['cameraMode'] = 'top';
            }

            axios.post("https://127.0.0.1:2999/replay/render", renderObject)
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
        toggleHealth({state}, value){
            const changeObject: any = {};
            // "Champions", 
            const healthBarItems = ["Minions", "Pets", "Structures", "Wards"];
            state.healthToggle = value;
            for (const item of healthBarItems){
              changeObject["healthBar"+item] = state.healthToggle;
            }
      
            axios.post("https://127.0.0.1:2999/replay/render", changeObject)
                .then(response => {
                    console.log(response.data);
                })
                .catch(err => console.log(err));
      
        },
        toggleScore({state}, value){

            state.scoreToggle = value;
            const changeObject = {
                "interfaceScoreboard": value,
                // "interfaceScore": value
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
        axiosInstance.get("https://127.0.0.1:2999/replay/render")
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
                        } )
                        .then(response => {
                            console.log('Camera Position:', response.data.cameraPosition);
                        })
                        .catch(err => console.log(err));
            
                }).catch(err => console.log(err));
        }

    },
    getters: {

    }
}