export interface menuListType {
  name: string;
  icon: string;
  path: string;
  label: string;
  id: string;
  haveChile: boolean;
  children?: menuListType[];
  disabled: boolean;
}

// 动态菜单
export let menuList: menuListType[] = [
  {
    name: "home",
    label: "首页",
    icon: "House",
    path: "home",
    id: "1",
    haveChile: false,
    disabled: false,
  },
  {
    name: "",
    label: "工单管理",
    icon: "Document",
    path: "",
    id: "2",
    haveChile: true,
    children: [
      {
        name: "reviewOrder",
        label: "待审核",
        icon: "DocumentAdd",
        path: "reviewOrder",
        id: "2-1",
        haveChile: false,
        disabled: false,
      },
      {
        name: "repairOrder",
        label: "待维修",
        icon: "DocumentRemove",
        path: "repairOrder",
        id: "2-2",
        haveChile: false,
        disabled: false,
      },
      {
        name: "completeOrder",
        label: "已完成",
        icon: "DocumentChecked",
        path: "completeOrder",
        id: "2-3",
        haveChile: false,
        disabled: false,
      },
      {
        name: "rejectOrder",
        label: "已驳回",
        icon: "DocumentDelete",
        path: "rejectOrder",
        id: "2-4",
        haveChile: false,
        disabled: false,
      },
    ],
    disabled: false,
  },
  {
    name: "",
    label: "用户管理",
    icon: "Postcard",
    path: "",
    id: "3",
    haveChile: true,
    children: [
      {
        name: "adminList",
        label: "管理员列表",
        icon: "Postcard",
        path: "adminList",
        id: "3-1",
        haveChile: false,
        disabled: false,
      },
      {
        name: "repairmanList",
        label: "维修员列表",
        icon: "Postcard",
        path: "repairmanList",
        id: "3-2",
        haveChile: false,
        disabled: false,
      },
      {
        name: "norUserList",
        label: "普通用户列表",
        icon: "Postcard",
        path: "norUserList",
        id: "3-3",
        haveChile: false,
        disabled: false,
      },
      {
        name: "addUser",
        label: "添加用户",
        icon: "Plus",
        path: "addUser",
        id: "3-4",
        haveChile: false,
        disabled: false,
      },
    ],
    disabled: false,
  },
  {
    name: "",
    label: "轮播图管理",
    icon: "Picture",
    path: "",
    id: "4",
    haveChile: true,
    children: [
      {
        name: "carouselList",
        label: "轮播图列表",
        icon: "Files",
        path: "carouselList",
        id: "4-1",
        haveChile: false,
        disabled: false,
      },
      {
        name: "carousel",
        label: "添加轮播图",
        icon: "plus",
        path: "carousel",
        id: "4-2",
        haveChile: false,
        disabled: false,
      },
    ],
    disabled: false,
  },
  {
    name: "",
    label: "公告管理",
    icon: "Bell",
    path: "",
    id: "5",
    haveChile: true,
    children: [
      {
        name: "noticeList",
        label: "公告列表",
        icon: "Bell",
        path: "noticeList",
        id: "5-1",
        haveChile: false,
        disabled: false,
      },
      {
        name: "addNotice",
        label: "添加公告",
        icon: "Plus",
        path: "addNotice",
        id: "5-2",
        haveChile: false,
        disabled: false,
      },
    ],
    disabled: false,
  },
  {
    name: "",
    label: "文章管理",
    icon: "Collection",
    path: "",
    id: "6",
    haveChile: true,
    children: [
      {
        name: "articleList",
        label: "文章列表",
        icon: "Collection",
        path: "articleList",
        id: "6-1",
        haveChile: false,
        disabled: false,
      },
      {
        name: "addArticle",
        label: "添加文章",
        icon: "Plus",
        path: "addArticle",
        id: "6-2",
        haveChile: false,
        disabled: false,
      },
    ],
    disabled: false,
  },
  {
    name: "",
    label: "选框管理",
    icon: "Refrigerator",
    path: "",
    id: "7",
    haveChile: true,
    children: [
      {
        name: "pickerTime",
        label: "上门时间段",
        icon: "Clock",
        path: "pickerTime",
        id: "7-1",
        haveChile: false,
        disabled: false,
      },
      {
        name: "addPickerTime",
        label: "添加上门时间段",
        icon: "Plus",
        path: "addPickerTime",
        id: "7-2",
        haveChile: false,
        disabled: false,
      },
      {
        name: "pickerLocation",
        label: "报修地点",
        icon: "Location",
        path: "pickerLocation",
        id: "7-3",
        haveChile: false,
        disabled: false,
      },
      {
        name: "addPickerLocation",
        label: "添加报修地点",
        icon: "Plus",
        path: "addPickerLocation",
        id: "7-4",
        haveChile: false,
        disabled: false,
      },
      {
        name: "pickerDes",
        label: "故障类型",
        icon: "PriceTag",
        path: "pickerDes",
        id: "7-5",
        haveChile: false,
        disabled: false,
      },
      {
        name: "addPickerDes",
        label: "添加故障类型",
        icon: "Plus",
        path: "addPickerDes",
        id: "7-6",
        haveChile: false,
        disabled: false,
      },
    ],
    disabled: false,
  },
  {
    name: "",
    label: "反馈管理",
    icon: "ChatLineSquare",
    path: "",
    id: "8",
    haveChile: true,
    children: [
      {
        name: "feedback",
        label: "反馈管理",
        icon: "ChatLineSquare",
        path: "feedback",
        id: "8-1",
        haveChile: false,
        disabled: false,
      },
    ],
    disabled: false,
  },
  {
    name: "",
    label: "系统设置",
    icon: "Help",
    path: "",
    id: "999",
    haveChile: false,
    disabled: true,
  },
];
