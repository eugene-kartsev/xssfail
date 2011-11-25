

(function couchapp_load(scripts) {
    for (var i=0; i < scripts.length; i++) {
        if(scripts[i])
            document.write('<script src="'+scripts[i]+'"><\/script>')
    };
})([
    "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js",
    "{{vendorjs}}/jquery.couch.js",
    "{{vendorjs}}/jquery.couch.app.js",
    "{{vendorjs}}/jquery.couch.app.util.js",
    "{{vendorjs}}/jquery.mustache.js",
    "{{vendorjs}}/jquery.pathbinder.js",
    {{#js}}
        "{{src}}",
    {{/js}}
    ""
]);



