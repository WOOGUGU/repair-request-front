import request from "./request";
import qs from "qs";

export interface pickerDesParams {
    id?: number,
    picker?: string,
    pickerId?: number,
    type?: string,
    value?: string,
}

// 获取所有报修类型
export const selectPickerdes = () => {
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/picker/selectAllPickerDes",
        method: "get",
    });
    return res;
}

// 删除报修类型
export const deletePickerDes = (rs: pickerDesParams) => {
    console.log("deletePickerdes-rs", rs);
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/picker/deletePickerById",
        method: "post",
        params: rs,
    });
    return res;
}

// 新增报修类型
export const addPickerDes = (rs: pickerDesParams) => {
    console.log("addPickerdes-rs", rs);
    let res = request({
        headers: {
            "Content-Type": "application/json;",
        },
        url: "/v2/picker/addPicker",
        method: "post",
        params: rs,
    });
    return res;
}
