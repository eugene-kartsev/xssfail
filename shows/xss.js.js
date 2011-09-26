
function(doc, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var config = require("config").init();
    
    var root = config.root;
    var data = {
        form_html : root + "/form.html"
    };
    
    return mustache.to_html(this.templates.xss, data);
}
