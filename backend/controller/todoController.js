const { Todo } = require('../models/Todo');

exports.getTodos = async (req, res) => {
  try {
    const result = await Todo.findAll();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.postTodos = async (req, res) => {
  const { title, done } = req.body;
  try {
    await Todo.create({
      title,
      done,
    });
    res.send(true);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
