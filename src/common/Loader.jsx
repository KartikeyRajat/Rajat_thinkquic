import styles from '../../styles/loader.module.css'

export default () => {
    return <div className={styles["loadingWrapper"]}> <div className={styles["loader"]}></div></div>
}