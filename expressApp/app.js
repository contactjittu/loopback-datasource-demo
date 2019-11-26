const app = require('express')();
const fs = require('fs');
const port = process.env.PORT || 3000;
app.use((req, res, next) => {
  const time = new Date();
  const hr = time.getHours();
  const min = time.getMinutes();
  const sec = time.getSeconds();
  const mili = time.getMilliseconds();
  console.log(`Request ${req.method} ${req.url} ${hr}:${min}:${sec}:${mili}`);
  console.log(req.headers)
  if(req.headers.apikey && (req.headers.apikey === 'a8JKLWXNw==&%#dsnfn')) {
    next();
  } else {
    res.status(401).end();
  }
});

app.get('/getUser', (req, res) => {
  const { appname } = req.headers;
  const data = {
    name: 'Jitendra Kumar',
    branch: 'Pune',
    appname
  }
  res.status(200).send(data);
});

app.get('/getBalance', (req, res) => {
  const { appname } = req.headers;
  const data = {
    name: 'Jitendra Kumar',
    accountNumber: 12345,
    currentBalance: 10,
    appname
  }
  res.status(200).send(data);
});

app.get('/datasource.json', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./app.json', 'utf-8'));
  res.send(data);
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
