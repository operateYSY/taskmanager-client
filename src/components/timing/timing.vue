<template style="overflow-y: hidden;">
  <div id="d">
    <h1>计时</h1>
    <h1 id="timeShow">计时</h1>
    <el-button type="primary" icon="el-icon-video-pause" @click="pause()"
      >暂停</el-button
    >
    <el-button type="primary" icon="el-icon-video-pause" @click="restart()"
      >开始</el-button
    >
  </div>
</template>

<script>
import { start, pause, restart } from "@/render/Timing";
export default {
  name: "timing",
  data() {
    return {
      rule: {
        time: 11
      }
    };
  },
  mounted() {
    start();
  },
  methods: {
    pause() {
      pause();
    },
    restart() {
      restart();
    }
  }
};
</script>

<style>
/* #d {
  height: 100px;
  width: 100px;
  overflow-y: hidden;
  -webkit-app-region: drag;
} */
button {
  -webkit-app-region: no-drag;
}
</style>
