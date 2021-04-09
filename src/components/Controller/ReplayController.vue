<template>
        <v-card flat width="310" height="627" id="controller-card" rounded class="rounded-lg">
            <v-container fluid fill-height class="pt-0" >
                <v-row id="top-bar" justify="space-between" align="center" class="pt-3" style="-webkit-app-region: drag">
                    <v-col cols="10"> {{"관전 뷰어 리모컨"}} </v-col>
                    <v-col>
                        <v-row justify="end" align="center">
                        <div style="width:100%;" class=" d-flex justify-end pr-4">
                            <v-img 
                                class="pointer"
                                :src="require('@/assets/ic-close.png')"
                                @click="closeWindow"
                                height="24" 
                                max-width="24" 
                                contain
                            />
                        </div>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-radio-group row class="px-4" style="width:100%;" v-model="viewMode">
                        <v-radio color="#4ab9ce" label="관전뷰" value="follow" class="pr-10"></v-radio>
                        <v-radio color="#4ab9ce" label="탑뷰" value="top"></v-radio>
                    </v-radio-group>
                </v-row>
                <v-row style="height: 240px;" justify="center">
                    <TopView v-if="viewMode=='top'"/>
                    <FollowView v-else-if="viewMode=='follow'"/>
                </v-row>
                <v-row>
                    <v-divider/>
                </v-row>
                <v-row align="center" class="px-4">
                    <div style="width:100%">
                        <div style="width:100%" class="d-flex flex-row align-center">
                            <div class="switch-text-block d-flex align-center">
                                <div>
                                    <div class="switch-title">
                                        {{"체력바 표시"}}
                                    </div>
                                    <div class="switch-subtitle">
                                        {{"체력바를 표시합니다."}}
                                    </div>
                                </div>
                            </div>
                            <div class="switch-block d-flex align-center justify-end">
                                <!-- <v-switch class=""   color="blue"> </v-switch> -->
                                <!-- <v-switch inset ripple="false"></v-switch> -->
                                <CustomSwitch 
                                    :onFunction="()=>toggleHealth(true)"
                                    :offFunction="()=>toggleHealth(false)"
                                />
                            </div>
                        </div>
                        <div style="width:100%" class="d-flex flex-row align-center">
                            <div class="switch-text-block d-flex align-center">
                                <div>
                                    <div class="switch-title">
                                        {{"점수판 표시"}}
                                    </div>
                                    <div class="switch-subtitle">
                                        {{"점수판을 표시합니다."}}
                                    </div>
                                </div>
                            </div>
                            <div class="switch-block d-flex align-center justify-end">
                                <CustomSwitch 
                                    :onFunction="()=>toggleScore(true)"
                                    :offFunction="()=>toggleScore(false)"
                                />
                            </div>
                        </div>
                    </div>
                </v-row>

                <!-- <v-row align="center" class="px-4">
                    <v-col cols="9">
                        <v-row class="switch-title"> 체력바 표시 </v-row>
                        <v-row class="switch-subtitle"> 체력바를 표시합니다. </v-row>
                    </v-col>
                    <v-col cols="3">
                        <v-row  justify="end" align="center"> 
                            <v-switch> </v-switch>
                        </v-row>
                    </v-col> 
                </v-row>
                <v-row align="center" class="px-4 pt-0">
                    <v-col cols="9" class="pt-0">
                        <v-row class="switch-title"> 체력바 표시 </v-row>
                        <v-row class="switch-subtitle"> 체력바를 표시합니다. </v-row>
                    </v-col>
                    <v-col cols="3" class="pt-0">
                        <v-row  justify="end" align="center"> 
                            <v-switch> </v-switch>
                        </v-row>
                    </v-col> 
                </v-row> -->
                <v-row>
                    <v-divider/>
                </v-row>
                <v-row id="patch-download" justify="space-between" align="center" class="px-4">
                    <v-col cols="9">
                        <v-row id="patch-download-title">
                            {{"리모컨 패치 다운로드"}}
                        </v-row>
                        <v-row id="patch-size">
                            11 MB
                        </v-row>
                    </v-col>
                    <v-col>
                        <v-row justify="end">
                            <v-img 
                                :src="require('@/assets/download-icon.png')"
                                max-width="24" 
                                id="download-icon"
                                height="24" 
                                aspect-ratio="1" 
                                contain 
                                class="mr-1 pointer"
                                @click="goToDownload"
                            />
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-divider/>
                </v-row>
                <v-row id="footer-note" class="pa-3">
                    {{"* 화면 컨트롤러가 동작하지 않는 경우 리모컨 패치를 다시 설치해 주세요."}}
                </v-row>
            </v-container>
        </v-card>
    
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import TopView from "./TopView/TopView.vue";
import FollowView from "./FollowView/FollowView.vue";
import CustomSwitch from "./CustomSwitch.vue";
import { namespace , Action} from 'vuex-class';

const controllerStore = namespace("controllerStore");

@Component({
    components: {
        TopView,
        FollowView,
        CustomSwitch
    }
})
export default class ReplayController extends Vue {

    //top and follow mode?
    viewMode = "top";
    @controllerStore.Mutation('mutateValue') mutateControllerValue: any;
    @controllerStore.Mutation('changeViewMode') changeViewMode: any;
    // @controllerStore.Mutation('toggleController') toggleController: any;
    toggleController(){
        console.log('asodfnsdakjfnasdljkfbasd,jfhbasdjh,fb');
    }
    @controllerStore.Action('toggleHealth') toggleHealth: any;
    @controllerStore.Action('toggleScore') toggleScore: any;
    @Action('closeWindow') closeWindow: any;


    @Watch('viewMode')
    onModeChange(){
        console.log('ASDKJFNASDKFJNASDFJKNASDFKJASNDFKJASDNF');
        console.log(this.viewMode);
        this.changeViewMode(this.viewMode);
    }

    goToDownload(){
        window.location.href = "http://bit.ly/aham_lolconfig_latest";
    }

    created(){
        console.log('CREATED');
    }
    
}

</script>

<style scoped>

.pointer {
  cursor: pointer;
}

#controller-card {
    /* box-shadow: 0 0 5px 0 rgba(220, 223, 229, 0.5); */
}

#top-bar {
    /* background-color: #689fff; */
    background-image: linear-gradient(to bottom, #689fff, #4ab9ce);
    height: 54px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    color: white;
    font-size: 15px;
}

#patch-download {
    height: 73px;
}

#patch-download-title {
  font-family: NotoSansCJKkr;
  font-size: 15px;
  font-weight: bold;
  color: #000000;
}

#patch-size {
    font-family: NotoSansCJKkr;
    font-size: 13px;
    color: #4f5663;
}

#footer-note {
    height: 67px;
    font-size: 12px;
    color: #4f5663;
}

#download-icon:hover {
    background-color: #d1d5de;

}

.switch-text-block {
    width: 80%;
    height: 60px;
}

.switch-block {
    width: 20%;
    height: 60px;
}

.switch-title {
    font-family: NotoSansCJKkr;
    font-size: 15px;
    color: black;
    font-weight: bold;
}

.switch-subtitle {
    font-family: NotoSansCJKkr;
    font-size: 13px;
    color: #4f5663;
}

</style>
