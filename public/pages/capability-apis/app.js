const config = {
  host: 'yourdomain',
  port: 443,
  prefix: '/',
  isSecure: true
}

require.config({
  baseUrl: 'https://<yourdomain>/resources',
  webIntegrationId: 'your integration id'
})

require(['js/qlik'], (qlik) => {
  const app = qlik.openApp('appId', config)
  app.getObject('chart1', 'objectId') 
})