import request from "./request";

// 待处理
export const reviewOrderList = async () => {
  var res = await request({
    url: "/administer/orderlist",
    method: "get",
  });
  return res;
};

// 待维修
export const repairOrderList = async () => {
  var res = await request({
    url: "/administer/orderlist2",
    method: "get",
  });
  return res;
};

// 已完成
export const completeOrderList = async () => {
  var res = await request({
    url: "/administer/orderlist3",
    method: "get",
  });
  return res;
};
