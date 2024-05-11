import Image from "next/image"
import styles from "./about.module.css"

export const metadata = {
    title: 'About Page',
    description: 'About desc',
  }
const About = () => {

    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h2 className={styles.subtitle}>About Agency</h2>
                <h1 className={styles.title}>We create digital ideas</h1>
                <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit eum fuga repellendus quae voluptates aperiam ipsam aliquid, eveniet a vel nesciunt, incidunt maxime! Non aspernatur officia dolore dicta eaque voluptates.</p>
                <div className={styles.boxes}>
                    <div className={styles.box}>
                        <h1>10K+</h1>
                        <p>Year of experience</p>
                    </div>
                    <div className={styles.box}>
                        <h1>10K+</h1>
                        <p>Year of experience</p>
                    </div>
                    <div className={styles.box}>
                        <h1>10K+</h1>
                        <p>Year of experience</p>
                    </div>

                </div>
            </div>

            <div className={styles.imgContainer}>

                <Image src="/about.png" alt="about" fill className={styles.img}/>
            </div>
        </div>
    )
}
export default About