<script setup>
import { ref } from "vue";
import api from "../api"; // 你現在的 axios instance 檔名若不同，改這行
import { useRouter } from "vue-router";

const router = useRouter();
const userName = ref("");
const email = ref("");
const phoneNumber = ref("");
const birthday = ref("");
const password = ref("");
const msg = ref("");

async function register() {
  msg.value = "";
  try {
    await api.post("/api/auth/register", {
        userName: userName.value,
        password: password.value,
        email: email.value,
        birthday: birthday.value,
        phoneNumber: phoneNumber.value || null
    });
    msg.value = "Register success. Please login.";
    router.push("/login");
  } catch (e) {
    let errorMessage = "註冊失敗，請檢查輸入";

    if (e.response?.status === 400) {
      const data = e.response.data;

      // 情況1：純文字 BadRequest
      if (typeof data === 'string') {
        errorMessage = data;
      }
      // 情況2：標準驗證 JSON
      else if (data?.errors) {
        const allErrors = [];
        Object.values(data.errors).forEach(fieldErrors => {
          allErrors.push(fieldErrors[0]);
        });
        errorMessage = allErrors.join('、') || "驗證錯誤";
      }
      // 情況3：其他 JSON 格式
      else if (data?.title) {
        errorMessage = data.title;
      }
    } else {
      errorMessage = e.message || "伺服器錯誤，請稍後再試";
    }

    msg.value = errorMessage;
    console.error("註冊錯誤:", e);
  }
}
</script>

<template>
  <div class="register-container">
    <div class="register-card">
      <div class="logo">
        <h1>加入我們吧🤟</h1>
        <p>Create your account</p>
      </div>
      <form @submit.prevent="register" class="form">
        <div class="input-group">
          <label for="userName">使用者名稱</label>
          <input id="userName" v-model="userName" type="text" placeholder="Enter your username" />
        </div>
        <div class="input-group">
          <label for="email">電子郵件</label>
          <input id="email" v-model="email" type="email" placeholder="Enter your email" />
        </div>
        <div class="input-group">
          <label for="phoneNumber">電話號碼（選填）</label>
          <input id="phoneNumber" v-model="phoneNumber" type="tel" placeholder="Enter your phone number" />
        </div>
        <div class="input-group">
          <label for="birthday">生日</label>
          <input id="birthday" v-model="birthday" type="date" />
        </div>
        <div class="input-group">
          <label for="password">密碼</label>
          <input id="password" v-model="password" type="password" placeholder="Enter your password" />
        </div>
        <button type="submit" class="register-btn">Sign Up</button>
      </form>
      <p class="login-link">Already have an account? <a href="/login">Sign in</a></p>
      <p v-if="msg" class="error-msg">{{ msg }}</p>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Arial', sans-serif;
}

.register-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 450px; /* 從 400px 增加到 450px */
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
  gap: 15px; /* 從 20px 縮小到 15px */
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

.register-btn {
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

.register-btn:hover {
  transform: translateY(-2px);
}

.login-link {
  color: #666;
  font-size: 14px;
  margin-top: 20px;
}

.login-link a {
  color: #667eea;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

.error-msg {
  color: #e74c3c;
  margin-top: 20px;
}
</style>
