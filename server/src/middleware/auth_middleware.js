// verify and decode json webtoken valid get user data
// to allow users to do actions once logged in

// import { verify } from "jsonwebtoken";
import pkg from 'jsonwebtoken';
const { verify } = pkg;
import jwt from "jsonwebtoken"

export default (req, res, next) => {

    const token = req.headers.access_token;
    //or const token = req.header("Authorization")

    if(!token) {return res.status(401).json({message: "Unauthorized HTTP, Token not provided"})}
    
    try {
       const decoded = verify(token, process.env.JWT_SECRET_KEY)
       req.user = decoded;

    } catch (error) {
        res.status(UNAUTHORIZED).send()
    }

    return next();
}
