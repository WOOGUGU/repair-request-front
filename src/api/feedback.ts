import request from "./request";
import qs from "qs";

export interface feedbackParam {
    content?: string | undefined;
    feedbackId?: string | undefined;
    pageNum?: number | undefined;
    pageSize?: number | undefined;
    tel?: string | undefined;
    uid?: string | undefined;
}

// 获取反馈列表
export const selectFeedbackList = (rs?: feedbackParam) => {
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/feedback/selectFeedback",
        method: "get",
        params: rs,
    });
    return res;
}


