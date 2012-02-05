function(doc) {
  if(doc.visible)
    emit(doc.host, 1);
}
