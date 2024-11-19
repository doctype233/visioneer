<template>
    <div id="inspection1">
        <a-select class="my-select" :value="selectedView" style="width: 200px" @change="handleChange">
            <a-select-option :value="item.nodeId" v-for="item in list" :key="item.nodeId">
                <a-icon type="eye" /> {{ item.updatedAt }}
            </a-select-option>
        </a-select>
    </div>
</template>

<script>
import { getNodeList } from '@/api/inspection';

export default {
    name: 'splitView',
    props: {
        list: {
            type: Array,
            required: true
        },
        selected: {
            type: Number,
            required: true
        },
    },
    data() {
        return {
            selectedView: this.selected,
            nodes: []
        }
    },
    methods: {
        handleChange(value) {
            this.selectedView = value;
            this.getNodes()
        },
        getNodes(d) {
            getNodeList({ id: d || this.selectedView }).then(res => {
                this.nodes = res.result && res.result.data;
                this.updateView()
            })
        },
        updateView() {
            window.virtualTourPlugin1.updateNode({
                id: '1',
                panorama:'/assets/sphere'+this.selectedView+'-1.jpg',
                thumbnail: '/assets/thumbnail_'+this.selectedView+'-1.jpg',
            });
        }
    }
}
</script>

<style lang="less" scoped>
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
</style>