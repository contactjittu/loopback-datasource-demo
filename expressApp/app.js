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
  next();
});

app.get('/test', (req, res) => {
  res.send({msg: 'Hello from ExpressAPP'});
});

app.get('/datasource.json', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./app.json', 'utf-8'));
  res.send(data);
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
