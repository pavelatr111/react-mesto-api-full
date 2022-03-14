const DataError = require('../errors/error-data');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const Card = require('../models/modelsCard');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate('owner');
    res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    let createCard = await Card.create({ name, link, owner: req.user._id });
    createCard = await createCard.populate('owner');
    res.status(201).send(createCard);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new DataError('Переданы некорректные данные'));
    } else {
      next(err);
      console.log(err);
    }
  }
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId).orFail(() => new NotFoundError('Нет карточки с таким id'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Нельзя удалить чужую карточку'));
      }
      return card.remove()
        .then(() => res.send({ message: 'карточка удалена' }));
    })
    .catch(next);
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    ).populate('owner');
    if (card) {
      res.status(200).send(card);
    } else {
      next(new NotFoundError('Нет пользователя с таким id'));
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new DataError('Переданы некорректные id'));
    } else {
      next(err);
    }
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    ).populate('owner');
    if (card) {
      res.status(200).send(card);
    } else {
      next(new NotFoundError('Нет пользователя с таким id'));
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new DataError('Переданы некорректные id'));
    } else {
      next(err);
    }
  }
};
