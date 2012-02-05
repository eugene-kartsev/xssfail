function(doc) {
	if(!doc.config)
		emit(doc.date, {id:doc._id, host:doc.host, url:doc.url, cookies: (doc.cookies || []), date: doc.date });
}
