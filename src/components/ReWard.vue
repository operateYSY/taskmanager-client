<template>
  <div>
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" class="el-icon-plus" @click="newRewardWin()">
      </el-menu-item>
    </el-menu>
    <el-row :gutter="20">
      <el-form :inline="true" :model="point" class="demo-form-inline">
        <el-form-item label="总点数" icon="el-icon-coin">
          <el-input v-model="point" placeholder="总点数" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-col
        :span="8"
        v-for="(item, index) in rewardData"
        :key="item"
        :offset="index > 0 && index % 2 === 1 ? 2 : 0"
      >
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <img src="" class="image" />
          <div style="padding: 14px;">
            <span>{{ item.rewardName }}</span>
            <div>
              <span>剩余数量: {{ item.num }}</span>
            </div>
            <div>
              <span>需要点数: {{ item.needPoint }}</span>
            </div>
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="convert(index, item)"
                >兑换</el-button
              >

              <el-popconfirm title="是否删除" @confirm="del(index, item)">
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button>
              </el-popconfirm>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");
export default {
  data() {
    return {
      rewardData: [1, 2],
      currentDate: new Date(),
      point: 1,
      userData: {
        userId: this.$store.getters.getUser.id
      }
    };
  },
  mounted: function() {
    this.getMes();
    ipcRenderer.send("ReWard_reload_mes");
    ipcRenderer.on("ReWard_reload", () => {
      this.getMes();
    });
  },
  methods: {
    getMes() {
      this.$axios
        .post("/getReward", this.userData, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          console.log(res);
          let arr = [];
          for (let i in res.data.data) {
            arr.push(res.data.data[i]);
          }
          this.rewardData = arr;
        });
      this.$axios
        .post("/getPoint", this.userData, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          console.log(res);
          this.point = res.data.data.point;
        });
    },
    convert(index, item) {
      console.log(item);
      this.$axios
        .post("/convertReWard", item, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          ipcRenderer.send("ReWard_reload_mes_isEnd");
        });
    },
    del(index, item) {
      console.log(item);
      this.$axios
        .post("/deleteReward", item, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          ipcRenderer.send("ReWard_reload_mes_isEnd");
        });
    },
    newRewardWin() {
      let user = this.$store.getters.getUser;
      console.log(user);
      ipcRenderer.send("newRewardWin", user.id);
    }
  }
};
</script>

<style>
.button {
  padding: 0;
  float: right;
}
</style>
