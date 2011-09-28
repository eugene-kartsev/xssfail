function(doc) {
	if(doc.host && doc.date)
		emit(null, {id:doc._id, host:doc.host, url:doc.url, cookies: (doc.cookies || []), date: doc.date });
}
