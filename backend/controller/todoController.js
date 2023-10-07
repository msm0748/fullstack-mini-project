const { Todo } = require('../models');

exports.getTodos = async (req, res) => {
  try {
    const result = await Todo.findAll();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.postTodo = async (req, res) => {
  const { title, done } = req.body;

  try {
    const result = await Todo.create({
      title,
      done,
    });
    res.send({ result, message: '등록이 완료되었습니다.' });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.patchTodo = async (req, res) => {
  const { id } = req.params;
  const { title, done } = req.body;
  try {
    const result = await Todo.update(
      { title, done },
      {
        where: { id },
      }
    );
    if (title) return res.send({ result, message: '수정이 완료되었습니다.' });
    if (done) return res.send({ result, message: '할 일을 완료했습니다.' });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Todo.destroy({
      where: { id },
    });
    res.send({ result, message: '삭제가 완료되었습니다.' });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
