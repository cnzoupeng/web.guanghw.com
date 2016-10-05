
<template>
<xheader></xheader>
<div id="container" class="container am-container">
    <div id="page_fav">

        <!-- user list -->
        <div id="user_list" v-for="user in users">
            <div id='{{user.uid}}' class="userBack">
                <div class='am-g am-intro-bd userPanel'>
                    <div class='am-intro-left user_left'>
                        <a v-link=user.url>
                            <img class='avatar_list' v-bind:src=user.avatar  alt='头像' width='80px' height='80px'/>
                        </a>
                    </div>
                    <div class='am-intro-right user_right'>
                        <p class="line_first">
                            <a v-link=user.url>
                                <strong class="company_color" >{{user.name}}</strong>
                            </a>
                        </p>

                        <hr data-am-widget='divider' style='margin: 5px 0px;' class='am-divider-default'/>
                        <p class="line_second">
                            <a v-link=user.url class= 'service_color'>{{user.city}} . {{user.title}}</a>
                        </p>
                        <p class="line_fourth">
                            帮助内容：{{user.service}}
                        </p>
                    </div>
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


export default {
    components: {xheader, xfooter},
    data () {
        return {
          users: []
        }
    },
    ready: function () {
        setContainerMinHeight()
        this.$http.get(apiUrl + '/user/mark').then(function (res) {
            console.log(res.body)
            var users = res.body.data;
            if(users){
                for(var i in users){
                    users[i].url = '/provider/' + users[i].uid;
                }
                this.$set('users', users);
            }
            else{
                console.log('load favori empty: code=' + res.body.code)
            }            
        }, function (res) {
            console.log(res)
        });
    }
}

</script>
