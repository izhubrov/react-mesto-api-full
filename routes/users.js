const router = require('express').Router();

const {
  readUsers, readUserInfo, createUser, setUserInfo, setUserAvatar,
} = require('../controllers/users');

router.get('/', readUsers);
router.get('/:userId', readUserInfo);
router.post('/', createUser);
router.patch('/me', setUserInfo);
router.patch('/me/avatar', setUserAvatar);

module.exports = router;
