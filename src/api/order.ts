import request from "./request";

export interface orderParam {
  orderId?: number;
  position?: string;
  progress?: number;
  sender?: string;
  solver?: string;
  type?: string;
  username?: string;
}

// 万用查找
export const selectOrderList = (rs: orderParam) => {
  console.log("selectOrderList-rs", rs);
  let res = request({
    headers: {
      "Content-Type": "application/json;",
    },
    url: "/v2/order/selectOrder",
    method: "get",
    params: rs,
  });
  return res;
};

export interface adminDealOrder {
  orderId?: number;
  // -2：审核不通过，-1：用户取消，0：待审核，1：待处理，2：已处理
  progress?: [-2, -1, 0, 1, 2];
  // 备注（留言）
  remark?: string;
  // 处理者（维修员）
  solver?: string;
}
// 分配维修员
export const sendRepairman = (rs: adminDealOrder) => {
  console.log("sendRepairman-rs", rs);
  let res = request({
    headers: {
      "Content-Type": "application/json;",
    },
    url: "/v2/order/sendRepairman",
    method: "post",
    params: rs,
  });
  return res;
}