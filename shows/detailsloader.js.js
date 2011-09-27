function(doc, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var config = require("config").init();
    
    return mustache.to_html(this.templates.detailsloader, {
        js : config.root + "/js",
        vendorjs : config.root + "/js/vendor/couchapp"
    });
}
