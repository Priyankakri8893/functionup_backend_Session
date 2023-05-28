const jwt= require("jsonwebtoken");


// - Once, all the apis are working fine, move the authentication related code in a middleware called auth.js
// - Add this middleware at route level in the routes where applicable.

const authenticate = async function(req, res, next) {
    //check the token in request header
    //validate this token
    try {
      let token = req.headers["x-Auth-token"];
      if (!token) token = req.headers["x-auth-token"];
    
      if (!token) return res.send({ status: false, msg: "token must be present" });
  
      let decodedToken =await jwt.verify(token, "functionup-assignment-jsonwebtoken-done");
      if (!decodedToken)
        return res.send({ status: false, msg: "token is invalid" });
        console.log("I move to next function")
      next();
    } catch (error) {
      res.status(400).send(error)
    }
}

module.exports= {authenticate}


