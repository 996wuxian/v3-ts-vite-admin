<template>
  <div class="container">
    <slot name="title">
      {{ title }}
    </slot>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: '标题'
  }
})
</script>

<style scoped lang="scss">
.container {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
