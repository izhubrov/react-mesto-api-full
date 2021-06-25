const router = require('express').Router();

const {
  readUsers, readUserInfo, readCurrentUserInfo, setUserInfo, setUserAvatar,
} = require('../controllers/users');

router.get('/', readUsers);
router.get('/:userId', readUserInfo);
router.get('/me', readCurrentUserInfo);
router.patch('/me', setUserInfo);
router.patch('/me/avatar', setUserAvatar);

module.exports = router;
