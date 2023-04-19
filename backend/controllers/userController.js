import User from "../model/user.js";
import bcrypt from 'bcryptjs'

export const getAllUsers = async (req, res, next) => {
    let users
    try {
        users = await User.find()
    } catch (err) {
        console.log(err);
    }
    return res.status(200).json({ users })
}

export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body
    let userExists
    try {
        userExists = await User.findOne({ email })
    } catch (err) {
        console.log(err);
    }
    if (userExists) {
        return res.status(400).json({ message: 'User already exists! Login instead' })
    }
    const hashedPassword = bcrypt.hashSync(password)
    const user = new User({
        name, email, password: hashedPassword, blogs: []
    })
    try {
        await user.save()
    } catch (err) {
        console.log(err);
    }
    return res.status(201).json({ user, message: "User created successfully" })
}

export const login = async (req, res, next) => {
    const { email, password } = req.body
    let userExists
    try {
        userExists = await User.findOne({ email })
    } catch (err) {
        console.log(err);
    }
    if (!userExists) {
        return res
            .status(404)
            .json({ message: "Couldn't find the user by this email" })
    }
    const isPasswordCorrect = bcrypt.compareSync(password, userExists.password)
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect password" })
    }
    return res.status(200).json({ message: "Login Successfull", user: userExists })
}
