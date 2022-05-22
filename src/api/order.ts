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

export const selectOrderList = async (rs: orderParam) => {
  console.log("rs:", rs);
  let res = await request({
    headers: {
      "Content-Type": "application/json;",
    },
    url: "/v2/order/selectOrder",
    method: "get",
    params: rs,
  });
  return res;
};
