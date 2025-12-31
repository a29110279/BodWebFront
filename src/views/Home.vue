<script setup>
import profile from '../assets/profile.jpg';
import profile2 from '../assets/profile2.jpg';
import profile3 from '../assets/profile3.jpg';
import { ref } from 'vue'

// 用 ref 控制顯示哪個內容（比原生 DOM 操作更 Vue）
const activeContent = ref('content1')  // 預設顯示第一個
const setActive = (id) => {
    activeContent.value = id
}
const activeContent2 = ref('content4')  // 預設顯示第一個
const setActive2 = (id) => {
    activeContent2.value = id
}
</script>

<template>
<div class="w-100 px-5 align-content-center" style="background-color:#404040; height: 765px; padding-top:65px">
    <div class="container-fluid">
    <div class="row row-cols-1 row-cols-lg-2 row-cols-md-1 row-cols-sm-1 h-100 align-content-center p-5">
        <div class="col-sm order-1 order-md-0 align-content-center">
            <div class="w-75 mx-auto">
                <div data-aos="fade-right" class="text text-center text-lg-end text-md-start text-sm-center text-white">
                        <h1 class="my_name fs-md-6 fs-sm-6">CHIEN PO TING<br>簡柏定<br></h1>
                        <h3 class="fs-lg-5 fs-md-6 fs-sm-6 py-2">義大開發 <br class="d-block d-sm-none">軟體工程師</h3>
                </div>
            </div>
        </div>
            <div class="col-sm mx-auto order-0 order-md-1 my-4 my-md-0 align-content-center"> 
                <div data-aos="fade-left" class="text-lg-start text-md-end text-sm-center text-center">  
                    <img class="img-fluid" style="width:35%; height:35%" :src="profile" alt="profile" />  
                </div>  
            </div>  
    </div>
    </div>
</div>
<!--關於我-->
<div class="w-100 px-5 align-content-start" style="background-color:whitesmoke; height: 800px;">
    <div id="my_profile" class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="text text-center mt-4 mb-2">
                    <h1 class="fs-1">
                        關於我
                    </h1>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="text text-center mb-4">
                    <hr class="border border-dark border-1 rounded-circle"></hr>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row row-cols-1 row-cols-md-2 mx-5" style="margin-top:120px">
            <div class="col-sm mx-auto order-1 order-md-0 my-4 my-md-0 align-content-center">
                <div data-aos="fade-left" class="text-lg-center text-md-end text-sm-center text-center">
                    <img class="img-fluid" style="width:47%; height:47%" :src="profile3" alt="profile3" />
                    <img class="img-fluid" style="width:35%; height:35%" :src="profile2" alt="profile2" />
                </div>
            </div>
            <div class="col ">
                <div class="text-center text-md-start custom-margin-3" style="margin-left:0px">
                    <div data-aos="fade-up" class="d-block">
                        <h4 class="fs-2 fw-bolder">簡柏定 CHIEN PO TING</h4>
                        <div style="height: 5px; margin-left:50px; margin-bottom:8px;"></div>
                        <h4 class="fs-4"><span class="d-none d-md-inline">畢業於 </span>國立屏東大學<br class="d-block d-md-none"> 資訊工程學系</h4>
                        <div style="height: 5px; margin-left:30px; margin-bottom:8px;"></div>
                        <h4 id="work_tool" class="fs-4">使用工具<br class="d-block d-md-none"><span class="d-none d-md-inline">：</span>DBeaver、VScode、<br class="d-block d-md-none">Visual Studio、Postman<br><span id="work_tool_detail" class="d-none d-md-inline"></span>Toad of Oracle11、mRemoteNG</h4>
                        <div style="height: 5px; margin-left:30px; margin-bottom:8px;"></div>
                        <h4 id="work_tool" class="fs-4">使用語言<br class="d-block d-md-none"><span class="d-none d-md-inline">：</span>C#、HTML、CSS</h4>
                        <div style="height: 5px; margin-left:30px; margin-bottom:8px;"></div>
                        <h4 id="work_tool" class="fs-4">使用框架<br class="d-block d-md-none"><span class="d-none d-md-inline">：</span>.net core MVC</h4>
                        <br>
                        <div style="height: 5px; margin-left:30px; margin-bottom:8px;"></div>
                        <h4 id="Email" class="fs-4">Email：c29110279@gmail.com</h4>
                        <div style="height: 5px; margin-left:30px; margin-bottom:8px;"></div>
                        <h4 class="fs-4">電話：0908040216</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--工作經歷-->
<div class="w-100 px-5 align-content-start" style="background-color:whitesmoke; height: 800px;">
    <div id="work_experience" class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="text text-center mt-4 mb-2">
                    <h1 class="fs-1">
                        工作經歷
                    </h1>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="text text-center mb-4">
                    <hr class="border border-dark border-1 rounded-circle"></hr>
                </div>
            </div>
        </div>
    </div>    
    <div class="container-fluid">
        <div class="row row-cols-1 row-cols-md-2 mx-5" style="margin-top:30px">
            <div class="col">
                <div data-aos="fade-up" class="text-center text-md-start custom-margin">
                    <div data-target="content1"
                        class="text-center text-md-start trigger btn hover-box"
                        @click="setActive('content1')">

                        <h4 class="fs-3" >義大開發 <br class="d-block d-sm-none">軟體工程師</h4>
                        <h6 class="fs-6"><span id="work_date"> 2024/09~仍在職</span></h6>
                    </div>
                    <div id="border1" class="border-start border-3 border-secondary my-3"></div>
                    <div data-target="content2"
                        class="text-center text-md-start trigger btn hover-box"
                        @click="setActive('content2')">

                        <h4 class="fs-3">屏東大學 <br class="d-block d-sm-none">資工系工讀生</h4>
                        <h6 class="fs-6"><span id="work_date" ></span> 2021/09~2024/06</h6>
                    </div>
                    <div id="border1" class="border-start border-3 border-secondary my-3"></div>
                    <div data-target="content3"
                        class="text-center text-md-start trigger btn hover-box"
                        :class="{ 'active': activeContent === 'content3' }"
                        @click="setActive('content3')">

                        <h4 class="fs-3">穀科餐酒館 <br class="d-block d-sm-none"><span class="d-block d-sm-none" style="margin-left:30px;"></span>外場工讀生</h4>
                        <h6 class="fs-6"><span id="work_date"></span> 2024/03~2024/06</h6>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="text custom-margin" style="margin-left:80px">
                    <div v-show="activeContent === 'content1'" data-aos="fade-up" class="content-box animate__animated animate__fadeIn">
                        <h4 class="fs-3 fw-bold" >維護 宏誌科技POS機 內部LOG資料</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>當POS機帳務缺失、連線異常、設定錯誤等<br><span style="margin-left:40px"></span>需進入Linux系統內部進行資料調整</h5>
                        <div style="height: 10px; margin-left:50px; margin-bottom:8px;"></div>
                        <h4 class="fs-3 fw-bold" >測試 WEB API 協助樂園行動電子券上線</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>共同維護.net framework專案<br><span style="margin-left:40px"></span>使用Postman測試API是否回應正確</h5>
                        <div style="height: 10px; margin-left:50px; margin-bottom:8px;" ></div>
                        <h4 class="fs-3 fw-bold">撰寫 Oracle SQL & Procedure 排程</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>編寫SQL及Subquery撈取User所需資料<br><span style="margin-left:40px"></span>於資料庫編輯Procedure並設定排程</h5>
                        <div style="height: 10px; margin-left:50px; margin-bottom:8px;" ></div>
                        <h4 class="fs-3 fw-bold">製作 聯銓資訊Smart Platform BI報表</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>使用SQL撈取資料，並使用Smart Platform系統<br><span style="margin-left:40px"></span>製作BI商業報表，並排成自動發送</h5>
                        <div style="height: 10px; margin-left:50px; margin-bottom:8px;" ></div>
                        <h4 class="fs-3 fw-bold">維護 Python 自動化簡訊寄送</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>使用Python撈取資料庫中生日會員<br><span style="margin-left:40px">並自動化操作中華電信簡訊平台發送訊息</span></h5>

                    </div>
                    <div v-show="activeContent === 'content2'" data-aos="fade-up" class="content-box animate__animated animate__fadeIn">
                        <h4 class="fs-3 fw-bold">協助 舉辦 TQC Python、C 證照課程</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>每學期舉辦TQC證照課程，製作報名表單<br><span style="margin-left:40px"></span>篩選上課學員、課後頒發時數等</h5>
                        <div style="height: 10px; margin-left:50px; margin-bottom:8px;"></div>
                        <h4 class="fs-3 fw-bold">協助 舉辦 資訊學院聯合專題競賽</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>每年協助學院舉辦聯合專題競賽展覽<br><span style="margin-left:40px"></span>老師及學員簽到，現場人力調配等</h5>
                        <div style="height: 10px; margin-left:50px; margin-bottom:8px;"></div>
                        <h4 class="fs-3 fw-bold">協助 資工系系網頁資訊更新</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>管理資工系網站後台，更新課程及活動資訊</h5>
                        <div style="height: 10px; margin-left:50px; margin-bottom:8px;"></div>
                        <h4 class="fs-3 fw-bold">製作 Excel、PPT等各式報表及圖文</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>協助系上製作各式表單及資料處理<br><span style="margin-left:40px"></span>編寫Excel公式，資料歸檔等</h5>
                    </div>
                    <div v-show="activeContent === 'content3'" data-aos="fade-up" class="content-box animate__animated animate__fadeIn">
                        <h4 class="fs-3 fw-bold">外場 飲料調製、送餐、整理環境、收銀等</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>須熟悉約10種飲品調製方式<br><span style="margin-left:40px"></span>且平日時段外場僅一人值班</h5>
                        <div style="height: 10px; margin-left:50px; margin-bottom:8px;"></div>
                        <h4 class="fs-3 fw-bold">解決 客人提出之問題</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>需耐心且準確提供客人資訊<br><span style="margin-left:40px"></span>解決客人的疑問並提供服務</h5>
                        <div style="height: 10px; margin-left:50px; margin-bottom:8px;"></div>
                        <h4 class="fs-3 fw-bold">培養 危機處理能力</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>當客人餐點出現問題時<br><span style="margin-left:40px"></span>快速的解決問題並向上回報</h5>
                        <div style="height: 10px; margin-left:50px; margin-bottom:8px;"></div>
                        <h4 class="fs-3 fw-bold">提升 抗壓性及溝通技巧</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>來回客人與廚房之間<br><span style="margin-left:40px"></span>需有快速理解對方所表達，並做出回應</h5>
                    </div>
                </div>
            </div>
                <div class="d-none col col-12 col-md-12 text text-center custom-margin-2" > 
                    <h6>可點擊左側工作經歷，更新右側詳細內容</h6> 
                </div> 
        </div>
    </div>
</div>
<!--學校經歷-->
<div class="w-100 px-5 align-content-start" style="background-color:whitesmoke; height: 800px;">
    <div id="school_experience" class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="text text-center mt-4 mb-2">
                    <h1 class="fs-1">
                        校園經歷
                    </h1>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="text text-center mb-4">
                    <hr class="border border-dark border-1 rounded-circle"></hr>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row row-cols-1 row-cols-md-2 mx-5" style="margin-top:30px">
            <div class="col">
                <div data-aos="fade-up" class="text-center text-md-start custom-margin">
                    <div data-target="content4" class="trigger-2 btn hover-box text-center text-md-start"
                            @click="setActive2('content4')">
                        <h4 class="fs-3">國立屏東大學 <br class="d-block d-sm-none">資訊工程系</h4>
                        <h6 class="fs-6"><span id="work_date"> 2020/09~2024/06</span></h6>
                    </div>
                    <div id="border1" class="border-start border-3 border-secondary my-3"></div>
                    <div data-target="content5" class="trigger-2 btn hover-box text-center text-md-start"
                            @click="setActive2('content5')">
                        <h4 class="fs-3">海青工商 <br class="d-block d-sm-none">資訊科</h4>
                        <h6 class="fs-6"><span id="work_date"></span> 2017/09~2020/06</h6>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="text custom-margin" style="margin-left:80px">
                    <div v-show="activeContent2 === 'content4'" data-aos="fade-up" class="content-box-2">
                        <h4 class="fs-3 fw-bold">考取 CPE進階級 檢定認證</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>大學程式能力檢定 7題完成3題<br><span style="margin-left:40px"></span>2811人中排名460 全台前16.4%</h5>
                        <div style="height: 10px; margin-left:50px; margin-bottom:8px;"></div>
                        <h4 class="fs-3 fw-bold">開發 線上租屋平台 聯合專題展第三名</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>使用wordpress 搭配MySQL、Arduino<br><span style="margin-left:40px"></span>開發線上租屋管理平台 奪得該年類組第三名</h5>
                        <div style="height: 10px; margin-left:50px; margin-bottom:8px;"></div>
                        <h4 class="fs-3 fw-bold">社團 嘻哈街舞社</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>加入街舞社4年 曾任文書及網管職位<br><span style="margin-left:40px"></span>整理多份社團文檔及開會紀錄 並更新社群平台資訊</h5>
                    </div>
                    <div v-show="activeContent2 === 'content5'" data-aos="fade-up" class="content-box-2">
                        <h4 class="fs-3 fw-bold">考取 3張技術士技能檢定</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>高中三年考取 兩張丙級證照 一張乙級證照<br><span style="margin-left:40px"></span>培養自主練習及問題解決的能力</h5>
                        <div style="height: 10px; margin-left:50px; margin-bottom:8px;"></div>
                        <h4 class="fs-3 fw-bold">擔任 海青工商校內儀隊</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>校慶運動會時帶校旗進場並站在場中一整個上午<br><span style="margin-left:40px"></span>培養堅毅的性格和不屈的精神</h5>
                        <div style="height: 10px; margin-left:50px; margin-bottom:8px;"></div>
                        <h4 class="fs-3 fw-bold">協助 資工系系網頁資訊更新</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>管理資工系網站後台，更新課程及活動資訊</h5>
                        <div style="height: 10px; margin-left:50px; margin-bottom:8px;"></div>
                        <h4 class="fs-3 fw-bold">製作 Excel、PPT等各式報表及圖文</h4>
                        <h5 class="fs-5"><span style="margin-left:40px;"></span>協助系上製作各式表單及資料處理<br><span style="margin-left:40px"></span>編寫Excel公式，資料歸檔等</h5>
                    </div>
                </div>
            </div>
            <div class="d-none col col-12 col-md-12 text text-center custom-margin-2">
                <h6>可點擊左側工作經歷，更新右側詳細內容</h6>
            </div>
        </div>
    </div>
</div>
<div id="mobileModal" class="mobile-modal d-none">

    <!-- 白色區塊 -->
    <div class="mobile-modal-content">

        <!-- 顯示對應的工作內容 -->
        <div id="mobileModalContent">
            <!-- JavaScript 會把 content1, content2, content3 的內容動態插入到這裡 -->
        </div>

    </div>
</div>
</template>

