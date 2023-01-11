<template>
  <el-container style="height: 200%; border: 1px solid #eeeo;">
    <el-aside
      width="25%"
      style="background-color: rgb(238, 241, 246);overflow-x: hidden;"
      v-if="$route.meta.keepAlive"
    >
      <el-row class="tac">
        <el-col :offset="3">
          <div class="demo-basic--circle">
            <router-link :to="{ path: '/login' }">
              <div class="block">
                <el-avatar :size="50" :src="circleUrl">user</el-avatar>
              </div>
            </router-link>
          </div>
        </el-col>
        <el-col>
          <el-menu
            default-active="1"
            router
            @open="handleOpen"
            @close="handleClose"
            background-color="#eef1f6"
            text-color="#38393b"
            active-text-color="#ffd04b"
          >
            <el-submenu v-for="item in menu" :index="item.id" :key="item.id">
              <template slot="title">
                <span v-text="item.name"></span>
              </template>
              <el-menu-item-group
                class="over-hide"
                v-for="sub in item.sub"
                :key="sub.componentName"
              >
                <el-menu-item :index="sub.componentName" v-text="sub.name">
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>

    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #38393b;
}
.el-container:nth-child(2) .el-aside {
  line-height: 30px;
}
</style>
<script>
import menu from "@/menu/menu";

export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,
      menu: menu,
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      sizeList: ["large", "medium", "small"]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function() {
        this.isRouterAlive = true; //再打开
      });
    }
  }
};
</script>
