import Image from "next/image"
import styles from "./single.module.css"
import PostUser from "@/components/postUser/postUser"
import { Suspense } from "react"
import { getPost } from "@/lib/data";

export const generateMetadata = async ({ params }) => {
    const { slug } = params;
    const post = await getPost(slug)

    return {
        title: post?.title,
        description: post?.desc
    }
}
const SinglePost = async ({ params }) =>  {
    const getData = async (slug) => {
        const res = await fetch(`http://localhost:3000/api/blog/${slug}`)
        // {cache:"no-store"} :- for not cacheing the api responses
        // {next:{revalidate:3600}} :- revalidate data in every 3600 seconds
        if (!res.ok) {
            throw new Error("Something went wrong")
        }
        else {
            return res.json()
        }
    }
    const { slug } = params;

    // FETCH DATA WITH AN API
    const posts = await getData(slug)



    // FETCH DATA WITHOUT AN API ie SERVER ACTIONS
    // const posts = await getPost(slug)

    return (
        <div className={styles.container}>
            {posts?.img &&

                <div className={styles.imgContainer}>
                    <Image src={posts?.img} className={styles.img} fill />
                </div>
            }
            <div className={styles.textContainer}>
                <div className={styles.title}>
                    {posts.title}
                </div>
                <div className={styles.detail}>

                    {
                        posts &&
                        <Suspense fallback={<div>Loading....</div>}>
                            <PostUser userId={posts.userId} />
                        </Suspense>
                    }
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>{posts?.createdAt?.toString()?.slice(4, 16)}</span>
                    </div>
                </div>
                <div className={styles.content}>
                    {posts.desc}
                </div>
            </div>
        </div>
    )
}
export default SinglePost