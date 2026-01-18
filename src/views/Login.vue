<script setup>
import { ref } from "vue";
import api from "../api";
import { useRouter } from "vue-router";

const router = useRouter();
const account = ref("");
const password = ref("");
const msg = ref("");

async function login() {
  msg.value = "";
  try {
    const res = await api.post("/api/auth/login", {
      account: account.value,
      password: password.value,
    });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userAccount", account.value);  // 保存账号供后续使用
    location.reload();
    router.push("/profile");
  } catch (e) {
    let errorMessage = "登入失敗，請檢查輸入";

    if (e.response?.status === 400) {
      const data = e.response.data;

      // 情況1：純文字 BadRequest（你手動寫的）
      if (typeof data === 'string') {
        errorMessage = data;  // 直接就是 "請輸入密碼"
      }
      // 情況2：標準驗證 JSON（ModelState 自動回傳）
      else if (data?.errors) {
        // 取出所有錯誤訊息的第一條（或全部）
        const allErrors = [];
        Object.values(data.errors).forEach(fieldErrors => {
          allErrors.push(...fieldErrors);
        });
        errorMessage = allErrors.join('、') || "驗證錯誤";
      }
      // 情況3：其他 JSON 格式（有 title）
      else if (data?.title) {
        errorMessage = data.title;
      }
    } else {
      errorMessage = e.message || "伺服器錯誤，請稍後再試";
    }

    msg.value = errorMessage;
    console.error("登入錯誤:", e);
  }
  
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo">
        <h1>哈囉 歡迎登入👋</h1>
        <p>Sign in to your account</p>
      </div>
      <form @submit.prevent="login" class="form">
        <div class="input-group">
          <label for="account">輸入電子郵件或電話</label>
          <input id="account" v-model="account" type="text" placeholder="Enter your email or phone" />
        </div>
        <div class="input-group">
          <label for="password">密碼</label>
          <input id="password" v-model="password" type="password" placeholder="Enter your password" />
        </div>
        <button type="submit" class="login-btn">Sign In</button>
      </form>
            <p class="register-link">Don't have an account? <a href="/register">Sign up</a></p>
      <p v-if="msg" class="error-msg">{{ msg }}</p>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Arial', sans-serif;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.logo h1 {
  margin: 0;
  color: #333;
  font-size: 28px;
  font-weight: bold;
}

.logo p {
  color: #666;
  margin: 10px 0 30px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: 500;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
}

.input-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
}

.login-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.login-btn:hover {
  transform: translateY(-2px);
}

.social-login {
  margin: 30px 0;
}

.social-login p {
  color: #666;
  margin-bottom: 15px;
}

.social-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.social-btn {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.social-btn:hover {
  background: #f5f5f5;
}

.register-link {
  color: #666;
  font-size: 14px;
}

.register-link a {
  color: #667eea;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}

.error-msg {
  color: #e74c3c;
  margin-top: 20px;
}
</style>
