<script setup>
import OnlineSvg from '../assets/OnlineSvg.vue';
import OfflineSvg from '../assets/OfflineSvg.vue';
const props = defineProps({
    username: String,
    status: String,
    selected: Boolean,
})
</script>

<template>
    <div class="user-wrapper" :class="{ selected: selected }" @click="$emit('select')">
        <div class="user-username">{{ props.username }}</div>
        <div class="user-status" v-if="props.status == 'connected'">
            <OnlineSvg />
        </div>
        <div class="user-status" v-else>
            <OfflineSvg />
        </div>
    </div>
</template>

<style scoped>
.user-wrapper {
    color: white;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    font-size: calc(8px + 8 * (100vw / 1280));
}

.selected {
    background-color: rgb(82, 2, 2);
}
</style>