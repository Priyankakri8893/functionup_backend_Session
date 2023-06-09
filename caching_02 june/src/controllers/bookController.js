const authorModel = require("../models/authorModel");
const publisherModel = require("../models/publisherModel");
const bookModel = require("../models/bookModel");

const createBook = async function (req, res) {
  let data = req.body;
  let authorId = req.body.author;
  let publisherId = req.body.publisher;

  //Check if the author in request is a valid author
  let authorFromRequest = await authorModel.findById(authorId);
  //Check if the publisher in request is a valid publisher
  let publisherFromRequest = await publisherModel.findById(publisherId);

  if (!authorFromRequest) {//if no author found
    res.send("The author Id provided is not valid.");
  } else if (!publisherFromRequest) {//if no publisher found
    res.send("The publisher Id provided is not valid.");
  } else {
    //both author and publisher exist and are thus valid
    let bookCreated = await bookModel.create(data);
    res.send({ data: bookCreated });
  }
};

const getBooks = async function (req, res) {
  let allBooks = await bookModel.find().populate("author", "author_name age").populate("publisher");
  res.send(allBooks);
};

module.exports.createBook = createBook;
module.exports.getBooks = getBooks;
