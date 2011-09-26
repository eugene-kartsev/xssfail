function(doc, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var config = require("config").init();
    
    var root = config.root;
    var data = {
        js : root + "/js",
        vendorjs : root + "/vendor/couchapp"
    };
    
    return mustache.to_html(this.templates.indexjs, data);
}
