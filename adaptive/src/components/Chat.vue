<script setup>
import UserItem from "./UserItem.vue";
import ChatInput from "./ChatInput.vue";
import socket from "../socket";
import { users } from "../store";

socket.on('users', (usersSockets) => {
    users.value = [...usersSockets];
    users.value.forEach((user) => {
        user.status = 'connected'
        user.self = user.userID == socket.id;
    })
})

socket.on('userConnected', (user) => {
    users.value.push({...user, status: 'connected'});
})

socket.on('userDisconnected', (id) => {
    users.value.forEach((user) => {
        if(user.userID == id) {
            user.status = 'disconnected';
        }
    })
})
</script>

<template>
    <div class="chat-wrapper">
        <div class="users-online">
            <UserItem v-for="user in users" :key="user.userID" :username="user.username" :status="user.status" />
        </div>
        <div class="chat">
            <ChatInput />
        </div>
    </div>
</template>

<style scoped>
.chat-wrapper {
    width: 100%;
    height: 70rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
}
.users-online {
    width: 20%;
    height: 100%;
    border: 1px solid white;
    border-radius: 5px;
}
.chat {
    width: 80%;
    height: 100%;
    border: 1px solid white;
    border-radius: 5px;
    position: relative;
}
</style>