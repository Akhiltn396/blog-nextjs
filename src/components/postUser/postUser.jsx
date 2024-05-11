import Image from "next/image"
import styles from "./postUser.module.css"
import { getUser } from "@/lib/data"

const PostUser = async ({ userId }) => {
    const getData = async (userId) => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { cache: "no-store" })
        // {cache:"no-store"} :- for not cacheing the api responses
        // {next:{revalidate:3600}} :- revalidate data in every 3600 seconds
        if (!res.ok) {
            throw new Error("Something went wrong")
        }
        else {
            return res.json()
        }
    }
    const user = await getUser(userId)
    return (
        <div className={styles.container}>
            <Image src={user.img ? user.img : "/noavatar.png"} alt="" width={50} height={50} className={styles.avatar} />
            <div className={styles.texts}>

                <span className={styles.title}>Author</span>
                <span className={styles.username}>{user.username}</span>
            </div>
        </div>
    )
}
export default PostUser