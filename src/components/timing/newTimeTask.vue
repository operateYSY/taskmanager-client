<template style="overflow-y: hidden;">
  <div id="d">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="任务名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="任务描述" prop="describe">
        <el-input type="textarea" v-model="ruleForm.describe"></el-input>
      </el-form-item>
      <el-form-item label="任务计划时间" prop="plantTime">
        <el-input-number
          size="mini"
          v-model="ruleForm.plantTime"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="任务点数" prop="point">
        <el-input-number size="mini" v-model="ruleForm.point"></el-input-number>
      </el-form-item>
      <el-form-item label="任务类型" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio label="1">每日</el-radio>
          <el-radio label="2">每月</el-radio>
          <el-radio label="3">每年</el-radio>
          <el-radio label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");
import { start, pause, restart } from "@/render/Timing";
var self = this;
export default {
  name: "newTimeTask",
  data() {
    return {
      ruleForm: {
        name: "",
        describe: "",
        type: "0",
        plantTime: "1",
        point: "1",
        userId: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
          {
            min: 3,
            max: 255,
            message: "长度在 3 到 255 个字符",
            trigger: "blur"
          }
        ],
        type: [{ required: true, message: "请选择任务类型", trigger: "change" }]
      }
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          //this.ruleForm.userId = this.$store.getters.getUser.id;
          this.ruleForm.userId = 1;
          this.$axios
            .post("/addTimeTask", this.ruleForm, {
              headers: {
                Authorization: localStorage.getItem("token")
              }
            })
            .then(res => {
              ipcRenderer.send("closeNewTimeTask");
              ipcRenderer.send("timeLearnTimingIsEnd");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
