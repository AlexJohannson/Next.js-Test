import Link from "next/link";
import styles from './page.module.css';


export default function Home() {
    return (
    <div className={styles.loginMessage}>
        <h1>Hi, you need to <Link className={styles.linkLogin} href={'/auth'}>LOGIN</Link> in to authenticate!</h1>
    </div>
  );
};
