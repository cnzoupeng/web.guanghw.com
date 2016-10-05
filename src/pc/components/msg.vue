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
                <h2 class="am-intro-title">个人私信</h2>
            </div>
            <div class="am-u-sm-1" id="control" style="float:right;margin-top: 30px;padding: 0 5px 0 0 ;">
                <a v-link="{ path: '/control' }" style="float: right"><i class="iconfont">&#xe601;</i></a>
            </div>
        </div>
    </div>
</header>
<div id="container" class="container am-container">
    <div id="page_msg" >
        <div id="msg_container" v-if="showNone">
            <div>您还没有收到私信，如果有私信会显示在这里哟~</div>
        </div>

        <div id="msg_template_container">
            <article class="am-comment " id="msg_template">
                <div v-for="ss in sessions" class="am-comment-main comment-margin">
                    <div class="am-comment-hd">
                        <div class="am-comment-meta">
                            <a v-link=ss.url class="am-comment-author">{{ss.name}}</a>
                        </div>
                    </div>

                    <div class="am-comment-bd msg_bk_color">
                        <div v-for="msg in ss.content">
                            <div v-if="msg.from==self.uid" class="am-g msg_join">
                                <div style="text-align: left;">
                                    <small>{{msg.time}}</small>
                                </div>
                                <div class="avatar_peer">
                                    <a v-link=self.url>
                                        <img class='am-radius ' :src=self.avatar alt='头像' width='40px' height='40px'/>
                                    </a>
                                </div>
                                <div class="msg_peer">
                                    <div class="msg_peer_text">{{msg.msg}}</div>
                                </div>
                            </div>
                            <div v-else class="am-g msg_join">
                                <div style="text-align: right;">
                                    <small>{{msg.time}}</small>
                                </div>
                                <div class="msg_self">
                                    <div class="msg_self_text">{{msg.msg}}</div>
                                </div>
                                <div class="avatar_self">
                                    <a v-link=ss.url><img class='am-radius ' :src=ss.avatar alt='头像' width='40px' height='40px'/></a>
                                </div>
                            </div>
                        </div>

                        <div class="am-input-group">
                            <input type="text" class="am-form-field" value="" v-model="ss.answer">
                            <span class="am-input-group-btn">
                            <button class="am-btn am-btn-default" type="button" id="{{ss.uid}}" v-on:click="post(ss.sid)">回复</button>
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</div>

<xfooter></xfooter>
</template>

<script>
import xfooter from './parts/Footer.vue'

export default {
    components: {xfooter},
    data () {
        return {
            showNone: false,
            self: {},
            sessions: [],
        }
    },
    ready: function () {
        setContainerMinHeight()
        this.fresh();
    },
    methods: {
        post: function(sid){
            var allSS = this.$get('sessions');
            var self = this.$get('self');
            var ss = null;
            for(var i in allSS){
                if (allSS[i].sid == sid){
                    ss = allSS[i];
                    break;
                }                
            }
            if(!ss || !ss.answer){
                return;
            }

            var postData = {sid: ss.sid, from: self.uid, to: ss.uid, msg: ss.answer};
            this.$http.post(apiUrl + '/user/msg', postData).then(function (res) {               
                if(res.body.code != 0){
                    console.log('post msg failed')
                    console.log(res.body)
                }
                else{
                     this.fresh();
                }                
            }, function (res) {
                console.log(res)
            });
        },
        fresh: function(){
            this.$http.get(apiUrl + '/user/msg').then(function (res) {
                if(res.body.code != 0){
                    console.log('load msg faild');
                    console.log(res.body)
                    return;
                }

                var result = res.body.data;
                var self = result.self;
                self.url = '/provider/' + self.uid;
                this.$set('self', self);
                var sessions = result.sessions;
                if(sessions.length == 0){
                    this.$set('showNone', true);
                    return;
                }

                for(var i in sessions){
                    sessions[i].answer = '';
                    sessions[i].url = '/provider/' + sessions[i].uid;
                }

                //this.$set('answers', answers);
                this.$set('sessions', sessions);
            }, function (res) {
                console.log(res)
            });
        }
    }
}

</script>

