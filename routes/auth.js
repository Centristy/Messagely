/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */


const jwt = require("jsonwebtoken");
const Router = require("express").Router;
const router = new Router();

const User = require("../models/user");
const {SECRET_KEY} = require("../config");
const ExpressError = require("../expressError");

router.post("/login", async function(req, res, next){
    try {
        let {username, password} = req.body;
        if (await User.authenticate(username.password)){
            let token = jwt.sign({username}, SECRET_KEY);
            User.updateLoginTimestamp(username);
            return res.json({token});
        } else{
            throw new ExpressError ("Password/Username do not match with any accoutn, 400")
        }
    }
    catch (error){
        return next (error);
    }
})


module.exports = router;
