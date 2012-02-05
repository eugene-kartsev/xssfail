function(doc) {
	if(!doc.config)
		emit(doc.host, {id:doc._id, host:doc.host, url:doc.url, cookies: (doc.cookies || []), date: doc.date });
}
