import request from "./request";
import md5 from "js-md5";
import qs from "qs";

// 人员通用格式
export interface userParam {
    id?: number,
    username?: string,
    name?: string,
    tel?: string,
    password?: string,
    roles?: any[],
    pageNum?: number,
    pageSize?: number,
    roleTypes?: string[],
    userId?: number,
}

// 查找管理员列表
export const selectAdminList = (rs?: userParam) => {
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/user/selectAllAdmin",
        method: "get",
        params: rs,
    });
    return res;
};

// 查找维修员列表
export const selectRepairmanList = (rs?: userParam) => {
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/user/selectAllRepairman",
        method: "get",
        params: rs,
    });
    return res;
};

// 查找普通用户列表
export const selectNorUserList = (rs?: userParam) => {
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/user/selectAllNorUser",
        method: "get",
        params: rs,
    });
    return res;
}

// 通过id查找用户 
export const selectUserById = (id: number) => {
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/user/selectUserById",
        method: "get",
        params: {
            userId: id,
        },
    });
    return res;
}

// 修改用户
export const updateUser = (rs: userParam) => {
    // console.log("rs", rs);
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/user/updateUser",
        method: "post",
        data: rs,
    });
    return res;
}

// 添加用户
export const addUser = (rs: any) => {
    // 对密码加密
    rs.password = md5(rs.password1 as string).toUpperCase();
    // console.log("rs", rs);
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/user/addUser",
        method: "post",
        data: rs,
    });
    return res;
}

// 删除用户
export const deleteUser = (rs: userParam) => {
    // console.log("rs", rs);
    let res = request({
        url: "/v2/user/deleteUser",
        method: "post",
        data: qs.stringify(rs),
    });
    return res;
}
