const express = require('express');
const controller = require('../controller/todoController');
const router = express.Router();

router.get('/todos', controller.getTodos);
router.post('/todos', controller.postTodos);
// router.patch('/todo/:todoId', controller.patchTodo);
// router.delete('/todo/:todoId', controller.deleteTodo);

module.exports = router;
