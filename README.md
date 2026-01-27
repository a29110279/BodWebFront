# Views 組件文檔

本目錄包含所有頁面視圖組件，每個組件對應應用程式的不同功能頁面。

## 📋 目錄

- [Home.vue](#homevue) - 履歷展示首頁
- [Login.vue](#loginvue) - 使用者登入頁面
- [Register.vue](#registervue) - 使用者註冊頁面
- [Profile.vue](#profilevue) - 個人資料管理頁面
- [forgot_password.vue](#forgot_passwordvue) - 忘記密碼頁面

---

## Home.vue

### 📖 功能說明

個人履歷展示首頁，展示使用者的專業資訊、教育背景、工作經歷與校園經驗。此頁面不需要登入即可訪問，適合作為個人作品集網站使用。

### 🎨 頁面結構

頁面分為四個主要區塊：

#### 1️⃣ **個人簡介區塊** (Web Head)
- **位置**：頁面最上方，深灰色背景（`background-color: #404040`）
- **內容**：
  - 姓名：CHIEN PO TING / 簡柏定
  - 職稱：義大開發軟體工程師
  - 個人照片展示
- **特點**：響應式設計，支援各種螢幕尺寸

#### 2️⃣ **關於我區塊** (My Profile)
- **背景**：淺灰色（`background-color: whitesmoke`）
- **內容**：
  - 使用工具：DBeaver、VScode、Visual Studio、Postman、Toad of Oracle11、mRemoteNG
  - 使用語言：C#、HTML、CSS
  - 使用框架：.net core MVC
  - 聯絡資訊：Email 與電話號碼
  - 個人照片展示

#### 3️⃣ **工作經歷區塊** (Work Experience)
- **功能**：點擊左側工作項目可切換右側詳細內容（類似 Tab 切換）
- **工作項目**：
  - 🏢 義大開發軟體工程師（2024/09~仍在職）
  - 🎓 屏東大學資工系工讀生
  - 🍽️ 穀科餐酒館外場工讀生
- **交互方式**：使用 `ref` 狀態管理，點擊觸發後更新 `activeContent`

#### 4️⃣ **校園經歷區塊** (School Experience)
- **功能**：點擊左側學校項目可切換右側詳細內容
- **學校**：
  - 🎓 國立屏東大學資訊工程系
  - 🏫 海青工商資訊科

### 🔧 技術特點

| 特性 | 說明 |
|------|------|
| **框架** | Vue 3 Composition API (`<script setup>`) |
| **狀態管理** | `ref()` 響應式狀態 |
| **樣式** | Bootstrap 網格系統、自訂 CSS |
| **動畫** | AOS (Animate On Scroll) 進場動畫 |
| **響應式** | 支援手機(≤425px)、平板、桌面 |
| **交互** | 點擊觸發內容切換與行動裝置模態視窗 |

### 📱 響應式設計

- **手機模式**：
  - 當視窗寬度 ≤ 425px 時，觸發模態視窗顯示詳細內容
  - 文字居中排列
  
- **平板模式**：
  - 兩欄佈局，左右內容並排顯示
  
- **桌面模式**：
  - 完整兩欄佈局，所有內容展開顯示

### 🔗 相關 Props & Methods

```javascript
// 狀態變數
const activeContent = ref('content1')  // 工作經歷當前顯示內容
const activeContent2 = ref('content4') // 校園經歷當前顯示內容
const currentModalContentId = ref('')  // 行動裝置模態視窗當前內容
const showMobileModal = ref(false)     // 行動裝置模態視窗顯示狀態

// 方法
setActive(id)           // 切換工作經歷內容
setActive2(id)          // 切換校園經歷內容
openMobileModal(targetId) // 開啟行動裝置模態視窗
closeMobileModal(event)  // 關閉行動裝置模態視窗
```

### 📸 使用的資源

- `profile.jpg` - 個人照片（簡介區塊）
- `profile2.jpg` - 個人照片（關於我區塊）
- `profile3.jpg` - 個人照片（關於我區塊）

### ⚠️ 注意事項

- 所有內容硬編碼在組件中，若需動態更新，可改為從 API 獲取
- 高度設定為固定值（800px、765px），響應式設計時需調整
- AOS 動畫需在 `main.js` 中全域引入 AOS 庫

### 🚀 使用示例

```vue
<!-- 工作經歷切換 -->
<div @click="setActive('content2')">屏東大學資工系工讀生</div>

<!-- 校園經歷切換 -->
<div @click="setActive2('content5')">海青工商資訊科</div>

<!-- 行動裝置內容展開 -->
<div @click="openMobileModal('content1')">點擊查看詳情</div>
```

---

## Login.vue

### 📖 功能說明

使用者登入頁面。已登入的使用者訪問此頁面會自動導向個人資料頁。登入成功後會將 Token 存儲在 `localStorage` 並導向個人資料頁面。

### 🎨 頁面布局

#### 登入卡片容器
- **樣式**：居中佈置，漸層背景（紫色系）
- **尺寸**：最大寬度 400px，響應式設計

#### 表單輸入欄位

| 欄位 | 類型 | 說明 |
|------|------|------|
| **account** | text | 電子郵件或電話號碼 |
| **password** | password | 使用者密碼 |

### 🔧 技術特點

| 特性 | 說明 |
|------|------|
| **框架** | Vue 3 Composition API |
| **狀態管理** | `ref()` 響應式狀態 |
| **HTTP 請求** | Axios (api instance) |
| **路由** | Vue Router 自動導向 |
| **錯誤處理** | 多層級錯誤捕獲與處理 |

### 🔗 API 端點

```javascript
POST /api/auth/login
Request Body:
{
  "account": "c29110279@gmail.com",  // Email 或電話
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs..." // JWT Token
}
```

### 📝 核心方法

#### `login()`
執行登入邏輯：
1. 清空錯誤訊息
2. 向後端發送登入請求（POST `/api/auth/login`）
3. 接收 Token 並儲存至 `localStorage`
4. 頁面重新載入並導向 `/profile` 頁面
5. 若發生錯誤，顯示相應的錯誤訊息

### ❌ 錯誤處理

```javascript
// 支援三種錯誤格式：
// 1. 純文字錯誤
"請輸入密碼"

// 2. ModelState 驗證錯誤
{
  "errors": {
    "account": ["輸入的電子郵件無效"],
    "password": ["密碼長度不足"]
  }
}

// 3. 其他 JSON 格式
{
  "title": "帳號密碼不符"
}
```

### 🔗 相關狀態 & 方法

```javascript
const account = ref("")      // 帳號輸入框
const password = ref("")     // 密碼輸入框
const msg = ref("")          // 錯誤訊息顯示
const router = useRouter()   // 路由實例

async function login()        // 登入函數
```

### 🚀 使用流程

```
使用者訪問 /login
    ↓
輸入帳號和密碼
    ↓
點擊 "Sign In" 按鈕
    ↓
驗證成功 → 存儲 Token → 導向 /profile
    ↓
驗證失敗 → 顯示錯誤訊息 → 停留在登入頁
```

### 🔐 安全性考慮

- ✅ 密碼使用 `type="password"` 隱藏
- ✅ Token 存儲在 `localStorage`（需配合 HTTPS）
- ✅ Axios 攔截器自動附加 Token 到請求標頭
- ⚠️ 生產環境建議使用 HttpOnly Cookie

### 📱 相關連結

- **忘記密碼**：`/forgot_password`
- **註冊帳號**：`/register`

---

## Register.vue

### 📖 功能說明

使用者註冊頁面。新用戶可在此頁面填寫資訊進行帳號註冊。已登入的使用者訪問此頁面會自動導向個人資料頁。註冊成功後自動導向登入頁。

### 🎨 頁面布局

#### 註冊卡片容器
- **樣式**：居中佈置，漸層背景（紫色系）
- **尺寸**：最大寬度 450px（比登入頁寬），響應式設計

#### 表單輸入欄位

| 欄位 | 類型 | 必填 | 說明 |
|------|------|------|------|
| **userName** | text | ✅ | 使用者名稱 |
| **email** | email | ✅ | 電子郵件地址 |
| **phoneNumber** | tel | ❌ | 電話號碼（選填） |
| **birthday** | date | ✅ | 生日日期 |
| **password** | password | ✅ | 登入密碼 |

### 🔧 技術特點

| 特性 | 說明 |
|------|------|
| **框架** | Vue 3 Composition API |
| **狀態管理** | `ref()` 響應式狀態 |
| **HTTP 請求** | Axios (api instance) |
| **路由** | Vue Router 自動導向 |
| **表單驗證** | 後端驗證 + 前端檢查 |
| **錯誤處理** | 多層級錯誤捕獲 |

### 🔗 API 端點

```javascript
POST /api/auth/register
Request Body:
{
  "userName": "簡柏定",
  "email": "c29110279@gmail.com",
  "phoneNumber": "0908040216",  // 可為 null
  "birthday": "2000-01-15",
  "password": "password123"
}

Response:
{
  // 註冊成功，返回 200 狀態碼
}
```

### 📝 核心方法

#### `register()`
執行註冊邏輯：
1. 清空錯誤訊息
2. 收集表單資料，`phoneNumber` 為空時轉換為 `null`
3. 向後端發送註冊請求（POST `/api/auth/register`）
4. 註冊成功顯示提示訊息，2 秒後導向登入頁
5. 若發生錯誤，顯示相應的錯誤訊息，停留在註冊頁

### ❌ 錯誤處理

```javascript
// 支援三種錯誤格式：
// 1. 純文字錯誤
"使用者名稱已存在"

// 2. ModelState 驗證錯誤
{
  "errors": {
    "email": ["電子郵件格式不正確"],
    "password": ["密碼長度不足 (最少 8 位)"]
  }
}

// 3. 其他 JSON 格式
{
  "title": "註冊失敗"
}
```

### 🔗 相關狀態 & 方法

```javascript
const userName = ref("")      // 使用者名稱輸入框
const email = ref("")         // 電子郵件輸入框
const phoneNumber = ref("")   // 電話號碼輸入框（選填）
const birthday = ref("")      // 生日輸入框
const password = ref("")      // 密碼輸入框
const msg = ref("")           // 錯誤/成功訊息顯示
const router = useRouter()    // 路由實例

async function register()      // 註冊函數
```

### 📝 表單驗證規則

| 欄位 | 驗證規則 |
|------|---------|
| userName | 不能為空 |
| email | 格式必須是有效的 Email |
| phoneNumber | 可為空（選填） |
| birthday | 必須選擇有效日期 |
| password | 長度 ≥ 8 位 |

### 🚀 使用流程

```
新用戶訪問 /register
    ↓
填寫所有必填欄位
    ↓
點擊 "Sign Up" 按鈕
    ↓
驗證成功 → 顯示提示 → 導向 /login
    ↓
驗證失敗 → 顯示錯誤訊息 → 停留在註冊頁
```

### 🔐 注意事項

- ⚠️ `phoneNumber` 為選填，為空時傳送 `null`
- ✅ 密碼使用 `type="password"` 隱藏
- ✅ Email 使用 HTML5 驗證 (`type="email"`)
- ✅ 生日使用日期選擇器 (`type="date"`)

### 📱 相關連結

- **已有帳號**：`/login`

---

## Profile.vue

### 📖 功能說明

個人資料管理頁面。需要登入才能訪問（由路由守衛保護）。使用者可在此頁面查看、編輯個人資料和修改密碼。頁面與後端 API 同步，支援實時更新。

### 🔐 存取限制

- ✅ **需要登入**：訪問此頁面時，路由守衛會檢查 Token 是否存在
- ❌ **未登入**：自動重定向至登入頁面

### 🎨 頁面功能區塊

#### 1️⃣ **個人資料展示區塊**
- 以折疊式列表顯示所有個人資訊
- 支援展開/摺疊各個區塊
- 顯示 API 返回的完整 JSON 資料

#### 2️⃣ **個人資料編輯區塊**
可編輯欄位：
- 使用者名稱 (`userName`)
- 電子郵件 (`userEmail`)
- 電話號碼 (`userPhone`)

編輯流程：
1. 點擊「編輯個人資料」按鈕進入編輯模式
2. 編輯欄位內容
3. 點擊「保存」提交更新，或「取消」放棄編輯

#### 3️⃣ **密碼重設區塊**
支援修改密碼：
- 輸入舊密碼
- 輸入新密碼
- 點擊「保存」提交更新

### 🔧 技術特點

| 特性 | 說明 |
|------|------|
| **框架** | Vue 3 Composition API + `<script setup>` |
| **生命週期** | `onMounted` 自動載入資料 |
| **狀態管理** | `ref()` 響應式狀態 + 嵌套物件 |
| **HTTP 請求** | Axios (GET / PUT) |
| **API 同步** | 修改後重新載入最新資料 |
| **錯誤處理** | 詳細的 400 錯誤訊息解析 |
| **Loading 狀態** | 支援載入中提示 |

### 🔗 API 端點

#### 取得個人資料
```javascript
GET /api/self/profile
Headers:
  Authorization: Bearer {token}

Response:
{
  "userName": "簡柏定",
  "userEmail": "c29110279@gmail.com",
  "userPhone": "0908040216",
  "userId": 1,
  // ... 其他欄位
}
```

#### 更新個人資料
```javascript
PUT /api/self/profile
Headers:
  Authorization: Bearer {token}

Request Body:
{
  "userName": "簡柏定",
  "email": "newemail@example.com",
  "phoneNumber": "0900000000"
}

Response:
{
  "token": "新的 JWT Token",  // 可選
  // ... 更新後的資料
}
```

#### 修改密碼
```javascript
PUT /api/self/reset-password
Headers:
  Authorization: Bearer {token}

Request Body:
{
  "OldPassword": "oldpassword123",
  "NewPassword": "newpassword123"
}

Response:
{
  "token": "新的 JWT Token",  // 可選
  // ... 響應資料
}
```

### 📝 核心方法

#### `loadProfile()`
載入個人資料：
- 清空錯誤訊息
- 設定 `loading = true`
- 發送 GET 請求到 `/api/self/profile`
- 更新 `profile` 狀態
- 錯誤時顯示「登錄逾時」提示

#### `toggleSection(key)`
切換指定區塊的展開/摺疊狀態
```javascript
expandedSections.value[key] = !expandedSections.value[key]
```

#### `formatValue(value)`
格式化資料值用於顯示：
- `null/undefined` → "N/A"
- `object` → JSON 字符串（縮排 2 格）
- 其他 → 轉換為字符串

#### `editProfile()`
進入個人資料編輯模式：
1. 設定編輯標誌 `isEditMode = true`
2. 展開「基本資料」區塊
3. 複製當前資料到 `editForm`

#### `saveProfile()`
保存個人資料更新：
1. 發送 PUT 請求到 `/api/self/profile`
2. 若返回新 Token，更新 `localStorage`
3. 更新前端 `profile` 狀態
4. 顯示成功訊息，1.5 秒後重新載入資料
5. 錯誤時顯示詳細錯誤訊息

#### `editPassword()`
進入密碼修改模式：
1. 設定編輯標誌 `isEditMode = true`
2. 展開「重設密碼」區塊

#### `resetPassword()`
保存密碼修改：
1. 驗證舊密碼和新密碼
2. 發送 PUT 請求到 `/api/self/reset-password`
3. 若返回新 Token，更新 `localStorage`
4. 顯示成功訊息，1.5 秒後重新載入資料
5. 錯誤時顯示詳細的驗證錯誤訊息

#### `reloadProfileData()`
手動重新載入個人資料：
- 發送 GET 請求取得最新資料
- 強制刷新頁面

#### `cancelEditProfile()` / `cancelEditPassword()`
放棄編輯，退出編輯模式

### 🔗 相關狀態 & 變數

```javascript
const profile = ref(null)                    // 個人資料物件
const msg = ref("")                          // 錯誤/成功訊息
const loading = ref(false)                   // 載入中狀態
const expandedSections = ref({})             // 區塊展開/摺疊狀態
const isEditMode = ref(false)                // 是否在編輯模式
const isEditProfile = ref(false)             // 是否編輯個人資料
const isResetPassword = ref(false)           // 是否修改密碼
const editForm = ref({
  userName: "",
  userEmail: "",
  userPhone: "",
  oldPassword: "",
  newPassword: ""
})
```

### ❌ 錯誤處理

```javascript
// 支援的錯誤格式：
// 1. ModelState 驗證錯誤（標準格式）
{
  "errors": {
    "email": ["電子郵件格式不正確"],
    "password": ["密碼長度不足"]
  }
}

// 2. Token 過期
"登錄逾時"

// 3. 其他伺服器錯誤
e.message 或 e.response.data
```

### 🎨 樣式特點

- 折疊式列表展示資料
- 編輯模式與查看模式切換
- 響應式設計，支援各種螢幕尺寸
- 成功/失敗訊息提示

### 載入個人資料（onMounted）
    ↓
查看/編輯/修改密碼
    ↓
保存更改 → 更新 Token → 重新載入資料
    ↓
顯示成功訊息 → 更新頁面顯示
```

### 🔐 安全性考慮

- ✅ 需要有效 Token 才能存取
- ✅ Token 更新後自動保存至 `localStorage`
- ✅ 密碼欄位使用 `type="password"` 隱藏
- ⚠️ 舊密碼在提交前以明文方式傳送，需使用 HTTPS

### 📱 相關功能

- **載入個人資料**：頁面進入時自動執行
- **手動重新載入**：點擊「重新載入」按鈕
- **登出**：由導航列提供

---

## forgot_password.vue

### 📖 功能說明

忘記密碼頁面。使用者可在此頁面輸入電子郵件地址申請密碼重設。系統會向輸入的電子郵件地址發送驗證碼，用戶可使用驗證碼進行密碼重設。

### 🎨 頁面布局

#### 忘記密碼卡片容器
- **樣式**：居中佈置，漸層背景（紫色系）
- **尺寸**：最大寬度 400px，響應式設計

#### 表單輸入欄位

| 欄位 | 類型 | 必填 | 說明 |
|------|------|------|------|
| **email** | email | ✅ | 註冊時使用的電子郵件 |

### 🔧 技術特點

| 特性 | 說明 |
|------|------|
| **框架** | Vue 3 Option API (class-based) |
| **狀態管理** | `data()` 物件 |
| **HTTP 請求** | Axios (api instance) |
| **使用者交互** | 表單提交 + 按鈕狀態控制 |
| **反饋機制** | Alert 提示 (待優化為 Toast) |

### 🔗 API 端點

```javascript
POST /api/auth/forgot_password
Request Body:
{
  "email": "c29110279@gmail.com"
}

Response:
// 成功：驗證碼已寄送
// 失敗：返回相應的錯誤訊息
```

### 📝 核心方法

#### `requestReset()`
提交忘記密碼申請：
1. 向後端發送電子郵件
2. 成功時顯示 Alert：「驗證碼已寄送，請檢查信箱」
3. 失敗時顯示 Alert：伺服器返回的錯誤訊息
4. ⚠️ 注：後續跳轉至驗證碼頁面的邏輯已註釋，需後端配合實現

### 🔗 相關狀態 & 變數

```javascript
const email = ref('')           // 電子郵件輸入框
const isLoading = ref(false)    // 發送中狀態

async function requestReset()   // 申請重設密碼函數
```

### ❌ 錯誤處理

```javascript
// 發送成功
alert('驗證碼已寄送，請檢查信箱')

// 發送失敗
alert(err.response?.data || '寄送失敗')
```

### 🔄 使用流程

```
使用者忘記密碼
    ↓
訪問 /forgot_password 頁面
    ↓
輸入註冊時使用的電子郵件
    ↓
點擊「發送驗證碼」按鈕
    ↓
發送成功 → 顯示提示 → 檢查郵箱
    ↓
發送失敗 → 顯示錯誤訊息 → 重新嘗試
```

### 🛠️ 待優化項目

| 項目 | 說明 | 優先級 |
|------|------|--------|
| 錯誤提示 | 將 `alert()` 改為 Toast 或 Modal | 🔴 高 |
| 響應狀態 | 新增 `isLoading` 狀態控制按鈕禁用 | 🟡 中 |
| 路由導向 | 實現驗證碼頁面並新增路由 | 🔴 高 |
| 表單驗證 | 新增 Email 格式驗證 | 🟡 中 |

### 📱 相關連結

- **返回登入**：`/login`
- **未來功能**：驗證碼頁面（待實現）

### ⚠️ 已知問題

1. **硬編碼的 API 路由**：`/api/auth/forgot_password` 需確認後端已實現
2. **Alert 提示較簡陋**：建議替換為更友善的 UI 組件
3. **缺少後續流程**：驗證碼驗證頁面和新密碼設定頁面待實現
4. **ES6 vs Option API**：此檔案使用 Option API，與其他檔案風格不一致（建議統一轉換為 Composition API）

---

## 📊 Views 總結表

| 頁面 | 路由 | 需要登入 | 功能 | 主要狀態 |
|------|------|---------|------|---------|
| **Home** | `/` | ❌ | 個人履歷展示 | `activeContent`, `showMobileModal` |
| **Login** | `/login` | ❌ | 使用者登入 | `account`, `password`, `msg` |
| **Register** | `/register` | ❌ | 使用者註冊 | `userName`, `email`, `password` 等 |
| **Profile** | `/profile` | ✅ | 個人資料管理 | `profile`, `isEditMode`, `expandedSections` |
| **Forgot Password** | `/forgot_password` | ❌ | 密碼重設申請 | `email`, `isLoading` |

## 🔗 路由守衛流程

```
訪問受保護頁面 (/profile)
    ↓
檢查 localStorage 中是否存在 Token
    ↓
存在 → 允許訪問
    ↓
不存在 → 重定向至 /login
    ↓
已登入訪問登入/註冊頁
    ↓
自動重定向至 /profile
```

## 📝 開發建議

### 1️⃣ 代碼風格統一
- ❌ 混合使用 Option API 和 Composition API
- ✅ 建議全部改為 Composition API + `<script setup>`

### 2️⃣ 錯誤處理優化
- 將 `alert()` 改為統一的 Toast 或 Modal 組件
- 建立統一的 HTTP 錯誤攔截器

### 3️⃣ 數據管理
- 考慮使用 Pinia 進行全域狀態管理（Token、User 資訊等）
- 避免在多個組件中重複存儲相同數據

### 4️⃣ 表單驗證
- 統一的前端驗證規則
- 配合後端驗證提升使用者體驗

### 5️⃣ 響應式優化
- Home 頁面固定高度需要優化
- 考慮使用 CSS 變數管理顏色和間距

## 🔐 Token 管理流程

```
登入成功
    ↓
Token 存儲至 localStorage
    ↓
Axios 攔截器自動附加 Token 到請求標頭
    ↓
每個 API 請求都包含 Authorization: Bearer {token}
    ↓
若 Token 過期或無效 → 自動登出並重定向至登入頁
    ↓
若 API 返回新 Token → 更新 localStorage
```

---

**最後更新日期**：2026 年 1 月 27 日
