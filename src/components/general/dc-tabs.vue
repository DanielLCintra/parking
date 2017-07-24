<script>

    export default{
        name:'DcTabs',
        props:{
            list_tabs: {type: Array|Object, default: []},
            title_head_tabs : {type: String, default: 'Home'},
        },
        data(){
            return{
                active: '',
            }
        },
        methods:{
            setActive(val){
                this.active = val
            }
        },
        mounted(){
            this.$bus.$on('set-active', obj => {
                this.active = obj.active
            })
        }
    }

</script>

<template>
    <div>
        <div class="table-responsive" >
            <h3 class="span12"> {{ title_head_tabs }} </h3><hr>
            <div class="row">
                <div class="col-md-12" style="height: 691px;">
                    <div class="panel with-nav-tabs panel-default">
                        <div class="panel-heading">
                            <ul class="nav nav-tabs">
                                <li v-for="tabs in list_tabs" :class="{active: active == tabs.tab_name}" @click="setActive(tabs.tab_name)">
                                    <router-link :to="tabs.url_to">
                                        {{ tabs.descricao_tab }}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                        <div class="panel-body" style="border: 1px solid #E0E0E0;text-align: left;">
                            <router-view></router-view>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

    body {
        font-family: sans-serif;
        margin: 42px;
    }

    .badge{
        cursor: pointer;
    }

    .tooltip {
      display: none;
      opacity: 0;
      transition: opacity .15s;
      pointer-events: none;
      padding: 4px;
      z-index: 10000;
      text-align: center;

    }

    .tooltip .tooltip-content {
        background: black;
        color: white;
        border-radius: 16px;
        padding: 5px 10px 4px;
    }

    .tooltip.tooltip-open-transitionend {
        display: block;
    }

    .tooltip.tooltip-after-open {
        opacity: 1;
    }

</style>