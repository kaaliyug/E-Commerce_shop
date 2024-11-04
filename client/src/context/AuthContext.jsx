import { createContext, useContext, useState } from "react";
import * as userService from "../services/userServices"
import {toast} from "react-toastify"


export const AuthContext = createContext(null)


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(userService.getUser())

    const login = async (email, password) => {
        try {
            const checkUser = await userService.login(email, password)
            setUser(checkUser)
            console.log(user)
            toast.success("login successfull")
        } catch (err) {
            toast.error(err.resposne.data)
        }
    }

    const register = async data => {
        try{
            const registerUser = await userService.register(data)
            setUser(registerUser)
            toast.success("Register Successfull")
        } catch (err) {
            toast.error(err.response.data)
        }
    }

    const logout = () => {
        userService.logout();
        setUser(null)
        toast.success("Logout Successfull")
    }

    const updateProfile = async user => {
        const updatedUser = await userService.updateProfile(user)
        toast.success("Profile Update was successfull")
        if (updatedUser) setUser(updatedUser)
    }

    const changePassword = async passwords => {
        await userService.changePassword(passwords);
        logout();
        toast.success("Password changed successfully. Please Login again!")
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateProfile, changePassword }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const authContext = useContext(AuthContext)
    if(!authContext){
        throw new Error("useAuth used outside of the provider")
    }
    return authContext
}