<script setup>
import { ref, onMounted } from "vue";
import api from "../api";

const profile = ref(null);
const msg = ref("");
const loading = ref(false);
const expandedSections = ref({});
const isEditmode = ref(false);
const isEditprofile = ref(false);
const isResetpassword = ref(false);
const editForm = ref({
  userName: "",
  userEmail: "",
  userPhone: ""
});

async function loadProfile() {
  msg.value = "";
  loading.value = true;
  try {
    const res = await api.get("/api/self/profile");
    profile.value = res.data;
  } catch (e) {
    msg.value = "載入個人資料失敗 (可能是 token 無效)。";
    console.error(e);
  } finally {
    loading.value = false;
  }
}

function toggleSection(key) {
  expandedSections.value[key] = !expandedSections.value[key];
}

function formatValue(value) {
  if (value === null || value === undefined) {
    return "N/A";
  }
  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }
  return String(value);
}

function editprofile() {
  isEditmode.value = true;
  isEditprofile.value = true;
}
function editpassword() {
  isEditmode.value = true;
  isResetpassword.value = true;
}

function startEditing() {
  isEditprofile.value = true;
  editForm.value = {
    userName: profile.value.userName,
    userEmail: profile.value.userEmail,
    userPhone: profile.value.userPhone
  };
}

function Resetpassword() {
  isResetpassword.value = true;
}

async function saveProfile() {
  try {
    const res = await api.put("/api/self/profile", {
      userName: editForm.value.userName,
      email: editForm.value.userEmail,
      phoneNumber: editForm.value.userPhone
    });

    // 更新 localStorage 的新 Token
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
    }

    // 更新前端 profile 狀態
    profile.value = {
      ...profile.value,
      userName: editForm.value.userName,
      userEmail: editForm.value.userEmail,
      userPhone: editForm.value.userPhone
    };

    isEditing.value = false;
    msg.value = "個人資料已成功更新";

    // 可選：3 秒後重新載入資料（不用 reload 頁面）
    setTimeout(async () => {
      await loadProfile();  // 重新 GET 最新資料
      msg.value = "";
    }, 3000);
  } catch (e) {
    msg.value = "更新失敗：" + (e.response?.data?.message || e.message);
  }
}

async function reloadProfileData() {
  try {
    const res = await api.get("/api/self/profile");
    profile.value = res.data;
    // 強制重新整理頁面
    location.reload();
  } catch (e) {
    msg.value = "重新載入個人資料失敗。";
    console.error(e);
  }
}

function canceleditprdfile() {
  isEditmode.value = false;
  isEditprofile.value = false;
}
function cancelEditpassword() {
  isEditmode.value = false;
  isResetpassword.value = false;
}


onMounted(loadProfile);
</script>

<template>
  <div class="profile-page">
    <!-- 導航欄 -->
    <div class="header">
      <div class="header-content">
        <h1>個人檔案</h1>
        <button @click="loadProfile" class="reload-btn" :disabled="loading">
          {{ loading ? "載入中..." : "重新載入" }}
        </button>
      </div>
    </div>

    <!-- 主容器 -->
    <div class="container">
      <!-- 錯誤提示 -->
      <div v-if="msg" class="alert alert-error">{{ msg }}</div>

      <!-- 加載狀態 -->
      <div v-if="loading && !profile" class="loading-state">
        <div class="spinner"></div>
        <p>正在載入個人資料...</p>
      </div>

      <!-- 個人檔案內容 -->
      <div v-if="profile" class="profile-content">
        <!-- 左側邊欄 - 用戶卡片 -->
        <aside class="sidebar">
          <div class="user-card">
            <div class="user-avatar">
              <img 
                :src="profile.avatar || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22150%22 height=%22150%22%3E%3Crect fill=%22%23e0e0e0%22 width=%22150%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2248%22 fill=%22%23999%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E👤%3C/text%3E%3C/svg%3E'" 
                :alt="profile.userName || 'User'"
              >
            </div>
            <div class="user-info">
              <h2>{{ profile.userName || "未知用戶" }}</h2>
              <p class="email">{{ profile.userEmail || "無電子郵件" }}</p>
            </div>
            <div class="user-actions">
              <template v-if="!isEditmode">
                <button 
                @click="editprofile" 
                class="btn-primary">
                編輯
              </button>
              <button 
                @click="editpassword"
                class="btn-secondary">忘記密碼
              </button>
              </template>
              <template v-else-if="isEditprofile">
                <button 
                  @click="saveProfile" 
                  class="btn-save"
                  :disabled="loading">
                  {{ loading ? "儲存中..." : "儲存" }}
                </button>
                <button 
                  @click="canceleditprdfile" 
                  class="btn-cancel"
                  :disabled="loading">
                  取消
                </button>
              </template>
              <template v-else-if="isResetpassword">
                <button 
                  @click="saveProfile" 
                  class="btn-save"
                  :disabled="loading">
                  {{ loading ? "變更中..." : "變更密碼" }}
                </button>
                <button 
                  @click="cancelEditpassword" 
                  class="btn-cancel"
                  :disabled="loading">
                  取消
                </button>
              </template>
            </div>
          </div>
        </aside>

        <!-- 右側主內容 -->
        <main class="main-content">
          <!-- 基本信息卡片 -->
          <section class="card">
            <div class="card-header" @click="toggleSection('basic')">
              <h3>📋 個人資料</h3>
              <span class="toggle-icon" :class="{ expanded: expandedSections['basic'] }">▼</span>
            </div>
            <div v-if="expandedSections['basic']" class="card-body">
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">用戶名</span>
                  <span v-if="!isEditing" class="value">{{ profile.userName }}</span>
                  <input 
                    v-else 
                    v-model="editForm.userName" 
                    type="text" 
                    class="edit-input"
                    placeholder="用戶名">
                </div>
                <div class="info-item">
                  <span class="label">電子郵件</span>
                  <span v-if="!isEditing" class="value">{{ profile.userEmail }}</span>
                  <input 
                    v-else 
                    v-model="editForm.userEmail" 
                    type="email" 
                    class="edit-input"
                    placeholder="電子郵件">
                </div>
                <div class="info-item">
                  <span class="label">手機號碼</span>
                  <span v-if="!isEditing" class="value">{{ profile.userPhone || "未設定" }}</span>
                  <input 
                    v-else 
                    v-model="editForm.userPhone" 
                    type="text" 
                    class="edit-input"
                    placeholder="手機號碼">
                </div>
                <div class="info-item">
                  <span class="label">生日</span>
                  <span class="value">{{ profile.userBirthday || "未設定" }}</span>
                </div>
                <div class="info-item">
                  <span class="label">身份角色</span>
                  <span class="value">{{ profile.userRole || "未設定" }}</span>
                </div>
                <div class="info-item">
                  <span class="label">用戶ID</span>
                  <span class="value">{{ profile.userId }}</span>
                </div>
              </div>
            </div>
          </section>
          
          <!-- 完整 API 數據 -->
          <section class="card">
            <div class="card-header" @click="toggleSection('raw')">
              <h3>📦 API 完整數據</h3>
              <span class="toggle-icon" :class="{ expanded: expandedSections['raw'] }">▼</span>
            </div>
            <div v-if="expandedSections['raw']" class="card-body">
              <div class="data-display">
                <div v-for="(value, key) in profile" :key="key" class="data-item">
                  <span class="data-key">{{ key }}</span>
                  <div class="data-value">
                    <pre v-if="typeof value === 'object'">{{ JSON.stringify(value, null, 2) }}</pre>
                    <span v-else>{{ value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <!-- 空狀態 -->
      <div v-if="!loading && !profile && !msg" class="empty-state">
        <div class="empty-icon">📭</div>
        <p>未載入個人資料</p>
        <button @click="loadProfile" class="btn-primary">載入個人資料</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.profile-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* 導航欄 */
.header {
  background: white;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 70px 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #222;
}

.reload-btn {
  padding: 8px 20px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.reload-btn:hover:not(:disabled) {
  background-color: #5568d3;
}

.reload-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 主容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  flex: 1;
  width: 100%;
}

/* 提示 */
.alert {
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.alert-error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* 加載狀態 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f0f0f0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  color: #666;
  font-size: 16px;
}

/* 空狀態 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-state p {
  color: #999;
  font-size: 18px;
  margin-bottom: 20px;
}

/* 內容布局 */
.profile-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .profile-content {
    grid-template-columns: 1fr;
  }
}

/* 側邊欄 */
.sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.user-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.user-avatar {
  margin-bottom: 15px;
}

.user-avatar img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #667eea;
}

.user-info h2 {
  margin: 0 0 5px 0;
  font-size: 20px;
  color: #222;
}

.email {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.user-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.user-actions button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  font-size: 13px;
}

/* 按鈕樣式 */
.btn-primary {
  background-color: #667eea;
  color: white;
}

.btn-primary:hover {
  background-color: #5568d3;
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background-color: #e8e8e8;
}

/* 保存按鈕 */
.btn-save {
  background-color: #28a745;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  font-size: 13px;
}

.btn-save:hover:not(:disabled) {
  background-color: #218838;
}

.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 取消按鈕 */
.btn-cancel {
  background-color: #6c757d;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  font-size: 13px;
}

.btn-cancel:hover:not(:disabled) {
  background-color: #5a6268;
}

.btn-cancel:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 編輯輸入框 */
.edit-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #667eea;
  border-radius: 4px;
  font-size: 14px;
  color: #222;
  font-family: inherit;
}

.edit-input:focus {
  outline: none;
  border-color: #5568d3;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* 主內容 */
.main-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 卡片 */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 16px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  transition: background-color 0.2s;
}

.card-header:hover {
  background-color: #f0f0f0;
}

.card-header h3 {
  margin: 0;
  font-size: 16px;
  color: #222;
  font-weight: 600;
}

.toggle-icon {
  color: #999;
  font-size: 12px;
  transition: transform 0.3s;
}

.toggle-icon.expanded {
  transform: rotate(180deg);
}

.card-body {
  padding: 20px;
}

/* 信息網格 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-item .label {
  font-size: 12px;
  color: #999;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.info-item .value {
  font-size: 14px;
  color: #222;
}

.info-item a {
  color: #667eea;
  text-decoration: none;
}

.info-item a:hover {
  text-decoration: underline;
}

/* 生物文本 */
.bio-text {
  margin: 0;
  color: #555;
  line-height: 1.6;
}

/* 統計網格 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 12px;
  color: #999;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #667eea;
}

/* 標籤 */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-block;
  background-color: #f0f0f0;
  color: #666;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  transition: background-color 0.3s;
}

.tag:hover {
  background-color: #e0e0e0;
}

/* API 數據顯示 */
.data-display {
  overflow-x: auto;
}

.data-item {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.data-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.data-key {
  display: block;
  font-weight: 600;
  color: #333;
  font-family: monospace;
  margin-bottom: 8px;
  background-color: #f8f9fa;
  padding: 4px 8px;
  border-radius: 4px;
  width: fit-content;
}

.data-value {
  margin-top: 8px;
}

.data-value pre {
  margin: 0;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 12px;
  overflow-x: auto;
  color: #333;
  line-height: 1.4;
}

.data-value span {
  display: block;
  padding: 8px 12px;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 13px;
  color: #333;
  word-break: break-word;
}

/* 響應式設計 */
@media (max-width: 600px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .header h1 {
    font-size: 22px;
  }

  .reload-btn {
    width: 100%;
  }
}
</style>