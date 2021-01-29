const express = require('express');
// controllers
const UserController = require('../../app/http/controllers/UserController')
// middlewares
const { encode } = require('../../app/http/middlewares/jwt')

const router = express.Router();

router
  .post('/login/:userId', encode, (req, res, next) => {
    return res
      .status(200)
      .json({
        success: true,
        authorization: req.authToken,
      });
  });

module.exports = router;