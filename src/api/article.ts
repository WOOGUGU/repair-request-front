import request from "./request";
import qs from "qs";

export interface articleParam {
    id?: number;
    createTime?: string;
    updateTime?: string;
    contentPath?: string;
    author?: string;
    displayStatus?: number;
    title?: string;
    des?: string;
    coverPath?: string;
    pageNum?: number;
    pageSize?: number;
    articleId?: number;
}

// 获取文章列表
export const selectArticlelList = (rs?: articleParam) => {
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/article/selectAllArticle",
        method: "get",
        params: rs,
    });
    return res;
}

// 通过id获取文章
export const selectArticleById = (rs: articleParam) => {
    console.log("rs", rs);
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/article/selectArticleById",
        method: "get",
        params: rs,
    });
    return res;
}

// 修改文章
export const updateArticle = (rs: articleParam) => {
    console.log("rs", rs);
    let res = request({
        url: "/v2/article/updateArticle",
        method: "post",
        data: qs.stringify(rs),
    });
    return res;
}

// 新增文章
export const addArticle = (rs: articleParam) => {
    console.log("rs", rs);
    let res = request({
        url: "/v2/article/addArticle",
        method: "post",
        data: qs.stringify(rs),
    });
    return res;
}

// 删除文章
export const deleteArticle = (rs: articleParam) => {
    console.log("rs", rs);
    let res = request({
        url: "/v2/article/deleteArticle",
        method: "post",
        data: qs.stringify(rs),
    });
    return res;
}
