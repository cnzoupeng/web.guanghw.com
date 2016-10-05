<template>
<header id="header" data-am-widget="header" class="am-header am-header-default"
        style="background-color:rgba(0, 0, 0, 0.59)">
    <div class="am-container" id="page_header">
        <div style="width: 100%;margin:0 auto">
            <div class="header-x-icon">
                <!--<a href="/" class="am-header-icon am-icon-home"></a>-->
                <a v-link="'/'"><i class="iconfont">&#xe612;</i></a>
            </div>
            <div class="header-x-search">
                <form id="formSearch" action="/" v-on:submit.prevent="updateData()">
                    <div class="am-form-group ">
                        <input id="searchInput" type="search" class="am-form-field my_search" placeholder="请输入咨询的关键词" v-model="key">
                        <a id="searchIcon"  v-on:click="updateData()"><i class="iconfont searchIcon">&#xe616;</i></a>
                    </div>
                </form>
            </div>
            <div class="header-x-msg">
                <a v-link="{path: '/msg'}"><i class="iconfont">&#xe60e;</i></a>
            </div>
            <div class="header-x-user">
                <a v-link="{path: '/control'}"><i class="iconfont">&#xe601;</i></a>
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
