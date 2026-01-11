<script setup>
import { computed } from "vue";
import './styles/App.css';

const hasToken = computed(() => !!localStorage.getItem("token"));

function logout() {
  localStorage.removeItem("token");
  // 直接導回登入
  window.location.href = "/login";
}
</script>

<template>
  <div class="container-fluid">

    <!-- navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div class="container-fluid px-4">
        <!-- 品牌（左上角） -->
        <a class="navbar-brand fw-bold fs-4 text-white" href="/#web_head">
          Bod的網頁
        </a>

        <!-- 手機版漢堡按鈕 -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- 導航內容 -->
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <!-- 左側導航 -->
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item hover-box">
              <a class="nav-link text-white" href="/#web_head">首頁</a>
            </li>

            <!-- 下拉選單範例：關於我 -->
            <li class="nav-item dropdown hover-box">
              <a class="nav-link dropdown-toggle text-white" href="#" id="aboutDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                關於我
              </a>
              <ul class="dropdown-menu bg-dark" aria-labelledby="aboutDropdown">
                <li><a class="dropdown-item text-white" href="/#my_profile">自我介紹</a></li>
                <li><a class="dropdown-item text-white" href="/#work_experience">工作經歷</a></li>
                <li><a class="dropdown-item text-white" href="/#school_experience">校園經歷</a></li>
                <li>
                  <hr class="dropdown-divider bg-secondary">
                </li>
                <li><a class="dropdown-item text-white" href="#contact">聯絡我</a></li>
              </ul>
            </li>

            <!-- 其他固定連結 -->

          </ul>

          <!-- 右側登入/登出區域 -->
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item hover-box" v-if="!hasToken">
              <RouterLink class="nav-link text-white" to="/register">註冊</RouterLink>
            </li>
            <li class="nav-item hover-box" v-if="!hasToken">
              <RouterLink class="nav-link text-white" to="/login">登入</RouterLink>
            </li>
            <li class="nav-item hover-box" v-if="hasToken">
              <RouterLink class="nav-link text-white" to="/profile">個人資料</RouterLink>
            </li>
            <li class="nav-item hover-box" v-if="hasToken">
              <button class="btn text-white" @click="logout">登出</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- main content -->
    <main class="main">
      <RouterView />
    </main>

    <!-- footer -->
    <footer id="contact" class="bg-dark text-white text-center py-5 mt-auto">
      <div class="container">
        <h5 class="mb-3">聯絡我</h5>
        <p class="mb-2">
          Email：<a href="mailto:c29110279@gmail.com" class="text-white text-decoration-none">c29110279@gmail.com</a>
        </p>
        <p class="mb-2">
          GitHub：<a href="https://github.com/a29110279" target="_blank"
            class="text-white text-decoration-none">github.com/a29110279</a>
        </p>
        <p class="mb-2">
          Phone：<label href="tel:0908040216" class="text-white text-decoration-none">0908040216</label>
        </p>
        <p class="mb-0 mt-4">
          © {{ currentYear }} CHIEN PO TING. All rights reserved.
        </p>
      </div>
    </footer>

  </div>
</template>

<style scoped>
</style>
