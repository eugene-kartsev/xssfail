function(doc) {
  if(doc.visible)
    emit(doc.host, {id:doc._id, page: doc.location.pathname});
}
