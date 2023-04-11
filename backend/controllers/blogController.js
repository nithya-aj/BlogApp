import mongoose from "mongoose";
import Blog from "../model/blog.js";
import User from "../model/user.js";

export const getAllBlogs = async (req, res, next) => {
    let blogs
    try {
        blogs = await Blog.find()
    } catch (err) {
        return console.log(err);
    }
    if (!blogs) {
        return res.status(404).json({ message: "No blogs found" })
    }
    return res.status(200).json({ blogs })
}

export const createBlog = async (req, res, next) => {
    const { title, desc, image, user } = req.body
    let userExists
    try {
        userExists = await User.findById(user)
    } catch (err) {
        return console.log(err)
    }
    if (!userExists) {
        return res.status(500).json({ message: "Unable to find user" })
    }
    const blog = new Blog({
        title, desc, image, user
    })
    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await blog.save({ session })
        userExists.blogs.push(blog)
        await userExists.save({ session })
        await session.commitTransaction()
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err })
    }
    return res.status(200).json({ blog })
}

export const updateBlog = async (req, res, next) => {
    const { title, desc } = req.body
    const blogId = req.params.id
    let blog
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title, desc
        })
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable to update the blog" })
    }
    return res.status(200).json({ message: "Blog updated successfully" })
}

export const getById = async (req, res, next) => {
    const id = req.params.id
    let blog
    try {
        blog = await Blog.findById(id)
    } catch (err) {
        return console.log(err)
    }
    if (!blog) {
        return res.status(404).json({ message: "No blog found" })
    }
    return res.status(200).json({ blog })
}

export const deleteBlog = async (req, res, next) => {
    const id = req.params.id
    let blog
    try {
        blog = await Blog.findByIdAndRemove(id).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable to delete" })
    }
    return res.status(200).json({ message: "Deleted successfully" })
}

export const getBlogByUserId = async (req, res, next) => {
    const userId = req.params.id
    let userBlogs
    try {
        userBlogs = await User.findById(userId).populate('blogs')
    } catch (err) {
        return console.log(err);
    }
    if(!userBlogs){
        return res.status(404).json({message:"No blog found"})
    }
    return res.status(200).json({Blogs:userBlogs})
}
