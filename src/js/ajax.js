function ajax(option){
    var {path , successCB ,beforeCB , data = {} ,dataType = 'json' , type = 'get'} = option;

    var params = '';

    for(var key in data){
        params += `${key}=${data[key]}&`;
    }

    params = params.substring( 0 ,params.length-1);

    var xhr = new XMLHttpRequest();

    if(type.toLowerCase() == 'get'){
        xhr.open(type ,path + '?' + params,true);
        xhr.send();
    }else{
        xhr.open(type,payh,true)
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(params);
    }

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var data = xhr.responseText;
            if(dataType == 'json')data = JSON.parse(data);
            successCB && successCB(data);
        }else{
            if(beforeCB)beforeCB();
        }
    }
}