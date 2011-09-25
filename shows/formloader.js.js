function(doc, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var config = require("config").init();
    
    var root = config.root;
    var data = {
        vendorjs : root + "/js/vendor/couchapp",
        form_js : root + "/js/form.js"
    };
    
    return mustache.to_html(this.templates.formloader, data);
}
