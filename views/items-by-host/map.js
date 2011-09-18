function(doc) {
	if(doc.host && doc.date)
		emit(doc.host, {host:doc.host, url:doc.url, cookies: (doc.cookies || []), date: doc.date });
}
