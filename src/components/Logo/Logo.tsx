import Image, {ImageProps} from "next/image"
import { FC } from "react"
import styles from "./Logo.module.css"
import Link from "next/link"
import classNames from "classnames"


type Props = {
    className?: string
    link?: string
}

const Logo: FC<ImageProps & Props> = ({className, link, ...props}) => {

    return link && 
        <Link href={link} className={className}>
            <Image
                className={styles.logo}
                {...props}
            />
        </Link> 
        
        || 
        
        <Image
            className={classNames(className, styles.logo)}
            {...props}
        />
}

export default Logo
