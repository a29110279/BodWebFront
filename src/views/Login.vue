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
    router.push("/profile");
  } catch (e) {
    msg.value = "Login failed.";
    console.error(e);
  }
}
</script>


<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="login" class="form">
      <input v-model="account" placeholder="Email or Phone" />
      <input v-model="password" type="password" placeholder="Password" />
      <button>Login</button>
    </form>

    <p v-if="msg">{{ msg }}</p>
  </div>
</template>


<style scoped>
.form { display: grid; gap: 8px; max-width: 360px; }
</style>
