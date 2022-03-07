const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, getUserById, updateUser, updateAvatar, getUserMe,
} = require('../controllers/controlersUsers');
const auth = require('../middleware/auth');

router.get('/', auth, getUser);

router.get('/me', auth, getUserMe);

router.get('/:userId', auth, celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

router.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(
      /https?:\/\/(www\.)?[-\w@:%\\.\\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%\\.\\+~#=//?&]*)/i,
    ),
  }),
}), updateAvatar);

// router.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().trim(),
//   }),
// }), login);

// router.post('/signup', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().trim(),
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//     avatar: Joi.string().pattern(
//     /https?:\/\/(www\.)?[-\w@:%\\.\\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%\\.\\+~#=//?&]*)/i,
//     ),
//   }),
// }), createUser);

module.exports = router;
