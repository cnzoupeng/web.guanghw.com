<template>
<xheader></xheader>
<div id="container" class="container am-container">
    <div id="page_provider">
        <div class="topIntro">
            <div class="upHead">
                <p id="uname">{{user.name}}</p>
            </div>
            <div class="ProvHeader" :style="{backgroundImage: 'url(' + user.avatar + ')'}"></div>
        </div>

        <div style="background-color: white">
                <div class="am-g infoLine infoLineFirst">
                    <!--<div class="provider_left"><i class="am-icon-user"></i></div>-->
                    <div class="provider_left"><i class="iconfont" style="font-size: 170%;">&#xe604;</i></div>
                    <div class="provider_right company_color" id="name_tt" style="padding-top: 1rem"> {{user.title}}</div>
                </div>

                <div class="am-g infoLine">
                    <!--<div class="provider_left"><i class="am-icon-thumbs-up"></i></div>-->
                    <div class="provider_left"><i class="iconfont">&#xe61d;</i></div>
                    <div class="provider_right service_color">{{user.service}}</div>
                </div>
                
                <div v-if=user.prov class="am-g infoLine">
                    <!--<div class="provider_left"><i class="am-icon-home"></i></div>-->
                    <div class="provider_left"><i class="iconfont">&#xe602;</i></div>
                    <div class="provider_right">{{user.prov}} . {{user.city}}</div>
                </div>
                
                <div v-if=user.company class="am-g infoLine">
                    <!--<div class="provider_left"><i class="am-icon-building"></i></div>-->
                    <div class="provider_left"><i class="iconfont">&#xe605;</i></div>
                    <div class="provider_right ">{{user.company}} . {{user.position}}</div>
                </div>

                <div v-if=user.web class="am-g infoLine">
                    <!--<div class="provider_left"><i class="am-icon-edge"></i></div>-->
                    <div class="provider_left"><i class="iconfont">&#xe603;</i></div>
                    <div class="provider_right"><a class='webColor' href="http://{{user.web}}" target="_blank">{{user.web}}</a></div>
                </div>
            </div>
            <div class="am-g infoLine" style="position: relative">
                <div class="am-u-sm-12 introduce" style="margin-bottom: 70px">{{user.introduce}}</div>
                <div class="am-u-sm-12 " style="position: absolute;bottom: 0">
                    <div style="width: 300px;margin: 0 auto">
                        <ul class="interact_panel">
                            <li v-if=user.mark id="li_mark"><i id='bt_mark' class="iconfont marked_color" v-on:click="unmark()" state="mark">&#xe619;</i></li>
                            <li v-else id="li_mark"><i id='bt_mark' class="iconfont" v-on:click="mark()" state="unmark">&#xe60c;</i></li>
                        
                            <li v-if=user.thumb id="li_thumb"><i id='bt_thumb' v-on:click=" thumb_cancel()" class="iconfont marked_color" state="up">&#xe614;</i></li>
                            <li v-else id="li_thumb"><i id='bt_thumb' v-on:click="thumb_up()" class="iconfont" state="cancel">&#xe615;</i></li>

                            <li class="ip_last"><i onclick="report()" class="iconfont">&#xe61e;</i></li>
                            <li class="ip_last"><i onclick="open_qq()" class="iconfont">&#xe61f;</i></li>
                        </ul>
                        <ul class="interact_panel_text">
                            <li id="thump_txt"><span>收藏</span></li>
                            <li id="mark_txt"><span>点赞(<span id="thumbCount">{{user.thumbCount}}</span>)</span></li>
                            <li class="ip_last"><span >纠错</span></li>
                            <li class="ip_last"><span >客服</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="am-modal am-modal-prompt" tabindex="-1" id="dlg_report">
            <div class="am-modal-dialog">
                <div class="am-modal-hd" style="margin-bottom: 20px">请输入你要举报的内容，我们将尽快审核</div>
                <div class="am-modal-bd">
                    <textarea type="text" id="report_text" class="am-modal-prompt-input" rows=3 placeholder="举报内容" style="width: 100%"></textarea>
                </div>
                <div class="am-modal-footer">
                    <span class="am-modal-btn" data-am-modal-cancel>取消</span>
                    <span class="am-modal-btn" data-am-modal-confirm onclick="submit_report()">提交</span>
                </div>
            </div>
        </div>

        <div v-if="self.uid == user.uid"></div>
        <div v-else id="leave_msg">
            <div v-if=notLogin class="lv_msg_left">
                <textarea id='leave_msg_sp' class="msg_send_area" rows='3' disabled="disabled"></textarea>
                <p  class="reg_a"><a href="/control">微信登录</a>，可以私信联系TA</p>
            </div>
            <div v-else class="lv_msg_left">
                <textarea id='leave_msg_sp' class="msg_send_area" rows='3' v-model="postMsg" placeholder=" 私信联系TA，了解详细内容"></textarea>
            </div>
            <div class="lv_msg_bt">
                <button id="editCommit" class="am-btn am-btn-secondary am-btn-block" v-on:click="post()">发送</button>
            </div>
        </div>
        <div style="height:90px;margin-top:30px; clear: both"></div>
    </div>
</div>
<xfooter></xfooter>
</template>

<script>
import xheader from './parts/Header.vue'
import xfooter from './parts/Footer.vue'

function getuid () {
  var arr = window.location.pathname.split('/')
  return arr.pop()
}

export default {
    components: {xheader, xfooter},
    data: function () {
        return {
            notLogin: true,
            postMsg: '',
            self: {},
            user: {}
        }
    },
    ready: function () {
        setContainerMinHeight()

        var uid = getCookie('uid');
        if(uid){
            this.$set('notLogin', false);
        }
        this.$set('self', {uid: uid});
        this.user.uid = getuid()
        this.$http.get(apiUrl + '/user/info/' + this.user.uid).then(function (res) {
            console.log(res.body)
            this.$set('user', res.body.data)
        }, function (res) {
            console.log(res)
        })
    },
    methods: {
        post: function(){
            var msg = this.$get('postMsg');
            if(!msg){
                return;
            }

            var uid = getCookie('uid');
            var puid = getuid();
            var postData = {from: uid, to: puid, msg: msg};
            this.$http.post(apiUrl + '/user/msg', postData).then(function (res) {               
                if(res.body.code != 0){
                    console.log('post msg failed')
                    console.log(res.body)
                }
                else{
                    alert('发送成功');
                }
            }, function (res) {
                console.log(res)
            });
        },
        mark: function(){
            var puid = getuid();
            this.$http.post(apiUrl + '/user/mark/' + puid).then(function (res) {               
                if(res.body.code != 0){
                    console.log('post mark failed')
                    console.log(res.body)
                }
                else{
                    var user = this.$get('user');
                    user.mark = true;
                    this.$set('user', user);
                }
            }, function (res) {
                console.log(res)
            });
        },
        unmark: function(){
            var puid = getuid();
            this.$http.post(apiUrl + '/user/unmark/' + puid).then(function (res) {               
                if(res.body.code != 0){
                    console.log('post mark failed')
                    console.log(res.body)
                }
                else{
                    var user = this.$get('user');
                    user.mark = false;
                    this.$set('user', user);
                }
            }, function (res) {
                console.log(res)
            });
        },
        thumb_up: function(){
            var puid = getuid();
            this.$http.post(apiUrl + '/user/thumb/' + puid).then(function (res) {               
                if(res.body.code != 0){
                    console.log('post mark failed')
                    console.log(res.body)
                }
                else{
                    var user = this.$get('user');
                    user.thumb = true;
                    this.$set('user', user);
                }
            }, function (res) {
                console.log(res)
            });
        },
        thumb_cancel: function(){
            var puid = getuid();
            this.$http.post(apiUrl + '/user/unthumb/' + puid).then(function (res) {               
                if(res.body.code != 0){
                    console.log('post mark failed')
                    console.log(res.body)
                }
                else{
                    var user = this.$get('user');
                    user.thumb = false;
                    this.$set('user', user);
                }
            }, function (res) {
                console.log(res)
            });
        },
    }
}

</script>
