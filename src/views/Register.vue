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
      birthday: birthday.value ? new Date(birthday.value).toISOString() : null,
      phoneNumber: phoneNumber.value || null,
    });
    msg.value = "Register success. Please login.";
    router.push("/login");
  } catch (e) {
    msg.value = "Register failed.";
    console.error(e);
  }
}
</script>


<template>
  <div>
    <h1>Register</h1>

    <form @submit.prevent="register" class="form">
      <input v-model="userName" placeholder="UserName" />
      <input v-model="email" placeholder="Email" />
      <input v-model="phoneNumber" placeholder="PhoneNumber (optional)" />
      <input v-model="birthday" type="date" />
      <input v-model="password" type="password" placeholder="Password" />
      <button>Register</button>
    </form>

    <p v-if="msg">{{ msg }}</p>
  </div>
</template>


<style scoped>
.form { display: grid; gap: 8px; max-width: 360px; }
</style>
