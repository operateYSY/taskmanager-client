import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import menu from "@/menu/menu";
import timeCompletion from "@/components/timing/timeCompletion";

Vue.use(VueRouter);

const routes = [
  {
    path: "/timing",
    name: "timing",
    component: () => import("../components/timing/timing.vue"),
    meta: {
      keepAlive: false //导航栏在该页面不予显示
    }
  },
  {
    path: "/newTimeTaskWin",
    name: "newTimeTaskWin",
    component: () => import("../components/timing/newTimeTask.vue"),
    meta: {
      keepAlive: false //导航栏在该页面不予显示
    }
  },
  {
    path: "/newRewardWin",
    name: "newRewardWin",
    component: () => import("../components/reward/NewRewardWin.vue"),
    meta: {
      keepAlive: false //导航栏在该页面不予显示
    }
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../components/login/login.vue"),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/login/login.vue"),
    meta: {
      keepAlive: true
    }
  }
  // {
  //   path: "/Completion",
  //   name: "Completion",
  //   meta: { requireAuth: true, keepAlive: true },
  //   component: {
  //     default: () => import("../components/Completion.vue"),
  //     completion_view: () => import("../components/Completion.vue")
  //   }
  // }
];

menu.forEach(item => {
  console.log(menu);
  item.sub.forEach(sub => {
    // if (sub.children) {
    //   sub.children.forEach(children => {
    //     children.component = () =>
    //       import(`@/components/timing/${children.component}`);
    //   });
    // }
    routes.push({
      path: `/${sub.componentName}`,
      name: sub.componentName,
      meta: { requireAuth: true, keepAlive: true },
      component: () => import(`@/components/${sub.componentName}`),
    });
  });
});

const router = new VueRouter({
  routes
});

export default router;
