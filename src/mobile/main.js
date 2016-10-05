import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import ViewMain from './components/main.vue'
import ViewAbout from './components/about.vue'
import ViewContact from './components/contact.vue'
import ViewControl from './components/control.vue'
import ViewProvider from './components/provider.vue'
import ViewEdit from './components/edit.vue'
import ViewFavori from './components/favori.vue'
import ViewMsg from './components/msg.vue'
import ViewLogin from './components/login.vue'

// install router
Vue.use(Router)

// routing
var router = new Router({history: true});
var publicUrl = {
  "/": 1,
  '/about': 1,
  '/contact': 1,
  '/auth/wx_oauth': 1
}

function init(){
    var token = sessionStorage.getItem('token');
    if(token){
      Vue.http.headers.common['Authorization']  = 'Bearer ' + token;
    }
}

init();

router.map({
    '/': {
      component: ViewMain
    },
    '/about': {
      component: ViewAbout
    },
    '/contact': {
      component: ViewContact
    },
    '/control': {
      component: ViewControl
    },
    '/provider/:uid': {
      component: ViewProvider
    },
    '/edit': {
      component: ViewEdit
    },
    '/favori': {
      component: ViewFavori
    },
    '/msg': {
      component: ViewMsg
    },
    '/auth/wx_oauth': {
      component: ViewLogin
    },
})

router.beforeEach(function (transition) {
  window.scrollTo(0, 0)
  var target = transition.to.path;
  if(!target){
    target = '/';
  }
  target = target.split('?')[0];
  if(publicUrl[target] || target.indexOf('/provider/') == 0){
    transition.next();
    return;
  }

  //已经登录
  var uid = sessionStorage.getItem('uid');
  if(isNumber(parseInt(uid))){
    transition.next();
    return;
  }

  //登录跳转
  target = encodeURIComponent(target);
  var url = getAuthUrl(target);
  location.href = url;
});


router.redirect({
  '*': '/'
});

router.start(App, 'app')
