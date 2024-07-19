import styles from './Header.module.css'
import Logo from "../Logo/Logo";

export default function Header() {
    return (
        <div className={styles.container}>
            <Logo
                priority
                link="/"
                className={styles.home}
                src={"home.svg"}
                height={48}
                width={48}
                alt="Going to Home page"
            />
            <Logo 
                priority
                link="https://github.com/"
                className={styles.github}
                src={"github.svg"}
                height={48}
                width={48}
                alt="View code on Github"
            />
        </div>
    )
}