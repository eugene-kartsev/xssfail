

(function couchapp_load(scripts) {
    for (var i=0; i < scripts.length; i++) {
        document.write('<script src="'+scripts[i]+'"><\/script>')
    };
})([
    "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js",      
    "{{vendorjs}}/jquery.couch.js",
    "{{vendorjs}}/jquery.couch.app.js",
    "{{vendorjs}}/jquery.couch.app.util.js",
    "{{vendorjs}}/jquery.mustache.js",
    "{{form_js}}"
]);



