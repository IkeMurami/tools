import styles from './Header.module.css'
import Logo from "../Logo/Logo";
import { BASE_PATH } from '@/utils/consts';

export default function Header() {

    return (
        <div className={styles.container}>
            <Logo
                priority
                link="/"
                className={styles.home}
                src={`${BASE_PATH}/home.svg`}
                height={48}
                width={48}
                alt="Going to Home page"
            />
            <Logo 
                priority
                link="https://github.com/IkeMurami/tools"
                className={styles.github}
                src={`${BASE_PATH}/github.svg`}
                height={48}
                width={48}
                alt="View code on Github"
            />
        </div>
    )
}