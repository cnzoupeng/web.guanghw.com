
<script>
  import Vue from 'vue'

export default {
  data () {
    return {
      users: []
    }
  },
  ready: function () {
    if(!location.search){
        console.log('wx auth failed');
        alert('login failed')
        return;
    }
    this.$http.get(apiUrl + '/auth/wx_oauth' + location.search).then(function (res) {
        if(res.status != 200 || res.body.code != 0){
            console.log('login failed');
            console.log(res);
            return;
        }
        Vue.http.headers.common['Authorization']  = 'Bearer ' + res.body.token;
        sessionStorage.setItem('uid', res.body.uid);
        sessionStorage.setItem('token', res.body.token);
        this.$router.go(res.body.jump);
    })
  }
}

</script>