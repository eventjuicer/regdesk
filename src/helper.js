

export function checkStatus(response)
{
	if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export function parseJSON(response)
{
	return response.json()
}



export function getJSON(url, callback, context)
{
	fetch(process.env.REACT_APP_API + url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(checkStatus).then(parseJSON).then(callback).catch(function(error){

    });
}

export function postJSON(url, data, callback)
{
	fetch(process.env.REACT_APP_API + url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(checkStatus).then(parseJSON).then(function(data)
    {
        callback(data);

    }).catch(function(error){

    });
}


export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function validatePhone(phone) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(phone);
}

