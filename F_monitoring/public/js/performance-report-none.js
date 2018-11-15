/*!
 * performance-report Javascript Library 0.0.1
 * https://github.com/wangweianger/web-performance-report
 * Date : 2018-04-18
 * auther :zane
 */
if(typeof require === 'function' && typeof exports === "object" && typeof module === "object") {
    module.exports = Performance
}else{
    window.Performance = Performance
}

window.ERRORLIST = [];
window.ADDDATA   = {};
Performance.addError=function(err){
    err = {
        method:'GET',
        msg:err.msg,
        n:'js',
        data:{
            col:err.col,
            line:err.line,
            resourceUrl:err.resourceUrl
        }
    }
    ERRORLIST.push(err)
}
Performance.addData = function(fn){fn&&fn(ADDDATA)};

function randomString(len) {
　　len = len || 10;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (let i = 0; i < len; i++) {
　　　　pwd = pwd + $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd + new Date().getTime();
}
window.ReportData = null;
// web msgs report function
function Performance(option,fn){try{  
    let opt = {
        // 上报地址
        domain:'http://localhost/api',
        // 脚本延迟上报时间
        outtime:600,
        // ajax请求时需要过滤的url信息
        filterUrl:['http://localhost:35729/livereload.js?snipver=1', 'http://localhost:8000/sockjs-node/info'],
        // 是否上报页面性能数据
        isPage:true,
        // 是否上报ajax性能数据
        isAjax:true,
        // 是否上报页面资源数据
        isResource:true,
        // 是否上报错误信息
        isError:true,
        // 提交参数
        add:{},
    }
    opt = Object.assign(opt,option);
    let conf = {
        //资源列表 
        resourceList:[],
        // 页面性能列表
        performance:{},
        // 错误列表
        errorList:[],
        // 页面fetch数量
        fetchNum:0,
        // ajax onload数量
        loadNum:0,
        // 页面ajax数量
        ajaxLength:0,
        // 页面fetch总数量
        fetLength:0,
        // 页面ajax信息
        ajaxMsg:[],
        // ajax成功执行函数
        goingType:'',
        // 是否有ajax
        haveAjax:false,
        // 是否有fetch
        haveFetch:false,
        // 来自域名
        preUrl:document.referrer&&document.referrer!==location.href?document.referrer:'',
    }
    // error default
    let errordefo = {
        t:'',   
        n:'js',
        msg:'',  
        data:{}
    };

    // error上报
    if(opt.isError) _error();

    // 获得markpage
    function markUser(){
        let markUser = sessionStorage.getItem('ps_markUser')||'';
        if(!markUser){
            markUser = randomString();
            sessionStorage.setItem('ps_markUser',markUser);
        }
        return markUser;
    }

    // 获得Uv
    function markUv(){
        const date = new Date();
        let markUv = localStorage.getItem('ps_markUv')||'';
        const datatime = localStorage.getItem('ps_markUvTime')||'';
        const today = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()+' 23:59:59';
        if( (!markUv && !datatime) || (date.getTime() > datatime*1) ){
            markUv = randomString();
            localStorage.setItem('ps_markUv',markUv);
            localStorage.setItem('ps_markUvTime',new Date(today).getTime());
        }
        return markUv;
    }

    // report date
    ReportData =function(){
        setTimeout(()=>{
            if(opt.isPage) perforPage();
            if(opt.isResource || opt.isAjax) perforResource();
            if(ERRORLIST&&ERRORLIST.length) conf.errorList = conf.errorList.concat(ERRORLIST)
            let w = document.documentElement.clientWidth || document.body.clientWidth;
            let h = document.documentElement.clientHeight || document.body.clientHeight;

            let result = {
                time:new Date().getTime(),
                preUrl:conf.preUrl,
                errorList:conf.errorList,
                performance:conf.performance,
                resourceList:conf.resourceList,
                addData:ADDDATA,
                markUser:markUser(),
                markUv:markUv(),
                screenwidth:w,
                screenheight:h,
            }
            result = Object.assign(result,opt.add)
            fn&&fn(result)
            if(!fn && window.fetch){
                fetch(opt.domain,{ 
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    type:'report-data',
                    body:JSON.stringify(result)
                })
            }
            clear();
        },opt.outtime)
    }

    // 统计页面性能
    function perforPage(){
        if (!window.performance) return;
        let timing = performance.timing
        conf.performance = {
            // DNS解析时间
            dnst:timing.domainLookupEnd-timing.domainLookupStart || 0,  
            //TCP建立时间
            tcpt:timing.connectEnd-timing.connectStart || 0, 
            // 白屏时间  
            wit:timing.responseStart-timing.navigationStart || 0, 
            //dom渲染完成时间
            domt:timing.domContentLoadedEventEnd-timing.navigationStart || 0,  
            //页面onload时间
            lodt:timing.loadEventEnd - timing.navigationStart || 0, 
            // 页面准备时间 
            radt:timing.fetchStart-timing.navigationStart || 0, 
            // 页面重定向时间
            rdit:timing.redirectEnd - timing.redirectStart || 0, 
            // unload时间
            uodt:timing.unloadEventEnd - timing.unloadEventStart || 0,
            //request请求耗时
            reqt:timing.responseEnd - timing.requestStart || 0, 
            //页面解析dom耗时
            andt:timing.domComplete - timing.domInteractive || 0, 
        }
    }

    // 统计页面资源性能
    function perforResource(){
        if (!window.performance && !window.performance.getEntries) return false;
        let resource = performance.getEntriesByType('resource')

        let resourceList = [];
        if(!resource && !resource.length) return resourceList;

        resource.forEach((item)=>{
            if(!opt.isAjax && (item.initiatorType == 'xmlhttprequest' || item.initiatorType == 'fetchrequest')) return;
            if(!opt.isResource && (item.initiatorType != 'xmlhttprequest' && item.initiatorType !== 'fetchrequest')) return;
            let json = {
                name:item.name,
                method:'GET',
                type:item.initiatorType,
                duration:item.duration.toFixed(2)||0,
                decodedBodySize:item.decodedBodySize||0,
                nextHopProtocol:item.nextHopProtocol,
            }
            if(conf.ajaxMsg && conf.ajaxMsg.length){
                for(let i=0,len=conf.ajaxMsg.length;i<len;i++){
                    if(conf.ajaxMsg[i].url===item.name){
                        json.method = conf.ajaxMsg[i].method||'GET'
                        json.type   = conf.ajaxMsg[i].type || json.type
                    }
                }
            }
            resourceList.push(json)
        })
        conf.resourceList = resourceList
    }

    // 拦截js error信息
    function _error(){
        // img,script,css,jsonp
        window.addEventListener('error',function(e){
            let defaults    = Object.assign({},errordefo);
            defaults.n      = 'resource'
            defaults.t      = new Date().getTime();
            defaults.msg    = e.target.localName+' is load error';
            defaults.method = 'GET'
            defaults.data   = {
               target: e.target.localName,
               type: e.type,
               resourceUrl:e.target.href || e.target.currentSrc,
            };
            if(e.target!=window) conf.errorList.push(defaults)
        },true);
        // js
        window.onerror = function(msg,_url,line,col,error){
            let defaults        = Object.assign({},errordefo);
            setTimeout(function(){
                col = col || (window.event && window.event.errorCharacter) || 0;
                defaults.msg    = error && error.stack ?error.stack.toString():msg
                defaults.method = 'GET'
                defaults.data   = {
                    resourceUrl:_url,
                    line:line,
                    col:col
                };
                defaults.t      = new Date().getTime();
                conf.errorList.push(defaults)
            },0);
        };
    }
    function clear(){
        if(window.performance && window.performance.clearResourceTimings){
            performance.clearResourceTimings();
            conf.performance    = {}
            conf.errorList      = []
            conf.preUrl         = ''
            conf.resourceList   = ''
            conf.page           = location.href
            ERRORLIST           = []
            ADDDATA             = []
        }
    }
}catch(err){}}