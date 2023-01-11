<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="hello" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import {ipcRenderer} from "electron"
export default {
  name: "Home",
  components: {
    HelloWorld
  },
  methods:{
    hello(){
      ipcRenderer.invoke("hello");
    }
  },
  created(){
    ipcRenderer.on('hello-click',()=>{
      console.log("1111")
    });
  }
};
</script>
