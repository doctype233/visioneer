import request from "@/utils/request";

const inspectionApi = {
    history:'/inspection/history',
    nodes:'/inspection/nodes',
    markers:'/inspection/markers'
}

export function getHistoryList() {
    return request({
        url: inspectionApi.history,
        method: 'get',
    })
}

export function getNodeList(params) {
    return request({
        url: `${inspectionApi.nodes}`,
        method: 'get',
        params
    })
}
export function getMarkerList(params) {
    return request({
        url: `${inspectionApi.markers}`,
        method: 'get',
        params
    })
}
