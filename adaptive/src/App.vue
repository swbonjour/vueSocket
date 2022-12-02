<script setup>
import { usernameCreated } from './store';
import LoginForm from './components/LoginForm.vue';
import Chat from './components/Chat.vue';
</script>

<template>
  <div class="wrapper" v-if="!usernameCreated">
    <LoginForm />
  </div>
  <Chat v-else />
</template>

<style scoped>
.wrapper {
  margin-left: 50%;
  transform: translateX(-50%);
  width: fit-content;
}
</style>
