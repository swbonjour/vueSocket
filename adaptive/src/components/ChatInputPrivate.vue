<script setup>
import { onMounted, ref, watch } from 'vue';
import socket from '../socket';
import { users, selectedUser } from '../store';
const props = defineProps({
    userSelected: Object,
})

const messageValue = ref('');
const messagesBlock = ref(null);
const messageHeader = ref(null);
watch(selectedUser, (newUserSelected, oldUserSelected) => {
    console.log(newUserSelected);
    renderMessages();
})
function sendPrivateMessage() {
    users.value.forEach((user) => {
        console.log(user, 'user');
        if(user.userID == socket.id) {
            user.messages.push([messageValue.value, selectedUser.value.username]);
        }
    })
    const message = messageValue.value;
    renderMessages();
    socket.emit('sendPrivateMessage', { message: message, to: selectedUser.value.userID });
}

function getPrivateMessage(message, username) {
    console.log(message, username);
    users.value.forEach((user) => {
        if(user.userID == socket.id) {
            user.messages.push([message, username]);
            console.log(user);
        }
    })
    renderMessages();
}

socket.on('recievePrivateMessage', ({ message, username }) => {
    console.log(message, username);
    getPrivateMessage(message, username);
})

function messageHeaderPos() {
    messageHeader.value.style.top = `${messagesBlock.value.scrollTop}px`;
}

function renderMessages() {
    console.log(1);
    messagesBlock.value.innerHTML = `<div class="message-header" ref="messageHeader"><h1>${ selectedUser.value.username } chat</h1></div>`;
    const resArr = [];
    users.value.forEach((user) => {
        if(user.userID == socket.id) {
            console.log(user);
            user.messages.forEach((message) => {
                if(message['1'] == selectedUser.value.username) {
                    resArr.push(message['0']);
                }
            })
            for(let i = 0; i < resArr.length; i++) {
                const message = document.createElement('div');
                message.innerText = resArr[i];
                message.classList.add('message');
                messagesBlock.value.appendChild(message);
                messageValue.value = '';
                messagesBlock.value.scrollTop = messagesBlock.value.scrollHeight;
            }
        }
    })
}
</script>

<template>
    <div style="height: 100%">
        <div class="messages-wrapper" ref="messagesBlock" @scroll="messageHeaderPos">
            <div class="message-header" ref="messageHeader"><h1>{{ props.userSelected.username }} chat</h1></div>
        </div>
        <div class="input-wrapper">
            <form @submit.prevent="sendPrivateMessage" class="input-form">
                <input type="text" v-model="messageValue" placeholder="message" class="input-message">
                <button type="submit" class="button-send">Send</button>
            </form>
        </div>
    </div>
</template>

<style>
.input-wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
}

.input-form {
    width: 100%;
    display: flex;
    padding: 2rem;
    gap: 2rem;
}

.input-message {
    width: 100%;
    height: 4rem;
    padding: 2rem;
    font-size: calc(8px + 8 * (100vw / 1280));
}

.button-send {
    width: 20%;
    font-size: calc(8px + 8 * (100vw / 1280));
}

.messages-wrapper {
    width: 75%;
    height: 80%;
    border: 1px solid white;
    margin: 2rem;
    color: white;
    overflow-y: scroll;
    position: relative;
}

.message {
    width: 100%;
    height: 2rem;
    padding: 2rem;
    color: white;
    display: flex;
    align-items: center;
}

.message-header {
    width: 100%;
    height: 4rem;
    background-color: rgb(82, 3, 3);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    margin-bottom: 2rem;
}

.message:nth-child(2) {
    margin-top: 4rem;
}
</style>