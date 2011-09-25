function(doc, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var config = require("config").init();
    
    var root = config.root;
    var data = {
        js : root + "/js",
        vendorjs : root + "/js/vendor/couchapp"
    };
    
    return mustache.to_html(this.templates.loader, data);
}
