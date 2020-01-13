function querystring(key) {
  var search = location.search.replace('?', '');
  var list = search.split('&');
  list = list.map(item => {
    var [key, value] = item.split('=');
    return {
      key,
      value
    }
  });
  var result = list.filter(item => item.key === key)[0];
  if (result) {
    return result.value;
  } else {
    return '';
  }
}