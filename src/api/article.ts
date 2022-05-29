import request from "./request";

export interface articleParam {
    id: number;
    createTime: string;
    updateTime: string;
    contentPath: string;
    author: string;
    displayStatus: number;
    title: string;
    des: string;
    coverPath: string;
}

// 获取文章列表
export const selectArticlelList = () => {
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/article/selectAllArticle",
        method: "get",
    });
    return res;
}