<script setup>
import { ref } from 'vue';
import socket from '../socket';

const messageValue = ref('');
const messagesBlock = ref(null);
function sendMessage() {
    const message = document.createElement('div');
    message.innerText = messageValue.value;
    message.classList.add('message');
    messagesBlock.value.appendChild(message);
    messageValue.value = '';
    messagesBlock.value.scrollTop = messagesBlock.value.scrollHeight;
    socket.emit('sendMessage', (message.innerText));
}

function getMessage(messageText) {
    const message = document.createElement('div');
    message.innerText = messageText;
    message.classList.add('message');
    messagesBlock.value.appendChild(message);
    messagesBlock.value.scrollTop = messagesBlock.value.scrollHeight;
}

socket.on('recieveMessage', (message) => {
    getMessage(message);
})
</script>

<template>
    <div class="messages-wrapper" ref="messagesBlock">
    </div>
    <div class="input-wrapper">
        <form @submit.prevent="sendMessage" class="input-form">
            <input type="text" v-model="messageValue" placeholder="message" class="input-message">
            <button type="submit" class="button-send">Send</button>
        </form>
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
}

.message {
    width: 100%;
    height: 2rem;
    padding: 2rem;
    color: white;
    display: flex;
    align-items: center;
}
</style>