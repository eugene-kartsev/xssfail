function(doc) {
	if(!doc.config)
		emit(null, {id:doc._id, host:doc.location.host, url:doc.location.href, cookies: (doc.cookies || []), date: doc.date });
}
