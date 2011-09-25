
(function couchapp_load(scripts) {
    for (var i=0; i < scripts.length; i++) {
        document.write('<script src="'+scripts[i]+'"><\/script>')
    };
})([
    "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js",      
    "/_utils/script/jquery.couch.js",
    "../vendor/couchapp/jquery.couch.app.js",
    "../vendor/couchapp/jquery.couch.app.util.js",
    "../vendor/couchapp/jquery.mustache.js",
    "../vendor/couchapp/jquery.pathbinder.js",
    "../js/index.js"
]);

