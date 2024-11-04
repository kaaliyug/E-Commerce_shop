import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    username: { type:String, required:[true, "Please provide unique Username"], unique:[true, "Username Exist"] },
    email: { type:String, required:[true, "Please provide a valid email"], unique:true },
    password:{ type:String, required:[true, "Please provide a password"], unique:false },
    firstName: { type:String, required: true },
    lastName: { type: String, required: true },
    address: {type: String, required: true},
    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
})

userSchema.pre("save", async function (next){
    console.log("pre method ", this)
    const user = this;
    if (!user.isModified("password")){
        next();
    }
    try{
        const saltRound = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(user.password, saltRound)
        user.password = hash_password
    }catch(error){
        next(error);
    }
})

/**
 */
// userSchema.method.comparePassword = async function (password) {
//     return bcrypt.compare(password, this.password)
// }


const userModel = mongoose.model("User", userSchema);
export default userModel;