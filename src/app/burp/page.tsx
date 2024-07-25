"use client"
import React, { useRef, useState } from "react"
import { getItems, parseItem } from "./parser"
import { compress } from "../../utils/compress"
import styles from "./page.module.css"
import FormFile from "@/components/FormFile/FormFile"
import Link from "next/link"
import { BASE_PATH } from "@/utils/consts"


export default function Page() {

    const [compressedData, setCommpressedData] = useState<Blob>()

    const chooseFilesHandler = async (files: Array<File>) => {
        const items = await Array.fromAsync(
            files.map(
                async file => Array.from(
                    await getItems(file)
                )
            )
        )

        compress(
            Array
                .from(
                    items.flat()
                )
                .map(item => parseItem(item))
                .map(item => {
                    const path = item.path.split('/').filter(p => p !== '').join('/')
                    return {
                        filename: `${item.host}/${path}`,
                        data: item.response.body!
                    }
                })
        ).then(
            blob => setCommpressedData(blob)
        )
    }

    const downloadLinkClickHandler = () => {
        setCommpressedData(undefined)
    }

    return (
        <main className={styles.main}>
            <h1>Site map parser <sup className={styles.how}>
                <Link className={styles.link} href="#">
                    <p>[how]</p>
                    <video src={`${BASE_PATH}/how-to.mov`} controls autoPlay muted></video>
                </Link>
            </sup></h1>
            {
                compressedData 
                &&
                <Link
                    href={URL.createObjectURL(compressedData)}
                    target="_blank"
                    download="archive.zip"
                    onClick={downloadLinkClickHandler}
                >
                    Click me to download file
                </Link>
                ||
                <FormFile className={styles.form} callback={chooseFilesHandler}>
                    Process a site map from Burp Suite
                </FormFile>
            }

        </main>
    )
}