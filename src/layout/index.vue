<template>
  <div class="page-container">
    <div
      class="warp"
      :class="{
        'night-mode': usetheme.themeType === 'black',
        'day-mode': usetheme.themeType !== 'black',
        'small-font': usetheme.fontSize === 'small',
        'default-font': usetheme.fontSize === 'default',
        'large-font': usetheme.fontSize === 'large'
      }"
    >
      <div class="warp-aside">
        <Aside />
      </div>
      <div class="warp-content">
        <el-container style="width: calc(100% - 20px); height: calc(100% - 20px)">
          <el-header style="height: 50px"><Header /></el-header>
          <el-main
            v-loading="loading"
            class="warp-content-main"
            :element-loading-svg="svg"
            element-loading-svg-view-box="-10, -10, 50, 50"
            :class="{
              'night-mode': usetheme.themeType === 'black',
              'day-mode-main': usetheme.themeType !== 'black'
            }"
            ><router-view v-slot="{ Component }">
              <keep-alive>
                <component :is="Component" />
              </keep-alive> </router-view
          ></el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Aside from './aside/Aside.vue'
import Header from './header/Header.vue'
import { watch } from 'vue'

import { useRoute } from 'vue-router'
const route = useRoute()

// todo loading
// bug loading

import usethemeStore from '@/stores/modules/theme'
const usetheme = usethemeStore()

const loading = ref(false)
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
watch(
  () => route.path,
  () => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 1000)
  }
)
</script>

<style scoped lang="scss">
@import '@/assets/scss/global.scss';

.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #38454c;
  color: #a5a5a5;
}
.warp {
  width: 100%;
  height: 100%;
  display: flex;
  @include bg_color($background-color-black);
  @include font_size($font-size-default);
  border-radius: 20px;
  min-width: 500px;
  min-height: 300px;
  &-aside {
    width: 200px;
  }
  &-content {
    flex: 1;
    &-main {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      @include font_color($font_color-black);
    }
  }
}

.night-mode {
  background-color: $background-color-black;
}

.day-mode-main {
  background-color: $background-color-white-main;
}

.day-mode {
  background-color: $background-color-white;
}

.small-font {
  font-size: $font-size-small;
}

.default-font {
  font-size: $font-size-default;
}

.large-font {
  font-size: $font-size-large;
}
</style>
