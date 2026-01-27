<script>
export default {
    name: 'ForgotPassword',
    data() {
        return {
            email: '',
            isLoading: false,
        };
    },
    methods: {
        async requestReset() {
            try {
                await api.post('/api/auth/forgot_password', { email: this.email });
                alert('驗證碼已寄送，請檢查信箱');
                // 跳到輸入驗證碼頁面
                // this.$router.push({ name: 'VerifyCode', query: { email: this.email } });
            } catch (err) {
                alert(err.response?.data || '寄送失敗');
            }
        },
    },
};
</script>

<template>
    <div class="forgot-password-container">
        <div class="forgot-password-card">
            <h1>忘記密碼</h1>
            <p class="subtitle">請輸入您的電子郵件地址以重設密碼</p>

            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="email">電子郵件</label>
                    <input id="email" v-model="email" type="email" placeholder="請輸入電子郵件" required />
                </div>

                <button type="submit" class="btn-submit" :disabled="isLoading" @click="requestReset">
                    {{ isLoading ? '發送中...' : '發送驗證碼' }}
                </button>
            </form>

            <div class="footer-links">
                <router-link to="/login">返回登入</router-link>
            </div>
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
</style>