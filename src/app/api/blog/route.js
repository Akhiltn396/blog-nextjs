import { connectDb } from "@/lib/connectDb"
import { Post } from "@/lib/models"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        connectDb()
        const posts = await Post.find();
        return NextResponse.json(posts)
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch posts")
    }
}

export const DELETE = async (request, { params }) => {
    const { slug } = params;

    try {
        connectDb()
        const post = await Post.deleteOne({ slug });
        return NextResponse.json(post)
    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete post")
    }
}