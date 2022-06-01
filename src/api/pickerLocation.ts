import request from './request'
import qs from 'qs'

export interface pickerLocationParams {
    id?: string;
    area?: string;
    position?: string;
    pageNum?: number;
    pageSize?: number;
    pickerId?: string;
}

// 获取报修位置列表
export const selectPickerLocation = (rs: pickerLocationParams) => {
    return request({
        url: '/v2/picker/selectLocationForBackend',
        method: 'get',
        params: qs.stringify(rs)
    })
}

// 添加报修位置
export const addPickerLocation = (rs: pickerLocationParams) => {
    return request({
        url: '/v2/picker/addPickerLocation',
        method: 'post',
        data: qs.stringify(rs)
    })
}

// 删除报修位置
export const deletePickerLocation = (rs: pickerLocationParams) => {
    return request({
        url: '/v2/picker/deletePickerLocation',
        method: 'post',
        data: qs.stringify(rs)
    })
}
