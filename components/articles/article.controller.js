const articleModel = require("./article.model");
const { userModel } = require("../user");

exports.publish = (req, res) => {
  let { user } = req;
  let article = new articleModel({
    title: req.body.title,
    author: user._id,
    body: { text: req.body.body.text },
    tags: req.body.tags,
  });
  article
    .save()
    .then((article) => {
      userModel
        .findByIdAndUpdate(user._id, {
          $push: { articleIds: article._id },
        })
        .then();
      res.status(200).send({
        article_id: article._id,
        message: "The article has been published.",
      });
    })
    .catch((err) => {
      res.status(404).send({ message: err.message });
    });
};

exports.get = (req, res) => {
  articleModel
    .find({})
    .sort({ _id: -1 })
    .populate({ path: "author", select: "name -_id" })
    .then((articles) => {
      res.status(200).send({ articles: articles });
    })
    .catch((err) => {
      res.status(404).send({ message: err.message });
    });
};

exports.getOne = (req, res) => {
  articleModel
    .findById(req.params.articleId)
    .populate({ path: "author", select: "name -_id" })
    .then((article) => {
      if (article) {
        res.status(200).send({ article: article });
      } else {
        res
          .status(404)
          .send({
            message: "Article not found with id" + req.params.articleId + ".",
          });
      }
    })
    .catch((err) => {
      res
        .status(404)
        .send({
          message: "Article not found with id" + req.params.articleId + ".",
        });
    });
};
