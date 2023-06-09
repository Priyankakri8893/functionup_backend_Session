const publisherModel = require("../models/publisherModel");

const createPublisher = async function (req, res) {
  let data = req.body;
  let publisherCreated = await publisherModel.create(data);
  res.send({ data: publisherCreated });
};

module.exports.createPublisher = createPublisher;
