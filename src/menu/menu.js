
module.exports = [
  {
    name: "定时任务",
    id: "Timetask",
    sub: [
      {
        name: "学习",
        componentName: "TimeLearn"
      },
      {
        name: "娱乐",
        componentName: "TimePlay"
      }
    ]
  },
  {
    name: "普通任务",
    id: "normalTask",
    sub: [
      {
        name: "学习",
        componentName: "CommonLearn"
      },
      {
        name: "娱乐",
        componentName: "FormCheckbox"
      }
    ]
  },
  {
    name: "成就",
    id: "achievement",
    sub: [
      {
        name: "完成情况",
        componentName: "Completion"
      },
      {
        name: "奖品",
        componentName: "ReWard"
      }
    ]
  }
];
