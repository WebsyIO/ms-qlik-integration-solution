const integrationId = 'your integration id'

request(`https://localhost:4000/csrf`).then(token => {
  const session = enigma.create({
    schema,
    url: `wss://<yourdomain>/app/<appId>?qlik-web-integration-id=${integrationId}&qlik-csrf-token=${token}`
  })
  
  session.open().then(qlik => {
    qlik.openDoc('appId').then(app => {
      console.log(app)    
    })
  })
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