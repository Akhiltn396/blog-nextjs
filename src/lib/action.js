"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "./connectDb";
import { Post, User } from "./models";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export const addPost = async (prevState,formData) => {

    const { title, desc, slug, userId } = Object.fromEntries(formData)
    try {

        connectDb()

        const newPost = new Post({
            title,
            desc,
            slug,
            userId
        })

        await newPost.save()
        console.log("saved to db");
        revalidatePath("/blog")
        revalidatePath("/admin")
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" }

    }

}
export const addUser = async (prevState,formData) => {

    const { username, email, password, img } = Object.fromEntries(formData)
    try {

        connectDb()

        const newUser = new User({
            username, email, password, img 
        })

        await newUser.save()
        console.log("saved to db");
        revalidatePath("/admin")
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" }

    }

}
export const deletePost = async (formData) => {

    const { id } = Object.fromEntries(formData)
    try {

        connectDb()

        await Post.findByIdAndDelete(id)
        console.log("deleted from db");
        revalidatePath("/blog")
        revalidatePath("/admin")

    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" }

    }

}
export const deleteUser = async (formData) => {

    const { id } = Object.fromEntries(formData)
    try {

        connectDb()
        await Post.deleteMany({userId:id})
        await User.findByIdAndDelete(id)
        console.log("deleted from db");
        revalidatePath("/admin")
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" }

    }

}

export const handleGithubLogin = async () => {
    await signIn("github")
}
export const handleLogOut = async () => {
    await signOut()
}

export const register = async (previousState, formData) => {
    const { username, email, password, img, passwordRepeat } =
        Object.fromEntries(formData);

    if (password !== passwordRepeat) {
        return { error: "Passwords do not match" };
    }

    try {
        connectDb();

        const user = await User.findOne({ username });

        if (user) {
            return { error: "Username already exists" };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
        });

        await newUser.save();
        console.log("saved to db");

        return { success: true };
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
};

export const login = async (previousState, formData) => {
    const { username, password } = Object.fromEntries(formData)
    try {
        await signIn("credentials", { username, password })
    } catch (error) {
        console.log(error);
        if (error.message.includes("CredentialsSignin")) {
            return { error: "Invalid username or password" }
        }
        throw error
    }
}