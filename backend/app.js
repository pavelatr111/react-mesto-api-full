const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookeiParser = require('cookie-parser');
const { errors } = require('celebrate');
// const cors = require('cors');
const auth = require('./middleware/auth');
const NotFoundError = require('./errors/not-found-error');

const app = express();
const { PORT = 3000 } = process.env;

// app.use(cors({
//   origin: 'https://pavelpavlov.nomoredomains.work',
//   credentials: true,
// }));
// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://pavelpavlov.nomoredomains.work',
];

app.use((req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cookeiParser());

app.use('/', require('./routes/routesAuth'));

app.use('/users', require('./routes/routesUsers'));

app.use('/cards', auth, require('./routes/routesCards'));

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница по указоному адресу не найдена'));
});

app.use(errors());

app.use((err, _req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {

});
