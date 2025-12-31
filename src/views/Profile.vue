<script setup>
import { ref, onMounted } from "vue";
import api from "../api";

const data = ref("");
const msg = ref("");

async function loadProfile() {
  msg.value = "";
  try {
    const res = await api.get("/api/self/profile");
    data.value = JSON.stringify(res.data, null, 2);
  } catch (e) {
    msg.value = "Load profile failed (maybe token invalid).";
    console.error(e);
  }
}

onMounted(loadProfile);
</script>


<template>
  <div>
    <h1>Profile</h1>

    <button @click="loadProfile">Load Profile</button>

    <pre v-if="data" align="left">{{ data }}</pre>
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>