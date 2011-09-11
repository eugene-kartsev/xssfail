function(doc) {
	if(doc.host && doc.date)
		emit(null, {host:doc.host, url:"", cookies: (doc.cookies || []), date: doc.date });
}