<template>
  <div class="container-fluid">
    <nav class="nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/profile">Profile</RouterLink>

      <button v-if="hasToken" class="btn" @click="logout">Logout</button>
    </nav>

    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue";

const hasToken = computed(() => !!localStorage.getItem("token"));

function logout() {
  localStorage.removeItem("token");
  // 直接導回登入
  window.location.href = "/login";
}
</script>

<style scoped>
.container { max-width: 980px; margin: 0 auto; padding: 16px; }
.nav { display: flex; gap: 12px; align-items: center; margin-bottom: 16px; }
.main { padding-top: 8px; }
.btn { margin-left: auto; padding: 6px 10px; cursor: pointer; }

</style>
