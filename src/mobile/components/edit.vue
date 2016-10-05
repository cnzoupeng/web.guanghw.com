<template>
<header id="header" data-am-widget="header" class="am-header am-header-default"
        style="background-color:rgba(0, 0, 0, 0.59)">
    <div class="am-container" id="page_header">
        <div class="am-g">
            <div class="am-u-sm-2">
                <a v-link="'/'"><i class="iconfont" style="font-size:30px;color:#fff">&#xe612;</i></a>
            </div>
            <div class="am-u-sm-5 title_control">
                <h2 class="am-intro-title">资料编辑</h2>
            </div>

            <div class="am-u-sm-2" id="control" style="float:right">
                <a v-link="'/control'"><i class="iconfont">&#xe601;</i></a>
            </div>
        </div>
    </div>
</header>

<div id="container" class="container am-container">
    <div id="page_edit" style="margin-top: -10px">
        <div class="edit_tips" style="background-color: rgba(226, 192, 192, 0.39)">
            小提醒：资料越完善系统排名越靠前，请耐心填写。
        </div>
        <div class="am-g edit_line">
            <div class="edit_left" :style="{backgroundImage: 'url(' + user.avatar + ')'}" style="width: 100px;height:100px;border-radius:200px;background-size:100% 100%;margin-left: 15px">
            </div>
            <div id="input-file">
                <span id="text">点击上传</span>
                <input type="file" id="upload" accept="image/gif, image/jpeg, image/png" v-on:change="uploadFile" multiple="false"></label>
            </div>
        </div>

        <div class="am-g edit_line">
            <div class="edit_left">真实姓名</div>
            <div class="edit_right">
                <input id="edit_name" class="edit_input" v-model=user.name maxlength="8" placeholder="* 点击输入 （必填）">
            </div>
        </div>

        <div class="am-g edit_line">
            <div class="edit_left">咨询分类</div>
            <div id="industry_val" style="display: none">{{user.industry}}</div>
            <div class="edit_right" >
                <select id="edit_industry" class="edit_input " style="margin-left: -5px" v-model="user.industry">
                    <option value="营销咨询">营销咨询</option>
                    <option value="技术咨询">技术咨询</option>
                    <option value="创业咨询">创业咨询</option>
                    <option value="职业咨询">职业咨询</option>
                    <option value="理财咨询">理财咨询</option>
                    <option value="设计咨询">设计咨询</option>
                    <option value="法律咨询">法律咨询</option>
                    <option value="心理咨询">心理咨询</option>
                    <option value="其他">其他</option>                    
                </select>
            </div>
        </div>

        <div class="am-g edit_line">
            <div class="edit_left">标题</div>
            <div class="edit_right">
                <input id="edit_title" class="edit_input" v-model=user.title maxlength="24" placeholder="例如：腾讯产品经理，专业摄影师，品牌营销顾问等">
            </div>
        </div>

        <div class="am-g edit_line">
            <div class="edit_left">咨询</div>
            <div class="edit_right">
                <input id="edit_service" class="edit_input" v-model=user.service maxlength="32" placeholder="例如：网站开发、理财咨询、美工设计等">
            </div>
        </div>

        <div class="am-g edit_line" >
            <div class="edit_left">地区</div>
            <div id="city_prov" style="display: none">{{user.prov}}</div>
            <div id="city_val" style="display: none">{{user.city}}</div>
            <div class="edit_right">
                <div style="width: 45%;display: inline-block;margin-left: -4px">
                    <select id="edit_prov" class="edit_input " v-model="prov">
                        <option value=""></option>
                        <option value="北京">北京</option>
                        <option value="广东">广东</option>
                        <option value="上海">上海</option>
                        <option value="天津">天津</option>
                        <option value="重庆">重庆</option>
                        <option value="辽宁">辽宁</option>
                        <option value="江苏">江苏</option>
                        <option value="湖北">湖北</option>
                        <option value="四川">四川</option>
                        <option value="陕西">陕西</option>
                        <option value="河北">河北</option>
                        <option value="山西">山西</option>
                        <option value="河南">河南</option>
                        <option value="吉林">吉林</option>
                        <option value="黑龙江">黑龙江</option>
                        <option value="内蒙古">内蒙古</option>
                        <option value="山东">山东</option>
                        <option value="安徽">安徽</option>
                        <option value="浙江">浙江</option>
                        <option value="福建">福建</option>
                        <option value="湖南">湖南</option>
                        <option value="广西">广西</option>
                        <option value="江西">江西</option>
                        <option value="贵州">贵州</option>
                        <option value="云南">云南</option>
                        <option value="西藏">西藏</option>
                        <option value="海南">海南</option>
                        <option value="甘肃">甘肃</option>
                        <option value="宁夏">宁夏</option>
                        <option value="青海">青海</option>
                        <option value="新疆">新疆</option>
                        <option value="香港">香港</option>
                        <option value="澳门">澳门</option>
                        <option value="台湾">台湾</option>
                    </select>
                </div>
                <div style="width: 45%;display: inline-block;margin-left: 15px;float: right">
                    <select id="edit_city" class="edit_input " v-model="ucity">
                        <option v-for="city in citys" v-bind:value="city">
                            {{ city }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div class="am-g edit_line">
            <div class="edit_left">手机</div>
            <div class="edit_right">
                <input id="edit_phone" class="edit_input" v-model=user.mobile maxlength="12" placeholder="* 点击输入 （必填,不公开）">
            </div>
        </div>

        <div class="am-g edit_line" style="margin-top: 30px">
            <div class="edit_left">公司</div>
            <div class="edit_right">
                <input id="edit_company" class="edit_input" v-model=user.company maxlength="24" placeholder="点击输入 （选填）">
            </div>
        </div>

        <div class="am-g edit_line">
            <div class="edit_left">职务</div>
            <div class="edit_right">
                <input id="edit_position" class="edit_input" v-model=user.position maxlength="24" placeholder="点击输入 （选填）">
            </div>
        </div>

        <div class="am-g edit_line">
            <div class="edit_left">网站</div>
            <div class="edit_right">
                <input id="edit_web" class="edit_input" v-model=user.web maxlength="128" placeholder="点击输入 （选填）">
            </div>
        </div>

        <div class="am-g edit_line">
            <div class="edit_left">简介</div>
        </div>

        <div class="am-g edit_line" style="padding: 0">
            <div  style="width: 100%;margin-top:0;padding: 0 5px">
                <textarea id='edit_intro' class="edit_intro" rows='8' maxlength="250" placeholder="详细填写个人介绍，可以提升系统排名和用户信任度。（250个字内）" v-model=user.introduce></textarea>
            </div>
        </div>

        <div class="am-g edit_line" style="background: transparent">
            <div style="padding-left: 0;">
                <button id="editCommit" type="button" class="am-btn am-btn-primary am-btn-block" style="line-height: 2.0" v-on:click="post()">提交修改
                </button>
            </div>
        </div>

        <div class="am-modal am-modal-alert" tabindex="-1" id="my-alert">
            <div class="am-modal-dialog">
                <div class="am-modal-hd">恭喜您！提交成功</div>
                <div class="am-modal-bd">
                    我们将在一小时内审核并发布。下面跳转到预览页面。
                </div>
                <div class="am-modal-footer">
                    <span class="am-modal-btn" onclick="jump_privoder()">确定</span>
                </div>
            </div>
        </div>
        
        <div class="am-modal am-modal-loading am-modal-no-btn" tabindex="-1" id="modal-loading">
        <div class="am-modal-dialog">
            <div class="am-modal-hd">正在更新...</div>
            <div class="am-modal-bd">
            <span class="am-icon-spinner am-icon-spin"></span>
            </div>
        </div>
        </div>
    </div>
</div>

<xfooter></xfooter>
</template>


<script>
import xfooter from './parts/Footer.vue'
import FileUpload from 'vue-upload-component'

var cities =  {"北京": ["北京"],
                "广东": ["广州", "深圳", "珠海", "汕头", "韶关", "佛山", "江门", "湛江", "茂名", "肇庆", "惠州", "梅州", "汕尾", "河源", "阳江", "清远", "东莞", "中山", "潮州", "揭阳", "云浮"],
                "辽宁": ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"],
                "江苏": ["南京", "苏州", "无锡", "常州", "镇江", "南通", "泰州", "扬州", "盐城", "连云港", "徐州", "淮安", "宿迁"],
                "湖北": ["武汉", "黄石", "十堰", "荆州", "宜昌", "襄樊", "鄂州", "荆门", "孝感", "黄冈", "咸宁", "随州", "恩施土家族苗族自治州", "仙桃", "天门", "潜江", "神农架林区"],
                "四川": ["成都", "自贡", "攀枝花", "泸州", "德阳", "绵阳", "广元", "遂宁", "内江", "乐山", "南充", "眉山", "宜宾", "广安", "达州", "雅安", "巴中", "资阳", "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州"],
                "陕西": ["西安", "铜川", "宝鸡", "咸阳", "渭南", "延安", "汉中", "榆林", "安康", "商洛"],
                "河北": ["石家庄", "唐山", "秦皇岛", "邯郸", "邢台", "保定", "张家口", "承德", "沧州", "廊坊", "衡水"],
                "山西": ["太原", "大同", "阳泉", "长治", "晋城", "朔州", "晋中", "运城", "忻州", "临汾", "吕梁"],
                "河南": ["郑州", "开封", "洛阳", "平顶山", "安阳", "鹤壁", "新乡", "焦作", "濮阳", "许昌", "漯河", "三门峡", "南阳", "商丘", "信阳", "周口", "驻马店", "焦作"],
                "吉林": ["长春", "吉林", "四平", "辽源", "通化", "白山", "松原", "白城", "延边朝鲜族自治州"],
                "黑龙江": ["哈尔滨", "齐齐哈尔", "鹤岗", "双鸭山", "鸡西", "大庆", "伊春", "牡丹江", "佳木斯", "七台河", "黑河", "绥化", "大兴安岭地区"],
                "内蒙古": ["呼和浩特", "包头", "乌海", "赤峰", "通辽", "鄂尔多斯", "呼伦贝尔", "巴彦淖尔", "乌兰察布", "锡林郭勒盟", "兴安盟", "阿拉善盟"],
                "山东": ["济南", "青岛", "淄博", "枣庄", "东营", "烟台", "潍坊", "济宁", "泰安", "威海", "日照", "莱芜", "临沂", "德州", "聊城", "滨州", "菏泽"],
                "安徽": ["合肥", "芜湖", "蚌埠", "淮南", "马鞍山", "淮北", "铜陵", "安庆", "黄山", "滁州", "阜阳", "宿州", "巢湖", "六安", "亳州", "池州", "宣城"],
                "浙江": ["杭州", "宁波", "温州", "嘉兴", "湖州", "绍兴", "金华", "衢州", "舟山", "台州", "丽水"],
                "福建": ["福州", "厦门", "莆田", "三明", "泉州", "漳州", "南平", "龙岩", "宁德"],
                "湖南": ["长沙", "株洲", "湘潭", "衡阳", "邵阳", "岳阳", "常德", "张家界", "益阳", "郴州", "永州", "怀化", "娄底", "湘西土家族苗族自治州"],
                "广西": ["南宁", "柳州", "桂林", "梧州", "北海", "防城港", "钦州", "贵港", "玉林", "百色", "贺州", "河池", "来宾", "崇左"],
                "江西": ["南昌", "景德镇", "萍乡", "九江", "新余", "鹰潭", "赣州", "吉安", "宜春", "抚州", "上饶"],
                "贵州": ["贵阳", "六盘水", "遵义", "安顺", "铜仁地区", "毕节地区", "黔西南布依族苗族自治州", "黔东南苗族侗族自治州", "黔南布依族苗族自治州"],
                "云南": ["昆明", "曲靖", "玉溪", "保山", "昭通", "丽江", "普洱", "临沧", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "迪庆藏族自治州", "大理白族自治州", "楚雄彝族自治州", "红河哈尼族彝族自治州", "文山壮族苗族自治州", "西双版纳傣族自治州"],
                "西藏": ["拉萨", "那曲地区", "昌都地区", "林芝地区", "山南地区", "日喀则地区", "阿里地区"],
                "海南": ["海口", "三亚", "五指山", "琼海", "儋州", "文昌", "万宁", "东方", "澄迈县", "定安县", "屯昌县", "临高县", "白沙黎族自治县", "昌江黎族自治县", "乐东黎族自治县", "陵水黎族自治县", "保亭黎族苗族自治县", "琼中黎族苗族自治县"],
                "甘肃": ["兰州", "嘉峪关", "金昌", "白银", "天水", "武威", "酒泉", "张掖", "庆阳", "平凉", "定西", "陇南", "临夏回族自治州", "甘南藏族自治州"],
                "宁夏": ["银川", "石嘴山", "吴忠", "固原", "中卫"],
                "青海": ["西宁", "海东地区", "海北藏族自治州", "海南藏族自治州", "黄南藏族自治州", "果洛藏族自治州", "玉树藏族自治州", "海西蒙古族藏族自治州"],
                "新疆": ["乌鲁木齐", "克拉玛依", "吐鲁番地区", "哈密地区", "和田地区", "阿克苏地区", "喀什地区", "克孜勒苏柯尔克孜自治州", "巴音郭楞蒙古自治州", "昌吉回族自治州", "博尔塔拉蒙古自治州", "石河子", "阿拉尔", "图木舒克", "五家渠", "伊犁哈萨克自治州"],
                "上海": ["上海"], //["黄浦区", "卢湾区", "徐汇区", "长宁区", "静安区", "普陀区", "闸北区", "虹口区", "杨浦区", "宝山区", "闵行区", "嘉定区", "松江区", "金山区", "青浦区", "南汇区", "奉贤区", "浦东新区", "崇明县"],
                "天津": ["天津"], //["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "塘沽区", "汉沽区", "大港区", "东丽区", "西青区", "北辰区", "津南区", "武清区", "宝坻区", "静海县", "宁河县", "蓟县"],
                "重庆": ["重庆"], //["渝中区", "大渡口区", "江北区", "南岸区", "北碚区", "渝北区", "巴南区", "长寿区", "双桥区", "沙坪坝区", "万盛区", "万州区", "涪陵区", "黔江区", "永川区", "合川区", "江津区", "九龙坡区", "南川区", "綦江县", "潼南县", "荣昌县", "璧山县", "大足县", "铜梁县", "梁平县", "开县", "忠县", "城口县", "垫江县", "武隆县", "丰都县", "奉节县", "云阳县", "巫溪县", "巫山县", "石柱土家族自治县", "秀山土家族苗族自治县", "酉阳土家族苗族自治县", "彭水苗族土家族自治县"],
                "香港": ["香港"],//["中西区", "湾仔区", "东区", "南区", "深水埗区", "油尖旺区", "九龙城区", "黄大仙区", "观塘区", "北区", "大埔区", "沙田区", "西贡区", "元朗区", "屯门区", "荃湾区", "葵青区", "离岛区"],
                "澳门": ["澳门"], //["花地玛堂区", "圣安多尼堂区", "大堂区", "望德堂区", "风顺堂区", "嘉模堂区", "圣方济各堂区", "路凼"],
                "台湾": ["台湾"], //["台北市", "高雄市", "台北县", "桃园县", "新竹县", "苗栗县", "台中县", "彰化县", "南投县", "云林县", "嘉义县", "台南县", "高雄县", "屏东县", "宜兰县", "花莲县", "台东县", "澎湖县", "基隆市", "新竹市", "台中市", "嘉义市", "台南市"]
            };

function isMobile(str) {
    var re = /^1\d{10}$/;
    if (re.test(str)) {
        return true;
    }
    return false;
}

function validate(user){
    if(user.name.length < 1){
        alert('请填写 姓名');
        return false;
    }

    if(user.title.length < 1){
        alert('请填写 标题');
        return false;
    }

    if(user.service.length < 1){
        alert('请填写 服务项目');
        return false;
    }

    if(user.introduce.length < 1){
        alert('请填写 个人简介');
        return false;
    }

    if(user.mobile.length != 11 || !isMobile(user.mobile)){
        alert('请填写正确的手机号码');
        return false;
    }
    return true;
}

export default {
    components: {xfooter, FileUpload},
    data () {
        return {
            user: {},
            prov: '',
            ucity: '',
            citys: [],
            
            headers: {},
            method: 'POST',
            action: apiUrl + '/user/avatar',
            myFiles: []
        }       
    },
    ready: function () {
        setContainerMinHeight()
        var uid = sessionStorage.getItem('uid');
        this.$http.get(apiUrl + '/user/info/' + uid).then(function (res) {
            if(res.body.code != 0){
                console.log('load info failed');
                console.log(res.body);
                return;
            }
            
            this.$set('user', res.body.data);
            this.$set('prov', res.body.data.prov);
            this.$set('ucity', res.body.data.city);
            this.$set('citys', cities[res.body.data.prov]);

        }, function (res) {
            console.log(res)
        });
    },
    methods: {
        post: function(){
            console.log('post info')
            var user = this.$get('user');
            if(!validate(user)){
                return;
            }
            user.prov = this.prov;
            user.city = this.ucity;
            this.$http.post(apiUrl + '/user/info/', user).then(function (res) {
                if(res.body.code != 0){
                    console.log('post info failed');
                    console.log(res.body)
                }
                alert("更新成功");                
            }, function (res) {
                console.log(res)
            });
        },
        
        uploadFile: function() {
            
            var files = document.getElementById('upload').files;
            console.log('start upload' + files)
            if(!files){
                return;
            }
            var file = files[0];
            console.log(file);
            var form = new FormData();
            var xhr = new XMLHttpRequest();
            var uid = sessionStorage.getItem('uid');
            form.append('Content-Type', 'application/octet-stream');
            form.append('uid', uid);
            form.append('fname', encodeURIComponent(file.name));
            form.append('file', file);
            xhr.onreadystatechange = function() {
                if (xhr.readyState < 4) {
                    return;
                }
                if (xhr.status < 400) {
                    var res = JSON.parse(xhr.responseText);
                    console.log(xhr.responseText);
                } else {
                    var err = JSON.parse(xhr.responseText);
                    err.status = xhr.status;
                    err.statusText = xhr.statusText;
                    console.log(err)
                }
            }.bind(this);

            xhr.onerror = function() {
                var err = JSON.parse(xhr.responseText);
                err.status = xhr.status;
                err.statusText = xhr.statusText;
                reject(err);
            }.bind(this);

            xhr.open("POST", this.action, true);
            var token = sessionStorage.getItem('token');
            if(token){
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            }
            xhr.send(form);
        }
    },
    watch: {
        prov: function(val) {
            this.$set('citys', cities[val]);
            this.$set('ucity', cities[val][0]);
        }
    }
}

</script>


<style scoped>
    #input-file {
    float: right;
    padding-right: 10px;
    position: relative; /* 保证子元素的定位 */
    width: 100px;
    height: 30px;
    background: #eee;
    border: 1px solid #ccc;
    text-align: center;
    cursor: pointer;
}

#text {
    display: inline-block;
    color: #666;
    /*font-size: 18px;*/
}

#upload {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 120px; /* 宽高和外围元素保持一致 */
    height: 30px;
    opacity: 0;
    -moz-opacity: 0;  /* 兼容老式浏览器 */
    filter: alpha(opacity=0); /* 兼容IE */
}
</style>