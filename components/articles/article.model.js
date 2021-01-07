const { dbConnect } = require("../../connect");
const instance = dbConnect.blogDB;
const ObjectId = instance.Schema.Types.ObjectId;

const articleSchema = instance.Schema(
  {
    title: { type: String, required: true },
    author: ObjectId,
    body: { text: String },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

const articleModel = instance.model("article", articleSchema);

module.exports = articleModel;
