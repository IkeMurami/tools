"use client"
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Grid from "@/components/Grid/Grid";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    console.log(pathname)
  }, [])

  return (
    <main className={styles.main}>
      <Grid>
        <Link className={styles.card} href={pathname === '/' && '/burp' || `${pathname}/burp`}>
          Burp Suite sitemap parser
        </Link>
      </Grid>
    </main>
  );
}
