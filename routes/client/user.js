const express = require('express');
// controllers
const UserController = require('../../app/http/controllers/UserController')

const router = express.Router();

router
  .get('/', UserController.onGetAllUsers)
  .post('/', UserController.onCreateUser)
  .get('/:id', UserController.onGetUserById)
  .delete('/:id', UserController.onDeleteUserById)

module.exports = router;