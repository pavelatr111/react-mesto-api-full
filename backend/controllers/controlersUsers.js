/* eslint-disable new-cap */
const bcrypt = require('bcrypt');

const User = require('../models/modelsUser');
const { generateJwt } = require('../middleware/jwt');
const NotFoundError = require('../errors/not-found-error');
const dataError = require('../errors/error-data');
const conflictError = require('../errors/conflict-error');
const AuthorizationError = require('../errors/authorized-error');

const saltRounds = 10;

module.exports.getUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send({ data: users, user: req.user });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.status(200).send({ data: user });
    } else {
      next(new NotFoundError('Нет пользователя с таким id'));
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new dataError('Переданы некорректные id'));
    } else {
      next(err);
    }
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.status(200).send({ data: user });
    } else {
      // res.status(errorId).send({ message: 'Пользователь не найден' });
      next(new NotFoundError('Нет пользователя с таким id'));
    }
  } catch (err) {
    if (err.name === 'CastError') {
      // res.status(errorData).send({ message: 'Переданы некорректные id' });
      next(new dataError('Переданы некорректные id'));
    } else {
      next(err);
    }
    // next(err)
  }
};

// bcrypt.hash(password, saltRounds)
//   .then(function(hash) {

//   });

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    next(new AuthorizationError('Не верный email или пароль'));
    // return res.status(errorData).send({ message: 'Не верный email или пароль' })
  }
  bcrypt.hash(password, saltRounds)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then(() => res.status(200)
          .send({
            data: {
              name, about, avatar, email,
            },
          }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new dataError('Переданы некорректные данные'));
          } else if (err.code === 11000) {
            next(new conflictError('Пользователь с таким email уже зарегестрирован'));
          } else {
            next(err);
          }
        });
    });
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new AuthorizationError('Не верный email или пароль'));
    return;
  }
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (user === null) {
        next(new AuthorizationError('Пользователь не найден'));
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            next(new AuthorizationError('Не верный email или пароль'));
          }
          const token = generateJwt({ _id: user._id });

          res.cookie('token', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          });

          res.status(200).send({ jwt: token });
        })
        .catch(() => next(new NotFoundError('Нет такова пользователя')));
    })
    .catch(() => {
      next(new NotFoundError('Нет пользователя с таким id'));
    });
};

// module.exports.createUser = async (req, res) => {
//   try {
//     const { name, about, avatar, email, password } = req.body;
//     const createUser = await User.create({ name, about, avatar, email, password });
//     res.status(201).send(createUser);
//   } catch (err) {
//     if (err.name === 'ValidationError') {
//       res.status(errorData).send({ message: 'Переданы некорректные данные' });
//     } else {
//       res.status(errorCode).send({ message: 'Произошла ошибка' });
//     }
//   }
// };

module.exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, about: req.body.about },
      { new: true, sctric: true, runValidators: true },
    );
    if (user) {
      res.status(200).send({ data: user });
    } else {
      next(new NotFoundError('Нет пользователя с таким id'));
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new dataError('Переданы некорректные данные'));
    } else if (err.name === 'CastError') {
      next(new dataError('Переданы некорректные id'));
    } else {
      next(err);
    }
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true },
    );
    if (user) {
      res.status(200).send({ data: user });
    } else {
      next(new NotFoundError('Нет пользователя с таким id'));
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new dataError('Переданы некорректные данные'));
    } else if (err.name === 'CastError') {
      next(new dataError('Переданы некорректные id'));
    } else {
      next(err);
    }
  }
};
