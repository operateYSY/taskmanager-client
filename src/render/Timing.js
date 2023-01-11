const { ipcRenderer } = require("electron");
const Timer = require("timer.js");
var workStart;
var task;

import axios from "axios";
async function start() {
  workStart = new Timer({
    ontick: ms => {
      let timerContainer = document.getElementById("timeShow");
      let s = (ms / 1000).toFixed(0);
      let ss = s % 60;
      let mm = parseInt(s / 60);
      let hh = parseInt(mm / 60);
      let MM = mm % 60;
      timerContainer.innerText =
        hh.toString().padStart(2, 0) +
        ":" +
        MM.toString().padStart(2, 0) +
        " : " +
        ss.toString().padStart(2, 0);
    },
    onend: () => {
      notification();
    }
  });
  ipcRenderer.send("getPlantTime-message");
  ipcRenderer.on("getPlantTime-reply", function(event, arg) {
    let time = arg.plantTime;
    time *= 60;
    task = arg;
    workStart.start(time);
  });
}

async function notification() {
  axios.post("/updateTimeTask", task, {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });
  ipcRenderer.send("timeLearnTimingIsEnd");
  let res = await ipcRenderer.invoke("work-notification");
  if (res === "end") {
  } else if (res === "restart") {
    start();
  }
}
function pause() {
  workStart.pause();
}
function restart() {
  workStart.start();
}
export { start, pause, restart };
