<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item :index="'Completion/1'">本月</el-menu-item>
      <el-menu-item :index="'Completion/2'">全部</el-menu-item>
    </el-menu>
    <div id="box" style="width:100%;height:300px"></div>
    <el-divider></el-divider>
    <i class="el-icon-coin"><font size="5">点数:</font> </i>
    <el-form :inline="true" :model="point" class="demo-form-inline">
  <el-form-item label="总点数" icon="el-icon-coin">
    <el-input v-model="point" placeholder="总点数" disabled></el-input>
  </el-form-item>
    </el-form>
        <el-divider></el-divider>
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
              <span>获得数量: {{ item.num }}</span>
            </div>
            <div>
              <span>总点数: {{ item.totalPoint }}</span>
            </div>
            <div class="bottom clearfix">
              <el-popconfirm title="是否退回" @confirm="ret(index, item)">
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-minus"
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
var echarts = require("echarts");
const { ipcRenderer } = require("electron");
export default {
  data() {
    return {
      rewardData: [1, 2],
      activeIndex: "1",
      activeIndex2: "1",
      point: 1,
      userData: {
        userId: this.$store.getters.getUser.id
      }
    };
  },
  mounted() {
    this.drawLine();
    this.getMes();
    ipcRenderer.send("Completion_reload_mes");
    ipcRenderer.on("Completion_reload", () => {
      this.getMes();
    });
  },
  watch: {
    message: function() {
      this.drawLine();
    }
  },
  methods: {
    getMes() {
            this.$axios
        .post("/getUserReward", this.userData, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          console.log(res);
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    draw() {
      //通过echarts初始化我们的div
      let myChart = echarts.init(document.getElementById("main"));
      //为这个echarts的图添加属性
      myChart.setOption(this.option, true);
    },
    drawLine() {
      let myChart = echarts.init(document.getElementById("box"));
      myChart.setOption({
        title: { text: "本月完成情况" },
        tooltip: {},
        xAxis: {
          data: ["定时学习", "定时娱乐", "普通.学习", "普通。娱乐"]
        },
        yAxis: {}, // y坐标
        series: [
          {
            name: "销量",
            type: "bar", // 表格类型
            data: [5, 4, 36, 2]
          }
        ]
      });
    },
    ret(index, item) {
      console.log(item);
      this.$axios
        .post("/turnBackUserReward", item, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          ipcRenderer.send("Completion_reload_mes_isEnd");
        });
    }
  }
};
</script>

<style></style>
