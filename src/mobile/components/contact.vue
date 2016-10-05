<template>
<xheader></xheader>
<div id="container" class="container am-container">
    <div id="page_contanct" style="margin-top: 20px">
        <h1>联系我们</h1>

        <p > <strong>如果您有以下问题</strong></p>
        <p >1、想在网站上发布信息</p>
        <p >2、想通过我们了解想咨询的人</p>
        <p >3、发现发布的用户信息失真</p>

        <p ><strong>您可以通过以下方式联系我们：</strong></p>
        <p >1、微信公众号留言</p>
        <p >2、请联系管理员微信：songan001</p>
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