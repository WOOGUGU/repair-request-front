import request from './request';
import qs from 'qs'

export interface pickerTimeParams {
    id?: string;
    picker?: string;
    pickerId?: number;
    type?: string;
    value?: string;
}

// 获取报修时间段
export const selectPickerTime = () => {
    return request({
        url: '/v2/picker/selectAllPickerTime',
        method: 'get',
    })
}

// 添加报修时间段
export const addPickerTime = (params: pickerTimeParams) => {
    // console.log("params", params);
    return request({
        url: '/v2/picker/addPicker',
        method: 'post',
        data: qs.stringify(params)
    })
}

// 删除报修时间段
export const deletePickerTime = (params: pickerTimeParams) => {
    return request({
        url: '/v2/picker/deletePickerById',
        method: 'post',
        data: qs.stringify(params)
    })
}
