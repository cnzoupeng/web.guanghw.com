<template>
<footer id='footer' data-am-widget="footer" class="am-footer am-footer-default" data-am-footer="{}">
    <div class="am-container">
        <div class="am-footer-switch">
            <a v-link="{ path: '/' }" class="am-footer-desktop">首页</a>
            <span class="am-footer-divider"> | </span>
            <a v-link="{ path: '/about' }" class="am-footer-desktop">关于我们</a>
            <span class="am-footer-divider"> | </span>
            <a v-link="{ path: '/contact' }" class="am-footer-desktop">联系我们</a>
            <img src="http://static.guanghw.com/img/wx_logo.jpg" width="80px" height="80px" style="margin-top: -2px;float: right;margin-right:10px">
        </div>
        <div class="am-footer-miscs ">
            <p>CopyRight©2015 深圳市光合网络科技有限公司.</p>
            <p><a href="http://www.miitbeian.gov.cn/" style="color:rgb(153, 153, 153);">粤ICP备13025787号</a></p>
        </div>
    </div>
</footer>
</template>

<script>

export default {
}
</script>
