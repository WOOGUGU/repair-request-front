import request from "./request";

export interface noticeParam {
    id: number,
    createTime: string,
    announceTime: string,
    updateTime: string,
    content: string,
    author: string,
}

// 获取公告列表
export const selectNoticeList = () => {
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/notice/selectAllNotice",
        method: "get",
    });
    return res;
}