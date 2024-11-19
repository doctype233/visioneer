import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const history = () => {
    return builder({
        'data': [{
            id: 1,
            nodeId: 11,
            updatedAt: '2024-07-26 10:40'
        },
        {
            id: 2,
            nodeId: 12,
            updatedAt: '2023-08-22 13:30'
        },
        {
            id: 3,
            nodeId: 13,
            updatedAt: '2022-09-16 10:00'
        }
        ],

    })
}

const nodes = (options) => {
    const queryParameters = getQueryParameters(options);
    let map = {
        11: [{
            id: '1',
            panorama: '/assets/sphere11-1.jpg',
            // sphereCorrection: { pan: '-30deg' },
            name: 'One',
            thumbnail: '/assets/thumbnail_11-1.jpg',
            map: { x: 1800, y: 1000, color: 'green' },
            links: [{ nodeId: '2', position: { textureX: 2519, textureY: 1038 } }],
        }, {
            id: '2',
            panorama: '/assets/sphere2.jpg',
            thumbnail: '/assets/thumbnail2.jpg',
            name: 'Two',
            map: { x: 800, y: 1000, color: 'green' },
            // sphereCorrection: { pan: '-90deg' }, 
            links: [{ nodeId: '1', position: { textureX: 1811, textureY: 1365 } }, { nodeId: '3', position: { textureX: 2500, textureY: 1365 } }, { nodeId: '4', position: { textureX: 3011, textureY: 1365 } }],
        }, {
            id: '3',
            panorama: '/assets/sphere_conference1.jpg',
            thumbnail: '/assets/thumbnail_c1.jpg',
            name: 'Three',
            map: { x: 1000, y: 1600, color: 'green' },
            // sphereCorrection: { pan: '-90deg' },
            links: [{ nodeId: '2', position: { textureX: 2011, textureY: 1365 } }]
        }, {
            id: '4',
            panorama: '/assets/sphere_conference2.jpg',
            thumbnail: '/assets/thumbnail_c2.jpg',
            name: 'Four',
            map: { x: 600, y: 1600, color: 'green' },

            // sphereCorrection: { pan: '140deg' },
            links: [{ nodeId: '2', position: { textureX: 2011, textureY: 1365 } }]

        }],
        12: [{
            id: '1',
            panorama: '/assets/sphere12-1.jpg',
            sphereCorrection: { pan: '-30deg' },
            name: 'One',
            thumbnail: '/assets/thumbnail_12-1.jpg',
            links: [{ nodeId: '2', position: { textureX: 2519, textureY: 1038 } }],
        }, {
            id: '2',
            panorama: '/assets/sphere2.jpg',
            thumbnail: '/assets/thumbnail2.jpg',
            name: 'Two',
            sphereCorrection: { pan: '-90deg' }, //tour后画面的视角
            links: [{ nodeId: '1', position: { textureX: 1811, textureY: 1365 } }, { nodeId: '3', position: { textureX: 2500, textureY: 1365 } }, { nodeId: '4', position: { textureX: 3011, textureY: 1365 } }],
        }, {
            id: '3',
            panorama: '/assets/sphere_conference1.jpg',
            thumbnail: '/assets/thumbnail_c1.jpg',
            name: 'Three',
            sphereCorrection: { pan: '-90deg' },
            links: [{ nodeId: '2', position: { textureX: 2011, textureY: 1365 } }]
        }, {
            id: '4',
            panorama: '/assets/sphere_conference2.jpg',
            thumbnail: '/assets/thumbnail_c2.jpg',
            name: 'Four',
            sphereCorrection: { pan: '140deg' },
            links: [{ nodeId: '2', position: { textureX: 2011, textureY: 1365 } }]

        }],
        13: [{
            id: '1',
            panorama: '/assets/sphere13-1.jpg',
            sphereCorrection: { pan: '-30deg' },
            name: 'One',
            thumbnail: '/assets/thumbnail_13-1.jpg',
            links: [{ nodeId: '2', position: { textureX: 2519, textureY: 1038 } }],
        }, {
            id: '2',
            panorama: '/assets/sphere2.jpg',
            thumbnail: '/assets/thumbnail2.jpg',
            name: 'Two',
            sphereCorrection: { pan: '-90deg' }, //tour后画面的视角
            links: [{ nodeId: '1', position: { textureX: 1811, textureY: 1365 } }, { nodeId: '3', position: { textureX: 2500, textureY: 1365 } }, { nodeId: '4', position: { textureX: 3011, textureY: 1365 } }],
        }, {
            id: '3',
            panorama: '/assets/sphere_conference1.jpg',
            thumbnail: '/assets/thumbnail_c1.jpg',
            name: 'Three',
            sphereCorrection: { pan: '-90deg' },
            links: [{ nodeId: '2', position: { textureX: 2011, textureY: 1365 } }]
        }, {
            id: '4',
            panorama: '/assets/sphere_conference2.jpg',
            thumbnail: '/assets/thumbnail_c2.jpg',
            name: 'Four',
            sphereCorrection: { pan: '140deg' },
            links: [{ nodeId: '2', position: { textureX: 2011, textureY: 1365 } }]

        }]
    }
    return builder({
        'data': map[queryParameters.id]
    })
}
const markers = (options) => {
    const queryParameters = getQueryParameters(options);
    let map = {
        11: {
            '1': {

                markers: [{
                    id: '11-1-1',
                    imageLayer:'/assets/map_marker.png',
                    size: { width: 80, height: 80 },
                    position: { yaw: '45deg', pitch: '-15deg' },
                }]
            },
            '2':
            {
                markers: [{
                    id: '11-2-1',
                    imageLayer:'/assets/map_marker.png',
                    size: { width: 32, height: 32 },
                    position: { yaw: '45deg', pitch: '0deg' },
                }]
            }

        },
        12: {
            '1': {

                markers: [{
                    imageLayer:'/assets/map_marker.png',
                    id: '12-1-1',
                    size: { width: 32, height: 32 },
                    position: { yaw: '45deg', pitch: '0deg' },
                }]
            },
            '2':
            {
                markers: [{
                    imageLayer:'/assets/map_marker.png',
                    id: '12-2-1',
                    size: { width: 32, height: 32 },
                    position: { yaw: '45deg', pitch: '0deg' },
                }]
            }

        }
    }
    return builder({
        'data': map[queryParameters.nodeId][queryParameters.id]
    })
}
Mock.mock(/\/inspection\/history/, 'get', history)
Mock.mock(/\/inspection\/nodes/, 'get', nodes)
Mock.mock(/\/inspection\/markers/, 'get', markers)
