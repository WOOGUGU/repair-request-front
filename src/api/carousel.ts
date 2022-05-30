import request from "./request";
import { mainStore } from "@/store";
const store = mainStore();

// 轮播图
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

// 添加轮播图
export const uploadCarousel = (rs: any) => {
    rs.append("author", store.userName);
    console.log("rs.author", rs.get("author"));
    console.log("rs.fileStreams", rs.get("fileStreams"));
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/slide/uploadStreamSlide",
        method: "post",
        data: rs,
    });
    return res;
}
