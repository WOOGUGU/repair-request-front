import request from "./request";
import qs from "qs";

type loginTable = {
  usernumber: string;
  password: string;
};

export const administerLogin = async (rs: loginTable) => {
  // console.log(rs);
  var res = await request({
    url: "/login/administer",
    method: "post",
    data: qs.stringify({
      jobnumber: rs.usernumber,
      passport: rs.password,
    }),
  });
  return res;
};
