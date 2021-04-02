<template>
    <v-container fluid fill-height>
        <v-card width="310" id="controller-card" rounded class="rounded-lg">
            <v-container fluid fill-height >
                <v-row id="top-bar" justify="space-between" align="center">
                    <v-col>관전 뷰어 리모컨 </v-col>
                    <v-col>
                        <v-row justify="end" align="center">
                        <div style="width:100%;" class="d-flex justify-end pr-4">
                            <v-img :src="require('@/assets/ic-close.png')" height="24" max-width="24" contain/>
                        </div>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-radio-group row class="px-3" style="width:100%;" v-model="viewMode">
                            <v-radio color="#4ab9ce" label="관전뷰" value="follow" class="pr-10"></v-radio>
                            <v-radio color="#4ab9ce" label="탑뷰" value="top"></v-radio>
                    </v-radio-group>
                </v-row>
                <v-row style="height: 240px;">
                    <TopView />
                </v-row>
                <v-row>
                    <v-divider/>
                </v-row>
                <v-row id="patch-download" justify="space-between" align="center" class="px-4">
                    <v-col cols="9">
                        <v-row id="patch-download-title">
                            리모컨 패치 다운로드
                        </v-row>
                        <v-row id="patch-size">
                            7.85 MB
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
                                class="mr-1"
                                @click="goToDownload"
                            />
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-divider/>
                </v-row>
                <v-row id="footer-note" class="pa-3">
                    * 화면 컨트롤러가 동작하지 않는 경우 리모컨 패치를 다시 설치해 주세요. 
                </v-row>
            </v-container>
        </v-card>
    </v-container>
    
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import TopView from "./TopView/TopView.vue";

@Component({
    components: {
        TopView
    }
})
export default class Controller extends Vue {

    //top and follow mode?
    viewMode = "top";

    @Watch('viewMode')
    onModeChange(){
        console.log(this.viewMode);
    }

    goToDownload(){
        window.location.href = "https://github.com/ahamcorp/LoLClientConfigure/releases/download/v0.1.0/LOLClientConfigureSetup.exe";
    }
    
}

</script>

<style scoped>

#controller-card {
    box-shadow: 0 0 5px 0 rgba(220, 223, 229, 0.5);
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

</style>
