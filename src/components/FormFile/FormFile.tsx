import { FC, PropsWithChildren, SyntheticEvent, useEffect, useRef, useState } from "react"
import styles from "./FormFile.module.css"
import classNames from "classnames"


type Props = {
    className?: string
    callback: (files: Array<File>) => void
}


const FormFile: FC<PropsWithChildren<Props>> = ({className, children, callback}) => {

    const [files, setFiles] = useState<Array<File>>([])

    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (files && files.length > 0) {
            callback(files)
        }
    }, [files])

    const submitHandler = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault()
    }

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (ref && ref.current) {
            ref.current.click()
        }
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiles([])
        if (ref && ref.current && ref.current.files) {
            setFiles(Array.from(ref.current.files))
        }
    }

    return (
        <form action="/" className={classNames(styles.form, className)} onSubmit={submitHandler}>
            <input className={styles.input} ref={ref} onChange={changeHandler} type="file" />
            <button className={styles.button} type="submit" onClick={clickHandler}>
                {children}
            </button>
        </form>
    )
}

export default FormFile