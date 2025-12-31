# BodWebFront 🚀✨

Hi~ 歡迎來到 **BodWebFront**！

這是一個基於 Vue 3 開發的前端專案，提供用戶註冊、登入、個人資料管理等功能，並包含個人履歷展示頁面。

## 📋 目錄

- [技術棧](#技術棧)
- [功能特色](#功能特色)
- [專案結構](#專案結構)
- [安裝與執行](#安裝與執行)
- [頁面說明](#頁面說明)
- [API 配置](#api-配置)
- [開發說明](#開發說明)

## 🛠 技術棧

- **Vue 3** - 前端框架
- **Vue Router 4** - 路由管理
- **Vite** - 建置工具（使用 rolldown-vite）
- **Axios** - HTTP 請求庫
- **Bootstrap** - CSS 框架（用於響應式設計）

## ✨ 功能特色

### 🔐 用戶認證系統
- 用戶註冊功能
- 用戶登入功能
- Token 認證機制
- 路由守衛保護需要認證的頁面
- 自動登出功能

### 📄 頁面功能
- **首頁 (Home)** - 個人履歷展示頁面
  - 個人介紹區塊
  - 關於我（學歷、技能、聯絡方式）
  - 工作經歷（可切換查看不同工作詳情）
  - 校園經歷（可切換查看不同學校詳情）
  - 響應式設計，支援手機、平板、桌面裝置

- **登入頁 (Login)** - 用戶登入
- **註冊頁 (Register)** - 新用戶註冊
- **個人資料頁 (Profile)** - 查看個人資料（需登入）

## 📁 專案結構

```
bod-web/
├── public/              # 靜態資源
├── src/
│   ├── api.js          # Axios 實例配置（含 Token 攔截器）
│   ├── App.vue          # 根組件（導航列、路由視圖）
│   ├── main.js          # 應用程式入口
│   ├── style.css        # 全域樣式
│   ├── assets/          # 圖片資源
│   ├── components/      # 共用組件
│   │   └── HelloWorld.vue
│   ├── router/          # 路由配置
│   │   └── index.js     # 路由定義與守衛
│   └── views/           # 頁面組件
│       ├── Home.vue     # 首頁（履歷頁面）
│       ├── Login.vue    # 登入頁
│       ├── Register.vue # 註冊頁
│       └── Profile.vue  # 個人資料頁
├── package.json         # 專案依賴
├── vite.config.js       # Vite 配置（含 API Proxy）
└── README.md           # 專案說明文件
```

## 🚀 安裝與執行

### 前置需求
- Node.js (建議 v16 以上)
- npm 或 yarn

### 安裝步驟

1. **安裝依賴**
```bash
npm install
```

2. **開發模式執行**
```bash
npm run dev
```
開發伺服器會啟動在 `http://localhost:5173`（預設 Vite 端口）

3. **建置生產版本**
```bash
npm run build
```
建置完成的檔案會輸出到 `dist/` 目錄

4. **預覽生產版本**
```bash
npm run preview
```

## 📄 頁面說明

### 首頁 (Home)
個人履歷展示頁面，包含以下區塊：
- **個人介紹** - 顯示姓名、職稱、個人照片
- **關於我** - 學歷、使用工具、程式語言、框架、聯絡方式
- **工作經歷** - 可點擊切換查看不同工作的詳細內容
  - 義大開發軟體工程師
  - 屏東大學資工系工讀生
  - 穀科餐酒館外場工讀生
- **校園經歷** - 可點擊切換查看不同學校的詳細內容
  - 國立屏東大學資訊工程系
  - 海青工商資訊科

### 登入頁 (Login)
- 輸入帳號（Email 或電話）和密碼
- 登入成功後會儲存 Token 並導向個人資料頁
- 已登入用戶會自動導向個人資料頁

### 註冊頁 (Register)
- 填寫用戶名稱、Email、電話（選填）、生日、密碼
- 註冊成功後會導向登入頁
- 已登入用戶會自動導向個人資料頁

### 個人資料頁 (Profile)
- 需要登入才能訪問（路由守衛保護）
- 顯示從 API 取得的個人資料（JSON 格式）
- 可手動重新載入資料

## 🔧 API 配置

### API 端點
專案使用 Axios 進行 API 請求，主要端點包括：
- `POST /api/auth/register` - 用戶註冊
- `POST /api/auth/login` - 用戶登入
- `GET /api/self/profile` - 取得個人資料（需 Token）

### Token 認證
- Token 儲存在 `localStorage` 中
- Axios 攔截器會自動在請求標頭中加入 `Authorization: Bearer {token}`
- 路由守衛會檢查 Token 是否存在，保護需要認證的頁面

### Proxy 設定
在 `vite.config.js` 中配置了 API Proxy：
- 所有 `/api` 開頭的請求會代理到 `https://localhost:7103`
- 開發時可避免 CORS 問題

如需修改後端 API 地址，請編輯 `vite.config.js` 中的 `target` 設定。

## 💻 開發說明

### 路由守衛邏輯
- 訪問需要認證的頁面（如 `/profile`）時，若無 Token 會自動導向登入頁
- 已登入用戶訪問登入或註冊頁時，會自動導向個人資料頁

### 登出功能
- 點擊導航列的「Logout」按鈕會清除 Token 並導向登入頁
- 登出按鈕僅在已登入狀態下顯示

### 響應式設計
- 首頁使用 Bootstrap 網格系統實現響應式佈局
- 支援桌面、平板、手機等不同裝置尺寸

## 📝 注意事項

- 確保後端 API 服務已啟動並運行在 `https://localhost:7103`
- Token 儲存在瀏覽器的 `localStorage` 中，清除瀏覽器資料會導致登出
- 開發時如遇到 CORS 問題，請檢查 `vite.config.js` 中的 Proxy 設定

## 🤝 聯絡資訊

若有任何問題歡迎聯絡我們～🙌

更多功能開發中，敬請期待！🚧🌟
