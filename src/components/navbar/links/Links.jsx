"use client"
import Image from "next/image"
import styles from "./Links.module.css"
import NavLink from "./navLink/navLink"
import { useState } from "react"
import { handleLogOut } from "@/lib/action"
import { auth } from "@/lib/auth"
const links = [
    {
        title: "Homepage",
        path: "/"
    },
    {
        title: "About",
        path: "/about"
    },
    {
        title: "Contact",
        path: "/contact"
    },
    {
        title: "Blog",
        path: "/blog"
    }
]
const Links = async ({ session }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {
                    links.map((link) => (
                        <NavLink item={link} key={link.title} />
                    ))
                }
                {
                    session?.user ?
                        <>
                            {
                                session?.user?.isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />
                            }
                            <form action={handleLogOut}>

                                <button className={styles.logout}>Logout</button>
                            </form>

                        </>

                        :
                        <NavLink item={{ title: "Login", path: "/login" }} />

                }
            </div>
            <Image className={styles.menuButton} src="/menu.png" alt="" width={30} height={30} onClick={() => setOpen((prev) => !prev)} />
            {
                open && (
                    <div className={styles.mobileLinks}>
                        {
                            links.map((link) => (
                                <NavLink item={link} key={link.title} />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}
export default Links