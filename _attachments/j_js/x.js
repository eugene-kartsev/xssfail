/*$.fn.hashchange = function(f) {
    var w = this[0];
    if(w && "onhashchange" in w && $.isFunction(f)) {
       w.onhashchange = f;
    } else if($.isFunction(f)) {*/
       /*var withTimeout = function(func, hash) {
           //alert(hash);
           if(hash != location.hash) {
               f();
               hash = location.hash;
           }
           setTimeout(function() { withTimeout(f, hash); }, 1000);
       };
       withTimeout(f, location.hash);*/
    /*} else if(w.onhashchange) {
       console.log('1');
       w.onhashchange();
    }
}*/
$(function() {
    /*$(window).hashchange(function() {
        var actions = {};
        actions["#winners"] = function() { $("#howto").hide(); };
        actions["#howto"] = function() { $("#howto").show(); };
        
        var act = actions[location.hash];
        if(act) act();
    });
    $(window).hashchange();*/
});