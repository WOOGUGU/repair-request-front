import request from "./request";
import qs from "qs";

export interface noticeParam {
    id?: number,
    createTime?: string,
    announceTime?: string,
    updateTime?: string,
    content?: string,
    author?: string,
    displayStatus?: number,
    pageNum?: number,
    pageSize?: number,
    noticeId?: number,
}

// 获取公告列表
export const selectNoticeList = (rs?: noticeParam) => {
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/notice/selectAllNotice",
        method: "get",
        params: rs,
    });
    return res;
}

// 通过id获取公告
export const selectNoticeById = (rs: any) => {
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/notice/selectNotice",
        method: "get",
        params: rs,
    });
    return res;
}

// 修改公告
export const updateNotice = (rs: any) => {
    // console.log("rs", rs);
    let res = request({
        url: "/v2/notice/updateNotice",
        method: "post",
        data: qs.stringify(rs),
    });
    return res;
}

// 新增公告
export const addNotice = (rs: any) => {
    // console.log("rs", rs);
    let res = request({
        url: "/v2/notice/addNotice",
        method: "post",
        data: qs.stringify(rs),
    });
    return res;
}

// 删除公告
export const deleteNotice = (rs: any) => {
    // console.log("rs", rs);
    let res = request({
        url: "/v2/notice/deleteNotice",
        method: "post",
        data: qs.stringify(rs),
    });
    return res;
}
