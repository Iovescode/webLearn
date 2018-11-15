'use strict';

const Service = require('egg').Service;

class WebPerformanceScriptService extends Service {
    // 获得上报脚本
    async getPerformanceScript(ctx) {
        const query = ctx.request.query;
        const appId = query.appId;
        const USESDK = query.USESDK || 'FALSE';

        return USESDK === 'FALSE' ?
            await this.reduceScriptText(appId) : '';
    }

    // 生成性能上报脚本
    async reduceScriptText(appId) {
        if (!appId) throw new Error('获得网页上报脚本：系统标识appId不能为空');
        // 获得系统缓存信息
        const system = await this.service.web.webSystem.getSystemForAppId(appId);
        if (!system.app_id) throw new Error('获得网页上报脚本：appId对应的系统缓存无数据');

        if (system.is_use !== 0) return 'window.Performance = () => {}';

        const script = `
        "use strict";
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
        if (typeof require === 'function' && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object") {
            module.exports = Performance;
        } else {
            window.Performance = Performance;
        }
        window.ERRORLIST = [];
        window.ADDDATA = {};
        Performance.addError = function (err) {
            err = {
                method: 'GET',
                msg: err.msg,
                n: 'js',
                data: {
                    col: err.col,
                    line: err.line,
                    resourceUrl: err.resourceUrl
                }
            };
            ERRORLIST.push(err);
        };
        Performance.addData = function (fn) {
            fn && fn(ADDDATA);
        };
        function randomString(len) {
            len = len || 10;
            var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
            var maxPos = $chars.length;
            var pwd = '';
            for (var i = 0; i < len; i++) {
                pwd = pwd + $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd + new Date().getTime();
        }
        function Performance(option, fn) {
            try {
            var markUser = function markUser() {
                var markUser = sessionStorage.getItem('ps_markUser') || '';
                if (!markUser) {
                    markUser = randomString();
                    sessionStorage.setItem('ps_markUser', markUser);
                }
                return markUser;
            };
            var markUv = function markUv() {
                var date = new Date();
                var markUv = localStorage.getItem('ps_markUv') || '';
                var datatime = localStorage.getItem('ps_markUvTime') || '';
                var today = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' 23:59:59';
                if (!markUv && !datatime || date.getTime() > datatime * 1) {
                    markUv = randomString();
                    localStorage.setItem('ps_markUv', markUv);
                    localStorage.setItem('ps_markUvTime', new Date(today).getTime());
                }
                return markUv;
            };
            var reportData = function reportData() {
                setTimeout(function () {
                    if (opt.isPage) perforPage();
                    if (opt.isResource || opt.isAjax) perforResource();
                    if (ERRORLIST && ERRORLIST.length) conf.errorList = conf.errorList.concat(ERRORLIST);
                    var w = document.documentElement.clientWidth || document.body.clientWidth;
                    var h = document.documentElement.clientHeight || document.body.clientHeight;

                    var result = {
                        time: new Date().getTime(),
                        preUrl: conf.preUrl,
                        errorList: conf.errorList,
                        performance: conf.performance,
                        resourceList: conf.resourceList,
                        addData: ADDDATA,
                        markUser: markUser(),
                        markUv: markUv(),
                        screenwidth: w,
                        screenheight: h,
                        appId:'${appId}',
                    };
                    result = Object.assign(result, opt.add);
                    fn && fn(result);
                    if (!fn && window.fetch) {
                        fetch(opt.domain, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            type: 'report-data',
                            body: JSON.stringify(result)
                        });
                    }
                }, opt.outtime);
            };
            var getLargeTime = function getLargeTime() {
                if (conf.haveAjax && conf.haveFetch && loadTime && ajaxTime && fetchTime) {
                    void 0;
                    reportData();
                } else if (conf.haveAjax && !conf.haveFetch && loadTime && ajaxTime) {
                    void 0;
                    reportData();
                } else if (!conf.haveAjax && conf.haveFetch && loadTime && fetchTime) {
                    void 0;
                    reportData();
                } else if (!conf.haveAjax && !conf.haveFetch && loadTime) {
                    void 0;
                    reportData();
                }
            };
            var perforPage = function perforPage() {
                if (!window.performance) return;
                var timing = performance.timing;
                conf.performance = {
                    dnst: timing.domainLookupEnd - timing.domainLookupStart || 0,
                    tcpt: timing.connectEnd - timing.connectStart || 0,
                    wit: timing.responseStart - timing.navigationStart || 0,
                    domt: timing.domContentLoadedEventEnd - timing.navigationStart || 0,
                    lodt: timing.loadEventEnd - timing.navigationStart || 0,
                    radt: timing.fetchStart - timing.navigationStart || 0,
                    rdit: timing.redirectEnd - timing.redirectStart || 0,
                    uodt: timing.unloadEventEnd - timing.unloadEventStart || 0,
                    reqt: timing.responseEnd - timing.requestStart || 0,
                    andt: timing.domComplete - timing.domInteractive || 0
                };
            };
            var perforResource = function perforResource() {
                if (!window.performance && !window.performance.getEntries) return false;
                var resource = performance.getEntriesByType('resource');
                var resourceList = [];
                if (!resource && !resource.length) return resourceList;
                resource.forEach(function (item) {
                    if (!opt.isAjax && (item.initiatorType == 'xmlhttprequest' || item.initiatorType == 'fetchrequest')) return;
                    if (!opt.isResource && item.initiatorType != 'xmlhttprequest' && item.initiatorType !== 'fetchrequest') return;
                    var json = {
                        name: item.name,
                        method: 'GET',
                        type: item.initiatorType,
                        duration: item.duration.toFixed(2) || 0,
                        decodedBodySize: item.decodedBodySize || 0,
                        nextHopProtocol: item.nextHopProtocol
                    };
                    if (conf.ajaxMsg && conf.ajaxMsg.length) {
                        for (var i = 0, len = conf.ajaxMsg.length; i < len; i++) {
                            if (conf.ajaxMsg[i].url === item.name) {
                                json.method = conf.ajaxMsg[i].method || 'GET';
                                json.type = conf.ajaxMsg[i].type || json.type;
                            }
                        }
                    }
                    resourceList.push(json);
                });
                conf.resourceList = resourceList;
            };
            var _Ajax = function _Ajax(proxy) {
                window._ahrealxhr = window._ahrealxhr || XMLHttpRequest;
                XMLHttpRequest = function XMLHttpRequest() {
                    this.xhr = new window._ahrealxhr();
                    for (var attr in this.xhr) {
                        var type = "";
                        try {
                            type = _typeof(this.xhr[attr]);
                        } catch (e) {}
                        if (type === "function") {
                            this[attr] = hookfun(attr);
                        } else {
                            Object.defineProperty(this, attr, {
                                get: getFactory(attr),
                                set: setFactory(attr)
                            });
                        }
                    }
                };
                function getFactory(attr) {
                    return function () {
                        var v = this.hasOwnProperty(attr + "_") ? this[attr + "_"] : this.xhr[attr];
                        var attrGetterHook = (proxy[attr] || {})["getter"];
                        return attrGetterHook && attrGetterHook(v, this) || v;
                    };
                }
                function setFactory(attr) {
                    return function (v) {
                        var xhr = this.xhr;
                        var that = this;
                        var hook = proxy[attr];
                        if (typeof hook === "function") {
                            xhr[attr] = function () {
                                proxy[attr](that) || v.apply(xhr, arguments);
                            };
                        } else {
                            var attrSetterHook = (hook || {})["setter"];
                            v = attrSetterHook && attrSetterHook(v, that) || v;
                            try {
                                xhr[attr] = v;
                            } catch (e) {
                                this[attr + "_"] = v;
                            }
                        }
                    };
                }
                function hookfun(fun) {
                    return function () {
                        var args = [].slice.call(arguments);
                        if (proxy[fun] && proxy[fun].call(this, args, this.xhr)) {
                            return;
                        }
                        return this.xhr[fun].apply(this.xhr, args);
                    };
                }
                return window._ahrealxhr;
            };
            var _fetch = function _fetch() {
                if (!window.fetch) return;
                var _fetch = fetch;
                window.fetch = function () {
                    var _arg = arguments;
                    var result = fetArg(_arg);
                    if (result.type !== 'report-data') {
                        clearPerformance();
                        conf.ajaxMsg.push(result);
                        conf.fetLength = conf.fetLength + 1;
                        conf.haveFetch = true;
                    }
                    return _fetch.apply(this, arguments).then(function (res) {
                        if (result.type === 'report-data') return;
                        getFetchTime('success');
                        return res;
                    }).catch(function (err) {
                        if (result.type === 'report-data') return;
                        getFetchTime('error');
                        //error
                        var defaults = Object.assign({}, errordefo);
                        defaults.t = new Date().getTime();
                        defaults.n = 'fetch';
                        defaults.msg = 'fetch request error';
                        defaults.method = result.method;
                        defaults.data = {
                            resourceUrl: result.url,
                            text: err.stack || err,
                            status: 0
                        };
                        conf.errorList.push(defaults);
                        return err;
                    });
                };
            };
            var fetArg = function fetArg(arg) {
                var result = { method: 'GET', type: 'fetchrequest' };
                var args = Array.prototype.slice.apply(arg);
                if (!args || !args.length) return result;
                try {
                    if (args.length === 1) {
                        if (typeof args[0] === 'string') {
                            result.url = args[0];
                        } else if (_typeof(args[0]) === 'object') {
                            result.url = args[0].url;
                            result.method = args[0].method;
                        }
                    } else {
                        result.url = args[0];
                        result.method = args[1].method;
                        result.type = args[1].type;
                    }
                } catch (err) {}
                return result;
            };
            var _error = function _error() {
                // img,script,css,jsonp
                window.addEventListener('error', function (e) {
                    var defaults = Object.assign({}, errordefo);
                    defaults.n = 'resource';
                    defaults.t = new Date().getTime();
                    defaults.msg = e.target.localName + ' is load error';
                    defaults.method = 'GET';
                    defaults.data = {
                        target: e.target.localName,
                        type: e.type,
                        resourceUrl: e.target.href || e.target.currentSrc
                    };
                    if (e.target != window) conf.errorList.push(defaults);
                }, true);
                // js
                window.onerror = function (msg, _url, line, col, error) {
                    var defaults = Object.assign({}, errordefo);
                    setTimeout(function () {
                        col = col || window.event && window.event.errorCharacter || 0;
                        defaults.msg = error && error.stack ? error.stack.toString() : msg;
                        defaults.method = 'GET';
                        defaults.data = {
                            resourceUrl: _url,
                            line: line,
                            col: col
                        };
                        defaults.t = new Date().getTime();
                        conf.errorList.push(defaults);
                    }, 0);
                };
            };
            var ajaxResponse = function ajaxResponse(xhr, type) {
                var defaults = Object.assign({}, errordefo);
                defaults.t = new Date().getTime();
                defaults.n = 'ajax';
                defaults.msg = xhr.statusText || 'ajax request error';
                defaults.method = xhr.method;
                defaults.data = {
                    resourceUrl: xhr.responseURL,
                    text: xhr.statusText,
                    status: xhr.status
                };
                conf.errorList.push(defaults);
            };
            var getFetchTime = function getFetchTime(type) {
                conf.fetchNum += 1;
                if (conf.fetLength === conf.fetchNum) {
                    if (type == 'success') {
                        void 0;
                    } else {
                        void 0;
                    }
                    conf.fetchNum = conf.fetLength = 0;
                    fetchTime = new Date().getTime() - beginTime;
                    getLargeTime();
                }
            };
            var getAjaxTime = function getAjaxTime(type) {
                conf.loadNum += 1;
                if (conf.loadNum === conf.ajaxLength) {
                    if (type == 'load') {
                        void 0;
                    } else if (type == 'readychange') {
                        void 0;
                    } else {
                        void 0;
                    }
                    conf.ajaxLength = conf.loadNum = 0;
                    ajaxTime = new Date().getTime() - beginTime;
                    getLargeTime();
                }
            };
            var clearPerformance = function clearPerformance(type) {
                if (!window.performance && !window.performance.clearResourceTimings) return;
                if (conf.haveAjax && conf.haveFetch && conf.ajaxLength == 0 && conf.fetLength == 0) {
                    clear();
                } else if (!conf.haveAjax && conf.haveFetch && conf.fetLength == 0) {
                    clear();
                } else if (conf.haveAjax && !conf.haveFetch && conf.ajaxLength == 0) {
                    clear();
                }
            };
            var clear = function clear() {
                performance.clearResourceTimings();
                conf.performance = {};
                conf.errorList = [];
                conf.preUrl = '';
                conf.resourceList = '';
                conf.page = location.href;
                ERRORLIST = [];
                ADDDATA = [];
            };
            var opt = {
                domain: 'http://localhost/api',
                outtime: 300,
                filterUrl: ['http://localhost:35729/livereload.js?snipver=1', 'http://localhost:8000/sockjs-node/info'],
                isPage:${system.is_statisi_pages === 0},
                isAjax:${system.is_statisi_ajax === 0},
                isResource:${system.is_statisi_resource === 0},
                isError:${system.is_statisi_error === 0},
                add: {}
            };
            opt = Object.assign(opt, option);
            var conf = {
                resourceList: [],
                performance: {},
                errorList: [],
                fetchNum: 0,
                loadNum: 0,
                ajaxLength: 0,
                fetLength: 0,
                ajaxMsg: [],
                goingType: '',
                haveAjax: false,
                haveFetch: false,
                preUrl: document.referrer && document.referrer !== location.href ? document.referrer : ''
            };var errordefo = {
                t: '',
                n: 'js',
                msg: '',
                data: {}
            };
            var beginTime = new Date().getTime();
            var loadTime = 0;
            var ajaxTime = 0;
            var fetchTime = 0;
            if (opt.isError) _error();
            addEventListener("load", function () {
                loadTime = new Date().getTime() - beginTime;
                getLargeTime();
            }, false);
            if (opt.isAjax || opt.isError) _fetch();
            if (opt.isAjax || opt.isError) _Ajax({
                onreadystatechange: function onreadystatechange(xhr) {
                    if (xhr.readyState === 4) {
                        setTimeout(function () {
                            if (conf.goingType === 'load') return;
                            conf.goingType = 'readychange';

                            getAjaxTime('readychange');

                            if (xhr.status < 200 || xhr.status > 300) {
                                xhr.method = xhr.args.method;
                                ajaxResponse(xhr);
                            }
                        }, 600);
                    }
                },
                onerror: function onerror(xhr) {
                    getAjaxTime('error');
                    if (xhr.args) {
                        xhr.method = xhr.args.method;
                        xhr.responseURL = xhr.args.url;
                        xhr.statusText = 'ajax request error';
                    }
                    ajaxResponse(xhr);
                },
                onload: function onload(xhr) {
                    if (xhr.readyState === 4) {
                        if (conf.goingType === 'readychange') return;
                        conf.goingType = 'load';
                        getAjaxTime('load');
                        if (xhr.status < 200 || xhr.status > 300) {
                            xhr.method = xhr.args.method;
                            ajaxResponse(xhr);
                        }
                    }
                },
                open: function open(arg, xhr) {
                    if (opt.filterUrl && opt.filterUrl.length) {
                        var begin = false;
                        opt.filterUrl.forEach(function (item) {
                            if (arg[1].indexOf(item) != -1) begin = true;
                        });
                        if (begin) return;
                    }

                    var result = { url: arg[1], method: arg[0] || 'GET', type: 'xmlhttprequest' };
                    this.args = result;

                    clearPerformance();
                    conf.ajaxMsg.push(result);
                        conf.ajaxLength = conf.ajaxLength + 1;
                        conf.haveAjax = true;
                    }
                });
            } catch (err) {}
        }`;
        return script;
    }

    async setSYSTEMredis(appId) {
        const json = {
            is_use: 0,
            slow_page_time: 5,
            slow_js_time: 2,
            slow_css_time: 2,
            slow_img_time: 2,
            slow_ajax_time: 2,
            is_statisi_pages: 0,
            is_statisi_ajax: 0,
            is_statisi_resource: 0,
            is_statisi_system: 0,
            is_statisi_error: 0,
            _id: '5bb47beb779be91d13e91fd6',
            create_time: '2018-10-03T08:20:59.793Z',
            system_domain: 'blog.seosiwei.com',
            system_name: 'zaneblog',
            app_id: 'D3D9B9AA45B56F6E424F57EFB36B063B',
            user_id: [],
            script: '',
            __v: 0,
        };
        this.app.redis.set(appId, JSON.stringify(json));
    }
}

module.exports = WebPerformanceScriptService;
