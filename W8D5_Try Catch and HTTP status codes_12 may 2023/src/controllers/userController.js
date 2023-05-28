const userModel = require("../models/userModel")
const jwt= require("jsonwebtoken");

// register a user from the user details in request body.

const createUser= async function (req, res) {
    try {
      let data = req.body
    let savedData= await userModel.create(data)
    res.status(200).send({msg: savedData})
    } catch (error) {
      console.log("This is the error: ", error)
      res.status(400).send({msg: "Please check your input", error: error})
    }

    //2xx - success
    //4xx - something gone wrong...and wrong from the user side
    //5xx - server side problems


    //HTTP status codes
    //always sent with res.. Only with res
    //specific status codes for specific success and failure scenarios
    //

    // Bad request.....400

    //resource not found....404
    //404 page not found
    //authentication missing....401
    //not authenticated or forbidden....403

    // -- try catch ...// server error ....500
    //-- all good...status(200)-ok
}

// login a user that takes user details - email and password from the request body. If the credentials don't match with any user's data return a suitable error.
// On successful login, generate a JWT token and return it in response body.

const loginUser= async function (req, res) {
    let userName= req.body.emailId;
    let password= req.body.password;
    
    let user= await userModel.findOne({emailId: userName, password: password});
    if(!user) return res.send({status: false, msg: "user or the password is not correct"});

    //after successful login
    let token= jwt.sign({
        userId: user._id.toString(),
        userEmail: user.emailId 
    },
    "functionup-assignment-jsonwebtoken-done"
    );
    res.setHeader("x-auth-token", token);
    res.send({status: true, token: token});
}


// - Write a **GET api /users/:userId** to fetch user details. Pass the userId as path param in the url. Check that request must contain **x-auth-token** header. If absent, return a suitable error.
// If present, check that the token is valid.

const getUserData = async function (req, res) {
    // let token = req.headers["x-Auth-token"];
    // if (!token) token = req.headers["x-auth-token"];
  
    // if (!token) return res.send({ status: false, msg: "token must be present" });
  
    // console.log(token);
  
    // let decodedToken = jwt.verify(token, "functionup-assignment-jsonwebtoken-done");
    // if (!decodedToken)
    //   return res.send({ status: false, msg: "token is invalid" });
  
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
      return res.send({ status: false, msg: "No such user exists" });
  
    res.send({ status: true, data: userDetails });
  };

  // Write a **PUT api /users/:userId** to update user details. Pass the userId as path param in the url and update the attributes received in the request body. Check that request must contain **x-auth-token** header. If absent, return a suitable error.  

  const updateUserData= async function(req, res){
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
  
    if (!token) return res.send({ status: false, msg: "token must be present" });

  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  
  if (!user) {
    return res.send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.send({ status: updatedUser, data: updatedUser });
  }

  // Write a **DELETE api /users/:userId** that takes the userId in the path params and marks the isDeleted attribute for a user as true. Check that request must contain **x-auth-token** header. If absent, return a suitable error.  
const deleteUserData = async (req, res) => {
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];

  if (!token) return res.send({ status: false, msg: "token must be present" });

let userId = req.params.userId;
let user = await userModel.findById(userId);

if (!user) {
  return res.send("No such user exists");
}

const removeUser = await userModel.findOneAndUpdate(
  { _id: userId },
  { $set: { isDeleted: true } },
  { new: true }
);
res.send({status: "userDeleted", msg:removeUser})

}


module.exports= {createUser, loginUser, getUserData, updateUserData, deleteUserData}