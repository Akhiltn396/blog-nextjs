import { connectDb } from "./connectDb"
import { Post, User } from "./models";
import { unstable_noStore as noStore } from "next/cache";

export const getPosts = async () => {
    try {
        connectDb();
        const posts = await Post.find();
        console.log("got")
        return posts
    } catch (error) {
        throw new Error("failed to fetch posts")
    }
}

export const getPost = async (slug) => {
    try {
        connectDb();
        const post = await Post.findOne({ slug }); //slug:slug
        return post

    } catch (error) {
        throw new Error("failed to fetch post")
    }
}

export const getUser = async (id) => {
    console.log(id)
    noStore()
    try {
        connectDb()
        const user = await User.findById(id)
        return user
    } catch (error) {
        throw new Error("failed to fetch user")

    }
}
export const getUsers = async () => {
    try {
        connectDb()
        const users = await User.find()
        return users
    } catch (error) {
        throw new Error("failed to fetch users")

    }
}