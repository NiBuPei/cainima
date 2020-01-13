function setCookie(name, content, iDay = 7) {
    var date = new Date();
  
    var day = date.getDate();
  
    var hours = date.getHours();
  
    date.setHours(hours - 8);
  
    date.setDate(day + iDay);
  
    document.cookie = `${name}=${content};path=/;expires=${date}`;
  }
  
  function removeCookie(name) {
    setCookie(name, '', -1);
  }
  
  function getCookies() {
    var list = document.cookie.split('; ');
    list = list.map(item => ({
      name: item.split('=')[0],
      content: item.split('=')[1]
    }));
  
    return list;
  }
  
  function getCookie(name) {
    var list = getCookies();
  
    var res = list.filter(item => item.name === name)[0];
  
    if (res) {
      return res.content;
    }
    return '';
  }