<template>
<xheader></xheader>
<div id="container" class="container am-container">
    <div id="page_about" style="margin-top: 20px">
        <h1>关于我们</h1>
        <p>亲，欢迎您的到来！~</p>
        <p>光合网：免费咨询平台！ （www.gunaghw.com）</p>
        <p>点击网站右上方的“个人中心”，轻松发布您的介绍，结交各专业领域朋友，私信沟通达成合作。。</p>
        <p>“光合网”2015年创立于深圳，团队由资深产品、研发和运营组成。</p>
        <p>网站对用户信息进行审核后发布。您可以关注我们的微信公众号“光合书友会”，如果有任何问题、意见或建议，都可以微信留言，我们将及时回复和处理。</p>
        <img src="http://static.guanghw.com/img/wx_logo.jpg" width="240px" height="240px">
    </div>
</div>
<xfooter></xfooter>
</template>

<script>
import xheader from './parts/Header.vue'
import xfooter from './parts/Footer.vue'

export default {
  components: {xheader, xfooter},
  ready: function () {
    setContainerMinHeight()
  }
}

</script>