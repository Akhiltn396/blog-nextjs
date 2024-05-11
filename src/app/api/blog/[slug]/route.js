import { connectDb } from "@/lib/connectDb"
import { Post } from "@/lib/models"
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {

    const { slug } = params;
    try {
        connectDb()
        const post = await Post.findOne({ slug });
        return NextResponse.json(post)
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch post")
    }
}