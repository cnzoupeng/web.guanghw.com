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
                <form id="formSearch" action="/" v-on:submit.prevent="updateData()">
                    <div class="am-form-group ">
                        <input id="searchInput" type="search" class="am-form-field my_search" placeholder="请输入咨询的关键词" v-model="key">
                        <a id="searchIcon" v-on:click="updateData()"><i class="iconfont searchIcon">&#xe616;</i></a>
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

<div id="container" class="container am-container">
  <a v-link="'/control'"><div id="banner"></div></a>
  <div id="indus_panel" class='userBack indusBg'>
      <div class="indusTitle"><i class="iconfont">&#xe617;</i><span>免费咨询分类</span></div>
      <ul>
          <li id="yxtg"><a v-link="'/?industry=营销咨询'" class="plat_href" v-on:click="updateData('营销咨询')">营销咨询</a></li>
          <li id="wzkf"><a v-link="'/?industry=技术咨询'" class="plat_href" v-on:click="updateData('技术咨询')">技术咨询</a></li>
          <li id="tstz"><a v-link="'/?industry=创业咨询'" class="plat_href" v-on:click="updateData('创业咨询')">创业咨询</a></li>
          <li id="qzzp"><a v-link="'/?industry=职业咨询'" class="plat_href" v-on:click="updateData('职业咨询')">职业咨询</a></li>
          <li id="tzlc"><a v-link="'/?industry=理财咨询'" class="plat_href" v-on:click="updateData('理财咨询')">理财咨询</a></li>
          <li id="mgsj"><a v-link="'/?industry=设计咨询'" class="plat_href" v-on:click="updateData('设计咨询')">设计咨询</a></li>
          <li id="px"><a v-link="'/?industry=法律咨询'" class="plat_href" v-on:click="updateData('法律咨询')">法律咨询</a></li>
          <li id="px"><a v-link="'/?industry=心理咨询'" class="plat_href" v-on:click="updateData('心理咨询')">心理咨询</a></li>
          <li id="qt"><a v-link="'/?industry=其他'" class="plat_href" v-on:click="updateData('其他')">其他</a></li>
      </ul>
  </div>

  <div id="list_msg">
      <p><i id="list_msg_txt"></i></p>
      <hr data-am-widget='divider' class='am-divider am-divider-default'/>
  </div>

  <!-- user list -->
  <div id="user_list" v-for="user in users">
      <div id='{{user.uid}}' class="userBack">
          <div class='am-g am-intro-bd userPanel'>
              <div class='am-intro-left user_left'>
                  <a v-link=user.url>
                      <img class='avatar_list' v-bind:src=user.avatar alt='头像' width='120px' height='120px'/>
                  </a>
                  <div class="user_name">{{user.name}}</div>
              </div>
              <div class='am-intro-right user_right'>
                  <p class="line_first">
                      <a v-link=user.url>
                          <strong class="company_color">{{user.city}} . {{user.title}}</strong>
                      </a>
                      <a v-link="{ path: '/contact' }"><i class="iconfont authed">&#xe61d;</i></a>
                  </p>

                  <hr data-am-widget='divider' style='margin: 5px 0px;' class='am-divider-default'/>
                  <p class="line_second">
                      <a v-link=user.url class= 'service_color'>免费咨询：{{user.service}}</a>
                  </p>
                  <p class="line_fourth">
                      简介：{{user.introduce}}
                  </p>
              </div>
          </div>
      </div>
  </div>
</div>
<xfooter></xfooter>
</template>

<script>
import xheader from './parts/Header.vue'
import xfooter from './parts/Footer.vue'
import Vue from 'vue'
import VueRes from 'vue-resource'

Vue.use(VueRes);

function getSearchKey(children){
    var key = '';
    for(var i in children){
        if(children[i].name == 'header'){
            key = children[i].key;
            break;
        }
    }
    return key.trim();
}

export default {
  components: {xheader, xfooter},
  data () {
    return {
        key: '',
        users: []
    }
  },
  ready: function () {
    setContainerMinHeight();
    this.updateData();
  },
   methods: {
        updateData: function(industry){
            var key = this.key;
            var url = apiUrl;
            var param = [];
            if(industry){
                param.push('industry=' + industry);
            }
            if(key){
                param.push('key=' + key);
            }
            if(param.length > 0){
                url += '?' + param.join('&');
            }

            console.log('refresh ' + url)
            this.$http.get(url).then(function (res) {
                console.log(res.body);
                for (var i in res.body.data) {
                    res.body.data[i].url = '/provider/' + res.body.data[i].uid
                }
                this.$set('users', res.body.data);
            }, function (data) {
                console.log('load data failed');
                console.log(data);
            });
        }
   }
}

</script>