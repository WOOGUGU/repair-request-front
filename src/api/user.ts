import request from "./request";

// 人员通用格式
export interface userParam {
    id: number,
    name: string,
    password: null,
    roles: string[],
    tel: string,
    username: string,
}

// 查找管理员列表
export const selectAdminList = () => {
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/user/selectAllAdmin",
        method: "get",
    });
    return res;
};

// 查找维修员列表
export const selectRepairmanList = () => {
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/user/selectAllRepairman",
        method: "get",
    });
    return res;
};

// 查找普通用户列表
export const selectNorUserList = () => {
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/user/selectAllNorUser",
        method: "get",
    });
    return res;
}
