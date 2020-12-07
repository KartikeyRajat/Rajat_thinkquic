import Head from 'next/head';
import HomeIndex from '../src/home';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Upload Excel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeIndex />


    </div>
  )
}
