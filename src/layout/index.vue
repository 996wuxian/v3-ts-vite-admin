<template>
  <div class="page-container">
    <div
      class="warp"
      :style="[
        usetheme.themeType === 'black'
          ? { backgroundColor: '#010103' }
          : { backgroundColor: '#e9ecef' }
      ]"
    >
      <div class="warp-aside">
        <Aside />
      </div>
      <div class="warp-content">
        <el-container style="width: calc(100% - 20px); height: calc(100% - 20px)">
          <el-header style="height: 50px"><Header /></el-header>
          <el-main
            class="warp-content-main"
            :style="[
              usetheme.themeType === 'black'
                ? { backgroundColor: '#202020' }
                : { backgroundColor: '#fff' }
            ]"
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

import usethemeStore from '@/stores/modules/theme'
const usetheme = usethemeStore()
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
</style>
