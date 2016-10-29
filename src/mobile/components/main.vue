<template>
<header id="header" data-am-widget="header" class="am-header am-header-default"
        style="background-color:rgba(0, 0, 0, 0.59)">
    <div class="am-container" id="page_header">
        <div style="width: 100%;margin:0 auto">
            <div class="header-x-icon">
                <!--<a href="/" class="am-header-icon am-icon-home"></a>-->
                <a v-link="'/'" v-on:click="index()"><i class="iconfont">&#xe612;</i></a>
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

<div id="container" class="container am-container">
  <a v-link="'/control'"><div id="banner"></div></a>
  <div id="indus_panel" class='userBack indusBg'>
      <div class="indusTitle"><i class="iconfont">&#xe617;</i><span>免费咨询分类</span></div>
      <ul>
          <li id="yxtg"><a v-link="'/?industry=营销咨询'" class="plat_href" v-on:click="queryIndustry('营销咨询')">营销咨询</a></li>
          <li id="wzkf"><a v-link="'/?industry=技术咨询'" class="plat_href" v-on:click="queryIndustry('技术咨询')">技术咨询</a></li>
          <li id="tstz"><a v-link="'/?industry=创业咨询'" class="plat_href" v-on:click="queryIndustry('创业咨询')">创业咨询</a></li>
          <li id="qzzp"><a v-link="'/?industry=职业咨询'" class="plat_href" v-on:click="queryIndustry('职业咨询')">职业咨询</a></li>
          <li id="tzlc"><a v-link="'/?industry=理财咨询'" class="plat_href" v-on:click="queryIndustry('理财咨询')">理财咨询</a></li>
          <li id="mgsj"><a v-link="'/?industry=设计咨询'" class="plat_href" v-on:click="queryIndustry('设计咨询')">设计咨询</a></li>
          <li id="px"><a v-link="'/?industry=法律咨询'" class="plat_href" v-on:click="queryIndustry('法律咨询')">法律咨询</a></li>
          <li id="px"><a v-link="'/?industry=心理咨询'" class="plat_href" v-on:click="queryIndustry('心理咨询')">心理咨询</a></li>
          <li id="qt"><a v-link="'/?industry=其他'" class="plat_href" v-on:click="queryIndustry('其他')">其他</a></li>
      </ul>
  </div>

  <div id="list_msg">
      <p><i id="list_msg_txt"></i></p>
      <hr data-am-widget='divider' class='am-divider am-divider-default'/>
  </div>

  <p class="line_fourth" id="introduce" style="display:none"></p>
  <!-- user list -->
  <div id="user_list" v-for="user in users">
      <div id='{{user.uid}}' class="userBack">
          <div class='am-g am-intro-bd userPanel'>
              <div class='am-intro-left user_left'>
                  <a v-link=user.url>
                      <img class='avatar_list' v-bind:src=user.avatar alt='头像' />
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
  <ul class="am-pagination am-pagination-default">
        <li class="am-pagination-prev">
            <a id="page_prev" v-on:click="loadPrevPage()" class="am-btn am-btn-link page_ctrl">上一页</a>
        </li>
        <li class="am-pagination-next ">
            <a id="page_next" v-on:click="loadNextPage()" class="am-btn am-btn-link page_ctrl">下一页</a>
        </li>
    </ul>
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
        industry: '',
        page: {
            cur: 0,
            last: false
        },
        users: []
    }
  },
  ready: function () {
    setContainerMinHeight();
    this.updateData();
  },
   methods: {
        updateData: function(industry){
            var url = apiUrl;
            var param = ['page=' + this.page.cur];
            if(this.industry){
                param.push('industry=' + this.industry);
            }
            if(this.key){
                param.push('key=' + this.key);
            }
            if(param.length > 0){
                url += '?' + param.join('&');
            }

            this.$http.get(url).then(function (res) {
                console.log(res.body);
                var showCount = calc_line_count();
                for (var i in res.body.data) {
                    res.body.data[i].introduce = getShortIntroduce(res.body.data[i].introduce, showCount);
                    res.body.data[i].url = '/provider/' + res.body.data[i].uid;
                }
                this.users = res.body.data;
                if(res.body.data.length == 10){
                    this.page.last = false;
                }
                else{
                    this.page.last = true;
                }
            }, function (data) {
                console.log('load data failed');
                console.log(data);
            });
        },
        loadPrevPage: function(){
            if(this.page.cur <= 0){
                return;
            }
            this.page.cur--;
            this.updateData();
        },
        loadNextPage: function(){
            if(this.page.last){
                return;
            }
            this.page.cur++;
            this.updateData();
        },
        queryIndustry: function(industry){
            this.industry = industry;
            this.page.curl = 0;
            this.updateData();
        },
        index: function(){
            this.industry = '';
            this.page.curl = 0;
            this.key = '';
            this.updateData();
        },
        new_window: function(url){
            window.open(url);
            return false;
        }
   }
}

</script>