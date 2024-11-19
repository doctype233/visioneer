<template>
    <div class="inspection-wrapper">
        <!-- <a-menu mode="inline" theme="dark" :inline-collapsed="true">
            <a-menu-item v-for="item in items" :key="item.key">
                <a-icon :type="item.icon" />
                <span>{{ item.title }}</span>
            </a-menu-item>
        </a-menu> -->
        <splitPane v-on:resize="resize" :default-percent="percent" split="vertical">
            <template slot="paneL">
                <div id="inspection">
                    <a-select class="my-select" :value="selectedView" style="width: 200px" @change="handleChange">
                        <a-select-option :value="item.nodeId" v-for="item in historyList" :key="item.nodeId">
                            <a-icon type="eye" /> {{ item.updatedAt }}
                        </a-select-option>
                    </a-select>
                </div>
            </template>

            <template slot="paneR" v-if="showPaneL">
                <SplitView :list="historyList" :selected="selectedView"></SplitView>
            </template>
        </splitPane>
        <a-button @click="splitView" type="link" ghost class="btn-bg btn-overflow"
            :style="showPaneL ? 'opacity:0.9' : 'opacity:0.5'" shape="circle" size="large">
            <icon-font type="icon-changjingfenzu" />
        </a-button>
    </div>
</template>

<script>
import splitPane from 'vue-splitpane'
import { Icon } from 'ant-design-vue'
import { Viewer } from '@photo-sphere-viewer/core'
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin'
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'
import { MapPlugin } from '@photo-sphere-viewer/map-plugin'
import { GalleryPlugin } from '@photo-sphere-viewer/gallery-plugin'
import SplitView from './splitView.vue'
import { getHistoryList, getMarkerList, getNodeList } from '@/api/inspection'

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_4747057_le5r8ziyju.js',
});
let viewer = null;
let viewer1 = null;
window.virtualTourPlugin = null;
window.virtualTourPlugin1 = null;
window.mappPlugin = null;
window.markersPlugin = null;

export default {
    name: 'inspection',
    components: { splitPane, IconFont, SplitView },
    data() {
        return {
            percent: 99,
            showPaneL: false,
            historyList: [],
            selectedView: null,
            items: [
                {
                    key: '1',
                    icon: 'pie-chart',
                    title: 'Option 1',
                },
                {
                    key: '2',
                    icon: 'pie-chart',
                    title: 'Option 2',
                },
                {
                    key: '3',
                    icon: 'pie-chart',
                    title: 'Option 3',
                }
            ],
            baseUrl: 'https://photo-sphere-viewer-data.netlify.app/assets/',
            nodes: [],
            currentNode: null,
            markers: []
        }
    },
    mounted() {
        this.getProjects(true);

    },
    methods: {
        getProjects(first) {
            getHistoryList().then(res => {
                this.historyList = res.result && res.result.data;
                this.selectedView = this.historyList[0].nodeId;
                this.getNodes(first)
            })
        },
        getNodes(first) {
            getNodeList({ id: this.selectedView }).then(res => {
                this.nodes = res.result && res.result.data;
                this.currentNode = this.nodes[0].id;
                first ? this.initView() : this.updateView()
            })
        },
        getMarkers() {
            getMarkerList({ nodeId: this.selectedView, id: this.currentNode }).then(res => {
                this.markers = res.result && res.result.data.markers;
                console.log(this.markers, 'this.markers');
                this.markers.forEach(item => {
                    console.log(item, 'itemmmm')
                    window.markersPlugin.addMarker({
                        ...item, tooltip: {
                            content: '清洗饮水机',
                            className: 'custom-tooltip',
                            position: 'top',
                            trigger: 'click',
                        },
                    })
                })
            })
        },
        initView() {
            viewer = new Viewer({
                container: 'inspection',
                // defaultYaw: 0.7,
                // defaultPitch: -0.03,
                defaultZoomLvl: 4,
                // loadingImg: baseUrl + 'loader.gif',
                touchmoveTwoFingers: true,
                mousewheelCtrlKey: true,
                plugins: [
                    [MarkersPlugin, {}],
                    [MapPlugin, {
                        center: { x: 1800, y: 1000 },
                        shape: 'square',
                        position: 'top left',
                        defaultZoom: 10,
                        minZoom: 10,
                        rotation: '180deg',
                    }],
                    [GalleryPlugin, {
                        thumbnailSize: { width: 100, height: 100 },
                    }],
                    [VirtualTourPlugin, {
                        positionMode: 'manual',
                        renderMode: '3d',
                        nodes: this.nodes,
                        startNodeId: '1',
                        map: {
                            imageUrl: '/assets/background.png'
                        }
                    }],
                ]
            })
            window.virtualTourPlugin = viewer.getPlugin(VirtualTourPlugin)
            window.mappPlugin = viewer.getPlugin(MapPlugin)
            window.markersPlugin = viewer.getPlugin(MarkersPlugin);

            viewer.addEventListener('ready', () => {
                console.log(`viewer is ready`, this.markers);
                this.getMarkers()
            }, { once: true });
            viewer.addEventListener('position-updated', ({ position }) => {
               
               if(this.showPaneL){
                viewer1.rotate(position);
               }
            });
        },
        updateView() {
            window.virtualTourPlugin.updateNode({
                id: '1',
                panorama: '/assets/sphere' + this.selectedView + '-1.jpg',
                thumbnail: '/assets/thumbnail_' + this.selectedView + '-1.jpg',
            });
        },
        resize() { },
        handleChange(value) {
            this.selectedView = value;
            this.getNodes()
        },
        splitView() {
            if (this.showPaneL) {
                this.showPaneL = false;
                this.percent = 99;
                return;
            }
            this.percent = 50;
            this.showPaneL = true;
            setTimeout(() => {
                viewer1 = new Viewer({
                    container: 'inspection1',
                    defaultYaw: 0.7,
                    defaultPitch: -0.03,
                    defaultZoomLvl: 4,
                    // loadingImg: baseUrl + 'loader.gif',
                    touchmoveTwoFingers: true,
                    mousewheelCtrlKey: true,
                    plugins: [

                        [GalleryPlugin, {
                            thumbnailSize: { width: 100, height: 100 },
                        }],
                        [VirtualTourPlugin, {
                            positionMode: 'manual',
                            renderMode: '3d',
                            nodes: this.nodes,
                            startNodeId: '1',
                        }]
                    ]
                });
                window.virtualTourPlugin1 = viewer1.getPlugin(VirtualTourPlugin)
            }, 500);
        }
    }
}
</script>

<style lang="less" scoped>
@import '/node_modules/@photo-sphere-viewer/core/index.css';
@import '/node_modules/@photo-sphere-viewer/markers-plugin/index.css';
@import '/node_modules/@photo-sphere-viewer/virtual-tour-plugin/index.css';
@import '/node_modules/@photo-sphere-viewer/gallery-plugin/index.css';
@import '/node_modules/@photo-sphere-viewer/map-plugin/index.css';

.inspection-wrapper {
    display: flex;
    height: calc(100vh - 64px);

    .vue-splitter-container {
        flex: 1;
    }

    .btn-overflow {
        position: absolute;
        right: 50px;
        top: 50px;
    }

    .btn-bg {
        background-color: rgb(75, 79, 84) !important;
        opacity: 0.5;

        &:hover {
            opacity: 0.9;
        }
    }

    .my-select {
        position: absolute;
        left: 50%;
        top: 0;
        z-index: 1;
        margin-left: -100px;

        .ant-select-selection {
            border-color: white !important;
        }
    }
}

#inspection,
#inspection1 {
    width: 100%;
    height: calc(100vh - 64px);


}
</style>
