import request from "./request";
import md5 from "js-md5";

// 登出接口
export const logout = () => {
    let res = request({
        url: "/doLogout",
        method: "get",
    });
    return res;
}
