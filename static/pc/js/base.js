
function setContainerMinHeight () {
  var headerHeight = document.getElementById('header').clientHeight
  var footerHeight = document.getElementById('footer').clientHeight
  var containerHeight = document.getElementById('container').clientHeight
  var containerHeightMin = window.innerHeight - headerHeight - footerHeight
  if (containerHeight < containerHeightMin) {
    document.getElementById('container').style.minHeight = containerHeightMin + 'px'
  }
}


function isWeiXinUa() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

function getAuthUrl(curl){
    var auth = encodeURIComponent('http://web.guanghw.com/auth/wx_oauth');
    var url = '';
    if(isWeiXinUa()){
        var state = "wx" + "_" + curl;
        url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx45de252db48d8d3d&redirect_uri=" + auth + "&response_type=code&scope=snsapi_userinfo&state=" + state +"#wechat_redirect";
    }
    else{
        var state = "web" + "_" + curl;
        url = "https://open.weixin.qq.com/connect/qrconnect?appid=wx3d191f2b6049a18d&redirect_uri=" + auth + "&response_type=code&scope=snsapi_login&state=" + state + "#wechat_redirect";
    }
    return url;
}

function isNumber(obj) {  
    return typeof obj === 'number' && !isNaN(obj)  
}

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
}

function getLocation(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
}

var expDay = 30;
function setCookie(name, value) {
	var d = new Date;
	d.setTime(d.getTime() + 24*60*60*1000*expDay);
	window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

function getCookie(name) {
	var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return v ? v[2] : null;
}

function delCookie(name) {
	setCookie(name, '', -1);
}

var apiUrl = 'http://api.guanghw.com';
//var apiUrl = 'http://localhost:88';

//setCookie('uid', 962990);
//setCookie('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjk2Mjk5MCwiaWF0IjoxNDc1MjI1NTk4LCJleHAiOjEwMTE1MjI1NTk4fQ.c-WWg4lxahEdM2kBiZndgAoPvobMGQO6DLioPqAIADY');
