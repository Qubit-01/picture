<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { PictureProp } from './Picture.vue.d.ts';

const bgColors = ['#A7D2CB', '#874C62', '#C98474', '#F2D388'];
const lightenColors = ['#dcedea', '#d4b2bf', '#e9cec7', '#faedcf'];
const bgIndex = Math.floor(Math.random() * bgColors.length);
const bgColor = bgColors[bgIndex];
const bgColorLight = lightenColors[bgIndex];

const props = withDefaults(defineProps<PictureProp>(), {
  placeholder: 'empty',
});
const emit = defineEmits<{ (event: 'load', ev: Event): void }>();
defineOptions({ inheritAttrs: false });

// ios设备上，会同时加载最佳兼容和兜底图
const isSafari = /iphone|ipad|ipod/i.test(
  navigator?.userAgent.toLowerCase() || '',
);

/** 插件会生成多种格式的图片，放入source中，picture标签会选择最优图像显示 */
const sources = computed<{ srcset?: string; type?: string }[]>(() =>
  'fallback' in props.src
    ? Object.entries(props.src.sources ?? {}).map(([k, v]) => ({
        type: `image/${k}`,
        srcset: v[0]?.src,
      }))
    : Object.entries(props.src.sources).map(([k, v]) => ({
        type: `image/${k}`,
        srcset: v,
      })),
);

/** 返回图片对象里面主要图片，放入img中，作为兜底图像 */
const lastSource = computed(() =>
  'fallback' in props.src ? props.src.fallback : props.src.img,
);

// 测试过url变化时加载的图片符合预期
const safariSrc = ref('');
onMounted(() => {
  watch(lastSource, (value) => (safariSrc.value = value.src), {
    immediate: true,
  });
});

const loaded = ref(false);
function handleLoad(ev: Event) {
  emit('load', ev);
  loaded.value = true;
}
</script>

<template>
  <picture v-bind="rootAttrs">
    <source v-for="(attrs, index) in sources" :key="index" v-bind="attrs" />
    <img
      v-bind="{ ...lastSource, ...$attrs }"
      :class="{ 'placeholder-player': placeholder === 'color', loaded }"
      :src="isSafari ? safariSrc : lastSource.src"
      :srcset="isSafari ? safariSrc : lastSource.src"
      @load="handleLoad"
    />
  </picture>
</template>

<style scoped lang="scss">
picture {
  display: inline-block;

  img {
    width: 100%;
  }

  .placeholder-player {
    animation: placeholder ease-in-out 2s infinite; /* 加载动画 */
    &.loaded {
      animation: fadeIn linear 0.5s; /* 加载完成 */
    }
  }
}

@keyframes placeholder {
  0% {
    background-color: v-bind(bgColor);
  }
  50% {
    background-color: v-bind(bgColorLight);
  }
  100% {
    background-color: v-bind(bgColor);
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}
</style>
