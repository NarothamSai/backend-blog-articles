const articleModel = require("./article.model");

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
      res.status(200).send({
        article_id: article._id,
        message: "The article has been published.",
      });
    })
    .catch((err) => {
      res.status(404).send({ message: err.message });
    });
};
