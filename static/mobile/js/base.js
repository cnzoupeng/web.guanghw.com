
function setContainerMinHeight () {
  var headerHeight = document.getElementById('header').clientHeight
  var footerHeight = document.getElementById('footer').clientHeight
  var containerHeight = document.getElementById('container').clientHeight
  var containerHeightMin = window.innerHeight - headerHeight - footerHeight
  if (containerHeight < containerHeightMin) {
    document.getElementById('container').style.minHeight = containerHeightMin + 'px'
  }
}


function getPxNum(px){
    var num = '';
    for(var i = 0 ; i < px.length; ++i){
        var c = px.charAt(i);
        if((c >= '0' && c <= '9') || c == '.'){
            num += c;
        }
        else{
            break;
        }
    }
    if(num.length > 0){
        return parseFloat(num);
    }
    return 0;
}

function getShortIntroduce(intro, count){
    var short = '';
    if(intro == null){
        return short;
    }
    var short_len = 0;
    var max_len = count * 2;
    var i = 0;
    while(short_len < max_len && i < intro.length){
        short_len += intro.charCodeAt(i) > 255 ? 2 : 1;
        i++;
    }
    if(i > 0){
        short = intro.substr(0, i);
        if(i < intro.length){
            short += ' . . .';
        }
    }
    return short;
}

function calc_line_count(){
    var width = document.getElementById('header').clientWidth;
    var intr = document.getElementById('introduce');
    var css = window.getComputedStyle(intr, null);
    var fontsize = css.fontSize;
    width -= 90;
    fontsize = getPxNum(fontsize);
    var line_count = parseInt(width / fontsize);
    var show_count = line_count * 3;
    show_count += line_count / 2;
    return show_count;
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

//setCookie('uid', 963636);
//setCookie('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjk2MzYzNiwiaWF0IjoxNDc3MjE4MDE3LCJleHAiOjEwMTE3MjE4MDE3fQ.LCgP0GKfXwvj9uhS512h4oxKV523hTuUIgY808p-fOY');
