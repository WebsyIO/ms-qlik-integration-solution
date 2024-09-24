const integrationId = 'your integration id'

request(`https://<yourdomain>/api/v1/users/me`).then(async user => {      
  request(`https://<yourdomain>/api/v1/csrf-token`, true).then(token => {
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
}, err => {
  const returnUrl = encodeURIComponent(window.location.href) + `&qlik-web-integration-id=${integrationId}`
  window.location.href = `https://<yourdomain>/login?returnto=${returnUrl}`
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