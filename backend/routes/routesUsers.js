const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, getUserById, updateUser, updateAvatar, getUserMe,
} = require('../controllers/controlersUsers');

router.get('/', getUser);

router.get('/me', getUserMe);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(
      /https?:\/\/(www\.)?[-\w@:%\\.\\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%\\.\\+~#=//?&]*)/i,
    ),
  }),
}), updateAvatar);

module.exports = router;
