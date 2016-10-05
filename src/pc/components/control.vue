<template>
<header id="header" data-am-widget="header" class="am-header am-header-default">
    <div class="am-container" id="page_header">
        <div class="am-g">
            <div class="am-u-sm-2 logo">
                <a v-link="{ path: '/' }">
                    <img src="http://static.guanghw.com/img/logo.png" width="140px" height="65px" style="margin-top: 8px;">
                </a>
            </div>
            <div class="am-u-sm-6 title_control">
                <h2 class="am-intro-title">资料编辑</h2>
            </div>
            <div class="am-u-sm-1" id="control" style="float:right;margin-top: 30px;padding: 0;">
                <a v-link="{path: '/control'}" style="float: right"><i class="iconfont">&#xe601;</i></a>
            </div>
        </div>
    </div>
</header>

<div id="container" class="container am-container">
    <div id="page_control">
        <div class="am-g firstLine" style="padding: 10px">
            <div style="position: relative">
                <p style="position: absolute;left: 150px;top: 40px;font-size: 150%;">{{user.name}}</p>
                <div class="contrlHeader" :style="{backgroundImage: 'url(' + user.avatar + ')'}"></div>
            </div>
        </div>

        <div class="am-g control_line" style="margin-top: 20px">
            <div class="control_left"><i class="iconfont">&#xe623;</i></div>
            <div class="control_right"><a v-link="{ path: '/edit' }">资料编辑</a></div>
        </div>

        <div class="am-g control_line" style="margin-top: 2px">
            <div class="control_left"><i class="iconfont">&#xe625;</i></div>
            <div class="control_right"><a v-link=user.url>简介预览</a></div>
        </div>

        <div class="am-g control_line" style="margin-top: 2px">
            <div class="control_left"><i class="iconfont">&#xe60a;</i></div>
            <div class="control_right"><a v-link="{ path: '/favori' }">我的收藏</a></div>
        </div>

        <div class="am-g control_line" style="margin-top: 2px">
            <div class="control_left"><i class="iconfont">&#xe622;</i></div>
            <div class="control_right"><a v-link="{ path: '/msg' }">私信收发</a>
                <strong v-if=user.newMsg class="msgCount">{{newMsg}}</strong>
            </div>
        </div>

    </div>
</div>
<xfooter></xfooter>
</template>

<script>
import xheader from './parts/Header.vue'
import xfooter from './parts/Footer.vue'


export default {
    components: {xheader, xfooter},
    data: function () {
        return {
            user: {url: '#'}
        }
    },
    ready: function () {
        setContainerMinHeight();
        var uid = sessionStorage.getItem('uid');
        this.$http.get(apiUrl + '/user/info/' + uid).then(function (res) {
            console.log(res.body)
            res.body.data.url = '/provider/' + uid;
            this.$set('user', res.body.data)

        }, function (res) {
            console.log(res)
        })
    }
}

</script>