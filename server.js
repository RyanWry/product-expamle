/**
 * Created by Administrator on 2016/9/20 0020.
 */
var koa = require('koa');
var app = koa();
var router = require('koa-router')();
var http = require("http");
var path = require('path');

app.use(require('koa-static')(path.join(__dirname, './')));

router.get('/banners', function *() {
    this.body = ['http://jiepai-1.img-cn-hangzhou.aliyuncs.com//media/6crSw7KA2nM5ntYatDaFipT2bdxSf8EP1484711324833.jpg',
        'http://image.jiepaiapp.com/media/EDw42zMRniykMiP4tCNGPTpkz3rBQhWZ1484711172824.jpg',
        'http://image.jiepaiapp.com/media/fJHiyC2YhatSSS3P5jsMcjjHCiybHJBC1483928809304.jpg']
});

router.get('/products', function *() {
    this.body = [
        {
            "Title": "肯达尔·詹娜 (Kendall Jenner) 9月7日在纽约出街，穿一身自家品牌蛮吸睛！",
            "Picture": "http://jiepai-1.img-cn-hangzhou.aliyuncs.com/media/Pk6pPA63AyC7WfHAzhmb6sXPbtdG45XB1474445291328.jpg@6-0-587-880a%7C587x587-2rc%7C336w_336h",
        },
        {
            "Title": "美妆Icon养成记Vol.16：从魔法师到联合国妇女署亲善大使，Emma Watson的学霸女神之路！",
            "Picture": "http://jiepai-1.img-cn-hangzhou.aliyuncs.com/media/nY7dCPC5JhRwhzkmW4GdmjRQJxW7d6WR1474445132346.jpg@34-0-533-800a%7C533x533-2rc%7C336w_336h",
        },
        {
            "Title": "32岁的安妮·海瑟薇(Anne Hathaway)即将晋升为准妈妈！挺着隆起的小腹出街难掩怀孕的喜悦",
            "Picture": "http://jiepai-1.img-cn-hangzhou.aliyuncs.com/media/HXWDDtHPpmsEQZA8RFi5ade8AAE8555c1474444647389.jpg@1-0-599-899a%7C599x599-2rc%7C336w_336h",
        },
        {
            "Title": "白皇后黑化绿茶婊？明星珠宝个人Show之Anne Hathaway：演的了软妹当的了御姐，“安公主”转眼间美了15年！",
            "Picture": "http://jiepai-1.img-cn-hangzhou.aliyuncs.com/media/WJZYGDRm5T4kiPmNyR6QiJ4ihKKb5mt61474444141828.jpg@0-0-600-900a%7C600x600-2rc%7C336w_336h",
        },
        {
            "Title": "真正的女神，都能在逆境中把自己活成女王！像她们一样又美又励志你也可以！",
            "Picture": "http://jiepai-1.img-cn-hangzhou.aliyuncs.com/media/jaw6ws3ZfpZxGAAPeeypyBYADZNPBYsP1474443783552.jpg@0-0-500-750a%7C500x500-2rc%7C336w_336h",
        },
        {
            "Title": "萌炸！安妮·海瑟薇新生Baby的正脸照来啦，肉肉小脸蛋+无辜表情有没有让你瞬间被圈粉？",
            "Picture": "http://jiepai-1.img-cn-hangzhou.aliyuncs.com/media/6d2E83MtFiyDXmjiXdsicsacxitctwDd1474443247043.jpg@9-0-583-874a%7C583x583-2rc%7C336w_336h",
        },
        {
            "Title": "CPB肌肤之钥 (Cle de Peau Beaute) 代言人阿曼达·谢弗雷德 (Amanda Seyfried) 莅临东方巴黎-上海",
            "Picture": "http://jiepai-1.img-cn-hangzhou.aliyuncs.com/media/nAi5hEc2wdRDYpaXR3Xdtz8JfQYFm45Z1474442657222.jpg@0-0-600-900a%7C600x600-2rc%7C336w_336h",
        },
        {
            "Title": "嫌自己皮肤黑，身材壮？显瘦妙招得跟她学！博主配饰私藏之Peony Lim：做心机Girl，鞋包墨镜小礼帽都不能少",
            "Picture": "http://jiepai-1.img-cn-hangzhou.aliyuncs.com/media/3aWtFXJ4xsZpKafpaEs53WMKMfrtxYM31474442062601.jpg@0-0-600-900a%7C600x600-2rc%7C336w_336h",
        },
        {
            "Title": "趁着这个微凉的初秋，来尝试一下上暖下凉的装扮趁着这个微凉的初秋，来尝试一下上暖下凉的装扮趁着这个微凉的初秋，来尝试一下上暖下凉的装扮趁着这个微凉的初秋，来尝试一下上暖下凉的装扮趁着这个微凉的初秋，来尝试一下上暖下凉的装扮趁着这个微凉的初秋，来尝试一下上暖下凉的装扮趁着这个微凉的初秋，来尝试一下上暖下凉的装扮",
            "Picture": "http://jiepai-1.img-cn-hangzhou.aliyuncs.com/media/Z6MXHx5tw8b45WZpeMftycBGmRdRBCcY1476765687816.jpg@0-0-597-897a%7C597x597-2rc%7C336w_336h",
        },
        {
            "Title": "趁着这个微凉的初秋，来尝试一下上暖下凉的装扮",
            "Picture": "http://jiepai-1.img-cn-hangzhou.aliyuncs.com/media/BTmnbW8cKcmAmBr7aNJEpk3besWpHZ5d1474353916080.jpg@0-0-853-1280a%7C640w_960h%7C640x640-2rc%7C336w_336h",
        }
    ]
});


app.use(router.routes()).use(router.allowedMethods());

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('server listening on %d, in %s mode', port, process.env.NODE_ENV);
});