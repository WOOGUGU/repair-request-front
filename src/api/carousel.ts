import request from "./request";
import { mainStore } from "@/store";
import qs from "qs";

const store = mainStore();

// 轮播图
export interface carouselParam {
    id?: number;
    imgPath?: string;
    submitTime?: string;
    author?: string;
    pageNum?: number;
    pageSize?: number;
    slideId?: number;
}

// 获取轮播图列表
export const selectCarouselList = (rs?: carouselParam) => {
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/slide/selectAllSlide",
        method: "get",
        params: rs,
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

// 删除轮播图
export const deleteCarousel = (rs: any) => {
    // console.log("rs", rs);
    let res = request({
        url: "/v2/slide/deleteSlide",
        method: "post",
        data: qs.stringify(rs),
    });
    return res;
}
