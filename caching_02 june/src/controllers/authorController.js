const authorModel = require("../models/authorModel");
const redis = require("redis");

const { promisify } = require("util");

//1. Connect to the redis server
const redisClient = redis.createClient(
  13190,
  "redis-13190.c301.ap-south-1-1.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);
redisClient.auth("gkiOIPkytPI3ADi14jHMSWkZEo2J5TDG", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});



//2. Prepare the functions for each command

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);


const createAuthor = async function (req, res) {
  let data = req.body;
  let authorCreated = await authorModel.create(data);
  res.send({ data: authorCreated });
};

const fetchAuthorProfile = async function (req, res) {

//3. Start using the redis commad
  let cahcedProfileData = await GET_ASYNC(`${req.params.authorId}`)
  if(cahcedProfileData) {
    res.send(cahcedProfileData)
  } else {
    let profile = await authorModel.findById(req.params.authorId);
    await SET_ASYNC(`${req.params.authorId}`, JSON.stringify(profile))
    res.send({ data: profile });
  }

};
``
module.exports.createAuthor = createAuthor;
module.exports.fetchAuthorProfile = fetchAuthorProfile;
