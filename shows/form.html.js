function(doc, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var config = require("config").init();
    
    var root = config.root;
    var data = {
        styles : [{css : root + "/style/form.css"}],
        img : root + "/img",
        formloader_js : root + "/js/formloader.js",
        form_js : root + "/js/form.js"
    };
    
    return mustache.to_html(this.templates.form, data, this.templates.partials);
}
