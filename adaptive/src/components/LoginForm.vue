<script setup>
import { ref } from 'vue';
import { username, usernameCreated } from '../store';
import socket from '../socket';

const usernameValidated = ref(false);
function validateUsername() {
    if(username.value.length > 2) {
        usernameValidated.value = true;
        return;
    }
    usernameValidated.value = false;
    return;
}

function submitUsername() {
    usernameCreated.value = !usernameCreated.value;
    socket.auth = { username: username.value };
    socket.connect();
}
</script>

<template>
    <form @submit.prevent="submitUsername">
        <input type="text" v-model="username" placeholder="username" @input="validateUsername">
        <button type="submit" :disabled="!usernameValidated">Submit</button>
    </form>
</template>