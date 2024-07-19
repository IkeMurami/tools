import { FC, PropsWithChildren } from "react";
import styles from "./Grid.module.css"
import classNames from "classnames";


type Props = {
    className?: string
}

const Grid: FC<PropsWithChildren<Props>> = ({className, children}) => {
    return (
        <div className={classNames(styles.grid, className)}>
            {children}
        </div>
    )
}

export default Grid
