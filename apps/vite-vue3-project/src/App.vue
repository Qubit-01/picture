<script setup lang="ts">
import Picture from "@kwai-explore/picture.vue";
import examplePic from "./assets/example.jpg?preset=modern";
import examplePicPng from "./assets/eve-bg-0108.png?preset=modern";
import { ref } from "vue";

const src = ref(examplePicPng);

function onLoad(...args: any[]) {
  console.log("load", ...args);
}
function onClick(e: Event) {
  console.log(e);
  src.value = examplePic; // 点击切换图片
}
</script>

<template>
  <div>vue3 Picture demo</div>
  <!-- 
    root-attrs 会被加到组件根元素 picture 元素
    而直接加的props，全部会被透传到 img 元素上
  -->
  <div class="box">
    <Picture
      :src
      placeholder="color"
      @load="onLoad"
      @click="onClick"
      :root-attrs="{
        class: 'diy-picture',
        id: 'diy-picture',
      }"
      class="inner-img-class"
      id="inner-img-id"
    />
  </div>
</template>

<style scoped lang="scss">
/* .box {
  width: 200px;
  height: 100px;
} */
.diy-picture {
  border: 4px solid yellow;
}
:deep(.inner-img-class) {
  border: 4px solid red;
  width: 200px;
  height: 100px;
  overflow: hidden;
  object-fit: cover;
}
</style>
