<template>
  <div>
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" class="el-icon-plus" @click="newTimeTask()">
        新增任务</el-menu-item
      >
    </el-menu>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="taskDescribe"
        label="任务名称"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="doneTime"
        label="上次完成时间"
        width="180"
      ></el-table-column>
      <el-table-column prop="point" label="点数" width="180"></el-table-column>
      <el-table-column prop="totalNum" label="总完成次数"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="tableData">
          <el-button
            type="primary"
            id="startbtn"
            icon="el-icon-check"
            @click="startTiming(tableData.$index, tableData.row)"
            >完成</el-button
          >
          <el-button
            type="primary"
            id="startbtn"
            icon="el-icon-delete"
            @click="deleteTask(tableData.$index, tableData.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
const { ipcRenderer } = require("electron");

export default {
  isRouterAlive: true,
  inject: ["reload"],
  name: "tableData",
  data() {
    return {
      tableData: [
        {
          taskName: 1,
          taskDescribe: 2,
          createTime: 3,
          doneTime: 4,
          point: 4,
          usingTimeTotal: 4
        }
      ],
      userData: {
        userId: this.$store.getters.getUser.id
      },
      taskDate: {
        id: 0
      }
    };
  },

  methods: {
    getMes() {
      this.$axios
        .post("/getCommonTask", this.userData, {
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
          this.tableData = arr;
        });
    },
    startTiming(index, row) {
      ipcRenderer.send("newTimingWin", row);
      //window.opener.postMessage(row.plantTime);
    },
    deleteTask(index, row) {
      this.taskDate.id = row.id;
      this.$axios
        .post("/delet", this.taskDate, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then( res => {
          ipcRenderer.send("timeLearnTimingIsEnd");
        });
    },
    newTimeTask() {
      let user = this.$store.getters.getUser;
      console.log(user);
      ipcRenderer.send("newTimeTaskWin", user.id);
    }
  },
  mounted: function() {
    this.getMes();
    ipcRenderer.send("timeLearnTiming_reload_mes");
    ipcRenderer.on("timeLearnTimingIsEnd_reload", () => {
      this.getMes();
    });
  }
};
</script>

<style></style>
