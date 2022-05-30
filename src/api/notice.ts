import request from "./request";

export interface noticeParam {
    id?: number,
    createTime?: string,
    announceTime?: string,
    updateTime?: string,
    content?: string,
    author?: string,
    pageNum?: number;
    pageSize?: number;
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