import styles from "./navbar.module.css";
import Link from "next/link";

const Navbar = function() {
  return (
    <header className={styles["header-wrapper"]}>
       <div className={styles["header-main"]}>
          <div className={styles["header-right"]}>
             <nav className={styles["logo"]}>
                <Link href="/">Portfolio</Link>
             </nav>
          </div>
          <div className={styles["header-left"]}>
            <nav>
                <Link href="/about">ABOUT</Link>
                <Link href="/work">WORK</Link>
                <Link href="/press">PRESS</Link>
                <Link href="/journal">JOURNAL</Link>
                <Link href="/moodboard">MOODBOARD</Link>
                <Link href="/universe">THE UNIVERSE</Link>
                <Link href="/contact">CONTACT</Link>
            </nav>
          </div>
       </div>
    </header>
  );
}

export default Navbar;