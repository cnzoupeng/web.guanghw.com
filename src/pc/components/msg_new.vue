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


        
        <div class="sidebar">
            <div class="list">
                <ul>
                    <li v-for="ss in sessions" :class="{ active: ss.id === currentId }" @click="selectSession(ss.id)">
                        <img class="avatar"  width="30" height="30" :alt="ss.peer_name" :src="ss.peer_avatar">
                        <p class="name">{{ss.peer_name}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="main">
            <div class="message" v-scroll-bottom="session.messages">
                <ul v-if="session">
                    <li v-for="item in session.messages">
                        <p class="time">
                            <span>{{ item.date | time }}</span>
                        </p>
                        <div class="main" :class="{ self: item.self }">
                            <img class="avatar" width="30" height="30" :src="item.self ? user.img : session.user.img" />
                            <div class="text">{{ item.content }}</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="text">
                <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" @keyup="onKeyup"></textarea>
            </div>
        </div>

        </div>
        <div id="msg_template_container">
            <article class="am-comment " id="msg_template">
                    <div v-for="msg in msgs" class="am-comment-main comment-margin">
                        <div class="am-comment-hd">
                            <div class="am-comment-meta">
                                <a v-link=msg.url class="am-comment-author">{{msg.peer_name}}</a>
                            </div>
                        </div>

                        <div class="am-comment-bd msg_bk_color">
                            <div v-for="one in msg.content">
                                <div v-if=msg.inMsg class="am-g msg_join">
                                    <div style="text-align: left;">
                                        <small>{{one.time}}</small>
                                    </div>
                                    <div class="avatar_peer">
                                        <a v-link=msg.peer_url>
                                            <img class='am-radius ' :src=msg.peer_avatar alt='头像' width='40px' height='40px'/>
                                        </a>
                                    </div>
                                    <div class="msg_peer">
                                        <div class="msg_peer_text">{{one.msg}}</div>
                                    </div>
                                </div>
                                <div v-else class="am-g msg_join">
                                    <div style="text-align: right;">
                                        <small>{{one.time}}</small>
                                    </div>
                                    <div class="msg_self">
                                        <div class="msg_self_text">{{one.msg}}</div>
                                    </div>
                                    <div class="avatar_self">
                                        <a v-link=msg.url><img class='am-radius ' :src=msg.avatar alt='头像' width='40px' height='40px'/></a>
                                    </div>
                                </div>
                            </div>

                            <div class="am-input-group">
                                <input type="text" class="am-form-field" value={{msg.answer}}>
                                <span class="am-input-group-btn">
                                <button class="am-btn am-btn-default" type="button" id="{{msg.peer_uid}}" v-on:click="post()">回复</button>
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
            sessions: []
        }
    },
    ready: function () {
        setContainerMinHeight()
        this.$http.get(apiUrl + '/user/msg').then(function (res) {
            if(res.body.code != 0){
                console.log('load msg faild');
                console.log(res.body)
                return;
            }

            var msgs = res.body.data;
            if(!msgs){
                this.$set('showNone', true);
                return;
            }

            for(var i in msgs){
                msgs[i].id = i;
                msgs[i].answer = '';
                msgs[i].url = '/provider/' + msgs[i].uid;
                msgs[i].peer_url = '/provider/' + msgs[i].peer_uid;
            }

            this.$set('showNone', false);
            this.$set('sessions', res.body.data);
        }, function (res) {
            console.log(res)
        });
    },
    methods: {
        post: function(event){
            console.log(event)
            this.$http.post(apiUrl + '/user/msg', this.$get('user')).then(function (res) {                

            }, function (res) {
                console.log(res)
            });
        }
    }
}

</script>

<style scoped>

#page_msg {
  margin: 20px auto;
  width: 800px;
  height: 600px;
  overflow: hidden;
  border-radius: 3px;
}
#page_msg .sidebar,
#page_msg .main {
  height: 100%;
}
#page_msg .sidebar {
  float: left;
  width: 200px;
  color: #f4f4f4;
  background-color: #2e3238;
}
#page_msg .main {
  position: relative;
  overflow: hidden;
  background-color: #eee;
}
#page_msg .text {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
}
#page_msg .message {
  height: calc(100% - 160px);
}


.message {
  padding: 10px 15px;
  overflow-y: scroll;
}
.message li {
  margin-bottom: 15px;
}
.message .time {
  margin: 7px 0;
  text-align: center;
}
.message .time > span {
  display: inline-block;
  padding: 0 18px;
  font-size: 12px;
  color: #fff;
  border-radius: 2px;
  background-color: #dcdcdc;
}
.message .avatar {
  float: left;
  margin: 0 10px 0 0;
  border-radius: 3px;
}
.message .text {
  display: inline-block;
  position: relative;
  padding: 0 10px;
  max-width: calc(100% - 40px);
  min-height: 30px;
  line-height: 2.5;
  font-size: 12px;
  text-align: left;
  word-break: break-all;
  background-color: #fafafa;
  border-radius: 4px;
}
.message .text:before {
  content: " ";
  position: absolute;
  top: 9px;
  right: 100%;
  border: 6px solid transparent;
  border-right-color: #fafafa;
}
.message .self {
  text-align: right;
}
.message .self .avatar {
  float: right;
  margin: 0 0 0 10px;
}
.message .self .text {
  background-color: #b2e281;
}
.message .self .text:before {
  right: inherit;
  left: 100%;
  border-right-color: transparent;
  border-left-color: #b2e281;
}


.text {
  height: 160px;
  border-top: solid 1px #ddd;
}
.text textarea {
  padding: 10px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  font-family: "Micrsofot Yahei";
  resize: none;
}



.list li {
  padding: 12px 15px;
  border-bottom: 1px solid #292C33;
  cursor: pointer;
  transition: background-color .1s;
}
.list li:hover {
  background-color: rgba(255,255,255,0.03);
}
.list li.active {
  background-color: rgba(255,255,255,0.1);
}
.list .avatar,
.list .name {
  vertical-align: middle;
}
.list .avatar {
  border-radius: 2px;
}
.list .name {
  display: inline-block;
  margin: 0 0 0 15px;
}

</style>