<script setup>
import { ref } from 'vue';
import Button from './components/Button.vue';

const show = ref(false)
</script>
<template>
  <img src="@/assets/rollup.svg" alt="">
  <Button size="small" @click="show = !show">切换</Button>
  <Button type="danger" size="small">danger</Button>
  <Button v-if="show" size="middle" type="primary">primary</Button>
</template>
<style lang="scss" scoped>
img {
  height: 400px;
  width: 300px;
}
</style>