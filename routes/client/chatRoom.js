const express = require('express');

// controllers
const chatRoomController = require('../../app/http/controllers/ChatRoomController');

const router = express.Router();

router
  .get('/', chatRoomController.getRecentConversation)
  .get('/:roomId', chatRoomController.getConversationByRoomId)
  .post('/initiate', chatRoomController.initiate)
  .post('/:roomId/message', chatRoomController.postMessage)
  .put('/:roomId/mark-read', chatRoomController.markConversationReadByRoomId)

module.exports = router;