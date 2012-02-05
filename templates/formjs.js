(function($) {
    if($ && $.couch && $.couch.db) {
        var $db =  $.couch.db("{{db}}");
        var _self = this;
        _self.docId = null;

        $(function() {
            $db.saveDoc({
                // root object
                host : (location.href.split('?')[1] || ''),
                date : Date.UTC(
                    new Date().getUTCFullYear(),
                    new Date().getUTCMonth(),
                    new Date().getUTCDate(),
                    new Date().getUTCHours(),
                    new Date().getUTCMinutes()),
                dateOffset : new Date().getTimezoneOffset(),
                // it should not be visible untill usefull info is grabbed
                visible : false
            }, {
                success:function(data) {
                    _self.docId = data.id;
                    
                    // has the message been processed?
                    var done = false;
                    
                    window.addEventListener('message', function(message) {
                        if(!done && message.data) {
                            done = true;
                            $db.openDoc(_self.docId, {}, {
                                success: function(doc) {
                                    for(var d in message.data) {
                                        doc[d] = message.data[d];
                                    }
                                    doc.visible = true;

                                    // saves document second time
                                    // now with all grabbed information
                                    $db.saveDoc(doc);
                                }
                            });
                        }
                    }, false);
                }
            });
        });
    }
})(jQuery);
