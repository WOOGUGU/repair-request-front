import request from "./request";

export interface carousel {
    id: number;
    imgPath: string;
    submitTime: string;
    author: string;
};

// 获取轮播图列表
export const selectCarouselList = () => {
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/slide/selectAllSlide",
        method: "get",
    });
    return res;
}
