<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useCounterStore } from "@/store/index"

const counterStore = useCounterStore()
const counter = computed(() => counterStore.counter)
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    <router-link to="/home">home</router-link>
    <span> | </span>
    <router-link to="/about">about</router-link>
  </div>
  <router-view></router-view>

  <div class="counter">
    <a-button type="primary" @click="counterStore.addCounter()">
      couter + 1
    </a-button>

    <div>counter: {{ counter }}</div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.counter {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}
</style>
