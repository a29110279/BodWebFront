<script setup>
import { ref } from 'vue'
import api from './api'

// ===== Register form =====
const regUsername = ref('')
const regPassword = ref('')
const regEmail = ref('')
const regPhone = ref('')
const regBirthday = ref('') // YYYY-MM-DD

// ===== Login form (email/phone) =====
const loginAccount = ref('')
const loginPassword = ref('')

// ===== Results =====
const token = ref(localStorage.getItem('token') || '')
const profileResult = ref('')
const message = ref('')

function setToken(t) {
  token.value = t
  localStorage.setItem('token', t)
}

function clearToken() {
  token.value = ''
  localStorage.removeItem('token')
}

async function register() {
  message.value = ''
  try {
    // 你後端 RegisterDto 若有不同欄位名稱，請在這裡對齊
    const payload = {
      userName: regUsername.value,
      password: regPassword.value,
      email: regEmail.value,
      phoneNumber: regPhone.value || null,
      birthday: regBirthday.value ? new Date(regBirthday.value).toISOString() : null,
    }

    const res = await api.post('/api/auth/register', payload)
    message.value = `✅ Register success: ${JSON.stringify(res.data)}`
  } catch (err) {
    message.value = `❌ Register failed: ${formatAxiosError(err)}`
  }
}

async function login() {
  message.value = ''
  try {
    const payload = {
      account: loginAccount.value, // email 或 phone
      password: loginPassword.value,
    }

    const res = await api.post('/api/auth/login', payload)
    if (res.data?.token) {
      setToken(res.data.token)
      message.value = '✅ Login success, token saved.'
    } else {
      message.value = `⚠️ Login success but token not found: ${JSON.stringify(res.data)}`
    }
  } catch (err) {
    message.value = `❌ Login failed: ${formatAxiosError(err)}`
  }
}

async function getProfile() {
  profileResult.value = ''
  message.value = ''
  try {
    const res = await api.get('/api/test/profile') // ✅ 你給的 Profile API
    profileResult.value = JSON.stringify(res.data, null, 2)
    message.value = '✅ Profile fetched.'
  } catch (err) {
    message.value = `❌ Profile failed: ${formatAxiosError(err)}`
  }
}

function formatAxiosError(err) {
  // axios error 友善輸出
  const e = err?.response
  if (!e) return String(err)
  return `${e.status} ${e.statusText} - ${JSON.stringify(e.data)}`
}
</script>

<template>
  <div style="max-width: 880px; margin: 40px auto; font-family: system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans TC', sans-serif;">
    <h1 style="font-size: 28px; margin-bottom: 8px;">Vue 3 + .NET API 測試頁</h1>
    <p style="color: #666; margin-top: 0;">
      Register: <code>/api/auth/register</code> ・ Login: <code>/api/auth/login</code> ・ Profile: <code>/api/test/profile</code>
    </p>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 18px;">
      <!-- Register -->
      <section style="border: 1px solid #e5e5e5; border-radius: 12px; padding: 16px;">
        <h2 style="margin-top: 0;">註冊 Register</h2>

        <label>Username</label>
        <input v-model="regUsername" placeholder="testuser" style="width: 100%; padding: 10px; margin: 6px 0 12px;" />

        <label>Password</label>
        <input v-model="regPassword" type="password" placeholder="Password123" style="width: 100%; padding: 10px; margin: 6px 0 12px;" />

        <label>Email</label>
        <input v-model="regEmail" placeholder="test@test.com" style="width: 100%; padding: 10px; margin: 6px 0 12px;" />

        <label>Phone (optional)</label>
        <input v-model="regPhone" placeholder="0912345678" style="width: 100%; padding: 10px; margin: 6px 0 12px;" />

        <label>Birthday</label>
        <input v-model="regBirthday" type="date" style="width: 100%; padding: 10px; margin: 6px 0 12px;" />

        <button @click="register" style="padding: 10px 14px; border-radius: 10px; border: 1px solid #111; background: #111; color: #fff; cursor: pointer;">
          Register
        </button>
      </section>

      <!-- Login + Profile -->
      <section style="border: 1px solid #e5e5e5; border-radius: 12px; padding: 16px;">
        <h2 style="margin-top: 0;">登入 Login（Email 或 Phone）</h2>

        <label>Email 或 Phone</label>
        <input v-model="loginAccount" placeholder="test@test.com 或 0912345678" style="width: 100%; padding: 10px; margin: 6px 0 12px;" />

        <label>Password</label>
        <input v-model="loginPassword" type="password" placeholder="Password123" style="width: 100%; padding: 10px; margin: 6px 0 12px;" />

        <div style="display:flex; gap:10px; flex-wrap: wrap;">
          <button @click="login" style="padding: 10px 14px; border-radius: 10px; border: 1px solid #111; background: #111; color: #fff; cursor: pointer;">
            Login
          </button>

          <button @click="getProfile" :disabled="!token"
            style="padding: 10px 14px; border-radius: 10px; border: 1px solid #111; background: #fff; color: #111; cursor: pointer;"
          >
            Get Profile
          </button>

          <button @click="clearToken" style="padding: 10px 14px; border-radius: 10px; border: 1px solid #ddd; background: #fff; color: #111; cursor: pointer;">
            Clear Token
          </button>
        </div>

        <div style="margin-top: 12px; font-size: 12px; color: #666;">
          Token: <span v-if="token">已保存（localStorage）</span><span v-else>尚未登入</span>
        </div>

        <pre v-if="profileResult" style="margin-top: 12px; background: #f7f7f7; padding: 12px; border-radius: 10px; overflow: auto;">{{ profileResult }}</pre>
      </section>
    </div>

    <p v-if="message" style="margin-top: 16px; padding: 12px; border-radius: 10px; background: #f6f6f6;">
      {{ message }}
    </p>

    <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
    <p style="color:#666; margin:0;">
      提醒：如果 Profile 一直 401，通常是 <b>Vite proxy target port</b> 沒對到，或後端 JWT 驗證設定不一致。
    </p>
  </div>
</template>
