import PostCard from "@/components/postCard/postCard"
import styles from "./blog.module.css"
import { getPosts } from "@/lib/data"

const Blog = async () => {
    const getData = async () => {
        const res = await fetch("http://localhost:3000/api/blog")
        // {cache:"no-store"} :- for not cacheing the api responses
        // {next:{revalidate:3600}} :- revalidate data in every 3600 seconds
        if (!res.ok) {
            throw new Error("Something went wrong")
        }
        else {
            return res.json()
        }
    }
    // FETCH DATA WITH AN API
    const posts = await getData()

    // FETCH DATA WITHOUT AN API,ie USING SERVER ACTIONS
    // const posts = await getPosts();


    return (
        <div className={styles.container}>
            {
                posts.map((post) => (
                    <div className={styles.post} key={post.id}>
                        <PostCard post={post} />
                    </div>
                ))
            }



        </div>
    )
}
export default Blog