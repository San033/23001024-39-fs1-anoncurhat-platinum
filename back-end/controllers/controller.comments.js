const db = require('../db/models');

const getComments = async (req, res) => {
  try {
    const { post_id } = req.query;
    const comments = await db.Comments.findAll({
      where: {
        post_id: post_id,
        active: true,
      },
    });
    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const createComments = async (req, res) => {
  try {
    const { post_id, user_id, content } = req.body;
    await db.Comments.create({ post_id, user_id, content });
    res.status(200).json({
      message: 'Comment successfull added with ',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const deleteComments = async (req, res) => {
  try {
    const { id } = req.params;
    await db.Comments.update({ active: false }, { where: { id_comment: id } });
    res.status(200).json({
      message: 'Deleting Comment Success',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports = { getComments, createComments, deleteComments };
