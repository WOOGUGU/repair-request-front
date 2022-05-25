import request from "./request";

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
