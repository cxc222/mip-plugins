/**
 * @file mip-u51-ad.js
 * @author u51.com
 */

/**
 * @author: u51.com
 * @date:  2016-09-13
 * @contact: u51.com
 */
define('mip-u51-ad', ['require', 'customElement', 'zepto'], function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    var customElem = require('customElement').create();

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var element = this.element;

        console.log($(element).attr("data-keyword"));
    };

    /*var deadline = new Date(2016,9,17,19,22,34);    // 指定时间 参数 参考 Date 文档

    //定时启动
    setInterval(function(){
        var curTime = new Date().getTime(); // 当前时间戳

        var time =  deadline.getTime()-curTime; // 指定时间 - 当前时间 = 剩余时间 (TODO::应该考虑负数问题)
        var remainTime  = parseInt(time/1000);  // 剩余时间,以秒计

        var day = parseInt( remainTime/(24*3600) ); // 得到 天
        var hour = parseInt( (remainTime-day*24*3600)/3600 ); // 得到 小时
        var minute =  parseInt((remainTime-day*24*3600-hour*3600)/60); // 得到 分
        var sec = parseInt(remainTime%60); // 得到 秒

        console.log(day+"天"+hour+"时"+minute+"分"+sec+"秒"); // 打印
    },50);*/

    var show = function(ad, num, type){
        $.get("http://credit.u51.com/gg/getAd?callback=?", {
            ad: ad,
            num: num,
            type: type
        }, function(res){
            console.log(res);
        });
    };

    // 创建元素回调
    customElem.prototype.createdCallback = function () {
        console.log('created');
        var element = this.element;
        var ad = $(element).attr("data-ad");
        var num = $(element).attr("data-num");
        show(ad, num);
    };
    // 向文档中插入节点回调
    customElem.prototype.attachedCallback = function () {
        console.log('attached');
    };
    // 从文档中移出节点回调
    customElem.prototype.detachedCallback = function () {
        console.log('detached');
    };
    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.inviewCallback = function () {
        console.log('first in viewport');
    };
    // 进入或离开可视区回调，每次状态变化都会执行
    customElem.prototype.viewportCallback = function (isInView) {
        // true 进入可视区;false 离开可视区
        console.log(isInView);
    };
    // 控制inviewCallback是否提前执行
    // 轮播图片等可使用此方法提前渲染
    customElem.prototype.prerenderAllowed = function () {
        // 判断条件，可自定义。返回值为true时,inviewCallback会在元素build后执行
        return !!this.isCarouselImg;
    };

    return customElem;
});

require(['mip-u51-ad'], function (u51Ad) {
    // 若组件需要有 css,自测时先用字符串，提交过来需要使用 __inline('./组件名称.css'),一个 css 文件
    // MIP.css.mipu51ad = __inline('./mip-u51-ad.css');
    MIP.css.mipu51ad = "";
    // 注册组件,若有 css 才加第三个参数，否则不要第三个参数
    MIP.registerMipElement('mip-u51-ad', u51Ad, MIP.css.mipu51ad);
});
