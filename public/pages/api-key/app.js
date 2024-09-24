const integrationId = 'your integration id'

request(`https://localhost:4000/apps`).then(apps => {
  console.log(JSON.parse(apps))
  
})

function request (path, returnHeaders = false, method = 'GET') {
  // return new Promise((resolve, reject) => {
  return fetch(`${path}`, {
    mode: 'cors',
    credentials: 'include',
    redirect: 'follow',
    method,
    headers: {      
      'qlik-web-integration-id': integrationId
    }
  }).then(res => {
    if (res.status < 200 || res.status >= 400) throw res
    if (returnHeaders === true) {
      return res.headers.get('qlik-csrf-token')
    }    
    else {
      return res.json()      
    }
  })
}