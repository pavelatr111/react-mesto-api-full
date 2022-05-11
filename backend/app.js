require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookeiParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middleware/auth');
const NotFoundError = require('./errors/not-found-error');
const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();
const { PORT = 3000 } = process.env;

// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookeiParser());

app.use(cors({
  origin: ['http://pavelP.nomoredomains.xyz',
    'http://localhost:3001'],
  credentials: true,
}));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use('/', require('./routes/routesAuth'));

app.use(auth);

app.use('/users', require('./routes/routesUsers'));

app.use('/cards', require('./routes/routesCards'));

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница по указоному адресу не найдена'));
});

app.use(errorLogger); // подключаем логгер ошибок

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
