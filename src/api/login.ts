import request from "./request";
import qs from "qs";
import md5 from "js-md5";

type loginTable = {
  usernumber: string;
  password: string;
};

export const login = async (rs: loginTable) => {
  // console.log(rs);
  let res = await request({
    url: "/doLogin",
    method: "post",
    data: {
      uname: rs.usernumber,
      passwd: md5(rs.password).toUpperCase(),
    },
  });
  return res;
};

export const checkPermissions = (
  authorities: any[],
  authority: "ROLE_admin" | "ROLE_user" | "ROLE_repairman"
) => {
  for (let i = 0; i < authorities.length; i++) {
    if (authorities[i].authority === authority) {
      return true;
    }
  }
  return false;
};
