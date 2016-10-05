<template>
<footer id='footer' data-am-widget="footer" class="am-footer am-footer-default" data-am-footer="{}">
    <div class="am-container">
        <div class="am-footer-switch">
            <a id="godesktop" class="am-footer-desktop" v-link="{ path: '/' }">首页</a>
            <span class="am-footer-divider"> | </span>
            <a id="godesktop" class="am-footer-desktop" v-link="{ path: '/about' }">关于我们</a>
            <span class="am-footer-divider"> | </span>
            <a id="godesktop" class="am-footer-desktop" v-link="{ path: '/contact' }">联系我们</a>
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
