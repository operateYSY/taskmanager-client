<template style="overflow-y: hidden;">
  <div id="d">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="奖品名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="奖品描述" prop="describe">
        <el-input type="textarea" v-model="ruleForm.describe"></el-input>
      </el-form-item>
      <el-form-item label="奖品所需点数" prop="point">
        <el-input-number
          size="mini"
          v-model="ruleForm.needPoint"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="奖品数量" prop="point">
        <el-input-number size="mini" v-model="ruleForm.num"></el-input-number>
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
  name: "NewRewardWin",
  data() {
    return {
      ruleForm: {
        name: "",
        describe: "",
        num: "0",
        needPoint: "1"
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
            .post("/addReward", this.ruleForm, {
              headers: {
                Authorization: localStorage.getItem("token")
              }
            })
            .then(res => {
              ipcRenderer.send("closeNewRewardWind");
              ipcRenderer.send("ReWard_reload_mes_isEnd");
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
