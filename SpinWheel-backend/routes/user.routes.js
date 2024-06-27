const router = require('express').Router();
const userNameCtrl = require('../controllers/users.controller');

router.route('/add')
    .post(userNameCtrl.addUserNames)

router.route('/getData')
    .get(userNameCtrl.getUserNames)

router.route('/delete/:id')
    .delete(userNameCtrl.deleteUsernames)

module.exports = router;