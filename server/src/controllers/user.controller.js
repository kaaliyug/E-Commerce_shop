import bcrypt from "bcryptjs"
import userModel from "../mongoDB/models/user.model.js";
import jwt from "jsonwebtoken";
import handler from "express-async-handler"
import { BAD_REQUEST } from "../constants/httpStatus.js";


/**
 * POST: http://localhost:5000/api/auth/register
 * @param {
* "username" : "JOHN WICK", 
* "password" : "Matrix*World123",
* "email" : "john@gmail.com",
* "firstName" : "JOHN",
* "lastName" : "WICK",
* "profile" : "" 
* } req 
* @param {*} res 
* @returns 
*/

/** ---------------------------------------------------
 *   TO SEND REGISTER DATA - REGISTER LOGIC
 ------------------------------------------------------ */

export const registerUser = handler(async (req, res) => {    
    try{
        let checkExistEmail = await userModel.findOne({ email: req.body.email })
        if (checkExistEmail) { return res.status(BAD_REQUEST).json({ message: "User's Email already exists, please login!" }) }
        
        const newUserRegister = new userModel(req.body) 
        /** 
         * other way this one will give the id that is generated for the token create the new user object
         * const newUser = {email:email.tolowercase(), password:hashedPassword,name:`${firstName} ${lastName}`}
         * create the new user using user object
         * const result = await userModel.create(newUser) 
         * */
        await newUserRegister.save()
        const result = generateTokenResponse(newUserRegister)
        const token = result.token

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 2592000000,
        })
        //res.send(generateTokenResponse(newUserRegister))
        return res.send(result)
    }catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" })        
           console.log(req.body)
        //    next(error)        
    }
})

/** ---------------------------------------------------
 *   TO SEND SIGNIN DATA - LOGIN LOGIC
 ------------------------------------------------------ */

export const loginUser = handler(async (req, res) => {
    const { email, password } = req.body
    try{
        const checkExistEmail = await userModel.findOne({ email })
        // user => user.email === email && user.username === username

        if (!checkExistEmail) {
            return res.status(404).json({ message: "User doesn't exist"})
        }       
   
        if (checkExistEmail && (await bcrypt.compare(password, checkExistEmail.password))) {
            const result = generateTokenResponse(checkExistEmail)
            const token = result.token
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 2592000000,
            })
            res.send(result) 
            // res.send(generateTokenResponse(checkExistEmail))
            return;
        }
        res.status(BAD_REQUEST).send("Username or password is invalid")

        //res.status(200).json({ result:existingUser, token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error"})
    }
})

/** ---------------------------------------------------
 *   TO UPDATE USER DATA - UPDATE LOGIC
 ------------------------------------------------------ */

export const updateProfile = handler(async (req, res) => {
    const { firstName, lastName, address } = req.body;
    const user = await userModel.findByIdAndUpdate(
        req.user.id,
        { firstName, lastName, address },
        { new: true}
    )
    res.send(generateTokenResponse(user));
})

/** ---------------------------------------------------
 *   TO CHANGE PASSWORD - UPDATE LOGIC
 ------------------------------------------------------ */

export const changePassword = handler(async (req, res) => {

    const { currentPassword, newPassword } = req.body;
    const user = await userModel.findById(req.user.id)

    if(!user) {
        res.status(400).send("Change Password Failed!")
        return;
    }

    const equal = await bcrypt.compare(currentPassword, user.password);

    if(!equal) {
        res.status(400).send("Current password is not Correct!")
        return;
    }

    // user.password = await bcrypt.hash(newPassword, 10);
    user.password = newPassword;
    await user.save() 

    res.send()
})

/** ---------------------------------------------------
 *   TO getALL USERS - All LOGIC
 ------------------------------------------------------ */

export const getAll = handler(async (req, res) => {
    const { searchTerm } = req.params;
    const filter = searchTerm
    // ? { firstName: { $regex: new RegExp(searchTerm, 'i') } }
    ? { $or: [ {firstName: { $regex: new RegExp(searchTerm, 'i') }}, {username: { $regex: new RegExp(searchTerm, 'i') }} ]}
    : {};

    const users = await userModel.find(filter, { password: 0 });
    res.send(users)
})

/** ---------------------------------------------------
 *      TO TOGGLE BLOCK USERS - All LOGIC
 ------------------------------------------------------ */

export const toggleBlock = handler(async (req, res) => {

    const { userId } = req.params;
    if (userId === req.user.id) {
        res.status(BAD_REQUEST).send("Can't block yourself!");
        return;
    }

    const user = await userModel.findById(userId);
    user.isBlocked = !user.isBlocked;
    user.save();

    res.send(user.isBlocked);
})

/** ---------------------------------------------------
 *        TO GET USERS ID - All LOGIC
 ------------------------------------------------------ */

export const getUserId = handler(async (req, res) => {
    const { userId } = req.params;
    const user = await userModel.findById(userId, { password: 0 });
    res.send(user);
})

/** ---------------------------------------------------
 *        TO UPDATE USERS - All LOGIC
 ------------------------------------------------------ */

export const updateUser = handler(async (req, res) => {
    const { id, username, firstName, lastName, email, address, isAdmin  } = req.body;
    await userModel.findByIdAndUpdate(id, {
        username, 
        firstName, 
        lastName,
        email,
        address,
        isAdmin,
    });
    res.send();
})


const generateTokenResponse = user => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        }, 
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"30d"
        }
    );

    return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.firstName +" "+ user.lastName,
        address: user.address,
        isAdmin: user.isAdmin,
        token,
    }
}