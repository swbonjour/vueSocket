<script setup>
import UserItem from "./UserItem.vue";
import ChatInput from "./ChatInput.vue";
import socket from "../socket";
import { users, selectedUser } from "../store";
import ChatInputPrivate from './ChatInputPrivate.vue';

socket.on('users', (usersSockets) => {
    users.value = [...usersSockets];
    users.value.forEach((user) => {
        user.status = 'connected'
        user.self = user.userID == socket.id;
    })
})

socket.on('userConnected', (user) => {
    users.value.push({...user, status: 'connected'});
    const mapedUsers = users.value.map(u => u.username);
    let indexes = [];
    for(let i = 0; i < mapedUsers.length; i++) {
        if(user.username == mapedUsers[i]) {
            indexes.push(i);
        }
    }
    console.log(indexes);
    if(indexes.length != 1) {
        users.value.pop();
        users.value[indexes[0]].status = 'connected';
        return;
    }
})

socket.on('userDisconnected', (username) => {
    users.value.forEach((user) => {
        if(user.username == username) {
            user.status = 'disconnected';
        }
    })
})

function selectUser(user) {
    selectedUser.value = user;
}
</script>

<template>
    <div class="chat-wrapper">
        <div class="users-online">
            <UserItem v-for="user in users" :key="user.userID" :username="user.username" :status="user.status" @select="selectUser(user)" :selected="selectedUser == user"/>
        </div>
        <div class="chat">
            <ChatInput v-show="!selectedUser"/>
            <ChatInputPrivate v-show="selectedUser" :user-selected="selectedUser"/>
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