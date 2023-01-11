"use strict";

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  Notification,
  dialog,
  webContents
} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";
let win;
// Scheme must be registered before the app is ready
const winURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : `file://${__dirname}/index.html`;
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    title: "待办任务管理系统",
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      webSecurity: false,
      enableRemoteModule: true
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(winURL);
    //process.env.WEBPACK_DEV_SERVER_URL
    //if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL(winURL);
    //"app://./index.html"
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installExtension(VUEJS_DEVTOOLS);
  //   } catch (e) {
  //     console.error("Vue Devtools failed to install:", e.toString());
  //   }
  // }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

const electron = require("electron");
const Menu = electron.Menu;
/*隐藏electron创听的菜单栏*/
Menu.setApplicationMenu(null);

let newWin = null;
let TimeTask = null;
function newTimingWin(arg) {
  // eslint-disable-next-line no-const-assign
  newWin = new BrowserWindow({
    width: 500,
    height: 500,
    title: "计时",
    parent: win,
    // frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  });
  //newWin.webContents.openDevTools();
  TimeTask = arg;
  newWin.loadURL(winURL + "#/timing");
  newWin.on("close", () => {
    // eslint-disable-next-line no-const-assign
    newWin = null;
  });
}
ipcMain.on("timeLearnTiming_reload_mes", function(eventT, args) {
  ipcMain.on("timeLearnTimingIsEnd", function(event, args) {
    eventT.sender.send("timeLearnTimingIsEnd_reload");
  });
});

let rewardEvent;
ipcMain.on("ReWard_reload_mes", function(eventT, args) {
  rewardEvent = eventT;
});
ipcMain.on("ReWard_reload_mes_isEnd", function(event, args) {
  rewardEvent.sender.send("ReWard_reload");
});

let completionEvent;
ipcMain.on("Completion_reload_mes", function(eventT, args) {
  completionEvent = eventT;
});
ipcMain.on("Completion_reload_mes_isEnd", function(event, args) {
  completionEvent.sender.send("Completion_reload");
});

ipcMain.on("getPlantTime-message", function(event, args) {
  event.sender.send("getPlantTime-reply", TimeTask);
});

let newTimeTaskwin;
function newTimeTaskWin(userId) {
  newTimeTaskwin = new BrowserWindow({
    width: 500,
    height: 400,
    title: "新建",
    parent: win,
    // frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  });
  newTimeTaskwin.loadURL(winURL + "#/newTimeTaskWin");
  newTimeTaskwin.on("close", () => {
    // eslint-disable-next-line no-const-assign
    newTimeTaskwin = null;
  });
  ipcMain.on("closeNewTimeTask", () => {
    newTimeTaskwin.close();
  });
}

let newRewardWind;
function newRewardWin(userId) {
  newRewardWind = new BrowserWindow({
    width: 500,
    height: 400,
    title: "新建",
    parent: win,
    // frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  });
  newRewardWind.loadURL(winURL + "#/newRewardWin");
  newRewardWind.on("close", () => {
    // eslint-disable-next-line no-const-assign
    newRewardWind = null;
  });
  ipcMain.on("closeNewRewardWind", () => {
    newRewardWind.close();
  });
}

ipcMain.on("newTimingWin", (event, arg) => newTimingWin(arg));
ipcMain.on("newTimeTaskWin", (event, userId) => newTimeTaskWin(userId));

ipcMain.on("newRewardWin", (event, userId) => newRewardWin(userId));

ipcMain.handle("hello", () => {
  const notification = new Notification({
    title: "hhhhh"
  });
  notification.show();
  notification.on("click", () => {
    win.webContents.send("hello-click");
  });
});

function handleTimeIpc() {
  ipcMain.handle("work-notification", async function() {
    let res = await new Promise((resolve, reject) => {
      let notification = new Notification({
        title: "定时任务",
        body: "任务结束,是否重新开始"
      });
      notification.show();
      notification.on("click", () => {
        resolve("restart");
      });
      notification.on("close", () => {
        resolve("end");
      });
    });
    return res;
  });
}
//计时
handleTimeIpc();
