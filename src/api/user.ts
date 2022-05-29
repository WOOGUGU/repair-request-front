import request from "./request";

// 人员通用格式
export interface userParam {
    id: number,
    username: string,
    name: string,
    tel: string,
    password?: null,
    roles?: any[],
    // 修改时等级格式
    roleTypes?: string[],
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
    console.log("rs", rs);
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
