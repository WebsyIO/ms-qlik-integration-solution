const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const JWT = require('jsonwebtoken')
const crypto = require('crypto')
const cookie = require('cookie')

app.use('/node_modules', express.static(`${__dirname}/node_modules`))
app.use('/', express.static(`${__dirname}/public`))
app.use('/scripts', express.static(`${__dirname}/public/scripts`))
app.use('/styles', express.static(`${__dirname}/public/styles`))

app.use('/apps', (req, res) => {
  const jwt = `APIKey`
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${jwt}` },
    hostname: 'yourdomain',
    path: '/api/v1/items?resourceType=app'
  }  
  const postReq = https.request(options, postRes => {    
    let output = ''
    postRes.on('data', (chunk) => {
      output += chunk
    })
    postRes.on('end', () => {                
      res.json(output)
    })
  })
  postReq.end()
})

app.use('/csrf', (req, res) => {
  const jwt = createJWT('user email')
  console.log(jwt)  
  const options = {
    method: 'POST',
    headers: { Authorization: `Bearer ${jwt}` },
    hostname: 'yourdomain',
    path: '/login/jwt-session'
  }  
  const postReq = https.request(options, postRes => {    
    let output = ''    
    const outputCookies = postRes.headers['set-cookie'] || []  
    postRes.on('data', chunk => {
      console.log('data', chunk)      
    })  
    postRes.on('error', chunk => {
      console.log('err', chunk)
      
    })  
    postRes.on('end', () => {                   
      outputCookies.forEach(c => {        
        if (c.indexOf('_csrfToken=') !== -1) {
          let ck = cookie.parse(c)
          if (ck._csrfToken) {
            res.json(ck._csrfToken)
          }          
        }
      })      
    })
  })
  postReq.on('error', err => {
    console.log(err)
    
  })
  postReq.end()
  
})

app.get('/:page', (req, res) => {
  res.sendFile(`${__dirname}/public/pages/${req.params.page}/index.html`)
})

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
})

const options = {
  key: fs.readFileSync(__dirname+'/key.key'),
  cert: fs.readFileSync(__dirname+'/cert.pem')
}

const server = https.createServer(options, app)

server.listen(process.env.PORT || 4000)

function createJWT (email) {
  const key = `RSA Private Key`
  const now = (new Date().getTime() / 1000) - 95
  const exp = now + 3500
  const jwtConfig = {
    keyid: 'KeyId',
    algorithm: 'RS256',
    issuer: 'Issuer',
    audience: 'qlik.api/login/jwt-session'
  }
  const payload = {
    jti: generateId(),
    nbf: now,
    iat: now - 5,
    exp: exp,
    sub: email,
    subType: 'user',
    name: email,
    email: email,
    email_verified: true,
    groups: []
  }
  return JWT.sign(payload, key, jwtConfig)
}
function generateId (size, chars) {
  size = size || 16
  chars = chars || 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789'
  let rnd = crypto.randomBytes(size)
  let value = new Array(size)
  let len = chars.length
  for (let i = 0; i < size; i++) {
    value[i] = chars[rnd[i] % len]
  }
  return value.join('')
}