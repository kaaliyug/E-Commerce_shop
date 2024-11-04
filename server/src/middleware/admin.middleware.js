import { UNAUTHORIZED } from "../constants/httpStatus.js";
import authMid from "./auth_middleware.js";

const adminMid = (req, res, next) => {
    if(!req.user.isAdmin) res.status(UNAUTHORIZED).send();
    
    return next();
}

export default [authMid, adminMid]