<script>
    export default{
        name:'DcSidebar',
        props:{
            listsidebar: {type: Object, default: []},
            div_height: {type: Number, default: 800}
        },
        data(){
            return {
            }
        },
        mounted(){
        },
        computed:{
        },
        methods: {
            click_link_sidebar () {
                this.$emit('click_link')
                this.$store.commit('SET_TABS_IS_EDITING', false)
            }
        }
    }
</script>

<template>
        <div class="left" style="height: 100%;">
            <div class="item" v-for="sidebar in listsidebar">
                <a :href="sidebar.url" class="router-link-active" style="text-decoration: none;" @click="click_link_sidebar">
                    <div>
                        <span class="default_icon" :class="sidebar.icone"></span>
                        <span style="color: white;">{{ sidebar.titulo }}</span>
                    </div>
                </a>
            </div>
        </div>
</template>

<style>
    td, th {
        vertical-align: middle !important;
    }

    .left, .right {
        float:left;
        height:100vh;
    }

    .left {
        background: #337ab7;
        display: inline-block;
        white-space: nowrap;
        width: 50px;
        transition: width 1s ;
    }

    .right {
        background: #fff;
        width: 350px;
        transition: width 1s;
        border-style:solid;
        border-color:#ccc;
        border-width:1px;
    }

    .left:hover {
        width: 250px;
    }

    .item:hover {
        background-color:#ccc;
        cursor: pointer;
    }

    .left .default_icon {
        margin:15px;
        width:20px;
        color:#fff;
    }

    .item {
        height:50px;
        overflow:hidden;
        color:#fff;
    }

    .title {
        background-color:#eee;
        border-style:solid;
        border-color:#ccc;
        border-width:1px;
        box-sizing: border-box;
    }

    .search:hover {
        border-color:#4aa9fb;
        border-width:1px;
    }

    .search {
        padding:3px 8px 3px !important;
    }

    input[type=search] {
        padding: 10px 0px 10px;
        border: 0px solid #fff;
        background: #eee;
        -webkit-appearance: none;
        width:90%;
        float:none;
    }

    input[type=search]:focus {
        outline:none;
    }

    .type{
        height: 47px;;
    }

    .date{
        background-color:#f7f7f7
    }

    .docdate {
        vertical-align:bottom !important;
    }

    .distr {
        margin: 0 0 5px;
        font-size: 12px;
    }

    .ndoc {
        margin: 0 0 5px;
    }

    .storage {
        margin: 0;
        color: #aaa !important;
        font-size: 12px;
    }

    .main_container {
        border: 1px solid #E0E0E0;
        background-color:white;
        height: 800px;
    }

</style>
