import request from "./request";

export const reviewOrderList = async () => {
  var res = await request({
    url: "/administer/orderlist",
    method: "get",
  });
  return res;
};
