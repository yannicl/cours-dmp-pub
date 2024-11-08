
const http = require('http')

const server = http.createServer(function(request, response) {
  console.dir(request.param)

  access = {'access' : {'valid': true, 'beginDate': '2021-01-01', 'endDate': '2021-12-31', 'peopleCount': 1}}

  if (request.method == 'POST' && request.url == '/compte') {
    console.log('POST')
    var body = ''
    request.on('data', function(data) {
      body += data
    })
    request.on('end', function() {
      console.log('Body: ' + body)
      response.writeHead(200, {'Content-Type': 'application/json', 'access-control-allow-origin': '*'})
      response.end(JSON.stringify(access))
    })
  } 

  if (request.method == 'GET' && request.url == '/compte') {
    console.log('GET')
    response.writeHead(200, {'Content-Type': 'application/json', 'access-control-allow-origin': '*'})
    response.end(JSON.stringify(access))
  }

  disponibilites = {'disponibilites': [5, 4, 9, 10]}

  if (request.method == 'POST' && request.url == '/hebergements') {
    console.log('POST')
    var body = ''
    request.on('data', function(data) {
      body += data
    })
    request.on('end', function() {
      console.log('Body: ' + body)
      response.writeHead(200, {'Content-Type': 'application/json', 'access-control-allow-origin': '*'})
      response.end(JSON.stringify(disponibilites))
    })
  } 

  if (request.method == 'GET' && request.url == '/hebergements') {
    console.log('GET')
    response.writeHead(200, {'Content-Type': 'application/json', 'access-control-allow-origin': '*'})
    response.end(JSON.stringify(disponibilites))
  }

  if (request.method == 'POST' && /\/hebergements\?id=\d/.test(request.url)) {
    console.log('POST')
    response.writeHead(200, {'Content-Type': 'application/json', 'access-control-allow-origin': '*'})
    response.end(JSON.stringify(disponibilites))
  }

  meteo = {'description': 'Pluie et averses en matinée. Grand soleil de retour vers midi. Température de 10°C à 20°C. Vent de 10 km/h.'}

  if (request.method == 'GET' && request.url == '/meteo') {
    console.log('GET')
    response.writeHead(200, {'Content-Type': 'application/json', 'access-control-allow-origin': '*'})
    response.end(JSON.stringify(meteo))
  }


})

const port = 3000
const host = '127.0.0.1'
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`)
