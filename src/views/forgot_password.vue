<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'  // 確認這行存在且路徑正確

const email = ref('')
const isLoading = ref(false)
const message = ref('')  // 用來顯示成功/錯誤訊息

const router = useRouter()

async function requestReset() {
    isLoading.value = true
    message.value = ''

    try {
        await api.post('/api/auth/forgot_password', {  // 確認路徑與後端一致
            Email: email.value
        })

        message.value = '驗證碼已寄送，請檢查信箱'
        // 可選：自動跳到驗證碼頁面
        // router.push({ name: 'VerifyCode', query: { email: email.value } })
    } catch (err) {
        console.error('寄送錯誤完整資訊:', err)  // 印完整錯誤

        let errMsg = '寄送失敗，請稍後再試'

        // 後端常見錯誤格式處理
        if (err.response) {
            console.log('後端回應狀態碼:', err.response.status)  // 印 400/404/500 等
            console.log('後端回應資料:', err.response.data)      // 印詳細內容

            const data = err.response.data

            // 情況 1：純文字錯誤（手動 BadRequest）
            if (typeof data === 'string') {
                errMsg = data
            }
            // 情況 2：自動驗證錯誤（JSON errors 物件）
            else if (data?.errors) {
                const errors = data.errors
                const firstError = Object.values(errors)[0]?.[0]
                errMsg = firstError || errMsg
            }
            // 情況 3：其他 JSON（有 message 或 title）
            else if (data?.message) {
                errMsg = data.message
            } else if (data?.title) {
                errMsg = data.title
            }
            // 情況 4：其他狀態碼
            else if (err.response.status === 404) {
                errMsg = 'API 路徑不存在，請確認後端路由'
            } else if (err.response.status === 500) {
                errMsg = '伺服器內部錯誤，請聯絡管理員'
            }
        } else if (err.request) {
            errMsg = '無法連線到伺服器，請檢查網路或後端是否運行'
        }

        message.value = errMsg
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="forgot-password-container">
        <div class="forgot-password-card">
            <h1>忘記密碼</h1>
            <p class="subtitle">請輸入您的電子郵件地址以重設密碼</p>

            <form @submit.prevent="requestReset">
                <div class="form-group">
                    <label for="email">電子郵件</label>
                    <input id="email" v-model="email" type="email" placeholder="請輸入電子郵件" required />
                </div>

                <button type="submit" class="btn-submit" :disabled="isLoading">
                    {{ isLoading ? '發送中...' : '發送驗證碼' }}
                </button>
            </form>

            <div class="footer-links">
                <router-link to="/login">返回登入</router-link>
            </div>

            <!-- 顯示訊息 -->
            <p v-if="message" class="error-msg" :style="{ color: message.includes('成功') ? '#10b981' : '#ef4444' }">
                {{ message }}
            </p>
        </div>
    </div>
</template>

<style scoped>
.forgot-password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.forgot-password-card {
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
}

h1 {
    text-align: center;
    margin-bottom: 10px;
    color: #333;
}

.subtitle {
    text-align: center;
    color: #666;
    margin-bottom: 30px;
    font-size: 14px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: 500;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
}

input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.1);
}

.btn-submit {
    width: 100%;
    padding: 10px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
}

.btn-submit:hover:not(:disabled) {
    background: #5568d3;
}

.btn-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.footer-links {
    text-align: center;
    margin-top: 20px;
}

.footer-links a {
    color: #667eea;
    text-decoration: none;
    font-size: 14px;
}

.footer-links a:hover {
    text-decoration: underline;
}

.error-msg {
    color: #e74c3c;
    margin-top: 20px;
}
</style>