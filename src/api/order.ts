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
  // 0待审核,1待处理,2已处理,3用户取消,4审核不通过
  progress?: 0 | 1 | 2 | 3 | 4;
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

// 驳回工单
export const checkOrder = (rs: adminDealOrder) => {
  rs.progress = 4;
  console.log("checkOrder-rs", rs);
  let res = request({
    headers: {
      "Content-Type": "application/json;",
    },
    url: "/v2/order/checkOrder",
    method: "post",
    params: rs,
  });
  return res;
}