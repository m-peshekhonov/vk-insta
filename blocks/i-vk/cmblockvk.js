var cmJSFace = cmJSFace || function() {
    (function(n,u,v,w,z,A,B,x,p){function y(a){return a&&typeof a===u&&!(typeof a.length===v&&!a.propertyIsEnumerable(w))}function r(a){return a&&typeof a===u&&typeof a.length===v&&!a.propertyIsEnumerable(w)}function q(a){return a&&"function"===typeof a}function q(a){return a&&"function"===typeof a}function s(a){return q(a)&&a.prototype&&a===a.prototype.constructor}function t(a,c,d){if(r(c))for(var g=c.length;0<=--g;)t(a,c[g],d);else{var d=d||{constructor:1,$super:1,prototype:1,$superb:1},g=s(a),m=s(c),
            b=a.prototype,f,h;if(y(c))for(f in c){h=f;var i=c[f],e=a,j=g,k=b;if(!d||!d.hasOwnProperty(h))e[h]=i,j&&(k[h]=i)}if(m)for(f in h=c.prototype,h){var i=f,e=h[f],j=a,k=g,l=b;if(!d||!d.hasOwnProperty(i))j[i]=e,k&&(l[i]=e)}g&&m&&t(b,c.prototype,d)}}function l(a,c){c||(a=(c=a,0));var d,g,m,b,f,h,i=0,e,j={constructor:1,$singleton:1,$statics:1,prototype:1,$super:1,$superp:1,main:1};f=l.overload;var k=l.plugins,c=("function"===typeof c?c():c)||{};d=c.hasOwnProperty("constructor")?c.constructor:0;g=c.$singleton;
        m=c.$statics;for(b in k)j[b]=1;d=g?{}:d?f?f("constructor",d):d:function(){};f=g?d:d.prototype;for(h=(a=!a||r(a)?a:[a])&&a.length;i<h;){e=a[i++];for(b in e)j[b]||(f[b]=e[b],g||(d[b]=e[b]));for(b in e.prototype)j[b]||(f[b]=e.prototype[b])}for(b in c)j[b]||(f[b]=c[b]);for(b in m)d[b]=f[b]=m[b];g||(e=a&&a[0]||a,d.$super=e,d.$superp=e&&e.prototype?e.prototype:e);for(b in k)k[b](d,a,c);q(c.main)&&c.main.call(d,d);return d}l.plugins={};p={version:A,Class:l,extend:t,isMap:y,isArray:r,isFunction:q,isString:function(a){return"[object String]"===
            z.apply(a)},isClass:s};"undefined"!==typeof module&&module.exports?module.exports=p:(x=n.Class,n.Class=l,n.jsface=p,p.noConflict=function(){n.Class=x})})(this,"object","number","length",Object.prototype.toString,"2.1.1");
    jsface.noConflict();
    return jsface;
}();


var cm = cm || {};

cm.Utils = cmJSFace.Class({

    proxy: function(context, args, functionName) {
        if (typeof args === 'function') {
            return function() {
                args.apply(context, arguments);
            }
        }
        else {
            return function() {
                var mergedArgs=args.concat(arguments);
                functionName.apply(context, mergedArgs);
            }
        }

    },

    dumpObj: function( obj, name, indent, depth ) {
        var MAX_DUMP_DEPTH = 10;
        if ( depth > MAX_DUMP_DEPTH ) {
            return indent + name + ": <Maximum Depth Reached>\n";
        }

        if ( typeof obj == "object" ) {
            var child = null;
            var output = indent + name + "\n";
            indent += "\t";
            try {
                for ( var item in obj ) {
                    if (obj.hasOwnProperty(item)) {
                        try {
                            child = obj[item];
                        } catch( e ) {
                            child = "<Unable to Evaluate>";
                        }
                        if ( typeof child == "object" ) {
                            output += dumpObj( child, item, indent, depth + 1 );
                        } else {
                            output += indent + item + ": " + child + "\n";
                        }
                    }
                }
            }
            catch(error) {
                output += "Error dumping object: "+error;
            }
            return output;
        } else {
            return obj;
        }
    },

    extend: function(){
        var result = {};
        for (var i = 0, len = arguments.length; i < len; i++) {
            var obj = arguments[i];
            if (obj!=undefined) {
                for (var attrname in obj) {
                    if (obj.hasOwnProperty(attrname)) {
                        result[attrname] = obj[attrname];
                    }
                }
            }
        }
        return result;
    },

    base64encode: function(str) {
        // Символы для base64-преобразования
        var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var b64encoded = '';
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;

        for (var i=0; i<str.length;) {
            chr1 = str.charCodeAt(i++);
            chr2 = str.charCodeAt(i++);
            chr3 = str.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);

            enc3 = isNaN(chr2) ? 64:(((chr2 & 15) << 2) | (chr3 >> 6));
            enc4 = isNaN(chr3) ? 64:(chr3 & 63);

            b64encoded += b64chars.charAt(enc1) + b64chars.charAt(enc2) +
                b64chars.charAt(enc3) + b64chars.charAt(enc4);
        }
        return b64encoded;
    },



    map: function(elems, callback) {
        var value,
            i = 0,
            length = elems.length,
            ret = [];

        for ( ; i < length; i++ ) {
            value = callback( elems[ i ], i );

            if ( value != null ) {
                ret[ ret.length ] = value;
            }
        }

        return ret;
    }

});

cm.Logger = cmJSFace.Class({

    $statics: {
        TRACE: 10,
        DEBUG: 20,
        INFO: 30,
        WARN: 40,
        ERROR: 50
    },

    setLogLevel : function(logLevel) {
        this.logLevel = logLevel;
    },

    dump : function(msg, levelLimit) {
        if (this.logLevel<=levelLimit) {
            if (window.console) {
                console.log(msg);
            }
        }
    },

    log : function(msg){
        this.dump(msg, this.logLevel);
    },


    info : function(msg) {
        this.dump("INFO: "+msg, cm.Logger.INFO);
    },
    warn : function(msg) {
        this.dump("WARN: "+msg, cm.Logger.WARN);
    },
    error : function(msg) {
        this.dump("ERROR: "+msg, cm.Logger.ERROR);
    },
    debug : function(msg) {
        this.dump("DEBUG: "+msg, cm.Logger.DEBUG);
    },
    trace : function(msg) {
        this.dump("TRACE: "+msg, cm.Logger.TRACE);
    },
    isInfoEnabled : function() {
        return this.logLevel <= cm.Logger.INFO;
    },
    isWarnEnabled : function() {
        return this.logLevel <= cm.Logger.WARN;
    },
    isErrorEnabled : function() {
        return this.logLevel <= cm.Logger.ERROR;
    },
    isDebugEnabled : function() {
        return this.logLevel <= cm.Logger.DEBUG;
    },
    isTraceEnabled : function() {
        return this.logLevel <= cm.Logger.TRACE;
    }
});

cm.VkChecker = cmJSFace.Class([cm.Logger, cm.Utils], {


    constructor: function() {
        this.requests = 0;
        this.failInterval = 1000;
    }
,
    check: function(options, callback) {
        if (this.isInfoEnabled()) {
            this.info( "Request VK info" );
        }

        if ( options['is_app_user'] == '1' ) {

            if ( !options["viewer_id"] ) {
                if (this.isWarnEnabled()) {
                    this.warn( "No param 'viewer_id' found." );
                }
            }

            //noinspection JSUnresolvedFunction
            if (this.isTraceEnabled()) {
                this.trace("Invoking VK.api");
            }
            VK.api(
                    'execute',
                    {
                        'code':'var profiles = API.getProfiles({"uids":"' + options["viewer_id"] + '","fields":"uid,first_name,last_name,sex,bdate,city,country"});' +
                                'var profile = profiles[0];' +
                                'var cityId = profile.city;' +
                                'var countryId = profile.country;' +
                                'var cities = API.places.getCityById({"cids":[cityId] });' +
                                'var countries = API.places.getCountryById({"cids":[countryId] });' +
                                'var friends = API.friends.get({"count":100,"fields":"bdate" });' +
                                'return {' +
                                '   "profile": profile,' +
                                '   "countryName": countries[0].name,' +
                                '   "cityName": cities[0].name,' +
                                '   "friendsAges": friends' +
                                '};'
                    }
                    ,

                    this.proxy(this, function (vkResult) {

                            if (this.isTraceEnabled()) {
                                this.trace("Got VK.api result");
                            }

                            if ( vkResult.error ) {

                            if (this.isWarnEnabled()) {
                                this.warn( this.requests + ") Got error response from VK.api. Code: " + vkResult.error.error_code + ", msg: " + vkResult.error.error_msg )
                            }
                            this.requests++;
                            if ( this.requests >= 3 ) {
                                return;
                            }

                            setTimeout( this.proxy(this, function () {
                                if (this.isDebugEnabled()) {
                                    this.debug("Repeat request vk");
                                }
                                this.check(options, callback);
                            }), this.failInterval );
                            return;
                        }

                        var resp = vkResult.response;
                        var profile = resp.profile;
                        var countryName = resp.countryName;
                        var cityName = resp.cityName;

                        var result = {};

                        result['first_name'] = profile && profile.first_name ? profile.first_name : '0';
                        result['last_name'] = profile && profile.last_name ? profile.last_name : '0';
                        result['sex'] = profile && profile.sex ? profile.sex : '0';
                        result['bdate'] = profile && profile.bdate ? profile.bdate : '0';
                        result['city'] = profile && profile.city ? profile.city : '0';
                        result['country'] = profile && profile.country ? profile.country : '0';
                        result['cityName'] = cityName;
                        result['countryName'] = countryName;

                        if (this.isInfoEnabled()) {
                            this.info( "Received VK result:" + result );
                        }

                        callback(result);
                    }
            ));
            if (this.isTraceEnabled()) {
                this.trace("Finished invoking VK.api");
            }

        } else {
            if (this.isWarnEnabled()) {
                this.warn( "WARN: No param 'is_app_user' found." );
            }
            callback({});
        }

    }


});

cm.FP = cmJSFace.Class([cm.Logger, cm.Utils], {


    invoke: function(opt) {

        var self = this;
        this.logLevel = cm.Logger.INFO;

        var swf = cm.executors.Storage.swfobject.getFlashPlayerVersion();

        var randomnumber=Math.floor(Math.random()*2000000);

        var params = {
            "quality" : 'high',
            "bgcolor" : "#F7F7F7",
            "allowscriptaccess" : "always",
            "scale" : "noscale",
            "salign" : "tl",
            "align" : 'l',
            "wmode" : 'opaque'
        };
        var xiSwfUrlStr = "${expressInstallSwf}";


        var fpDivWrapper = window.document.createElement("div");
        fpDivWrapper.style.position = "absolute";
        fpDivWrapper.style.left = "-1000px";
        fpDivWrapper.style.width = "1px";
        fpDivWrapper.style.height = "1px";
        fpDivWrapper.id="cm_fp_wrapper_"+randomnumber;
        var fpDiv = window.document.createElement("div");
        fpDiv.id="cm_fp_placeholder_"+randomnumber;
        fpDivWrapper.appendChild(fpDiv);

        window.document.body.appendChild(fpDivWrapper);


        var constructFP = this.proxy(this, function(flashRes) {

            var fpSWF = document.getElementById(fpDiv.id);

            var callback = 'cm_fp_lso'+Math.floor(Math.random()*100000);
            window[callback] = this.proxy(this, function(lso) {
                this.info("LSO: "+lso);
            });



            var flashVer = flashRes!=null ? flashRes.version : "undefined";
            var fonts = flashRes!=null ? flashRes.fonts : [];

            var fp = [
                navigator.userAgent,
                [ screen.width, screen.height, screen.colorDepth ].join("x"),
                ( new Date() ).getTimezoneOffset(),
                !!window.sessionStorage,
                !!window.localStorage,
                flashVer,
                fonts.join("::"),
                self.map( navigator.plugins, function(p) {
                    return [
                        p.name,
                        p.description,
                        self.map( p, function(mt) {
                            return [ mt.type, mt.suffixes ].join("~");
                        }).join(",")
                    ].join("::");
                }).join(";")
            ].join("###");


            var fpEncoded = this.base64encode(fp);
            this.trace("FP: "+fp);


            var canvas = document.createElement("canvas");
            canvas.width = 6;
            canvas.height = 1;
            if (canvas && canvas.getContext) {

                this.debug("FP using canvas mode");
                var img = new Image();
                img.style.position = "absolute";
//                img.style.left = "-1000px";
                img.style.width = "6px";
                img.style.height = "1px";
                img.crossOrigin = ''; // no credentials flag. Same as img.crossOrigin='anonymous'

                img.onload = this.proxy(this, function() {

                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    // get CanvasPixelArray from  given coordinates and dimensions
                    var imgd = ctx.getImageData(0, 0, 6, 1),
                        pix = imgd.data, i, n;

                    var pngData = [];

                    // loop over each pixel to get the "RGB" values (ignore alpha)
                    var pos = 0;
                    for (i = 0, n = pix.length; i < n; i += 4) {
                        if (pos>=16) {
                            break;
                        }
                        pngData[pos++] = pix[i];
                        pngData[pos++] = pix[i + 1];
                        pngData[pos++] = pix[i + 2];
                    }

                    try {
                        fpSWF.setLSOValue(unparse(pngData));
                    } catch (e) {
                        this.warn("Can't set LSO: "+e)
                    }


                });
//                img.src = "http://img.creara-media.ru/v3/fp?ls="+(flashRes!=null ? flashRes.lso : "0" )+"&fp="+fpEncoded;
                img.src = opt["rhost"]+"/fp?ls="+(flashRes!=null ? flashRes.lso : "0" )+"&fp="+fpEncoded;
            }
            else {

                this.debug("FP using plain mode");
                var img = window.document.createElement("img");
                img.src = opt["rhost"]+"/fp?fp="+fpEncoded;
                img.style.position = "absolute";
                img.style.left = "-1000px";
                img.style.width = "1px";
                img.style.height = "1px";
                window.document.body.appendChild(img);
            }


        });


        if (swf) {
            window["cm_fp_cb_"+fpDiv.id] = constructFP;
            cm.executors.Storage.swfobject.embedSWF("//img.creara-media.ru/papirosko/Fp.swf",
                fpDiv.id,
                "1", "1",
                "10.0.0", xiSwfUrlStr, { "cb" : "cm_fp_cb_"+fpDiv.id }, params, {});

        }
        else {
            constructFP(null);
        }



    }

});

var _byteToHex = [];
var _hexToByte = {};
for (var i = 0; i < 256; i++) {
    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
    _hexToByte[_byteToHex[i]] = i;
}

function unparse(buf, offset) {
    var i = offset || 0, bth = _byteToHex;
    return  bth[buf[i++]] + bth[buf[i++]] +
        bth[buf[i++]] + bth[buf[i++]] + '-' +
        bth[buf[i++]] + bth[buf[i++]] + '-' +
        bth[buf[i++]] + bth[buf[i++]] + '-' +
        bth[buf[i++]] + bth[buf[i++]] + '-' +
        bth[buf[i++]] + bth[buf[i++]] +
        bth[buf[i++]] + bth[buf[i++]] +
        bth[buf[i++]] + bth[buf[i++]];
}

cm.executors = cm.executors || {};
cm.executors.Storage = cmJSFace.Class({
    $singleton: true,
    swfobject : function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in window.swfobject){window.swfobject[X]=null}window.swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}(),

    preloaderExecutor : null,
    executors : {}

});

var CMBlockVK = CMBlockVK || cmJSFace.Class([cm.Logger, cm.Utils], {

    preloaderExecutor : null,
    /**
     * Флаг того, что new CMBlockVK вызван более одного раза. Все инстансы, кроме первого, выставляют его в true.
     */
    doubleInitialized : false,

    constructor: function(options) {

        var opt = {
            "log.level": cm.Logger.INFO,
            "unknownBlockVisibility" : true //статус видимости блока, для которого не найден executor
        };
        opt = this.extend(opt, options);
        this.options = opt;

        this.setLogLevel( opt["log.level"] );

        if (this.isInfoEnabled()) {
            this.info("Initializing CMBlockVK");
        }

        this.swfobject = cm.executors.Storage.swfobject;

        this.uv = this.extend(options, this.getUrlVars());


        if (this.isTraceEnabled()) {
            this.trace("Application url parameters: "+this.dumpObj(this.uv, 'URL parameters DUMP', '\t'));
        }
        if (window["cmSingleton"]) {
            if (this.isWarnEnabled()) {
                this.warn("Double CMBlockVK initialization.");
            }
            this.doubleInitialized = true;
        }
        window["cmSingleton"] = this;


        cm.executors.Storage.preloaderExecutor = null;

        this.vkChecker = new cm.VkChecker();
        this.vkChecker.setLogLevel(cm.Logger.TRACE);
        this.debug("Requesting Vk info");
        this.vkChecker.check(this.uv, this.proxy(this, this.vkInfoReceived));


        this.executors = cm.executors.Storage.executors;

        if (!this.doubleInitialized) {
            VK.addCallback('onScrollTop', this.proxy(this, this.vkScrollTopCallback));

            setInterval(function() {
                VK.callMethod('scrollTop', {});
            }, 5000);
        }


    },

    getUrlVars: function () {
        var vars = {}, hash;
        var hashes = window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ).split( '&' );

        for ( var i = 0; i < hashes.length; i++ ) {
            hash = hashes[i].split( '=' );
            vars[hash[0]] = hash[1];
        }

        return vars;
    },

    vkInfoReceived : function(userInfo) {
        this.userProf = userInfo;
        if (this.isTraceEnabled()) {
            this.trace(this.dumpObj(userInfo, "VK user profile result", "\t"))
        }
        for (var idx in this.executors) {
            if (this.executors.hasOwnProperty(idx)) {
                var executor = this.executors[idx];
                if (!executor.isInstalled()) {
                    executor.setUserProfile(this.userProf);
                    this.install(executor);
                }
            }
        }

        if (cm.executors.Storage.preloaderExecutor!=null && !cm.executors.Storage.preloaderExecutor.isInstalled()) {
            cm.executors.Storage.preloaderExecutor.setUserProfile(this.userProf);
            this.install(cm.executors.Storage.preloaderExecutor);
        }

    },

    setupBlock: function (blockId, pubId, options) {
        if (this.executors[blockId]!=undefined) {
            if (this.isWarnEnabled()) {
                this.warn("Already installed block with id: "+blockId);
            }
            return;
        }

        if (this.isInfoEnabled()) {
            this.info("Initializing block at ["+blockId+"]");
        }

        options.userProfile = this.userProf;
        options.iframeUrlParameters = this.uv;

        var executor = new cm.executors.vk.BlockExecutor(blockId, pubId, options);
        this.executors[blockId] = executor;

        if (this.userProf!=undefined) {
            executor.setUserProfile(this.userProf);
            this.install(executor);
        }


    },

    setupPreroll: function(pubId, options) {
        if (cm.executors.Storage.preloaderExecutor!=null) {
            if (this.isWarnEnabled()) {
                this.warn("Already installed preroll");
            }
            return;
        }

        if (this.isInfoEnabled()) {
            this.info("Initializing preroll");
        }

        options.userProfile = this.userProf;
        options.iframeUrlParameters = this.uv;

        var executor = new cm.executors.vk.PrerollExecutor(pubId, options);
        cm.executors.Storage.preloaderExecutor = executor;
        this.preloaderExecutor = executor;

        if (this.userProf!=undefined) {
            executor.setUserProfile(this.userProf);
            this.install(executor);
        }
    },

    setupMidroll: function(pubId, options) {

        if (this.isInfoEnabled()) {
            this.info("Initializing midroll");
        }

        options.userProfile = this.userProf;
        options.iframeUrlParameters = this.uv;

        var executor = new cm.executors.vk.MidrollExecutor(pubId, options);
        cm.executors.Storage.preloaderExecutor = executor;
        this.preloaderExecutor = executor;

        if (this.userProf!=undefined) {
            executor.setUserProfile(this.userProf);
            this.install(executor);
        }
    },

    setupMiniVerticalBlock: function(blockId, pubId, options) {
        if (this.executors[blockId]!=undefined) {
            if (this.isWarnEnabled()) {
                this.warn("Already installed block with id: "+blockId);
            }
            return;
        }

        if (this.isInfoEnabled()) {
            this.info("Initializing block at ["+blockId+"]");
        }

        options.userProfile = this.userProf;
        options.iframeUrlParameters = this.uv;

        var executor = new cm.executors.vk.MiniVerticalBlockExecutor(blockId, pubId, options);
        this.executors[blockId] = executor;

        if (this.userProf!=undefined) {
            executor.setUserProfile(this.userProf);
            this.install(executor);
        }
    },


    install: function(executor) {
        executor.setInstalled(true);
        executor.prepareDom();
        executor.start(this.swfobject);
    },


    checkVisible: function(id, callback) {

        var executor = this.executors[id];
        var visible;
        if (!executor) {
            visible = this.options["unknownBlockVisibility"];
        }
        else {
            visible = executor.isVisible();
        }

        try {
            executor.native()[callback](!visible);
            if (!visible) {
                if (this.isDebugEnabled()) {
                    this.debug("Skip rotate");
                }
            }
            else {
                if (this.isDebugEnabled()) {
                    this.debug("Rotate");
                }
            }
        }
        catch (error) {
            if (this.isErrorEnabled()) {
                this.error("error ack: "+error);
            }
        }
    },

    vkScrollTopCallback : function(scroll, height, offset, tabVisible) {

        if (this.isTraceEnabled()) {
            this.trace("VK Scroll callback. Scroll="+scroll+", height="+height+", offset="+offset);
        }
        for (var idx in this.executors) {
            if (this.executors.hasOwnProperty(idx)) {
                var executor = this.executors[idx];
                executor.checkVisibility(scroll, height, offset);
            }
        }

    }


});



cm.executors.vk = cm.executors.vk || {};
cm.executors.BaseExecutor = cmJSFace.Class([cm.Logger, cm.Utils], {


    installed : false,
    userProfile: {},
    swfPath: "",

    constructor : function(blockId, options) {
        this.visible = true;
        this.blockId = blockId;

        var opt = {
            "protocol" : "auto", // auto | http: | https:
            "baseAddr" : "rt.creara-media.ru/v3",
            "swfPathPrefix" : "img.creara-media.ru/lembrd/",
            "disableSwfCache" : true,
            "fp.timeout": 5000,
            "fp.enabled": true,
            "log.level": cm.Logger.INFO
        };

        this.setLogLevel(options['log.level']);

        this.options = this.extend(opt, options);

        var protocol = this.options["protocol"] === 'auto' ? window.location.protocol : this.options["protocol"];

        if (!this.options["rhost"]) {
            this.options["rhost"] = protocol + "//" + this.options["baseAddr"];
        }

        this.options["swfPathPrefix"] = protocol + "//" + this.options["swfPathPrefix"];

        this.debug("Using rhost: "+this.options["rhost"]);


        var oopp = this.options;
        if (opt["fp.enabled"]) {
            setTimeout(function() { new cm.FP().invoke(oopp); }, opt["fp.timeout"]);
        }


        this.init(this.options);
    },

    init: function(options) {
    },

    constructNativePath: function(swfName) {
        var swfPath = this.options["swfPathPrefix"];
        if (this.options["disableSwfCache"]) {
            swfPath += Math.floor(Math.random()*100000) + "_";
        }
        swfPath+=swfName;

        this.swfPath = swfPath;
    },

    getSwfPath: function() {
        return this.swfPath;
    },

    checkVisibility: function(scroll, height, offset) {

        var hidden = false;

        var block = document.getElementById(this.blockId);
        var top = block.offsetTop;
        var bottom = top + block.offsetHeight;
        if (bottom + offset < scroll) {
            hidden = true;
        }
        if (top + offset > scroll + height) {
            hidden = true;
        }

        this.visible = !hidden;
        if (this.isDebugEnabled()) {
            this.debug("Checked visibility for block [#"+this.blockId+"]: "+this.visible);
        }
    },

    isVisible: function() {
        return this.visible;
    },

    setInstalled: function(installed) {
        this.installed = installed;
    },

    isInstalled: function() {
        return this.installed;
    },

    setUserProfile: function(userProfile) {
        this.userProfile = userProfile;
    },

    getUserProfile: function() {
        return this.userProfile;
    },

    getBlockId: function() {
        return this.blockId;
    },

    setNative: function(id) {
        this.nativeSwfId = id;
    },

    native: function() {
        if (this.nativeSwfId) {
            return document.getElementById(this.nativeSwfId);
        }
        else {
            return null;
        }
    },

    invokeCallback: function(callBackOptionName) {
        var closeCb = this.options[callBackOptionName];

        if (typeof( closeCb ) == 'function' ) {
            if (this.isTraceEnabled()) {
                this.trace("Invoking callback as function from options["+callBackOptionName+"]");
            }
            closeCb();
        }
        else {
            if (window[closeCb]) {
                if (this.isTraceEnabled()) {
                    this.trace("Invoking callback as string: "+closeCb);
                }
                window[closeCb]();
            }
        }
    }


});




cm.executors.vk.BlockExecutor = cmJSFace.Class(cm.executors.BaseExecutor, {

    constructor : function(blockId, pubId, options) {
        cm.executors.vk.BlockExecutor.$super.call(this, blockId, options);

        this.pubId = pubId;
    },

    init: function(options) {
        this.constructNativePath("block_as3_v2.swf");
        this.uv = options.iframeUrlParameters;
    },


    prepareDom: function() {
        if (this.options['disable']) {
            if (this.isInfoEnabled()) {
                this.info('cmBlock is disabled');
            }
        }

        for(var param in this.options) {
            if(this.options.hasOwnProperty(param)) {
                this.uv[param] = this.options[param];
            }
        }

        var div = document.getElementById( this.getBlockId() );
        div.style.display = 'block';
        div.style.width = '100%';
        div.style.height = '100px';

        var indiv = document.createElement( "div" );
        indiv.id = "cmBannerInner_" + this.getBlockId();
        div.appendChild( indiv );
    },

    start: function(swfobject) {
        if (this.isDebugEnabled()) {
            this.debug("Starting cm block at [#"+this.getBlockId()+"]");
        }

        // To use express install, set to playerProductInstall.swf, otherwise the empty string.
        var xiSwfUrlStr = "${expressInstallSwf}";
        var flashvars = {
            "pid":this.pubId
        };

        for ( var uvPar in this.uv ) {
            if (this.uv.hasOwnProperty(uvPar)) {
                flashvars[uvPar] = this.uv[uvPar];
            }
        }

        for (var a in this.getUserProfile()) {
            flashvars[a] = this.getUserProfile()[a];
        }

        for (var xx in this.options) {
            flashvars[xx] = this.options[xx];
        }

        var params = {
            "quality" : 'high',
            "bgcolor" : "#F7F7F7",
            "allowscriptaccess" : "always",
            "scale" : "noscale",
            "salign" : "tl",
            "align" : 'l',
            "wmode" : 'opaque'
        };
        var attributes = {};
        var swfId = "cmBannerInner_"+this.getBlockId();
        flashvars['blockid'] = this.getBlockId();

        this.setNative(swfId);

        swfobject.embedSWF(
                this.getSwfPath(),
                swfId,
                "100%", "100",
                "10.0.0", xiSwfUrlStr, flashvars, params, attributes );

    }
});


cm.executors.vk.MiniVerticalBlockExecutor = cmJSFace.Class(cm.executors.BaseExecutor, {
    constructor : function(blockId, pubId, options) {

        var opt = {
            "onNoAdv": "cmMiniVerticalNoAdvCallback"
        };

        cm.executors.vk.MiniVerticalBlockExecutor.$super.call(this, blockId, this.extend(opt, options));
        this.pubId = pubId;
    },

    init: function(options) {
        this.constructNativePath("cm_block_mini_1.swf");
        this.uv = options.iframeUrlParameters;
    },

    prepareDom: function() {
        if (this.options['disable']) {
            if (this.isInfoEnabled()) {
                this.info('cmBlock is disabled');
            }
        }

        var div = document.getElementById( this.blockId );
        div.style.display = 'block';
        div.style.width = '240px';
        div.style.height = '400px';

        var indiv = document.createElement( "div" );
        indiv.id = "cmBannerInnerMV_" + this.blockId;
        div.appendChild( indiv );

    },

    start: function(swfobject) {
        if (this.isInfoEnabled()) {
            this.info("Starting mini vertical block at [#"+this.getBlockId()+"]");
        }
        // To use express install, set to playerProductInstall.swf, otherwise the empty string.
        var xiSwfUrlStr = "${expressInstallSwf}";

        var flashvars = {
            "pid" : this.pubId
        };


        for ( var uvPar in this.options.iframeUrlParameters ) {
            if (this.options.iframeUrlParameters.hasOwnProperty(uvPar)) {
                flashvars[uvPar] = this.options.iframeUrlParameters[uvPar];
            }
        }

        for (var a in this.getUserProfile()) {
            flashvars[a] = this.getUserProfile()[a];
        }

        for (var xx in this.options) {
            //flashvars[xx] = this.options[xx];
        }

        flashvars['cmNothingToRotate'] = 'cmSingleton.executors[\''+this.getBlockId()+'\'].cmMiniVerticalNoAdvInt';

        var params = {
            "quality" : "high",
            "bgcolor" : "#F7F7F7",
            "allowscriptaccess" : "always",
            "scale" : "noscale",
            "salign" : "tl",
            "align" : "l",
            "wmode" : "opaque"
        };

        var attributes = {};

        var id = "cmBannerInnerMV_"+this.getBlockId();
        flashvars['blockid'] = this.getBlockId();
        this.setNative(id);

        if (this.options['noDOM']) {
            var att = {
                "data" : this.getSwfPath(),
                "width" : "240",
                "height" : "400"
            };

            var flstr = '';
            for (xx in flashvars) {
                if (flstr) {
                    flstr+="&";
                }
                flstr += xx+"="+flashvars[xx];
            }

            params.flashvars = flstr;

            var myObject = swfobject.createSWF(att, params, id);
            myObject.style.zIndex = "1000001";
        }
        else {

            if (this.isTraceEnabled()) {
                this.trace("Embedding SWF into "+this.getBlockId()+" with flashvars:"+this.dumpObj(flashvars, "FLASHVARS 240x400", "\t"))
            }

            swfobject.embedSWF(
                    this.getSwfPath(),
                    id,
                    "240", "400",
                    "10.0.0", xiSwfUrlStr, flashvars, params, attributes );
            document.getElementById(id).style.zIndex="1000001";
        }
    },



    cmMiniVerticalNoAdvInt : function() {
        this.invokeCallback("onNoAdv")
    }

});




cm.executors.vk.PrerollExecutor = cmJSFace.Class(cm.executors.BaseExecutor, {

    constructor : function(pubId, options) {

        var opt = {
            "onClose": "cmPreloadCloseCallback",
            "onNoAdv": "cmPreloadNoAdvCallback",
            "onShow": "cmPreloaderShownInt"
        };

        cm.executors.vk.PrerollExecutor.$super.call(this, "cm_preloader_wrapper", this.extend( opt, options ) );
        this.pubId = pubId;

    },

    init : function(options) {
        this.constructNativePath("cm_preroll.3.0.swf");
        this.uv = options.iframeUrlParameters;
    },



    prepareDom : function() {
        if (this.options['disable']) {
            if (this.isInfoEnabled()) {
                this.info('cmPreroll is disabled, force noAdv event');
            }
            this.cmPreloaderNoAdvInt();
            return;
        }


        var div = document.createElement( "div" );
        div.id = this.getBlockId();
        div.style.position = 'absolute';
        div.style.display = 'block';
        var h = document.documentElement.clientHeight;
        var w = document.documentElement.clientWidth;
        div.style.left = "0";
        div.style.top = '0';
        div.style.zIndex = '1000001';



        div.style.width = '1px';
        div.style.height = '1px';
        div.style.backgroundColor = '#f7f7f7';

        var indiv = document.createElement( "div" );
        indiv.style.position = 'absolute';
        indiv.id = "cmPreloaderBannerInner_wrapper";
        indiv.style.width = '1px';
        indiv.style.height = '1px';
        indiv.style.overflow = "hidden";
        var l = (w / 2 - 325);
        if (l < 0) {
            l = 100;
        }
        indiv.style.left =  "0";
        indiv.style.top = '0';
        indiv.style.zIndex = '1000002';
        div.appendChild( indiv );

        var indiv2 = document.createElement( "div" );
        indiv2.id = "cmPreloaderBannerInner_" + this.getBlockId();
        indiv.appendChild( indiv2 );

        document.body.appendChild(div);

    },


    start: function(swfobject) {
        if (this.isTraceEnabled()) {
            this.trace('Using [' + this.getSwfPath()+"] for preroll swf");
        }
        // To use express install, set to playerProductInstall.swf, otherwise the empty string.
        var xiSwfUrlStr = "${expressInstallSwf}";

        var flashvars = {
            "pid" : this.pubId
        };


        for ( var uvPar in this.uv ) {
            if (this.uv.hasOwnProperty(uvPar)) {
                flashvars[uvPar] = this.uv[uvPar];
            }
        }

        for (var a in this.getUserProfile()) {
            flashvars[a] = this.getUserProfile()[a];
        }

        for (var xx in this.options) {
            flashvars[xx] = this.options[xx];
        }

        flashvars['start'] = 1;
        flashvars['cmShowBanner'] = 'cmSingleton.preloaderExecutor.cmPreloaderShownInt';
        flashvars['cmHideBanner'] = 'cmSingleton.preloaderExecutor.cmPreloaderCloseInt';
        flashvars['cmNothingToRotate'] = 'cmSingleton.preloaderExecutor.cmPreloaderNoAdvInt';

        var params = {
            "quality":'high',
            "bgcolor":"#F7F7F7",
            "allowscriptaccess":"always",
            "scale":"noscale",
            "wmode":'opaque'
        };
        var attributes = {};

        var id = "cmPreloaderBannerInner_"+this.getBlockId();
        flashvars['blockid'] = id;


        swfobject.embedSWF(
                this.getSwfPath(),
                id,
                "650", "650",
                "10.0.0", xiSwfUrlStr, flashvars, params, attributes );

    },



    cmPreloaderShownInt : function() {


        var myWidth = 0, myHeight = 0;
        if( typeof( window.innerWidth ) == 'number' ) {
            //Non-IE
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            //IE 6+ in 'standards compliant mode'
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            //IE 4 compatible
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }


        var h = myHeight;
        var w = myWidth;
        if (this.isTraceEnabled()) {
            this.trace( "show preroll: show event. w: "+w+". h: "+h );
        }


        var div = document.getElementById(this.getBlockId());
        div.style.width = w+"px";
        div.style.height = "100%";
        div.style.margin = "0";
        div.style.padding = "0";

        var indiv = document.getElementById("cmPreloaderBannerInner_wrapper");
        indiv.style.width = '650px';
        indiv.style.height = '650px';

        var l = (w / 2 - 325);
        if (l < 0) {
            l = 10;
        }
        indiv.style.left =  l + "px";
        indiv.style.top = '50px';
        indiv.style.zIndex = '1000002';


        this.invokeCallback("onShow");
    },

    cmPreloaderCloseInt : function() {
        if (this.isDebugEnabled()) {
            this.debug( "close preroll: close event" );
        }
        var d = document.getElementById(this.getBlockId());
        if (d) {
            d.style.display = 'none';
            d.parentNode.removeChild(d);
        }

        this.invokeCallback("onClose");
    },

    cmPreloaderNoAdvInt :  function() {
        if (this.isDebugEnabled()) {
            this.debug( "close preroll: no adv" );
        }
        var d = document.getElementById(this.getBlockId());
        if (d) {
            d.style.display = 'none';
            d.parentNode.removeChild(d);
        }

        this.invokeCallback("onNoAdv");
    }
});

cm.executors.vk.MidrollExecutor = cmJSFace.Class(cm.executors.BaseExecutor, {

    constructor : function(pubId, options) {

        var blockRnd = Math.floor(Math.random()*100000);

        var opt = {
            "baseAddr" : "rt.creara-media.ru/v3/midloader",
            "onClose": "cmPreloadCloseCallback",
            "onNoAdv": "cmPreloadNoAdvCallback",
            "onShow": "cmPreloaderShownInt",
            "block_rnd": blockRnd
        };



        cm.executors.vk.MidrollExecutor.$super.call(this, "cm_midloader_wrapper_"+blockRnd, this.extend( opt, options ) );
        this.pubId = pubId;

    },

    init : function(options) {
        this.constructNativePath("cm_preroll.3.0.swf");
        this.uv = options.iframeUrlParameters;
    },



    prepareDom : function() {
        if (this.options['disable']) {
            if (this.isInfoEnabled()) {
                this.info('cmMidroll is disabled, force noAdv event');
            }
            this.cmPreloaderNoAdvInt();
            return;
        }

        var blockRnd = this.options['block_rnd'];


        var div = document.createElement( "div" );
        div.id = this.getBlockId();
        div.style.position = 'absolute';
        div.style.display = 'block';
        var h = document.documentElement.clientHeight;
        var w = document.documentElement.clientWidth;
        div.style.left = "0";
        div.style.top = '0';
        div.style.zIndex = '1000001';



        div.style.width = '1px';
        div.style.height = '1px';
        div.style.backgroundColor = '#f7f7f7';

        var indiv = document.createElement( "div" );
        indiv.style.position = 'absolute';
        indiv.id = "cmPreloaderBannerInner_wrapper_"+blockRnd;
        indiv.style.width = '1px';
        indiv.style.height = '1px';
        indiv.style.overflow = "hidden";
        var l = (w / 2 - 325);
        if (l < 0) {
            l = 100;
        }
        indiv.style.left =  "0";
        indiv.style.top = '0';
        indiv.style.zIndex = '1000002';
        div.appendChild( indiv );

        var indiv2 = document.createElement( "div" );
        indiv2.id = "cmPreloaderBannerInner_" + this.getBlockId();
        indiv.appendChild( indiv2 );

        document.body.appendChild(div);

    },


    start: function(swfobject) {
        if (this.isTraceEnabled()) {
            this.trace('Using [' + this.getSwfPath()+"] for preroll swf");
        }
        // To use express install, set to playerProductInstall.swf, otherwise the empty string.
        var xiSwfUrlStr = "${expressInstallSwf}";

        var flashvars = {
            "pid" : this.pubId
        };


        for ( var uvPar in this.uv ) {
            if (this.uv.hasOwnProperty(uvPar)) {
                flashvars[uvPar] = this.uv[uvPar];
            }
        }

        for (var a in this.getUserProfile()) {
            flashvars[a] = this.getUserProfile()[a];
        }

        for (var xx in this.options) {
            flashvars[xx] = this.options[xx];
        }

        flashvars['start'] = 1;
        flashvars['cmShowBanner'] = 'cmSingleton.preloaderExecutor.cmPreloaderShownInt';
        flashvars['cmHideBanner'] = 'cmSingleton.preloaderExecutor.cmPreloaderCloseInt';
        flashvars['cmNothingToRotate'] = 'cmSingleton.preloaderExecutor.cmPreloaderNoAdvInt';

        var params = {
            "quality":'high',
            "bgcolor":"#F7F7F7",
            "allowscriptaccess":"always",
            "scale":"noscale",
            "wmode":'opaque'
        };
        var attributes = {};

        var id = "cmPreloaderBannerInner_"+this.getBlockId();
        flashvars['blockid'] = id;


        swfobject.embedSWF(
                this.getSwfPath(),
                id,
                "650", "650",
                "10.0.0", xiSwfUrlStr, flashvars, params, attributes );

    },



    cmPreloaderShownInt : function() {


        var myWidth = 0, myHeight = 0;
        if( typeof( window.innerWidth ) == 'number' ) {
            //Non-IE
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            //IE 6+ in 'standards compliant mode'
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            //IE 4 compatible
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }


        var h = myHeight;
        var w = myWidth;
        if (this.isTraceEnabled()) {
            this.trace( "show midroll: show event. w: "+w+". h: "+h );
        }

        var blockRnd = this.options['block_rnd'];

        var div = document.getElementById(this.getBlockId());
        div.style.width = w+"px";
        div.style.height = "100%";
        div.style.margin = "0";
        div.style.padding = "0";

        var indiv = document.getElementById("cmPreloaderBannerInner_wrapper_"+blockRnd);
        indiv.style.width = '650px';
        indiv.style.height = '650px';

        var l = (w / 2 - 325);
        if (l < 0) {
            l = 10;
        }
        indiv.style.left =  l + "px";
        indiv.style.top = '50px';
        indiv.style.zIndex = '1000002';


        this.invokeCallback("onShow");
    },

    cmPreloaderCloseInt : function() {
        if (this.isDebugEnabled()) {
            this.debug( "close preroll: close event" );
        }
        var d = document.getElementById(this.getBlockId());
        if (d) {
            d.style.display = 'none';
            d.parentNode.removeChild(d);
        }

        this.invokeCallback("onClose");
    },

    cmPreloaderNoAdvInt :  function() {
        if (this.isDebugEnabled()) {
            this.debug( "close preroll: no adv" );
        }
        var d = document.getElementById(this.getBlockId());
        if (d) {
            d.style.display = 'none';
            d.parentNode.removeChild(d);
        }

        this.invokeCallback("onNoAdv");
    }
});


var cmSingleton;
