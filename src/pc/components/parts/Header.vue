<template>
<header name="header" id='header' data-am-widget="header" class="am-header am-header-default">
    <div class="am-container" id="page_header">
        <div class="am-g">
            <div class="am-u-sm-2 logo">
                 <a v-link="{ path: '/' }" >
                    <img src="http://static.guanghw.com/img/logo.png" width="140px" height="65px" style="margin-top: 8px;">
                </a>
            </div>
            <div class="am-u-sm-7 searchDiv">
                <form id="formSearch" action="/" v-on:submit.prevent="onSearch">
                    <div class="am-form-group ">
                        <input id="searchInput" type="search" class="am-form-field my_search" placeholder="请输入咨询的关键词" v-model="key">
                        <a id="searchIcon"><i class="iconfont searchIcon">&#xe616;</i></a>
                    </div>
                </form>
            </div>
            <div class="am-u-sm-2" id="control" style="margin-top: 30px;padding-right:7px">
                <div style="width: 90px;float: right">
                <a v-link="{path: '/msg'}" ><i class="iconfont" id="msgIcon">&#xe60e;</i></a>
                <a v-link="{path: '/control'}"  style="float: right"><i class="iconfont">&#xe601;</i></a>
                </div>
            </div>
        </div>
    </div>
</header>
</template>

<script>

export default {
    data () {
        return {
            key: '',
            name: 'header'
        }
    },
    methods: {
        onSearch: function(){
            var key = this.key.trim();
            if(!key){
                return;
            }
            var url = '/?key=' + key;
            console.log('search ' + url)
            this.$router.go(url);
        }
    }
}
</script>
